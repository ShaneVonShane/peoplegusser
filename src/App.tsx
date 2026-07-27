/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { GameMode, GameState, Stranger, Question, RoundAnswer, PlayerStats } from './types';
import { INITIAL_STRANGERS, generateQuestions } from './data/strangers';
import { loadStats, saveStats, resetStats } from './utils/stats';
import { loadStrangerPool, saveCustomStrangers } from './utils/strangersStorage';
import { sound } from './utils/sound';
import { TitleScreen } from './components/TitleScreen';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { CustomStrangerModal } from './components/CustomStrangerModal';

export default function App() {
  const [strangerPool, setStrangerPool] = useState<Stranger[]>(loadStrangerPool);
  const [stats, setStats] = useState<PlayerStats>(loadStats);

  const handleResetStats = () => {
    const fresh = resetStats();
    setStats(fresh);
  };
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);

  // Active Game State
  const [gameState, setGameState] = useState<GameState>({
    status: 'title',
    mode: 'classic',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    timeRemaining: 60,
    answers: [],
    hintUsed: false,
    startTime: Date.now(),
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize sound toggle
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
  };

  // Timer effect for Time Attack Mode
  useEffect(() => {
    if (gameState.status === 'playing' && gameState.mode === 'timeattack') {
      timerRef.current = setInterval(() => {
        setGameState((prev) => {
          if (prev.timeRemaining <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            finishGame(prev);
            return { ...prev, timeRemaining: 0, status: 'gameover' };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.status, gameState.mode]);

  // Start new game round
  const handleStartGame = (mode: GameMode, category: string, roundCount: number = 5, timeLimit: number = 30) => {
    let pool = strangerPool;
    if (category !== 'All') {
      const filtered = strangerPool.filter((s) => s.category === category);
      if (filtered.length >= 4) {
        pool = filtered;
      }
    }

    const questionCount = mode === 'timeattack' ? 50 : mode === 'streak' ? 50 : roundCount;
    const questions = generateQuestions(pool, questionCount);

    setGameState({
      status: 'playing',
      mode,
      questions,
      currentQuestionIndex: 0,
      score: 0,
      streak: 0,
      maxStreak: 0,
      timeRemaining: mode === 'timeattack' ? timeLimit : 60,
      timeLimit,
      answers: [],
      hintUsed: false,
      startTime: Date.now(),
    });
  };

  // Process user's answer choice
  const handleAnswer = (selectedName: string, timeSpentMs: number) => {
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    if (!currentQuestion) return;

    const isCorrect = selectedName === currentQuestion.correctAnswer;
    const newStreak = isCorrect ? gameState.streak + 1 : 0;
    const newMaxStreak = Math.max(gameState.maxStreak, newStreak);

    // Calculate score points
    let pointsGained = 0;
    if (isCorrect) {
      if (gameState.mode === 'classic') {
        pointsGained = 1;
      } else {
        const basePoints = 100;
        const speedBonus = Math.max(0, Math.round((5000 - timeSpentMs) / 100)); // up to 50 speed bonus
        const streakMultiplier = 1 + (newStreak - 1) * 0.25; // 1x, 1.25x, 1.5x...
        pointsGained = Math.round((basePoints + speedBonus) * streakMultiplier);
      }
    }

    const newAnswer: RoundAnswer = {
      question: currentQuestion,
      selectedAnswer: selectedName,
      isCorrect,
      timeSpentMs,
    };

    setGameState((prev) => {
      const updatedAnswers = [...prev.answers, newAnswer];
      const updatedScore = prev.score + pointsGained;

      // Handle Sudden Death (Streak mode) - end immediately on wrong answer!
      if (prev.mode === 'streak' && !isCorrect) {
        const finalState = {
          ...prev,
          score: updatedScore,
          streak: 0,
          maxStreak: newMaxStreak,
          answers: updatedAnswers,
          status: 'gameover' as const,
        };
        finishGame(finalState);
        return finalState;
      }

      return {
        ...prev,
        score: updatedScore,
        streak: newStreak,
        maxStreak: newMaxStreak,
        answers: updatedAnswers,
      };
    });
  };

  // Advance to next question or conclude game
  const handleNextQuestion = () => {
    setGameState((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;

      if (prev.mode === 'classic' && nextIndex >= prev.questions.length) {
        const finalState = { ...prev, status: 'gameover' as const };
        finishGame(finalState);
        return finalState;
      }

      return {
        ...prev,
        currentQuestionIndex: nextIndex,
      };
    });
  };

  // Conclude game & update overall player stats
  const finishGame = (finalState: GameState) => {
    const totalCorrect = finalState.answers.filter((a) => a.isCorrect).length;
    const totalQ = finalState.answers.length;

    setStats((prevStats) => {
      const updated: PlayerStats = {
        gamesPlayed: prevStats.gamesPlayed + 1,
        totalCorrect: prevStats.totalCorrect + totalCorrect,
        totalQuestions: prevStats.totalQuestions + totalQ,
        highScoreClassic:
          finalState.mode === 'classic'
            ? Math.max(prevStats.highScoreClassic, finalState.score)
            : prevStats.highScoreClassic,
        highScoreTimeAttack:
          finalState.mode === 'timeattack'
            ? Math.max(prevStats.highScoreTimeAttack, finalState.score)
            : prevStats.highScoreTimeAttack,
        highScoreStreak:
          finalState.mode === 'streak'
            ? Math.max(prevStats.highScoreStreak, finalState.maxStreak)
            : prevStats.highScoreStreak,
        maxStreakEver: Math.max(prevStats.maxStreakEver, finalState.maxStreak),
      };
      saveStats(updated);
      return updated;
    });
  };

  // Request Hint from server or fallback
  const handleRequestHint = async (): Promise<string | null> => {
    const currentQ = gameState.questions[gameState.currentQuestionIndex];
    if (!currentQ) return null;

    try {
      const res = await fetch('/api/ai-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: currentQ.stranger.name,
          occupation: currentQ.stranger.occupation,
          origin: currentQ.stranger.origin,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.hint || `First letter is "${currentQ.stranger.name.charAt(0)}".`;
      }
    } catch {
      // Fallback
    }

    return `Hint: First letter is "${currentQ.stranger.name.charAt(0)}" and from ${currentQ.stranger.origin || 'Earth'}.`;
  };

  // Add custom stranger to pool
  const handleAddStranger = (newStranger: Stranger) => {
    setStrangerPool((prev) => {
      const updated = [newStranger, ...prev];
      saveCustomStrangers(updated);
      return updated;
    });
  };

  const handleAddAiStrangers = (newStrangers: Stranger[]) => {
    setStrangerPool((prev) => {
      const updated = [...newStrangers, ...prev];
      saveCustomStrangers(updated);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#edf0f5] text-slate-900 flex flex-col font-sans selection:bg-[#1cb0f6] selection:text-white">
      {/* View Switcher */}
      <main className="flex-1">
        {gameState.status === 'title' && (
          <TitleScreen
            onStartGame={handleStartGame}
            stats={stats}
            onOpenCustomModal={() => setIsCustomModalOpen(true)}
            totalStrangersCount={strangerPool.length}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onResetStats={handleResetStats}
          />
        )}

        {gameState.status === 'playing' && (
          <GameScreen
            mode={gameState.mode}
            questions={gameState.questions}
            currentQuestionIndex={gameState.currentQuestionIndex}
            score={gameState.score}
            streak={gameState.streak}
            timeRemaining={gameState.timeRemaining}
            onAnswer={handleAnswer}
            onNextQuestion={handleNextQuestion}
            onEndGame={() => finishGame(gameState)}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onGoHome={() => setGameState((prev) => ({ ...prev, status: 'title' }))}
          />
        )}

        {gameState.status === 'gameover' && (
          <ResultsScreen
            mode={gameState.mode}
            score={gameState.score}
            maxStreak={gameState.maxStreak}
            answers={gameState.answers}
            onPlayAgain={() => handleStartGame(gameState.mode, 'All', gameState.questions.length, gameState.timeLimit || 30)}
            onGoHome={() => setGameState((prev) => ({ ...prev, status: 'title' }))}
          />
        )}
      </main>

      {/* Footer Disclaimer */}
      <footer className="py-2.5 px-4 text-center text-[11px] text-slate-400 tracking-wide select-none">
        This game contains some user submitted content, play at your own risk
      </footer>

      {/* Add Custom Stranger Modal */}
      <CustomStrangerModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onAddStranger={handleAddStranger}
        onAddAiStrangers={handleAddAiStrangers}
      />
    </div>
  );
}
