import React, { useEffect } from 'react';

interface AdBannerProps {
  format?: 'auto' | 'horizontal' | 'rectangle' | 'banner';
  slotId?: string;
  className?: string;
  clientPublisherId?: string; // e.g. "ca-pub-1234567890123456"
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({
  format = 'auto',
  slotId = '1234567890',
  className = '',
  clientPublisherId = '',
}) => {
  useEffect(() => {
    if (clientPublisherId) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn('AdSense script error:', e);
      }
    }
  }, [clientPublisherId]);

  if (!clientPublisherId) return null;

  return (
    <div className={`w-full flex flex-col items-center justify-center my-3 select-none ${className}`}>
      {/* Required AdSense Label */}
      <span className="text-[10px] font-bold font-cartoon tracking-widest text-slate-400 uppercase mb-1">
        ADVERTISEMENT
      </span>

      <div className="w-full max-w-4xl min-h-[90px] bg-slate-100/90 border border-slate-200/90 rounded-2xl flex flex-col items-center justify-center p-2 text-center overflow-hidden transition-all shadow-2xs">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={clientPublisherId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
