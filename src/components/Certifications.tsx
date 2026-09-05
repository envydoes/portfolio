'use client';

import React, { useState } from 'react';
import { Award, CheckCircle, ExternalLink, Copy, Check, X, Shield, QrCode } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import { Certification } from '@/types';

interface CertificationsProps {
  playSound: (type?: 'click' | 'hover' | 'pop') => void;
}

export const Certifications: React.FC<CertificationsProps> = ({ playSound }) => {
  const { certifications } = portfolioData;
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const displayedCerts = showAll ? certifications : certifications.slice(0, 3);

  const handleCopy = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('click');
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCertClick = (cert: Certification) => {
    playSound('pop');
    setSelectedCert(cert);
  };

  return (
    <section id="certifications" className="py-12 border-t border-gray-200/80 dark:border-[#1e1e1e]">
      {/* Header matching Bryl Lim: Section label on left, All Certifications toggle on right */}
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-gray-400 dark:text-[#666] font-semibold flex items-center gap-2">
          <Award className="h-3.5 w-3.5" />
          <span>04 — Certifications &amp; Credentials</span>
        </h2>
        <button
          type="button"
          onClick={() => {
            playSound('pop');
            setShowAll((prev) => !prev);
          }}
          onMouseEnter={() => playSound('hover')}
          className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-[#888] hover:text-ink dark:hover:text-white transition-colors flex items-center gap-1 group"
        >
          <span>{showAll ? 'Show top 3' : `All certifications (${certifications.length})`}</span>
          <span className="inline-block transition-transform group-hover:translate-x-0.5">
            {showAll ? '↑' : '→'}
          </span>
        </button>
      </div>

      {/* 3-Column Card Grid matching Bryl Lim's design */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        {displayedCerts.map((cert) => (
          <div
            key={cert.id}
            onClick={() => handleCertClick(cert)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleCertClick(cert);
              }
            }}
            onMouseEnter={() => playSound('hover')}
            role="button"
            tabIndex={0}
            aria-label={`Preview ${cert.title} certificate`}
            className="group relative flex flex-col items-center rounded-xl bg-gradient-to-b from-gray-50 to-white dark:from-[#141414] dark:to-[#0f0f0f] px-4 py-5 text-center shadow-[0_8px_22px_-14px_rgba(10,10,10,0.15)] dark:shadow-[0_8px_22px_-14px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-20px_rgba(10,10,10,0.3)] dark:hover:shadow-[0_18px_36px_-20px_rgba(0,0,0,0.7)] border border-gray-200/80 dark:border-[#222] cursor-pointer"
          >
            {/* Inner border inset like Bryl Lim */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-[5px] rounded-lg border border-gray-200/60 dark:border-[#222]/80 transition-colors group-hover:border-gray-300 dark:group-hover:border-[#333]"
            />

            {/* Logo container */}
            <div className="relative h-10 w-10 rounded-md border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] p-1.5 flex items-center justify-center shadow-2xs">
              {cert.logoUrl ? (
                <img src={cert.logoUrl} alt={`${cert.issuer} logo`} className="h-full w-full object-contain" />
              ) : cert.logoType === 'google' ? (
                /* Google multicolored official "G" logo */
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26A11.96 11.96 0 0 0 0 12c0 1.92.45 3.74 1.26 5.42l4.02-3.15Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                  />
                </svg>
              ) : (
                /* UpskillTechPH Shield / Tech Credential Badge */
                <div className="flex items-center justify-center text-amber-500 dark:text-amber-400">
                  <Shield className="h-5 w-5 fill-amber-500/20 stroke-amber-500 dark:stroke-amber-400" />
                </div>
              )}
            </div>

            {/* Credential Title */}
            <h3 className="relative mt-3 text-[13px] font-semibold leading-snug text-ink dark:text-white px-1 line-clamp-2">
              {cert.title}
            </h3>

            {/* Issuer & Date */}
            <p className="relative mt-1 font-mono text-[9.5px] uppercase tracking-wider text-gray-400 dark:text-[#777]">
              {cert.issuer} {cert.date ? `• ${cert.date}` : ''}
            </p>

            {/* Skills preview if present */}
            {cert.skills && (
              <div className="relative mt-2 flex flex-wrap justify-center gap-1">
                {cert.skills.slice(0, 2).map((skill) => (
                  <span
                    key={skill}
                    className="rounded bg-gray-100 dark:bg-[#1f1f1f] px-1.5 py-0.5 font-mono text-[9px] text-gray-500 dark:text-[#999]"
                  >
                    {skill}
                  </span>
                ))}
                {cert.skills.length > 2 && (
                  <span className="font-mono text-[9px] text-gray-400 dark:text-[#666]">
                    +{cert.skills.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Verify Laurel Wreath Bar matching Bryl Lim */}
            <div className="relative mt-3 flex items-center gap-1.5 text-gray-300 dark:text-[#444] group-hover:text-ink dark:group-hover:text-white transition-colors">
              <svg viewBox="0 0 13 22" fill="currentColor" aria-hidden="true" className="h-[13px] w-auto shrink-0">
                <path d="M0 -4C2.1 -2.6 2.1 2.6 0 4C-2.1 2.6 -2.1 -2.6 0 -4Z" transform="translate(8 5) rotate(46)" />
                <path d="M0 -4.3C2.3 -2.8 2.3 2.8 0 4.3C-2.3 2.8 -2.3 -2.8 0 -4.3Z" transform="translate(4.6 11) rotate(14)" />
                <path d="M0 -4C2.1 -2.6 2.1 2.6 0 4C-2.1 2.6 -2.1 -2.6 0 -4Z" transform="translate(8 17) rotate(-30)" />
              </svg>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-gray-400 dark:text-[#777] group-hover:text-ink dark:group-hover:text-white font-medium">
                Verify
              </span>
              <span className="inline-flex -scale-x-100">
                <svg viewBox="0 0 13 22" fill="currentColor" aria-hidden="true" className="h-[13px] w-auto shrink-0">
                  <path d="M0 -4C2.1 -2.6 2.1 2.6 0 4C-2.1 2.6 -2.1 -2.6 0 -4Z" transform="translate(8 5) rotate(46)" />
                  <path d="M0 -4.3C2.3 -2.8 2.3 2.8 0 4.3C-2.3 2.8 -2.3 -2.8 0 -4.3Z" transform="translate(4.6 11) rotate(14)" />
                  <path d="M0 -4C2.1 -2.6 2.1 2.6 0 4C-2.1 2.6 -2.1 -2.6 0 -4Z" transform="translate(8 17) rotate(-30)" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Certificate Verification Modal (for UpskillTechPH & Credential details) */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#111] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => {
                playSound('pop');
                setSelectedCert(null);
              }}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-gray-400 hover:text-ink dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Badge Icon & Header */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#181818]">
                {selectedCert.logoUrl ? (
                  <img src={selectedCert.logoUrl} alt={`${selectedCert.issuer} logo`} className="h-9 w-9 object-contain" />
                ) : (
                  <Shield className="h-6 w-6 text-amber-500" />
                )}
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <span className="font-mono text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
                  Verified Certificate of Participation
                </span>
                <h3 className="text-base font-bold text-ink dark:text-white mt-0.5 leading-snug">
                  {selectedCert.title}
                </h3>
                <p className="font-mono text-xs text-gray-500 dark:text-[#777] mt-0.5">
                  Conducted by {selectedCert.issuer}
                </p>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#161616]">
              {selectedCert.certificateImageUrl ? (
                <img
                  src={selectedCert.certificateImageUrl}
                  alt={`${selectedCert.issuer} ${selectedCert.title} certificate`}
                  className="max-h-[28rem] w-full object-contain"
                />
              ) : (
                <div className="flex min-h-48 items-center justify-center px-6 text-center text-xs font-mono text-gray-500 dark:text-[#888]">
                  Certificate image preview unavailable. Use the verification link below.
                </div>
              )}
            </div>

            {selectedCert.credentialUrl ? (
              <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#161616] p-4">
                <p className="text-xs text-gray-600 dark:text-[#888]">
                  Verification is hosted on {selectedCert.issuer}.
                </p>
                <button
                  type="button"
                  onClick={() => window.open(selectedCert.credentialUrl, '_blank', 'noopener,noreferrer')}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 dark:border-[#2a2a2a] px-3 py-2 text-xs font-mono text-gray-600 dark:text-[#aaa] hover:bg-white dark:hover:bg-[#1d1d1d] transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open verification
                </button>
              </div>
            ) : null}

            {/* Certificate Meta Details */}
            <div className="mt-5 space-y-3 rounded-xl border border-gray-100 dark:border-[#1e1e1e] bg-gray-50/70 dark:bg-[#161616] p-4 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-[#777]">Recipient:</span>
                <span className="font-semibold text-ink dark:text-[#ddd]">Joshua Madulid</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-[#777]">Issue Date:</span>
                <span className="text-ink dark:text-[#ddd]">{selectedCert.date}</span>
              </div>
              {selectedCert.credentialId && (
                <div className="pt-2 border-t border-gray-200/60 dark:border-[#222]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-500 dark:text-[#777]">Credential ID:</span>
                    <button
                      type="button"
                      onClick={(e) => handleCopy(selectedCert.credentialId!, e)}
                      className="inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {copiedId === selectedCert.credentialId ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-500" />
                          <span className="text-emerald-500">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy ID</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="rounded bg-white dark:bg-[#0f0f0f] p-2 text-[11px] select-all break-all text-ink dark:text-[#bbb] border border-gray-200/50 dark:border-[#262626]">
                    {selectedCert.credentialId}
                  </div>
                </div>
              )}
            </div>

            {/* Description / Summary */}
            {selectedCert.description && (
              <p className="mt-4 text-xs text-gray-600 dark:text-[#888] leading-relaxed">
                {selectedCert.description}
              </p>
            )}

            {/* Modal Actions */}
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="rounded-lg border border-gray-200 dark:border-[#2a2a2a] px-4 py-2 text-xs font-mono text-gray-600 dark:text-[#aaa] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
