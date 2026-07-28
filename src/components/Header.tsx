import React from 'react';
import { Volume2, VolumeX, UserPlus, Trophy, Smile } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenCustomModal?: () => void;
  onGoHome: () => void;
  score?: number;
  streak?: number;
  isGameActive?: boolean;
  showAddFace?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenCustomModal,
  onGoHome,
  score,
  streak,
  isGameActive,
  showAddFace = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-[#e5e5e5] text-slate-800 px-4 py-3 shadow-sm backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Cartoon Logo / Brand Name */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left group focus:outline-none rounded-2xl transition-transform hover:scale-105 cursor-pointer"
          title="Return to People Guesser Title Screen"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#9F6EFA] border-b-4 border-[#804de6] flex items-center justify-center text-white transform -rotate-3 group-hover:rotate-0 transition-transform shadow-sm">
            <Smile className="w-6 h-6 stroke-[3]" />
          </div>
          <div>
            <h1 className="font-extrabold text-2xl tracking-wide text-slate-900 flex items-center gap-1.5 leading-none">
              <span className="font-cartoon font-black text-[#9F6EFA]">PEOPLE GUESSER</span>
              <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-xl bg-[#ffc800] text-slate-900 border-b-2 border-[#e5a900] shadow-sm rotate-2">
                QUIZ
              </span>
            </h1>
            <p className="text-[12px] font-bold text-slate-500 hidden sm:block">
              Photo Name Guessing Game
            </p>
          </div>
        </button>

        {/* Active game quick stats - Cartoon Pill */}
        {isGameActive && score !== undefined && (
          <div className="flex items-center gap-2.5 bg-[#f7f9fa] border-2 border-[#e5e5e5] rounded-2xl px-3.5 py-1.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-slate-800 font-extrabold text-sm tracking-wide">
              <Trophy className="w-4 h-4 text-[#ffc800] fill-[#ffc800]" />
              <span className="font-cartoon font-black text-[#d97706]">{score.toLocaleString()}</span>
            </div>
            {streak !== undefined && streak > 1 && (
              <div className="flex items-center gap-1 text-white font-extrabold text-xs bg-[#ff9600] border-b-2 border-[#e58000] px-2 py-0.5 rounded-xl animate-bounce shadow-sm">
                <span>🔥 {streak}x</span>
              </div>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {showAddFace && onOpenCustomModal && (
            <button
              onClick={onOpenCustomModal}
              className="flex items-center gap-1.5 text-xs font-extrabold bg-[#1cb0f6] hover:bg-[#3dbbf7] text-white border-b-4 border-[#1899d6] active:border-b-0 active:translate-y-1 px-3.5 py-2 rounded-2xl transition-all cursor-pointer shadow-sm"
              title="Add custom faces or generate AI strangers"
            >
              <UserPlus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline font-cartoon font-black">Add Face</span>
            </button>
          )}

          <button
            onClick={onToggleSound}
            className="p-2 rounded-2xl bg-white hover:bg-[#f7f9fa] border-2 border-[#e5e5e5] border-b-4 text-slate-700 active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer"
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-[#9F6EFA] stroke-[2.5]" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
