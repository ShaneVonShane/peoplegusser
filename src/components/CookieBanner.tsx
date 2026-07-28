import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { PolicyTab } from './AdSenseModals';

interface CookieBannerProps {
  onOpenPolicy: (tab: PolicyTab) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPolicy }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('people_guesser_cookie_consent');
      if (!consent) {
        // Show after a brief delay for smoother initial load
        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      setVisible(false);
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('people_guesser_cookie_consent', 'accepted_all');
      localStorage.setItem(
        'people_guesser_cookie_prefs',
        JSON.stringify({ essential: true, analytics: true, advertising: true })
      );
    } catch (e) {
      console.error(e);
    }
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('people_guesser_cookie_consent', 'essential_only');
      localStorage.setItem(
        'people_guesser_cookie_prefs',
        JSON.stringify({ essential: true, analytics: false, advertising: false })
      );
    } catch (e) {
      console.error(e);
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 shadow-2xl animate-slideUp">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3 text-left">
          <div className="w-9 h-9 rounded-xl bg-[#1cb0f6]/20 text-[#1cb0f6] flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-cartoon font-black text-sm uppercase tracking-wider text-slate-100 flex items-center gap-1.5">
              Cookie & Privacy Preferences <ShieldCheck className="w-4 h-4 text-[#1cb0f6]" />
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              We and third-party vendors (including Google) use cookies to analyze site usage and serve personalized ads based on prior visits. By clicking "Accept All", you consent to cookie usage for advertising and analytics. You can customize your preferences or opt out at any time in our{' '}
              <button
                onClick={() => onOpenPolicy('privacy')}
                className="text-[#1cb0f6] underline font-bold hover:text-sky-300"
              >
                Privacy Policy
              </button>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end shrink-0">
          <button
            onClick={() => onOpenPolicy('cookie-settings')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-cartoon font-bold text-xs uppercase transition-colors border border-slate-700"
          >
            Preferences
          </button>
          <button
            onClick={handleEssentialOnly}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-cartoon font-bold text-xs uppercase transition-colors border border-slate-700"
          >
            Essential Only
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-5 py-2 rounded-xl bg-[#1cb0f6] hover:bg-[#189cdb] active:translate-y-0.5 text-white font-cartoon font-black text-xs uppercase border-b-2 border-[#1483b8] transition-all shadow-sm"
          >
            Accept All
          </button>
          <button
            onClick={() => setVisible(false)}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
