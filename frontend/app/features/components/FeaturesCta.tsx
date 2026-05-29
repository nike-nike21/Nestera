'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Wallet } from 'lucide-react';

const FeaturesCta: React.FC = () => {
  return (
    <section className="w-full py-24 bg-[#040f0f]">
      <div className="max-w-[1200px] mx-auto px-12 max-md:px-6">
        <div className="relative rounded-[32px] overflow-hidden p-16 max-md:p-10 text-center flex flex-col items-center gap-8 border border-[rgba(0,212,192,0.15)] bg-linear-to-br from-[rgba(0,212,192,0.12)] to-[rgba(6,26,26,0)]">
          {/* Glow blob */}
          <div
            className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(ellipse, rgba(0,212,192,0.12) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#00d4c0]/10 border border-[#00d4c0]/20 flex items-center justify-center">
              <Wallet className="text-[#00d4c0]" size={32} />
            </div>

            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white leading-tight max-w-2xl tracking-tight">
              Ready to grow your savings on-chain?
            </h2>
            <p className="text-[1.05rem] text-[rgba(180,210,210,0.65)] max-w-xl">
              Connect your wallet and start earning in seconds. No bank required. No sign-up forms. Just DeFi-powered savings.
            </p>

            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Link
                href="/savings"
                className="flex items-center gap-2 px-8 py-4 bg-[#00d4c0] hover:bg-[#00bfad] text-[#061a1a] font-bold rounded-xl text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,212,192,0.35)]"
              >
                Start Saving Now <ArrowRight size={18} />
              </Link>
              <Link
                href="/community"
                className="px-8 py-4 bg-white/5 border border-white/15 text-white font-semibold rounded-xl text-base transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5"
              >
                Join the Community
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesCta;
