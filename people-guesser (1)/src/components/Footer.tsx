import React from 'react';
import { Shield, FileText, Info, Mail, Cookie, CheckCircle2, Lock } from 'lucide-react';
import { PolicyTab } from './AdSenseModals';

interface FooterProps {
  onOpenPolicy: (tab: PolicyTab) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy, onOpenAdmin }) => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 py-6 px-4 sm:px-8 mt-auto text-slate-600 font-sans text-xs select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-cartoon font-black text-sm uppercase text-slate-800 tracking-wide">
              People Guesser
            </span>
            <span className="bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0] px-2 py-0.5 rounded-full text-[10px] font-bold font-cartoon flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> AdSense Compliant
            </span>
          </div>
          <p className="text-slate-400 text-[11px]">
            © {new Date().getFullYear()} People Guesser. All rights reserved. Face recognition & trivia memory quiz.
          </p>
        </div>

        {/* Policy & Information Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-cartoon font-bold text-xs uppercase text-slate-600">
          <button
            onClick={() => onOpenPolicy('privacy')}
            className="hover:text-[#1cb0f6] transition-colors flex items-center gap-1"
          >
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            Privacy Policy
          </button>
          <span className="text-slate-300">•</span>

          <button
            onClick={() => onOpenPolicy('terms')}
            className="hover:text-[#1cb0f6] transition-colors flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            Terms of Service
          </button>
          <span className="text-slate-300">•</span>

          <button
            onClick={() => onOpenPolicy('about')}
            className="hover:text-[#1cb0f6] transition-colors flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5 text-slate-400" />
            About Us
          </button>
          <span className="text-slate-300">•</span>

          <button
            onClick={() => onOpenPolicy('contact')}
            className="hover:text-[#1cb0f6] transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            Contact
          </button>
          <span className="text-slate-300">•</span>

          <button
            onClick={() => onOpenPolicy('cookie-settings')}
            className="hover:text-[#1cb0f6] transition-colors flex items-center gap-1"
          >
            <Cookie className="w-3.5 h-3.5 text-slate-400" />
            Cookies
          </button>

          {onOpenAdmin && (
            <>
              <span className="text-slate-300">•</span>
              <button
                onClick={onOpenAdmin}
                className="hover:text-[#9F6EFA] text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1 lowercase tracking-normal text-[11px]"
                title="Admin Portal"
              >
                <Lock className="w-3 h-3 text-slate-400" />
                admin
              </button>
            </>
          )}
        </nav>
      </div>

      <div className="max-w-6xl mx-auto border-t border-slate-100 mt-4 pt-3 text-center text-[11px] text-slate-400">
        This application uses third-party advertising cookies (including Google AdSense) to serve personalized ads based on past visits. Game data is saved locally in your browser.
      </div>
    </footer>
  );
};
