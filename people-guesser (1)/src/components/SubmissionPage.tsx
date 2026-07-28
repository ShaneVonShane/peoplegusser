import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Sparkles, CheckCircle2, User, ArrowLeft, Image as ImageIcon, Send, ShieldAlert } from 'lucide-react';
import { submitFace } from '../services/facesService';
import { sound } from '../utils/sound';

interface SubmissionPageProps {
  onGoHome: () => void;
  onGoToGame: () => void;
}

export const SubmissionPage: React.FC<SubmissionPageProps> = ({ onGoHome, onGoToGame }) => {
  const [inputMode, setInputMode] = useState<'upload' | 'url'>('upload');
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState('Community');
  const [occupation, setOccupation] = useState('');
  const [origin, setOrigin] = useState('');
  const [funFact, setFunFact] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'any'>('any');
  const [submittedBy, setSubmittedBy] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Handle local image file selection with compression preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      if (!src) return;

      // Compress large images using Canvas to optimize Firestore storage
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setImagePreview(compressedDataUrl);
          setImageUrl(compressedDataUrl);
        } else {
          setImagePreview(src);
          setImageUrl(src);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    const activeImageUrl = inputMode === 'upload' ? imagePreview : imageUrl;

    if (!name.trim()) {
      setErrorMsg('Please enter the person\'s name.');
      return;
    }

    if (!activeImageUrl || !activeImageUrl.trim()) {
      setErrorMsg('Please upload an image or provide a direct Image URL.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await submitFace({
        name: name.trim(),
        imageUrl: activeImageUrl.trim(),
        category: category || 'Community',
        occupation: occupation.trim() || 'Community Member',
        origin: origin.trim() || 'Worldwide',
        funFact: funFact.trim(),
        gender,
        submittedBy: submittedBy.trim() || 'Anonymous Visitor',
      });

      sound.playCorrect();
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMsg(err?.message || 'Failed to submit face to database. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    sound.playClick();
    setName('');
    setImageUrl('');
    setImagePreview(null);
    setOccupation('');
    setOrigin('');
    setFunFact('');
    setSubmittedBy('');
    setIsSuccess(false);
    setErrorMsg(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            sound.playClick();
            onGoHome();
          }}
          className="flex items-center gap-2 text-xs sm:text-sm font-cartoon font-black bg-white hover:bg-[#f7f9fa] text-slate-700 border-2 border-[#e5e5e5] border-b-4 active:border-b-2 active:translate-y-0.5 px-4 py-2 rounded-2xl transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          <span>Back to Game</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-2xl bg-[#ffc800]/20 text-[#855b00] border border-[#ffc800]/40 font-cartoon font-black text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#e5a900]" />
          Community Submissions
        </div>
      </div>

      {/* Title Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black font-cartoon text-slate-800 tracking-tight">
          SUBMIT A <span className="text-[#1cb0f6]">NEW FACE</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-bold max-w-lg mx-auto">
          Upload a photo and name to add a face to PeopleGuesser.io! All submissions go to our admin review queue before appearing in live gameplay.
        </p>
      </div>

      {isSuccess ? (
        /* SUCCESS CONFIRMATION STATE */
        <div className="bg-white/90 backdrop-blur-md border-2 border-[#bbf7d0] border-b-6 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-sm max-w-xl mx-auto">
          <div className="w-16 h-16 bg-[#dcfce7] text-[#16a34a] rounded-3xl flex items-center justify-center mx-auto border-2 border-[#bbf7d0] shadow-xs">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-cartoon font-black text-slate-800 uppercase tracking-wide">
              SUBMISSION RECEIVED! 🎉
            </h2>
            <p className="text-slate-600 text-sm font-bold leading-relaxed">
              Thank you for contributing <span className="text-[#1cb0f6] font-extrabold">{name}</span>! Your submission status is now <span className="inline-block bg-amber-100 text-amber-800 border border-amber-300 font-extrabold px-2 py-0.5 rounded-lg text-xs uppercase">Pending Review</span>.
            </p>
          </div>

          {/* Submitted Face Card Preview */}
          <div className="bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl p-4 max-w-xs mx-auto text-center space-y-2">
            <div className="w-28 h-36 mx-auto rounded-2xl overflow-hidden border-2 border-[#e2e8f0] bg-slate-200 relative shadow-xs">
              <img
                src={imagePreview || imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="font-cartoon font-black text-lg text-slate-800">
              {name}
            </div>
            <div className="text-xs font-bold text-slate-500">
              {occupation || 'Community Member'} • {origin || 'Worldwide'}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleResetForm}
              className="w-full sm:w-auto font-cartoon font-black text-sm bg-white hover:bg-slate-50 text-slate-800 border-2 border-[#e5e5e5] border-b-4 active:border-b-2 px-6 py-3 rounded-2xl cursor-pointer transition-all"
            >
              Submit Another Face
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onGoToGame();
              }}
              className="w-full sm:w-auto font-cartoon font-black text-sm bg-[#1cb0f6] hover:bg-[#3dbbf7] text-white border-b-4 border-[#1899d6] active:border-b-2 px-6 py-3 rounded-2xl cursor-pointer transition-all shadow-sm"
            >
              Play Game Now 🎮
            </button>
          </div>
        </div>
      ) : (
        /* MAIN SUBMISSION FORM & LIVE PREVIEW GRID */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT FORM COLUMN */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-md border-2 border-[#e5e5e5] border-b-6 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Error Banner */}
              {errorMsg && (
                <div className="bg-rose-50 border-2 border-rose-200 text-rose-800 p-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Input Mode Selector: Upload Image File vs Direct Image URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-cartoon font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span>Photo Source *</span>
                  <span className="text-[11px] font-bold text-slate-400">Image file or web link</span>
                </label>

                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setInputMode('upload');
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-cartoon font-black transition-all cursor-pointer ${
                      inputMode === 'upload'
                        ? 'bg-white text-[#1cb0f6] shadow-xs border border-slate-200'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Upload Image File</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setInputMode('url');
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-cartoon font-black transition-all cursor-pointer ${
                      inputMode === 'url'
                        ? 'bg-white text-[#1cb0f6] shadow-xs border border-slate-200'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Image URL Link</span>
                  </button>
                </div>
              </div>

              {/* Photo Upload or URL Field */}
              {inputMode === 'upload' ? (
                <div className="space-y-2">
                  <div className="border-2 border-dashed border-[#1cb0f6]/40 hover:border-[#1cb0f6] bg-[#f0f9ff] hover:bg-[#e0f2fe] p-4 rounded-2xl text-center cursor-pointer transition-colors relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                      <div className="w-10 h-10 rounded-2xl bg-[#1cb0f6] text-white flex items-center justify-center border-b-2 border-[#1899d6] group-hover:scale-105 transition-transform">
                        <ImageIcon className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <p className="text-xs font-cartoon font-black text-slate-800">
                          {imagePreview ? 'Click or drag to change image' : 'Choose a portrait photo file'}
                        </p>
                        <p className="text-[11px] font-bold text-slate-500 mt-0.5">
                          PNG, JPG, WebP up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-cartoon font-black uppercase text-slate-700">
                    Direct Image URL *
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                    }}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-[#e5e5e5] focus:border-[#1cb0f6] focus:outline-none text-xs font-bold text-slate-800 placeholder:text-slate-400 bg-white"
                  />
                </div>
              )}

              {/* Person's Full Name (Required) */}
              <div className="space-y-1.5">
                <label className="text-xs font-cartoon font-black uppercase text-slate-700 flex items-center justify-between">
                  <span>Person's Full Name *</span>
                  <span className="text-[11px] font-bold text-slate-400">The correct quiz answer</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Lin or Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-[#e5e5e5] focus:border-[#1cb0f6] focus:outline-none text-sm font-black font-cartoon text-slate-800 placeholder:text-slate-400 bg-white"
                />
              </div>

              {/* Category & Gender Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-cartoon font-black uppercase text-slate-700">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-[#e5e5e5] focus:border-[#1cb0f6] focus:outline-none text-xs font-bold text-slate-800 bg-white cursor-pointer"
                  >
                    <option value="Community">Community / Friends</option>
                    <option value="Celebrity">Celebrity / Famous</option>
                    <option value="Tech">Tech & Business</option>
                    <option value="Pop Culture">Pop Culture & Gaming</option>
                    <option value="Sports">Athletes & Sports</option>
                    <option value="Historic">Historic Figure</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-cartoon font-black uppercase text-slate-700">
                    Gender Hint
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-[#e5e5e5] focus:border-[#1cb0f6] focus:outline-none text-xs font-bold text-slate-800 bg-white cursor-pointer"
                  >
                    <option value="any">Any / Non-binary</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
              </div>

              {/* Occupation & Origin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-cartoon font-black uppercase text-slate-700">
                    Occupation / Role
                  </label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="e.g. Game Developer"
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-[#e5e5e5] focus:border-[#1cb0f6] focus:outline-none text-xs font-bold text-slate-800 placeholder:text-slate-400 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-cartoon font-black uppercase text-slate-700">
                    Origin / Location
                  </label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Seattle, WA"
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-[#e5e5e5] focus:border-[#1cb0f6] focus:outline-none text-xs font-bold text-slate-800 placeholder:text-slate-400 bg-white"
                  />
                </div>
              </div>

              {/* Fun Fact / Clue */}
              <div className="space-y-1.5">
                <label className="text-xs font-cartoon font-black uppercase text-slate-700">
                  Fun Fact or Clue (Optional)
                </label>
                <textarea
                  rows={2}
                  value={funFact}
                  onChange={(e) => setFunFact(e.target.value)}
                  placeholder="e.g. Loves chess and collects vintage arcade games..."
                  className="w-full px-3.5 py-2 rounded-2xl border-2 border-[#e5e5e5] focus:border-[#1cb0f6] focus:outline-none text-xs font-bold text-slate-800 placeholder:text-slate-400 bg-white resize-none"
                />
              </div>

              {/* Submitted By Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-cartoon font-black uppercase text-slate-700">
                  Your Nickname / Handle (Optional)
                </label>
                <input
                  type="text"
                  value={submittedBy}
                  onChange={(e) => setSubmittedBy(e.target.value)}
                  placeholder="e.g. QuizMaster99"
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-[#e5e5e5] focus:border-[#1cb0f6] focus:outline-none text-xs font-bold text-slate-800 placeholder:text-slate-400 bg-white"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl font-cartoon font-black text-lg text-white bg-[#1cb0f6] hover:bg-[#3dbbf7] border-b-4 border-[#1899d6] active:border-b-2 active:translate-y-0.5 cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 stroke-[2.5]" />
                      <span>SUBMIT TO ADMIN QUEUE</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* RIGHT LIVE CARD PREVIEW COLUMN */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white/90 backdrop-blur-md border-2 border-[#e5e5e5] border-b-4 rounded-3xl p-5 shadow-sm space-y-4 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#f3e8ff] text-[#9F6EFA] font-cartoon font-black text-xs uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#9F6EFA]" /> Live Quiz Preview
              </div>

              <p className="text-xs font-bold text-slate-500">
                This is how your face card will appear to players during the game once approved!
              </p>

              {/* Face Card Box */}
              <div className="bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-3xl p-4 max-w-xs mx-auto space-y-3 shadow-sm">
                <div className="relative w-40 h-52 mx-auto rounded-2xl overflow-hidden border-2 border-[#e2e8f0] bg-slate-200 shadow-xs">
                  {imagePreview || imageUrl ? (
                    <img
                      src={imagePreview || imageUrl}
                      alt={name || 'Preview'}
                      className="w-full h-full object-cover"
                      onError={() => setErrorMsg('Failed to load image preview. Please check URL.')}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2 p-2">
                      <User className="w-12 h-12 stroke-[1.5]" />
                      <span className="text-[11px] font-bold">No photo added yet</span>
                    </div>
                  )}

                  <div className="absolute top-2 right-2 bg-slate-900/80 text-white font-cartoon font-black text-[10px] px-2 py-0.5 rounded-lg backdrop-blur-xs uppercase">
                    {category}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-cartoon font-black text-slate-800">
                    {name.trim() || 'Person\'s Name'}
                  </h3>
                  <p className="text-xs font-bold text-[#1cb0f6]">
                    {occupation.trim() || 'Occupation'} • {origin.trim() || 'Location'}
                  </p>
                  {funFact.trim() && (
                    <p className="text-[11px] font-medium text-slate-500 italic bg-white p-2 rounded-xl border border-slate-200 mt-2">
                      "{funFact.trim()}"
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-left text-xs font-bold text-amber-800 space-y-1">
                <div className="font-cartoon font-black uppercase text-amber-900 flex items-center gap-1">
                  🛡️ Moderation Note
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800/90">
                  To prevent inappropriate content, every face is held in the <span className="font-extrabold text-amber-900">'pending'</span> queue until reviewed in the Admin Dashboard.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
