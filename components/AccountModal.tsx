'use client';

import React, { useState } from 'react';
import { X, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [otp, setOtp] = useState(['', '', '', '']);

  if (!isOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setStep('otp');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const handleClose = () => {
    setStep('phone');
    setPhoneNumber('');
    setOtp(['', '', '', '']);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-[#E1E7EB] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E1E7EB] bg-[#F7FAFC]">
          <div>
            <h2 id="account-modal-title" className="text-token-18 font-bold text-[#111315]">
              Customer Account
            </h2>
            <p className="text-token-12 text-[#697780]">
              Sign in or track your orders & consultations
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#47515A] hover:text-[#111315] rounded-md hover:bg-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-token-14 font-medium text-[#111315] mb-1.5">
                  Mobile Number
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center gap-1 text-token-14 font-semibold text-[#47515A] border-r border-[#E1E7EB] pr-2">
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit mobile"
                    className="w-full pl-16 pr-4 py-2.5 rounded-lg border border-[#E1E7EB] text-token-16 focus:outline-none focus:border-[#01B1EE] focus:ring-1 focus:ring-[#01B1EE] transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={phoneNumber.length < 10}
                className="w-full py-2.5 px-4 bg-[#01B1EE] hover:bg-[#00A2D9] disabled:opacity-50 text-[#111315] font-semibold text-token-16 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Send One-Time Password</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="text-center">
                <p className="text-token-14 text-[#47515A]">
                  OTP sent to <span className="font-semibold text-[#111315]">+91 {phoneNumber}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-token-12 text-[#006F96] hover:underline mt-1"
                >
                  Change Number
                </button>
              </div>

              <div className="flex justify-center gap-3 my-4">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => {
                      const val = e.target.value;
                      const next = [...otp];
                      next[idx] = val;
                      setOtp(next);
                      if (val && idx < 3) {
                        const nextEl = document.getElementById(`otp-${idx + 1}`);
                        nextEl?.focus();
                      }
                    }}
                    className="w-12 h-12 text-center text-token-20 font-bold border border-[#E1E7EB] rounded-lg focus:outline-none focus:border-[#01B1EE] focus:ring-1 focus:ring-[#01B1EE]"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#01B1EE] hover:bg-[#00A2D9] text-[#111315] font-semibold text-token-16 rounded-lg transition-colors"
              >
                Verify & Continue
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-4 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#18794E] mx-auto" />
              <h3 className="text-token-20 font-bold text-[#111315]">
                Account Verified
              </h3>
              <p className="text-token-14 text-[#47515A]">
                Welcome back to Mahaveer Hair Solution. Your profile and consultation history are linked.
              </p>
              <button
                onClick={handleClose}
                className="mt-2 w-full py-2.5 px-4 bg-[#111315] text-white font-medium text-token-16 rounded-lg hover:bg-black transition-colors"
              >
                Return to Storefront
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
