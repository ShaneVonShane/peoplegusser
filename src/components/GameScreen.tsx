import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Clock, Flame, Sparkles, Volume2, VolumeX, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GameMode, Question } from '../types';
import { sound } from '../utils/sound';

interface GameScreenProps {
  mode: GameMode;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  streak: number;
  timeRemaining: number;
  onAnswer: (selectedName: string, timeSpentMs: number) => void;
  onNextQuestion: () => void;
  onEndGame: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  onGoHome?: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  mode,
  questions,
  currentQuestionIndex,
  score,
  streak,
  timeRemaining,
  onAnswer,
  onNextQuestion,
  soundEnabled,
  onToggleSound,
  onGoHome,
}) => {
  const question = questions[currentQuestionIndex];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const questionStartTimeRef = useRef<number>(Date.now());

  // Reset local state whenever active question index changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setImageLoaded(false);
    questionStartTimeRef.current = Date.now();
  }, [currentQuestionIndex]);

  if (!question) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-cartoon font-black text-slate-800 text-xl">
        Loading hand-drawn face... ✏️
      </div>
    );
  }

  const { stranger, options, correctAnswer } = question;

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;

    const timeSpentMs = Date.now() - questionStartTimeRef.current;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === correctAnswer;

    if (isCorrect) {
      sound.playCorrect();
      if (streak + 1 >= 3 && (streak + 1) % 3 === 0) {
        sound.playStreak();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    } else {
      sound.playWrong();
    }

    onAnswer(option, timeSpentMs);
  };

  const isCorrectGuess = selectedOption === correctAnswer;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-5 select-none">
      
      {/* Top Game Status Banner */}
      <div className="bg-white border-2 border-[#e5e5e5] border-b-4 rounded-3xl p-4 shadow-sm flex items-center justify-between gap-4">
        {/* Progress / Timer Indicator */}
        <div className="flex items-center gap-3">
          {mode === 'timeattack' ? (
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-[#ffc800] animate-bounce" />
              <div>
                <p className="text-[11px] text-slate-500 uppercase font-cartoon font-black tracking-wider">Time Left</p>
                <p className={`text-2xl font-cartoon font-black ${timeRemaining <= 10 ? 'text-[#ff4b4b] animate-pulse' : 'text-[#ffc800]'}`}>
                  {timeRemaining}s
                </p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-[11px] text-slate-500 uppercase font-cartoon font-black tracking-wider">
                {mode === 'streak' ? 'Sudden Death' : 'Progress'}
              </p>
              <p className="text-xl font-cartoon font-black text-slate-800">
                {mode === 'streak' ? (
                  <span className="text-[#ff9600] flex items-center gap-1">
                    <Flame className="w-5 h-5 fill-[#ff9600] text-[#ff9600]" /> {streak} Streak
                  </span>
                ) : (
                  <span>
                    Question <span className="text-[#9F6EFA]">{currentQuestionIndex + 1}</span> of {questions.length}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Score & Streak Badges */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[11px] text-slate-500 uppercase font-cartoon font-black tracking-wider">Score</p>
            <p className="text-2xl font-cartoon font-black text-[#d97706]">
              {score.toLocaleString()}
            </p>
          </div>

          {streak > 1 && (
            <div className="bg-[#ff9600] text-white font-cartoon font-black text-xs px-3 py-1 rounded-2xl border-b-2 border-[#e58000] flex items-center gap-1 shadow-sm animate-bounce">
              <Flame className="w-4 h-4 fill-white text-white" />
              <span>{streak}x</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 border-l-2 border-[#e5e5e5] pl-2.5">
            {onToggleSound && (
              <button
                onClick={() => {
                  sound.playClick();
                  onToggleSound();
                }}
                className="p-2 rounded-2xl bg-[#f7f9fa] hover:bg-white border-2 border-[#e5e5e5] border-b-4 active:border-b-2 active:translate-y-0.5 text-slate-700 transition-all cursor-pointer"
                title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-[#9F6EFA] stroke-[2.5]" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400 stroke-[2.5]" />
                )}
              </button>
            )}

            {onGoHome && (
              <button
                onClick={() => {
                  sound.playClick();
                  onGoHome();
                }}
                className="p-2 rounded-2xl bg-[#f7f9fa] hover:bg-white border-2 border-[#e5e5e5] border-b-4 active:border-b-2 active:translate-y-0.5 text-slate-700 transition-all cursor-pointer"
                title="Exit to Title Screen"
              >
                <Home className="w-4 h-4 text-slate-600 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Quiz Frame */}
      <div className="bg-white border-2 border-[#e5e5e5] border-b-4 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
        
        {/* Cartoon Photo Frame */}
        <div className="relative w-full max-w-xs sm:max-w-sm mx-auto bg-[#f7f9fa] p-3 pb-7 rounded-3xl border-2 border-[#e5e5e5] border-b-4 shadow-sm transform rotate-1">
          {/* Top Tape Accent */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ffc800] border-b-2 border-[#e5a900] px-6 py-1 rounded-xl text-[10px] font-cartoon font-black uppercase tracking-widest text-slate-900 rotate-2 shadow-xs">
            PROMPT PHOTO
          </div>

          <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-[#e5e5e5] bg-slate-100 relative">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400 font-bold text-sm">
                Loading photo...
              </div>
            )}

            <img
              src={stranger.photoUrl}
              alt="People Guesser Portrait"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                setImageLoaded(true);
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
              }}
              className={`w-full h-full object-cover transition-all duration-300 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            />
          </div>

          <p className="text-center font-bold text-sm text-slate-600 pt-2.5">
            Who is this person? 🤔
          </p>
        </div>

        {/* Prompt Header */}
        <div className="text-center space-y-1">
          <p className="text-xs font-cartoon font-black text-[#1cb0f6] uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>People Guesser Quiz</span>
          </p>
          <h2 className="text-2xl sm:text-3xl font-cartoon font-black text-slate-800">
            What is this person's name?
          </h2>
        </div>

        {/* 4 Multiple Choice Answer Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {options.map((optionName, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            const isSelected = selectedOption === optionName;
            const isCorrectOption = optionName === correctAnswer;

            let buttonStyle = 'bg-white text-slate-800 border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] hover:bg-[#f7f9fa] active:border-b-2 active:translate-y-0.5';
            let badgeStyle = 'bg-[#f7f9fa] text-slate-700 font-cartoon font-black border border-[#e5e5e5]';

            if (isAnswered) {
              if (isCorrectOption) {
                buttonStyle = 'bg-[#d7ffb8] text-slate-900 border-2 border-[#58cc02] border-b-4 border-b-[#46a302]';
                badgeStyle = 'bg-[#58cc02] text-white font-cartoon font-black';
              } else if (isSelected && !isCorrectOption) {
                buttonStyle = 'bg-[#ffdfe0] text-[#ea2b2b] border-2 border-[#ff4b4b] border-b-4 border-b-[#d92323]';
                badgeStyle = 'bg-[#ff4b4b] text-white font-cartoon font-black';
              } else {
                buttonStyle = 'bg-[#f7f9fa] text-slate-400 border-2 border-[#e5e5e5] opacity-50';
                badgeStyle = 'bg-slate-200 text-slate-500';
              }
            }

            return (
              <button
                key={optionName}
                onClick={() => handleSelectOption(optionName)}
                disabled={isAnswered}
                className={`relative p-4 rounded-2xl font-cartoon font-black text-lg transition-all duration-150 flex items-center justify-between gap-3 focus:outline-none cursor-pointer ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 ${badgeStyle}`}>
                    {letter}
                  </span>
                  <span className="truncate">{optionName}</span>
                </div>

                {isAnswered && (
                  <div>
                    {isCorrectOption && (
                      <CheckCircle2 className="w-6 h-6 text-[#58cc02] shrink-0 stroke-[3]" />
                    )}
                    {isSelected && !isCorrectOption && (
                      <XCircle className="w-6 h-6 text-[#ff4b4b] shrink-0 stroke-[3]" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Revealed Bio & Fun Fact Card */}
        {isAnswered && (
          <div className="pt-2 space-y-4 animate-fade-in">
            <div className={`p-4 rounded-2xl border-2 border-b-4 ${
              isCorrectGuess 
                ? 'bg-[#d7ffb8] border-[#58cc02] border-b-[#46a302] text-slate-900' 
                : 'bg-[#fff3d6] border-[#ffc800] border-b-[#e5a900] text-slate-900'
            }`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-cartoon font-black text-xl text-slate-900">
                    {stranger.name}
                  </span>
                  {stranger.occupation && (
                    <span className="text-xs font-cartoon font-black bg-white text-slate-800 border border-[#e5e5e5] px-2.5 py-0.5 rounded-xl shadow-xs">
                      {stranger.occupation}
                    </span>
                  )}
                </div>
                {stranger.origin && (
                  <p className="text-xs font-bold text-slate-700">
                    📍 From <span className="text-slate-900 font-extrabold">{stranger.origin}</span>
                  </p>
                )}
                {stranger.funFact && (
                  <p className="text-xs font-bold text-slate-800 italic pt-1">
                    "{stranger.funFact}"
                  </p>
                )}
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  sound.playClick();
                  onNextQuestion();
                }}
                className="py-4 px-8 rounded-2xl bg-[#9F6EFA] hover:bg-[#ab7eff] text-white font-cartoon font-black text-lg flex items-center gap-2 border-b-4 border-[#804de6] active:border-b-0 active:translate-y-1 transition-all cursor-pointer shadow-md"
              >
                <span>{currentQuestionIndex + 1 >= questions.length && mode === 'classic' ? 'View Results!' : 'Next Face!'}</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
