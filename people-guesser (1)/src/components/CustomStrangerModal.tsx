import React, { useState } from 'react';
import { X, UserPlus, Sparkles, Check, Upload } from 'lucide-react';
import { Stranger } from '../types';
import { sound } from '../utils/sound';

interface CustomStrangerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStranger: (stranger: Stranger) => void;
  onAddAiStrangers: (strangers: Stranger[]) => void;
}

export const CustomStrangerModal: React.FC<CustomStrangerModalProps> = ({
  isOpen,
  onClose,
  onAddStranger,
  onAddAiStrangers,
}) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'ai'>('manual');
  
  // Manual Form State
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [photoUrl, setPhotoUrl] = useState('');
  const [occupation, setOccupation] = useState('');
  const [origin, setOrigin] = useState('');
  const [funFact, setFunFact] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // AI Generator State
  const [aiTheme, setAiTheme] = useState('Diverse Global');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState('');

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !photoUrl.trim()) return;

    sound.playClick();
    const newStranger: Stranger = {
      id: `custom_${Date.now()}`,
      name: name.trim(),
      gender,
      photoUrl: photoUrl.trim(),
      occupation: occupation.trim() || 'Stranger',
      origin: origin.trim() || 'Earth',
      funFact: funFact.trim() || 'A mystery waiting to be guessed.',
      isCustom: true,
    };

    onAddStranger(newStranger);
    setSuccessMsg(`Added ${newStranger.name} to your game pool!`);
    
    // Clear inputs
    setName('');
    setPhotoUrl('');
    setOccupation('');
    setOrigin('');
    setFunFact('');

    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleGenerateAiPack = async () => {
    setIsGeneratingAi(true);
    setAiError('');
    sound.playClick();

    try {
      const res = await fetch('/api/generate-strangers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: aiTheme }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate AI strangers. Please check API Key.');
      }

      const data = await res.json();
      if (data.strangers && Array.isArray(data.strangers)) {
        // Map photos with reliable Unsplash portrait fallbacks
        const mapped: Stranger[] = data.strangers.map((item: any, idx: number) => {
          const fallbackPhotos = [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
          ];
          return {
            id: `ai_${Date.now()}_${idx}`,
            name: item.name || 'Mysterious Stranger',
            gender: item.gender || 'any',
            photoUrl: fallbackPhotos[idx % fallbackPhotos.length],
            occupation: item.occupation || 'Explorer',
            origin: item.origin || 'World Citizen',
            funFact: item.funFact || 'Loves guessing games.',
            isCustom: true,
          };
        });

        onAddAiStrangers(mapped);
        sound.playStreak();
        setSuccessMsg(`Generated ${mapped.length} new stranger profiles!`);
        setTimeout(() => {
          setSuccessMsg('');
          onClose();
        }, 2000);
      }
    } catch (err: any) {
      setAiError(err.message || 'Error generating stranger profiles.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-white border-2 border-[#e5e5e5] border-b-4 w-full max-w-lg rounded-3xl p-6 shadow-xl relative space-y-5 animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:bg-[#f7f9fa] rounded-2xl border-2 border-[#e5e5e5] transition-all cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Modal Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-cartoon font-black text-slate-900 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-[#1cb0f6] stroke-[3]" />
            Add Custom Strangers
          </h2>
          <p className="text-xs font-bold text-slate-600">
            Add photos of your friends and family or generate stranger packs! ✏️
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#e5e5e5] gap-2">
          <button
            onClick={() => setActiveTab('manual')}
            className={`pb-2 px-4 text-xs font-cartoon font-black transition-all border-b-4 ${
              activeTab === 'manual'
                ? 'border-[#9F6EFA] text-[#804de6]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Manual / Upload
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`pb-2 px-4 text-xs font-cartoon font-black transition-all border-b-4 flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'border-[#1cb0f6] text-[#1899d6]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Stranger Pack Generator
          </button>
        </div>

        {/* Tab 1: Manual Input */}
        {activeTab === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-cartoon font-black text-slate-700">
                  Person's Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f7f9fa] border-2 border-[#e5e5e5] rounded-2xl px-3.5 py-2.5 text-sm font-cartoon font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1cb0f6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-cartoon font-black text-slate-700">
                  Gender *
                </label>
                <div className="grid grid-cols-2 gap-1 bg-[#f7f9fa] border-2 border-[#e5e5e5] rounded-2xl p-1">
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-1.5 rounded-xl text-xs font-cartoon font-black transition-all cursor-pointer ${
                      gender === 'female'
                        ? 'bg-[#1cb0f6] text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Female
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-1.5 rounded-xl text-xs font-cartoon font-black transition-all cursor-pointer ${
                      gender === 'male'
                        ? 'bg-[#1cb0f6] text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Male
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-cartoon font-black text-slate-700">
                Photo (URL or Upload File) *
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full bg-[#f7f9fa] border-2 border-[#e5e5e5] rounded-2xl px-3.5 py-2.5 text-sm font-cartoon font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1cb0f6]"
                />
                <label className="shrink-0 bg-[#1cb0f6] hover:bg-[#3dbbf7] text-white px-3.5 py-2.5 rounded-2xl border-b-3 border-[#1899d6] cursor-pointer flex items-center gap-1.5 text-xs font-cartoon font-black shadow-xs">
                  <Upload className="w-4 h-4 stroke-[3]" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Photo Preview if loaded */}
            {photoUrl && (
              <div className="flex items-center gap-3 bg-[#f3edff] p-2 rounded-2xl border border-[#9F6EFA]">
                <img
                  src={photoUrl}
                  alt="Preview"
                  className="w-12 h-12 rounded-xl object-cover border border-[#9F6EFA]"
                />
                <span className="text-xs font-bold text-[#333745] truncate">
                  Photo loaded successfully! ✨
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-cartoon font-black text-slate-700">Occupation</label>
                <input
                  type="text"
                  placeholder="e.g. Artist"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full bg-[#f7f9fa] border-2 border-[#e5e5e5] rounded-2xl px-3.5 py-2 text-sm font-cartoon font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1cb0f6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-cartoon font-black text-slate-700">Origin City</label>
                <input
                  type="text"
                  placeholder="e.g. Chicago"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-[#f7f9fa] border-2 border-[#e5e5e5] rounded-2xl px-3.5 py-2 text-sm font-cartoon font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1cb0f6]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!name.trim() || !photoUrl.trim()}
              className="w-full py-3.5 rounded-2xl bg-[#9F6EFA] hover:bg-[#ab7eff] disabled:opacity-50 text-white font-cartoon font-black text-base border-b-4 border-[#804de6] active:border-b-0 active:translate-y-1 transition-all cursor-pointer shadow-md"
            >
              Add Face To Game!
            </button>
          </form>
        )}

        {/* Tab 2: Stranger Pack Generator */}
        {activeTab === 'ai' && (
          <div className="space-y-4 pt-1">
            <div className="space-y-1">
              <label className="text-xs font-cartoon font-black text-slate-700">
                Choose Stranger Pack Theme
              </label>
              <select
                value={aiTheme}
                onChange={(e) => setAiTheme(e.target.value)}
                className="w-full bg-[#f7f9fa] border-2 border-[#e5e5e5] rounded-2xl px-3.5 py-2.5 text-sm font-cartoon font-bold text-slate-800 focus:outline-none focus:bg-white focus:border-[#1cb0f6]"
              >
                <option value="Diverse Global Citizens">Diverse Global Citizens</option>
                <option value="Tech Entrepreneurs & Scientists">Tech Entrepreneurs & Scientists</option>
                <option value="Creative Artists & Musicians">Creative Artists & Musicians</option>
                <option value="Culinary Chefs & Bakers">Culinary Chefs & Bakers</option>
                <option value="Retro Vintage Era 1980s">Retro Vintage Era (1980s)</option>
              </select>
            </div>

            <p className="text-xs font-bold text-slate-600">
              Instantly generate 5 brand new stranger profiles complete with realistic backstory details!
            </p>

            <button
              onClick={handleGenerateAiPack}
              disabled={isGeneratingAi}
              className="w-full py-3.5 rounded-2xl bg-[#1cb0f6] hover:bg-[#3dbbf7] disabled:opacity-50 text-white font-cartoon font-black text-base flex items-center justify-center gap-2 border-b-4 border-[#1899d6] active:border-b-0 active:translate-y-1 transition-all cursor-pointer shadow-md"
            >
              <Sparkles className="w-5 h-5 stroke-[3]" />
              <span>{isGeneratingAi ? 'Generating Profiles...' : 'Generate 5 Stranger Profiles'}</span>
            </button>

            {aiError && (
              <p className="text-xs font-bold text-[#ea2b2b] bg-[#ffdfe0] border border-[#ff4b4b] p-2.5 rounded-2xl">
                {aiError}
              </p>
            )}
          </div>
        )}

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="bg-[#f3edff] border border-[#9F6EFA] text-[#333745] p-3 rounded-2xl text-xs font-cartoon font-black flex items-center gap-2">
            <Check className="w-5 h-5 text-[#9F6EFA] stroke-[3]" />
            <span>{successMsg}</span>
          </div>
        )}

      </div>
    </div>
  );
};
