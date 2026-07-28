import React, { useEffect, useState } from 'react';
import { Trophy, RefreshCw, Home, Share2, Check, XCircle, CheckCircle2, ListChecks } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GameMode, RoundAnswer } from '../types';
import { sound } from '../utils/sound';

interface ResultsScreenProps {
  mode: GameMode;
  score: number;
  maxStreak: number;
  answers: RoundAnswer[];
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  mode,
  score,
  maxStreak,
  answers,
  onPlayAgain,
  onGoHome,
}) => {
  const [copied, setCopied] = useState(false);

  const totalQuestions = answers.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const accuracyPct = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Determine Rank Title
  let rankTitle = 'Beginner Guesser 🌱';
  let rankDesc = 'Keep playing People Guesser to build your FACIAL INTUITION!';

  if (accuracyPct >= 90 || score >= 800) {
    rankTitle = 'People Guesser Mastermind 👑';
    rankDesc = 'Phenomenal photographic memory! You never forget a face!';
  } else if (accuracyPct >= 70 || score >= 500) {
    rankTitle = 'Super Memory Detective 🔍';
    rankDesc = 'Impressive intuition and face-to-name recognition!';
  } else if (accuracyPct >= 50 || score >= 300) {
    rankTitle = 'Perceptive Observer 👁️';
    rankDesc = 'Solid run! You have strong FACIAL INTUITION.';
  }

  useEffect(() => {
    sound.playGameOver();
    if (accuracyPct >= 50 || score > 300) {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [accuracyPct, score]);

  const handleShare = () => {
    sound.playClick();
    const text = `I scored ${score.toLocaleString()} pts (${accuracyPct}% accuracy) on People Guesser! Can you beat my score? 👤⚡`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 select-none">
      
      {/* Primary Results Card */}
      <div className="bg-white border-2 border-[#e5e5e5] border-b-4 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-sm relative overflow-hidden">
        
        <div className="inline-flex p-3 rounded-2xl bg-[#ffc800] text-slate-900 border-b-4 border-[#e5a900] shadow-sm mb-1 transform -rotate-2">
          <Trophy className="w-9 h-9 text-slate-900 fill-slate-900 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <p className="text-xs font-cartoon font-black text-[#9F6EFA] uppercase tracking-widest">
            QUIZ FINISHED • {mode.toUpperCase()} MODE
          </p>
          <h1 className="text-3xl sm:text-4xl font-cartoon font-black text-slate-900">
            {rankTitle}
          </h1>
          <p className="text-sm font-bold text-slate-600 max-w-md mx-auto">
            {rankDesc}
          </p>
        </div>

        {/* Big Score Display */}
        <div className="py-2">
          <div className="inline-block bg-[#f7f9fa] border-2 border-[#e5e5e5] border-b-4 rounded-3xl px-8 py-3 shadow-xs">
            <span className="text-xs font-cartoon font-black text-slate-500 uppercase tracking-wider block">
              FINAL SCORE
            </span>
            <span className="text-4xl sm:text-5xl font-cartoon font-black text-[#ffc800]">
              {score.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-2 max-w-md mx-auto">
          <div className="bg-[#ddf4ff] border-2 border-[#1cb0f6] border-b-4 border-b-[#1899d6] rounded-2xl p-3 shadow-xs">
            <span className="text-[11px] text-[#1899d6] font-cartoon font-black uppercase block">Accuracy</span>
            <span className="text-xl font-cartoon font-black text-[#1cb0f6]">{accuracyPct}%</span>
          </div>
          <div className="bg-[#f3edff] border-2 border-[#9F6EFA] border-b-4 border-b-[#804de6] rounded-2xl p-3 shadow-xs">
            <span className="text-[11px] text-[#804de6] font-cartoon font-black uppercase block">Correct</span>
            <span className="text-xl font-cartoon font-black text-[#9F6EFA]">{correctCount} / {totalQuestions}</span>
          </div>
          <div className="bg-[#fff3d6] border-2 border-[#ffc800] border-b-4 border-b-[#e5a900] rounded-2xl p-3 shadow-xs">
            <span className="text-[11px] text-[#d97706] font-cartoon font-black uppercase block">Max Streak</span>
            <span className="text-xl font-cartoon font-black text-[#ff9600]">{maxStreak} 🔥</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="py-3.5 px-6 rounded-2xl bg-[#9F6EFA] hover:bg-[#ab7eff] text-white font-cartoon font-black text-lg flex items-center justify-center gap-2 border-b-4 border-[#804de6] active:border-b-0 active:translate-y-1 transition-all cursor-pointer shadow-md"
          >
            <RefreshCw className="w-5 h-5 stroke-[3]" />
            <span>Play Again!</span>
          </button>

          <button
            onClick={handleShare}
            className="py-3.5 px-5 rounded-2xl bg-[#1cb0f6] hover:bg-[#3dbbf7] text-white font-cartoon font-black text-lg flex items-center justify-center gap-2 border-b-4 border-[#1899d6] active:border-b-0 active:translate-y-1 transition-all cursor-pointer shadow-md"
          >
            {copied ? <Check className="w-5 h-5 stroke-[3]" /> : <Share2 className="w-5 h-5 stroke-[3]" />}
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onGoHome();
            }}
            className="py-3.5 px-5 rounded-2xl bg-white hover:bg-[#f7f9fa] text-slate-700 font-cartoon font-black text-lg flex items-center justify-center gap-2 border-2 border-[#e5e5e5] border-b-4 active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer shadow-xs"
          >
            <Home className="w-5 h-5 stroke-[3]" />
            <span>Title Screen</span>
          </button>
        </div>
      </div>

      {/* Overview of the Round */}
      {answers.length > 0 && (
        <div className="bg-white border-2 border-[#e5e5e5] border-b-4 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
            <h2 className="font-cartoon font-black text-xl text-slate-800 flex items-center gap-2">
              <ListChecks className="w-6 h-6 text-[#1cb0f6] stroke-[2.5]" />
              Overview of the Round
            </h2>
            <span className="text-xs font-cartoon font-black bg-[#f7f9fa] border border-[#e5e5e5] px-2.5 py-1 rounded-xl text-slate-600">
              {correctCount} / {totalQuestions} Correct
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {answers.map((ans, idx) => {
              const { stranger, correctAnswer } = ans.question;
              const userGuess = ans.selectedAnswer || 'Timed out';
              const isCorrect = ans.isCorrect;
              const secSpent = (ans.timeSpentMs / 1000).toFixed(1);

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3.5 p-3 rounded-2xl border-2 border-b-4 shadow-xs transition-all ${
                    isCorrect
                      ? 'bg-[#f4fcf7] border-[#58cc02]/30'
                      : 'bg-[#fff8f8] border-[#ff4b4b]/30'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={stranger.photoUrl}
                      alt={stranger.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#e5e5e5]"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-[#58cc02] fill-[#58cc02] text-white stroke-[2.5]" />
                      ) : (
                        <XCircle className="w-5 h-5 text-[#ff4b4b] fill-[#ff4b4b] text-white stroke-[2.5]" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-0.5 text-xs font-cartoon overflow-hidden flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-black text-sm text-slate-900 truncate">
                        {correctAnswer}
                      </p>
                      <span className="text-[10px] text-slate-400 font-bold shrink-0">
                        {secSpent}s
                      </span>
                    </div>

                    {isCorrect ? (
                      <p className="text-[#58cc02] font-black text-xs flex items-center gap-1">
                        ✓ Correct choice
                      </p>
                    ) : (
                      <p className="text-slate-600 font-bold truncate">
                        Guessed: <span className="text-[#ff4b4b] line-through">{userGuess}</span>
                      </p>
                    )}

                    {stranger.occupation && (
                      <p className="text-[11px] text-slate-500 truncate">
                        {stranger.occupation} • {stranger.origin}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

