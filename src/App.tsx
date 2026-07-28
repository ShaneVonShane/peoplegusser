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
import { fetchApprovedFaces } from './services/facesService';
import { TitleScreen } from './components/TitleScreen';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { SubmissionPage } from './components/SubmissionPage';
import { AdminDashboard } from './components/AdminDashboard';
import { CustomStrangerModal } from './components/CustomStrangerModal';
import { AdSenseModals, PolicyTab } from './components/AdSenseModals';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';
import { AdBanner } from './components/AdBanner';
import { Gamepad2, Send, Sparkles } from 'lucide-react';

export default function App() {
  const [strangerPool, setStrangerPool] = useState<Stranger[]>(loadStrangerPool);
  const [stats, setStats] = useState<PlayerStats>(loadStats);
  const [policyTab, setPolicyTab] = useState<PolicyTab | null>(null);

  // Top Page View Routing ('play' | 'submit' | 'admin')
  const [viewTab, setViewTab] = useState<'play' | 'submit' | 'admin'>(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('submit')) return 'submit';
    if (path.includes('admin')) return 'admin';
    return 'play';
  });

  const handleResetStats = () => {
    const fresh = resetStats();
    setStats(fresh);
  };
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);

  // Synchronize URL path with viewTab
  const navigateToTab = (tab: 'play' | 'submit' | 'admin') => {
    sound.playClick();
    setViewTab(tab);
    const path = tab === 'play' ? '/' : `/${tab}`;
    window.history.pushState({}, '', path);
  };

  // Fetch approved community faces from Firestore on initial mount
  const loadApprovedFaces = async () => {
    try {
      const communityFaces = await fetchApprovedFaces();
      if (communityFaces.length > 0) {
        setStrangerPool((prev) => {
          const existingIds = new Set(prev.map((s) => s.id));
          const newFaces = communityFaces.filter((f) => !existingIds.has(f.id));
          return [...newFaces, ...prev];
        });
      }
    } catch (err) {
      console.error('Failed to load community approved faces:', err);
    }
  };

  useEffect(() => {
    loadApprovedFaces();

    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('submit')) setViewTab('submit');
      else if (path.includes('admin')) setViewTab('admin');
      else setViewTab('play');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
    <div className="min-h-screen relative overflow-x-hidden text-slate-900 flex flex-col font-sans selection:bg-[#1cb0f6] selection:text-white">
      {/* Blurred Complementary Colors Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] bg-[#9F6EFA]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -right-32 w-[32rem] h-[32rem] bg-[#ffc800]/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-28 w-[30rem] h-[30rem] bg-[#1cb0f6]/35 rounded-full blur-3xl" />
        <div className="absolute -bottom-28 right-1/4 w-[36rem] h-[36rem] bg-[#ff4b4b]/25 rounded-full blur-3xl" />
        <div className="absolute top-12 left-1/3 w-[38rem] h-[22rem] bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-slate-100/50 backdrop-blur-2xl" />
      </div>

      {/* Top Application Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b-2 border-[#e5e5e5] px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <button
            onClick={() => {
              setGameState((prev) => ({ ...prev, status: 'title' }));
              navigateToTab('play');
            }}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-[#ffc800] text-slate-900 font-cartoon font-black flex items-center justify-center border-b-2 border-[#e5a900] shadow-xs group-hover:scale-105 transition-transform">
              ✏️
            </div>
            <div>
              <span className="font-cartoon font-black text-sm sm:text-base text-slate-900 tracking-wide uppercase block leading-none">
                PeopleGuesser<span className="text-[#1cb0f6]">.io</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 leading-none hidden sm:block mt-0.5">
                The Face Guessing Quiz
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1.5">
            <button
              onClick={() => navigateToTab('play')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-cartoon font-black transition-all cursor-pointer border-b-2 ${
                viewTab === 'play'
                  ? 'bg-[#1cb0f6] text-white border-[#1899d6] shadow-2xs'
                  : 'bg-white text-slate-600 border-[#e5e5e5] hover:bg-slate-50'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Play</span>
            </button>

            <button
              onClick={() => navigateToTab('submit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-cartoon font-black transition-all cursor-pointer border-b-2 ${
                viewTab === 'submit'
                  ? 'bg-[#ffc800] text-slate-900 border-[#e5a900] shadow-2xs'
                  : 'bg-white text-slate-600 border-[#e5e5e5] hover:bg-slate-50'
              }`}
            >
              <Send className="w-3.5 h-3.5 text-amber-600" />
              <span>Submit Face</span>
            </button>
          </nav>
        </div>
      </header>

      {/* View Switcher */}
      <main className="flex-1 pb-4">
        {viewTab === 'submit' ? (
          <SubmissionPage
            onGoHome={() => setViewTab('play')}
            onGoToGame={() => {
              setGameState((prev) => ({ ...prev, status: 'title' }));
              setViewTab('play');
            }}
          />
        ) : viewTab === 'admin' ? (
          <AdminDashboard
            onGoHome={() => setViewTab('play')}
            onRefreshGamePool={loadApprovedFaces}
          />
        ) : (
          <>
            {gameState.status === 'title' && (
              <>
                <TitleScreen
                  onStartGame={handleStartGame}
                  stats={stats}
                  onOpenCustomModal={() => setIsCustomModalOpen(true)}
                  totalStrangersCount={strangerPool.length}
                  soundEnabled={soundEnabled}
                  onToggleSound={handleToggleSound}
                  onResetStats={handleResetStats}
                />
                <div className="max-w-4xl mx-auto px-4 mt-4">
                  <AdBanner format="horizontal" />
                </div>
              </>
            )}

            {gameState.status === 'playing' && (
              <>
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
                <div className="max-w-4xl mx-auto px-4 mt-2">
                  <AdBanner format="auto" />
                </div>
              </>
            )}

            {gameState.status === 'gameover' && (
              <>
                <ResultsScreen
                  mode={gameState.mode}
                  score={gameState.score}
                  maxStreak={gameState.maxStreak}
                  answers={gameState.answers}
                  onPlayAgain={() => handleStartGame(gameState.mode, 'All', gameState.questions.length, gameState.timeLimit || 30)}
                  onGoHome={() => setGameState((prev) => ({ ...prev, status: 'title' }))}
                />
                <div className="max-w-4xl mx-auto px-4 mt-4">
                  <AdBanner format="rectangle" />
                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* AdSense Compliant Footer */}
      <Footer
        onOpenPolicy={(tab) => setPolicyTab(tab)}
        onOpenAdmin={() => navigateToTab('admin')}
      />

      {/* Cookie Consent Banner */}
      <CookieBanner onOpenPolicy={(tab) => setPolicyTab(tab)} />

      {/* Policy & Info Dialogs (Privacy, Terms, About, Contact, Cookie Settings) */}
      <AdSenseModals
        activeTab={policyTab}
        onClose={() => setPolicyTab(null)}
        onSelectTab={(tab) => setPolicyTab(tab)}
      />

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
