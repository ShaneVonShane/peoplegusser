import React, { useState } from 'react';
import { Play, Flame, Clock, Target, ChevronRight, Layers, UserPlus, Volume2, VolumeX, Trophy, Zap, Award, RotateCcw, AlertTriangle, X } from 'lucide-react';
import { GameMode, PlayerStats } from '../types';
import { sound } from '../utils/sound';

interface TitleScreenProps {
  onStartGame: (mode: GameMode, category: string, roundCount?: number, timeLimit?: number) => void;
  stats: PlayerStats;
  onOpenCustomModal: () => void;
  totalStrangersCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetStats: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStartGame,
  stats,
  onOpenCustomModal,
  soundEnabled,
  onToggleSound,
  onResetStats,
}) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('classic');
  const [selectedRounds, setSelectedRounds] = useState<number>(5);
  const [selectedTime, setSelectedTime] = useState<number>(30);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const getPlayBtnStyle = () => {
    switch (selectedMode) {
      case 'timeattack':
        return {
          button: 'bg-[#ffc800] hover:bg-[#ffd32a] border-[#cc9400] border-b-[#a87a00] text-slate-900',
          badge: 'bg-slate-900/10 border-slate-900/20 text-slate-900',
          icon: 'fill-slate-900 text-slate-900',
          chevron: 'text-slate-900',
          subtext: 'text-slate-800',
        };
      case 'streak':
        return {
          button: 'bg-[#ff4b4b] hover:bg-[#ff6666] border-[#d92525] border-b-[#ad1717] text-white',
          badge: 'bg-white/20 border-white/30 text-white',
          icon: 'fill-white text-white',
          chevron: 'text-white',
          subtext: 'text-white/90',
        };
      case 'classic':
      default:
        return {
          button: 'bg-[#1cb0f6] hover:bg-[#3dbbf7] border-[#1382b8] border-b-[#0c628c] text-white',
          badge: 'bg-white/20 border-white/30 text-white',
          icon: 'fill-white text-white',
          chevron: 'text-white',
          subtext: 'text-white/90',
        };
    }
  };

  const playStyle = getPlayBtnStyle();

  const handlePlay = () => {
    sound.playClick();
    onStartGame(selectedMode, 'All', selectedRounds, selectedTime);
  };

  return (
    <div className="min-h-[calc(100vh-68px)] py-6 px-4 flex flex-col justify-between select-none">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        
        {/* Top Center Title Header */}
        <div className="text-center space-y-3 pt-1 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center px-5 py-2 rounded-2xl bg-[#ffc800] text-slate-900 font-extrabold text-sm uppercase tracking-wider border-b-4 border-[#e5a900] shadow-sm transform -rotate-2">
            <span className="font-cartoon font-black">PHOTO NAME QUIZ!</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-cartoon tracking-tight leading-none">
            <span className="bg-[#9F6EFA] text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-2xl sm:rounded-3xl border-b-4 border-[#804de6] inline-block shadow-sm">
              PEOPLE GUESSER
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg font-bold leading-snug">
            How good are you at Guessing someone's name by just looking at them? Let's find out! ✏️🎨
          </p>

          {/* Cartoon Stranger Photo Cards Stack Preview */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 pt-1">
            {[
              {
                url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                name: 'Elena',
                rotation: '-rotate-6',
                badgeColor: 'bg-[#ddf4ff] border-[#1cb0f6] text-[#1899d6]',
              },
              {
                url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
                name: 'Mateo',
                rotation: 'rotate-0 scale-110 z-10',
                badgeColor: 'bg-[#f3edff] border-[#9F6EFA] text-[#7c3aed]',
              },
              {
                url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
                name: 'Aisha',
                rotation: 'rotate-6',
                badgeColor: 'bg-[#fff3d6] border-[#ffc800] text-[#d97706]',
              },
            ].map((img, i) => (
              <div
                key={i}
                className={`relative w-20 h-28 sm:w-26 sm:h-34 rounded-3xl overflow-hidden border-2 border-[#e5e5e5] border-b-4 bg-white p-1.5 shadow-sm transform transition-transform hover:scale-110 cursor-pointer ${img.rotation}`}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden border border-[#e5e5e5] relative">
                  <img
                    src={img.url}
                    alt="Stranger Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-x-1 bottom-1 ${img.badgeColor} border-b-2 rounded-xl py-0.5 px-1 text-center shadow-xs`}>
                    <span className="text-[11px] sm:text-[12px] font-cartoon font-black">
                      {img.name}?
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Main Content Area */}
        <div className="max-w-3xl mx-auto w-full space-y-6">

          {/* HUGE PROMINENT START BUTTON */}
          <div className="pt-1 text-center max-w-xl mx-auto">
            <button
              onClick={handlePlay}
              className={`w-full py-5 px-6 sm:px-8 rounded-2xl sm:rounded-3xl font-cartoon font-black text-2xl sm:text-3xl tracking-wide border-3 border-b-6 active:border-b-3 active:translate-y-1 transition-all cursor-pointer grid grid-cols-[auto_1fr_auto] items-center gap-4 group relative overflow-hidden shadow-md ${playStyle.button}`}
            >
              {/* Play Badge */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 group-hover:scale-110 transition-transform ${playStyle.badge}`}>
                <Play className={`w-7 h-7 ml-0.5 stroke-[2] ${playStyle.icon}`} />
              </div>

              <div className="text-left leading-none min-w-0">
                <div className="text-2xl sm:text-3xl font-black font-cartoon uppercase tracking-wider">
                  START GAME!
                </div>
                <div className={`text-xs sm:text-sm font-bold uppercase tracking-widest mt-1.5 truncate ${playStyle.subtext}`}>
                  👉 Mode: {selectedMode === 'classic' ? `Classic (${selectedRounds} Rounds)` : selectedMode === 'timeattack' ? `${selectedTime}s Time Attack` : 'Sudden Death'}
                </div>
              </div>

              <ChevronRight className={`w-8 h-8 shrink-0 group-hover:translate-x-2 transition-transform stroke-[4] ${playStyle.chevron}`} />
            </button>
          </div>

          {/* Game Mode Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
              <h2 className="text-sm sm:text-base font-black font-cartoon text-white uppercase tracking-wider flex items-center gap-2 bg-[#9F6EFA] border-b-4 border-[#804de6] px-5 py-2 rounded-2xl shadow-sm">
                <Target className="w-5 h-5 text-white stroke-[2.5]" />
                CHOOSE YOUR GAME MODE
              </h2>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    onToggleSound();
                  }}
                  className="flex items-center gap-1.5 text-xs font-cartoon font-black bg-white hover:bg-[#f7f9fa] text-slate-800 border-2 border-[#e5e5e5] border-b-4 active:border-b-2 active:translate-y-0.5 px-3 py-2 rounded-2xl cursor-pointer shadow-sm transition-all"
                  title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-4 h-4 text-[#9F6EFA] stroke-[2.5]" />
                      <span className="hidden sm:inline">Sound On</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-4 h-4 text-slate-400 stroke-[2.5]" />
                      <span className="hidden sm:inline">Muted</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Classic Quiz Mode */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedMode('classic');
                }}
                className={`relative p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer ${
                  selectedMode === 'classic'
                    ? 'bg-[#ddf4ff] border-[#1cb0f6] border-b-4 border-b-[#1899d6] -translate-y-0.5'
                    : 'bg-white/90 backdrop-blur-md border-[#e5e5e5] border-b-4 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-2xl bg-[#1cb0f6] text-white font-cartoon font-black flex items-center gap-1.5 border-b-2 border-[#1899d6] shadow-xs">
                    <Target className="w-4 h-4" />
                    <span className="text-xs uppercase">Classic</span>
                  </div>
                  {selectedMode === 'classic' && (
                    <span className="px-2.5 py-1 rounded-xl bg-[#1cb0f6] text-white font-cartoon font-black text-[11px] uppercase border-b-2 border-[#1899d6] shadow-xs">
                      SELECTED
                    </span>
                  )}
                </div>

                <p className="text-xs font-bold text-slate-600 mt-2 leading-snug">
                  Take your time! Guess faces at your own pace and test your facial intuition.
                </p>

                {/* Rounds Selector */}
                <div className="mt-3 pt-3 border-t border-[#e5e5e5] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-black font-cartoon text-slate-700">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-slate-500" /> ROUNDS:
                    </span>
                    <span className="text-slate-800 bg-white px-2 py-0.5 rounded-xl border border-[#e5e5e5] font-cartoon">
                      {selectedRounds} Rounds
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[3, 5, 10].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playClick();
                          setSelectedMode('classic');
                          setSelectedRounds(num);
                        }}
                        className={`py-2 rounded-xl text-xs font-cartoon font-black transition-all border-b-3 cursor-pointer ${
                          selectedMode === 'classic' && selectedRounds === num
                            ? 'bg-[#1cb0f6] text-white border-[#1899d6]'
                            : 'bg-white text-slate-600 border-[#e5e5e5] hover:bg-[#f7f9fa]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#1cb0f6]/20 flex items-center justify-between text-xs font-cartoon font-black">
                  <span className="text-[#0f71a1] flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-[#1cb0f6]" /> BEST SCORE
                  </span>
                  <span className="text-[#0f71a1] bg-[#ddf4ff] px-2.5 py-1 rounded-xl border border-[#1cb0f6]/30">
                    {stats.highScoreClassic.toLocaleString()} pts
                  </span>
                </div>
              </div>

              {/* Time Attack Mode */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedMode('timeattack');
                }}
                className={`relative p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer ${
                  selectedMode === 'timeattack'
                    ? 'bg-[#fff3d6] border-[#ffc800] border-b-4 border-b-[#e5a900] -translate-y-0.5'
                    : 'bg-white/90 backdrop-blur-md border-[#e5e5e5] border-b-4 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-2xl bg-[#ffc800] text-slate-900 font-cartoon font-black flex items-center gap-1.5 border-b-2 border-[#e5a900] shadow-xs">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs uppercase">Time Attack</span>
                  </div>
                  {selectedMode === 'timeattack' && (
                    <span className="px-2.5 py-1 rounded-xl bg-[#ffc800] text-slate-900 font-cartoon font-black text-[11px] uppercase border-b-2 border-[#e5a900] shadow-xs">
                      SELECTED
                    </span>
                  )}
                </div>

                <p className="text-xs font-bold text-slate-600 mt-2 leading-snug">
                  Speed Run! Score as many correct face guesses as possible before time runs out!
                </p>

                {/* Time Selector */}
                <div className="mt-3 pt-3 border-t border-[#e5e5e5] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-black font-cartoon text-slate-700">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> TIME LIMIT:
                    </span>
                    <span className="text-slate-800 bg-white px-2 py-0.5 rounded-xl border border-[#e5e5e5] font-cartoon">
                      {selectedTime} Seconds
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[15, 30, 60].map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playClick();
                          setSelectedMode('timeattack');
                          setSelectedTime(sec);
                        }}
                        className={`py-2 rounded-xl text-xs font-cartoon font-black transition-all border-b-3 cursor-pointer ${
                          selectedMode === 'timeattack' && selectedTime === sec
                            ? 'bg-[#ffc800] text-slate-900 border-[#e5a900]'
                            : 'bg-white text-slate-600 border-[#e5e5e5] hover:bg-[#f7f9fa]'
                        }`}
                      >
                        {sec}s
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#ffc800]/20 flex items-center justify-between text-xs font-cartoon font-black">
                  <span className="text-[#855b00] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#e5a900]" /> SPEED BEST
                  </span>
                  <span className="text-[#855b00] bg-[#fff3d6] px-2.5 py-1 rounded-xl border border-[#ffc800]/40">
                    {stats.highScoreTimeAttack.toLocaleString()} pts
                  </span>
                </div>
              </div>

              {/* Sudden Death / Streak Mode */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedMode('streak');
                }}
                className={`relative p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer ${
                  selectedMode === 'streak'
                    ? 'bg-[#ffdfe0] border-[#ff4b4b] border-b-4 border-b-[#ea2b2b] -translate-y-0.5'
                    : 'bg-white/90 backdrop-blur-md border-[#e5e5e5] border-b-4 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-2xl bg-[#ff4b4b] text-white font-cartoon font-black flex items-center gap-1.5 border-b-2 border-[#ea2b2b] shadow-xs">
                    <Flame className="w-4 h-4" />
                    <span className="text-xs uppercase">Sudden Death</span>
                  </div>
                  {selectedMode === 'streak' && (
                    <span className="px-2.5 py-1 rounded-xl bg-[#ff4b4b] text-white font-cartoon font-black text-[11px] uppercase border-b-2 border-[#ea2b2b] shadow-xs">
                      SELECTED
                    </span>
                  )}
                </div>

                <p className="text-xs font-bold text-slate-600 mt-2 leading-snug">
                  High Stakes! One wrong guess ends your game instantly. How high can you streak?
                </p>

                <div className="mt-[2.35rem] pt-3 border-t border-[#ff4b4b]/20 flex items-center justify-between text-xs font-cartoon font-black">
                  <span className="text-[#b82323] flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#ff4b4b]" /> BEST RUN
                  </span>
                  <span className="text-[#b82323] bg-[#ffdfe0] px-2.5 py-1 rounded-xl border border-[#ff4b4b]/30">
                    {stats.highScoreStreak} 🔥
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* OVERALL PLAYER STATS & SCOREBOARD UNDERNEATH */}
          <div className="bg-white/90 backdrop-blur-md border-2 border-[#e5e5e5] border-b-4 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#f3e8ff] text-[#9F6EFA] border border-[#9F6EFA]/30 flex items-center justify-center font-cartoon font-black">
                  <Trophy className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-cartoon font-black uppercase text-slate-800 tracking-wider">
                    OVERALL PLAYER STATS & SCOREBOARD
                  </h3>
                  <p className="text-[11px] font-bold text-slate-500">
                    Your lifetime guessing record across all game modes
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowResetConfirm(true);
                }}
                className="flex items-center gap-1.5 text-[11px] font-cartoon font-black text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 border-b-2 active:border-b-0 active:translate-y-0.5 px-3 py-1.5 rounded-xl cursor-pointer transition-all shadow-xs"
                title="Reset all best scores and stats to 0"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Reset All Best Scores</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Total Games Played */}
              <div className="bg-[#f7f9fa] border border-[#e5e5e5] rounded-2xl p-3 text-left">
                <p className="text-[10px] font-black font-cartoon text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-slate-400" /> Games Played
                </p>
                <p className="text-2xl font-cartoon font-black text-slate-800 mt-1">
                  {stats.gamesPlayed.toLocaleString()}
                </p>
              </div>

              {/* Overall Accuracy */}
              <div className="bg-[#fcf8ff] border border-[#f0dfff] rounded-2xl p-3 text-left">
                <p className="text-[10px] font-black font-cartoon text-[#9F6EFA] uppercase tracking-wider flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-[#9F6EFA]" /> Accuracy
                </p>
                <p className="text-2xl font-cartoon font-black text-[#804de6] mt-1">
                  {stats.totalQuestions > 0
                    ? `${Math.round((stats.totalCorrect / stats.totalQuestions) * 100)}%`
                    : '0%'}
                </p>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                  {stats.totalCorrect} / {stats.totalQuestions} correct
                </p>
              </div>

              {/* Total Correct Guesses */}
              <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-3 text-left">
                <p className="text-[10px] font-black font-cartoon text-[#16a34a] uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#16a34a]" /> Total Correct
                </p>
                <p className="text-2xl font-cartoon font-black text-[#15803d] mt-1">
                  {stats.totalCorrect.toLocaleString()}
                </p>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                  Faces Identified
                </p>
              </div>

              {/* All-Time Best Streak */}
              <div className="bg-[#fff5f5] border border-[#fecdd3] rounded-2xl p-3 text-left">
                <p className="text-[10px] font-black font-cartoon text-[#e11d48] uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#e11d48]" /> Best Streak
                </p>
                <p className="text-2xl font-cartoon font-black text-[#be123c] mt-1">
                  {Math.max(stats.maxStreakEver || 0, stats.highScoreStreak || 0)} <span className="text-xs font-bold text-[#e11d48]">🔥</span>
                </p>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                  Max Consecutive
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Reset Stats Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white border-2 border-[#e5e5e5] border-b-6 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5 relative">
            <button
              onClick={() => {
                sound.playClick();
                setShowResetConfirm(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 border-2 border-rose-300 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-cartoon font-black text-xl text-slate-900">
                  Reset Best Scores?
                </h3>
                <p className="text-xs font-bold text-slate-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-4 text-xs font-bold text-rose-900 space-y-1">
              <p>Are you sure you want to reset all high scores, personal bests, and games played counters to 0?</p>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-cartoon font-black text-sm border-2 border-[#e5e5e5] border-b-4 active:border-b-2 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onResetStats();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-cartoon font-black text-sm border-2 border-rose-700 border-b-4 border-b-rose-800 active:border-b-2 transition-all cursor-pointer shadow-sm"
              >
                Yes, Reset All!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
