import React, { useState } from 'react';
import { Shield, FileText, Info, Mail, X, CheckCircle2, AlertCircle, ExternalLink, Cookie } from 'lucide-react';

export type PolicyTab = 'privacy' | 'terms' | 'about' | 'contact' | 'cookie-settings';

interface AdSenseModalsProps {
  activeTab: PolicyTab | null;
  onClose: () => void;
  onSelectTab: (tab: PolicyTab) => void;
}

export const AdSenseModals: React.FC<AdSenseModalsProps> = ({ activeTab, onClose, onSelectTab }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });

  // Cookie Settings local state
  const [cookiePrefs, setCookiePrefs] = useState(() => {
    try {
      const saved = localStorage.getItem('people_guesser_cookie_prefs');
      return saved ? JSON.parse(saved) : { essential: true, analytics: true, advertising: true };
    } catch {
      return { essential: true, analytics: true, advertising: true };
    }
  });
  const [cookieSaved, setCookieSaved] = useState(false);

  if (!activeTab) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
      onClose();
    }, 2500);
  };

  const handleSaveCookiePrefs = () => {
    try {
      localStorage.setItem('people_guesser_cookie_prefs', JSON.stringify(cookiePrefs));
      localStorage.setItem('people_guesser_cookie_consent', 'customized');
    } catch (e) {
      console.error(e);
    }
    setCookieSaved(true);
    setTimeout(() => {
      setCookieSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white border-2 border-slate-200 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Navigation Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 no-scrollbar max-w-full">
            <button
              onClick={() => onSelectTab('privacy')}
              className={`px-3 py-1.5 rounded-xl font-cartoon font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'privacy'
                  ? 'bg-[#1cb0f6] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Privacy Policy
            </button>

            <button
              onClick={() => onSelectTab('terms')}
              className={`px-3 py-1.5 rounded-xl font-cartoon font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'terms'
                  ? 'bg-[#1cb0f6] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Terms of Service
            </button>

            <button
              onClick={() => onSelectTab('about')}
              className={`px-3 py-1.5 rounded-xl font-cartoon font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'about'
                  ? 'bg-[#1cb0f6] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              About Us
            </button>

            <button
              onClick={() => onSelectTab('contact')}
              className={`px-3 py-1.5 rounded-xl font-cartoon font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'contact'
                  ? 'bg-[#1cb0f6] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Contact Us
            </button>

            <button
              onClick={() => onSelectTab('cookie-settings')}
              className={`px-3 py-1.5 rounded-xl font-cartoon font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'cookie-settings'
                  ? 'bg-[#1cb0f6] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Cookie className="w-3.5 h-3.5" />
              Cookies
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors ml-auto"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6 text-slate-700 text-sm leading-relaxed">
          {/* 1. PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-cartoon font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#1cb0f6]" /> Privacy Policy
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  Last Updated: July 27, 2026
                </p>
              </div>

              <div className="bg-[#f0f9ff] border border-[#b9e6fe] rounded-2xl p-4 text-slate-800 text-xs sm:text-sm leading-relaxed space-y-2">
                <p className="font-bold text-[#0284c7] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Third-Party Advertising & Google AdSense Disclosure
                </p>
                <p>
                  Third-party vendors, including <strong>Google</strong>, use cookies to serve ads based on a user's prior visits to this website or other websites.
                </p>
                <p>
                  Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.
                </p>
                <p>
                  Users may opt out of personalized advertising by visiting{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0284c7] underline font-semibold inline-flex items-center gap-0.5"
                  >
                    Google Ad Settings <ExternalLink className="w-3 h-3" />
                  </a>{' '}
                  or by visiting{' '}
                  <a
                    href="https://www.aboutads.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0284c7] underline font-semibold inline-flex items-center gap-0.5"
                  >
                    www.aboutads.info <ExternalLink className="w-3 h-3" />
                  </a>.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="font-cartoon font-black text-slate-900 text-base">1. Information We Collect</h3>
                <p>
                  We prioritize user privacy. People Guesser is designed to operate seamlessly without requiring accounts, registration, or password creation.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Local Gameplay Data:</strong> Game scores, streak records, accuracy metrics, and custom strangers added during your session are stored directly in your browser's LocalStorage.</li>
                  <li><strong>Log & Device Data:</strong> Standard server logs (IP addresses, browser type, referring URLs, operating system) collected by web servers for security and diagnostic purposes.</li>
                  <li><strong>Cookies & Web Beacons:</strong> Small files stored on your device by third-party services (such as Google AdSense and analytics tools) to provide core functionality, analyze site usage, and serve advertisements.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-cartoon font-black text-slate-900 text-base">2. How We Use Information</h3>
                <p>We use the minimal data collected for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>To deliver responsive game mechanics, quiz questions, and score tracking.</li>
                  <li>To maintain website security, prevent fraud, and optimize performance across mobile and desktop browsers.</li>
                  <li>To display non-intrusive advertisements via Google AdSense to fund server maintenance and free web hosting.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-cartoon font-black text-slate-900 text-base">3. California Consumer Privacy Act (CCPA) & GDPR Rights</h3>
                <p>
                  Depending on your jurisdiction, you have legal rights regarding your data:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Right to Know / Access:</strong> Request disclosure of data collected.</li>
                  <li><strong>Right to Delete:</strong> You can clear your game history anytime by clicking "Reset All Best Scores" in the app or clearing your browser cache.</li>
                  <li><strong>Right to Opt-Out of Sale / Sharing:</strong> We do not sell personal information. You can manage ad cookie preferences in our Cookie Settings or through your browser settings.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-cartoon font-black text-slate-900 text-base">4. Children's Online Privacy Protection Act (COPPA)</h3>
                <p>
                  People Guesser is a general audience entertainment quiz application and does not knowingly collect personal information from children under the age of 13.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-cartoon font-black text-slate-900 text-base">5. Contact Information</h3>
                <p>
                  If you have questions regarding this Privacy Policy or wish to make a data subject request, please reach out via our{' '}
                  <button onClick={() => onSelectTab('contact')} className="text-[#1cb0f6] underline font-bold">
                    Contact Us page
                  </button>{' '}
                  or email <strong className="text-slate-800">support@peopleguesser.io</strong>.
                </p>
              </section>
            </div>
          )}

          {/* 2. TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-cartoon font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#1cb0f6]" /> Terms of Service
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  Effective Date: July 27, 2026
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="font-cartoon font-black text-slate-900 text-base">1. Acceptance of Terms</h3>
                <p>
                  By accessing or playing People Guesser ("the Application"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-cartoon font-black text-slate-900 text-base">2. Entertainment & Educational Use</h3>
                <p>
                  People Guesser is provided strictly for casual entertainment, memory training, and educational fun. All names, occupations, origins, and fun facts associated with fictional portrait characters or royalty-free stock photography are curated strictly for trivia gameplay.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-cartoon font-black text-slate-900 text-base">3. User-Generated & Custom Content Guidelines</h3>
                <p>
                  The Application allows players to create custom faces and player avatars for local gameplay. Users agree NOT to submit or generate content that is:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Defamatory, obscene, hateful, or discriminatory.</li>
                  <li>Violating any third-party copyright, trademark, or privacy rights.</li>
                  <li>Containing malicious code, spam, or abusive material.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-cartoon font-black text-slate-900 text-base">4. Intellectual Property</h3>
                <p>
                  All code, original UI assets, game design, logos, and custom sound effects are protected under applicable copyright and intellectual property laws. Stock photos are sourced under royalty-free licenses (Unsplash / Pexels) or custom digital artwork platforms.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-cartoon font-black text-slate-900 text-base">5. Disclaimer of Warranties & Limitation of Liability</h3>
                <p>
                  THE APPLICATION IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL PEOPLE GUESSER BE LIABLE FOR ANY DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE SERVICE.
                </p>
              </section>
            </div>
          )}

          {/* 3. ABOUT US */}
          {activeTab === 'about' && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-cartoon font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#1cb0f6]" /> About People Guesser
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  The Ultimate Face-Name Memory Quiz Game
                </p>
              </div>

              <p className="text-slate-700 leading-relaxed">
                Welcome to <strong>People Guesser</strong>! We created this interactive web quiz game to help players sharpen their facial recognition skills, boost memory recall, and have fun testing how quickly they can connect faces with names, origins, and occupations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                <div className="bg-[#f7fcff] border border-[#d2ecf9] rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black font-cartoon text-[#1cb0f6] mb-1">🧠</div>
                  <h4 className="font-cartoon font-black text-slate-800 text-sm">Brain Training</h4>
                  <p className="text-xs text-slate-500 mt-1">Strengthen neural pathways for face-name association memory.</p>
                </div>

                <div className="bg-[#fffdf7] border border-[#fce8b3] rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black font-cartoon text-[#d49800] mb-1">⚡</div>
                  <h4 className="font-cartoon font-black text-slate-800 text-sm">Multiple Modes</h4>
                  <p className="text-xs text-slate-500 mt-1">Classic rounds, rapid-fire Time Attack, and intense Sudden Death.</p>
                </div>

                <div className="bg-[#fcf8ff] border border-[#f0dfff] rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black font-cartoon text-[#804de6] mb-1">✨</div>
                  <h4 className="font-cartoon font-black text-slate-800 text-sm">Custom Creation</h4>
                  <p className="text-xs text-slate-500 mt-1">Create custom strangers instantly with personalized bios.</p>
                </div>
              </div>

              <section className="space-y-2">
                <h3 className="font-cartoon font-black text-slate-900 text-base">Our Commitment to Quality</h3>
                <p>
                  We maintain strict editorial and technical standards to ensure a fast, responsive, and ad-friendly gaming experience. We continually update our portrait database with diverse backgrounds and respectful content.
                </p>
              </section>
            </div>
          )}

          {/* 4. CONTACT US */}
          {activeTab === 'contact' && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-cartoon font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#1cb0f6]" /> Contact Us
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  Have questions, feedback, or a partnership inquiry? We'd love to hear from you.
                </p>
              </div>

              {contactSubmitted ? (
                <div className="bg-[#f0fdf4] border-2 border-[#bbf7d0] rounded-2xl p-6 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#16a34a] mx-auto animate-bounce" />
                  <h3 className="font-cartoon font-black text-lg text-slate-800">Message Sent!</h3>
                  <p className="text-xs text-slate-600">
                    Thank you for contacting us. Our team will review your message and respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-cartoon font-black text-slate-700 uppercase mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Jane Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1cb0f6] outline-none text-sm font-medium transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-cartoon font-black text-slate-700 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1cb0f6] outline-none text-sm font-medium transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-cartoon font-black text-slate-700 uppercase mb-1">
                      Inquiry Type
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1cb0f6] outline-none text-sm font-medium transition-colors bg-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Bug Report">Bug Report / Technical Issue</option>
                      <option value="Privacy Request">Privacy Request / Data Removal</option>
                      <option value="Advertising / AdSense">Advertising & AdSense Inquiry</option>
                      <option value="Feedback">Game Suggestions & Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-cartoon font-black text-slate-700 uppercase mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#1cb0f6] outline-none text-sm font-medium transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <p className="text-[11px] text-slate-400 font-medium">
                      Direct Email: <strong className="text-slate-600">support@peopleguesser.io</strong>
                    </p>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#1cb0f6] hover:bg-[#189cdb] active:translate-y-0.5 text-white font-cartoon font-black text-sm uppercase tracking-wider border-b-4 border-[#1483b8] transition-all shadow-md"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 5. COOKIE SETTINGS */}
          {activeTab === 'cookie-settings' && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-cartoon font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Cookie className="w-5 h-5 text-[#1cb0f6]" /> Cookie Preference Center
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  Manage your cookie choices for privacy and advertising.
                </p>
              </div>

              {cookieSaved && (
                <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-3 text-center text-xs font-cartoon font-black text-[#16a34a] flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Preferences saved successfully!
                </div>
              )}

              <div className="space-y-4">
                {/* Essential Cookies */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-cartoon font-black text-slate-800 text-sm flex items-center gap-2">
                      Essential Cookies & LocalStorage
                      <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full uppercase">
                        Always Active
                      </span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Required for storing your high scores, game preferences, and audio settings locally in your browser.
                    </p>
                  </div>
                  <input type="checkbox" checked disabled className="w-5 h-5 accent-[#1cb0f6] cursor-not-allowed" />
                </div>

                {/* Advertising Cookies */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-cartoon font-black text-slate-800 text-sm">
                      Advertising & AdSense Cookies
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Allows Google AdSense and third-party ad networks to deliver relevant ads based on your interests.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookiePrefs.advertising}
                    onChange={(e) => setCookiePrefs({ ...cookiePrefs, advertising: e.target.checked })}
                    className="w-5 h-5 accent-[#1cb0f6] cursor-pointer"
                  />
                </div>

                {/* Analytics Cookies */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-cartoon font-black text-slate-800 text-sm">
                      Performance & Analytics
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Helps us measure site traffic, load speed, and game mode usage to improve performance.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookiePrefs.analytics}
                    onChange={(e) => setCookiePrefs({ ...cookiePrefs, analytics: e.target.checked })}
                    className="w-5 h-5 accent-[#1cb0f6] cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCookiePrefs({ essential: true, analytics: false, advertising: false })}
                  className="text-xs font-cartoon font-bold text-slate-500 hover:text-slate-800 underline"
                >
                  Reject All Non-Essential
                </button>
                <button
                  type="button"
                  onClick={handleSaveCookiePrefs}
                  className="px-6 py-2.5 rounded-xl bg-[#1cb0f6] hover:bg-[#189cdb] active:translate-y-0.5 text-white font-cartoon font-black text-sm uppercase tracking-wider border-b-4 border-[#1483b8] transition-all shadow-md"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
