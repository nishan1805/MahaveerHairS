'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  Lock,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

interface ConsultationCTAProps {
  onOpenConsultationModal?: () => void;
}

export function ConsultationCTA({ onOpenConsultationModal }: ConsultationCTAProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    timeWindow: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.phone.length >= 10) {
      setSubmitted(true);
    }
  };

  return (
    <section id="consultation" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Consultation Card */}
        <div className="rounded-3xl md:rounded-[36px] bg-gradient-to-br from-[#F5FBFE] via-[#EDF8FD] to-[#E3F4FC] border border-[#D5E8F3] p-4 sm:p-8 md:p-12 lg:p-14 xl:p-16 relative overflow-hidden shadow-xs">
          {/* Subtle Decorative Curves & Arcs */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />
          <svg
            className="absolute top-0 right-0 w-[420px] h-[420px] pointer-events-none text-[#01B1EE]"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M100 0C180 80 280 140 400 120"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeOpacity="0.25"
            />
            <path
              d="M260 0C320 90 360 210 400 320"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.2"
              strokeDasharray="6 6"
            />
            <path
              d="M380 200C390 280 340 360 400 400"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeOpacity="0.3"
            />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center relative z-10">
            {/* Left Column: Eyebrow, Heading, Paragraph & Salon Photo (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              {/* Eyebrow */}
              <p className="text-[#01B1EE] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 sm:mb-3 font-body">
                ONE-ON-ONE PRIVATE CONSULTATION
              </p>

              {/* Headline */}
              <h2 className="type-section-heading text-[#111315]">
                Not Sure Which Solution Is Right for You?
              </h2>

              {/* Supporting Paragraph */}
              <p className="mt-3 text-token-16 text-[#697780] font-body max-w-lg leading-relaxed">
                Speak with our experts to explore the available options and find the best next step
                for your needs.
              </p>

              {/* Salon Photograph */}
              <div className="mt-6 sm:mt-8 relative w-full aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden border border-[#D5E8F3] shadow-sm bg-slate-100">
                <Image
                  src="/images/consultation-salon.png"
                  alt="Mahaveer Hair Solution private consultation studio and salon interior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Right Column: Expanded White Form Card (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-white rounded-2xl md:rounded-[28px] border border-[#E1E7EB] p-4 sm:p-7 lg:p-10 xl:p-12 shadow-lg shadow-black/[0.04]">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#E0F4FD] flex items-center justify-center mx-auto text-[#01B1EE]">
                    <CheckCircle2 className="w-8 h-8 text-[#01B1EE]" />
                  </div>
                  <h3 className="text-2xl font-normal text-[#111315] font-heading">
                    Appointment Request Received
                  </h3>
                  <p className="text-token-14 text-[#55606A] leading-relaxed font-body max-w-sm mx-auto">
                    Thank you, <span className="font-semibold text-[#111315]">{formData.name}</span>.
                    Our Raipur senior hair specialist will contact you at{' '}
                    <span className="font-semibold text-[#111315]">+91 {formData.phone}</span> to
                    confirm your scheduled session.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        service: '',
                        date: '',
                        timeWindow: '',
                      });
                    }}
                    className="inline-block pt-2 text-token-14 text-[#008BB8] hover:text-[#01B1EE] font-semibold underline cursor-pointer font-body"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <h3 className="text-2xl sm:text-[28px] font-normal text-[#111315] font-heading tracking-tight">
                      Book an Appointment
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#6B7785] mt-1 font-body leading-normal">
                      Share your details and preferred time. We&apos;ll get in touch to confirm your
                      appointment.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#111315] mb-1.5 font-body">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-3 text-token-15 rounded-xl border border-[#D5DDE2] bg-white text-[#111315] placeholder:text-[#9AA6B2] focus:outline-none focus:border-[#01B1EE] focus:ring-2 focus:ring-[#01B1EE]/10 transition-all font-body"
                    />
                  </div>

                  {/* Contact Phone (+91) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#111315] mb-1.5 font-body">
                      Contact Phone (+91)
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value.replace(/\D/g, ''),
                        })
                      }
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-3 text-token-15 rounded-xl border border-[#D5DDE2] bg-white text-[#111315] placeholder:text-[#9AA6B2] focus:outline-none focus:border-[#01B1EE] focus:ring-2 focus:ring-[#01B1EE]/10 transition-all font-body"
                    />
                  </div>

                  {/* Service You're Interested In */}
                  <div>
                    <label className="block text-xs font-semibold text-[#111315] mb-1.5 font-body">
                      Service You&apos;re Interested In
                    </label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        required
                        className="w-full px-4 py-3 text-token-15 rounded-xl border border-[#D5DDE2] bg-white text-[#111315] focus:outline-none focus:border-[#01B1EE] focus:ring-2 focus:ring-[#01B1EE]/10 transition-all font-body appearance-none pr-10 cursor-pointer"
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        <option value="Hair Patch Fitting & Styling">
                          Hair Patch Fitting &amp; Styling
                        </option>
                        <option value="Hair System Maintenance">Hair System Maintenance</option>
                        <option value="Wig Consultation & Fitting">Wig Consultation &amp; Fitting</option>
                        <option value="Hair Extensions Service">Hair Extensions Service</option>
                        <option value="General Hair Loss Consultation">
                          General Hair Loss Consultation
                        </option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#8C9AA6] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Preferred Date & Preferred Time Window */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date */}
                    <div>
                      <label className="block text-xs font-semibold text-[#111315] mb-1.5 font-body">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-[#8C9AA6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full pl-10 pr-3 py-3 text-token-15 rounded-xl border border-[#D5DDE2] bg-white text-[#111315] focus:outline-none focus:border-[#01B1EE] focus:ring-2 focus:ring-[#01B1EE]/10 transition-all font-body"
                        />
                      </div>
                    </div>

                    {/* Time Window */}
                    <div>
                      <label className="block text-xs font-semibold text-[#111315] mb-1.5 font-body">
                        Preferred Time Window
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-[#8C9AA6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={formData.timeWindow}
                          onChange={(e) => setFormData({ ...formData, timeWindow: e.target.value })}
                          className="w-full pl-10 pr-8 py-3 text-token-15 rounded-xl border border-[#D5DDE2] bg-white text-[#111315] focus:outline-none focus:border-[#01B1EE] focus:ring-2 focus:ring-[#01B1EE]/10 transition-all font-body appearance-none cursor-pointer"
                        >
                          <option value="">Select a time</option>
                          <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                          <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                          <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#8C9AA6] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Full-Width Cyan Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 sm:px-6 bg-[#01B1EE] hover:bg-[#009ED6] text-[#111315] font-bold text-sm sm:text-token-15 rounded-xl transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 mt-3 font-body cursor-pointer whitespace-nowrap"
                  >
                    <span className="whitespace-nowrap">Request Appointment</span>
                    <ArrowRight className="w-4 h-4 text-[#111315] shrink-0" />
                  </button>

                  {/* Discreet Privacy Note */}
                  <div className="pt-1 flex items-center justify-center gap-1.5 text-xs text-[#6B7785] font-body">
                    <Lock className="w-3.5 h-3.5 text-[#6B7785]" />
                    <span>Your information is kept strictly confidential.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ConsultationCTA;
