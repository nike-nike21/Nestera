'use client';

import React from 'react';
import { Globe2, ArrowLeftRight, Repeat2 } from 'lucide-react';

const assets = [
  { symbol: 'USDC', name: 'USD Coin', apy: '12.4%', color: '#2775CA', badge: 'Most Popular' },
  { symbol: 'USDT', name: 'Tether', apy: '11.8%', color: '#26A17B', badge: null },
  { symbol: 'XLM', name: 'Stellar Lumens', apy: '9.2%', color: '#00C8FF', badge: 'Native' },
  { symbol: 'EURC', name: 'Euro Coin', apy: '10.5%', color: '#0052B4', badge: null },
];

const MultiAssetSection: React.FC = () => {
  return (
    <section className="w-full py-24 bg-[#040f0f] relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[500px]"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(0,180,160,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-12 max-md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: asset cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {assets.map((a) => (
              <div
                key={a.symbol}
                className="group p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {/* Symbol badge */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-[0.65rem] font-black tracking-tight"
                    style={{ background: `${a.color}22`, color: a.color, border: `1px solid ${a.color}44` }}
                  >
                    {a.symbol}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-sm">{a.symbol}</span>
                      {a.badge && (
                        <span className="text-[0.6rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {a.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[rgba(180,210,210,0.45)]">{a.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-extrabold text-lg">{a.apy}</div>
                  <div className="text-[0.65rem] text-[rgba(180,210,210,0.4)] uppercase tracking-wider">APY</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: text */}
          <div className="flex-1 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Globe2 size={13} /> Multi-Asset Support
            </div>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">
              Save in any asset. Switch instantly.
            </h2>
            <p className="text-[1rem] leading-relaxed text-[rgba(180,210,210,0.65)] mb-10">
              Nestera supports all major stablecoins and Stellar-native assets. Diversify across currencies, hedge your exposure, or chase the highest yield — all from one dashboard.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                <ArrowLeftRight className="text-blue-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-white font-bold mb-1">1-Click Asset Swaps</h4>
                  <p className="text-sm text-[rgba(180,210,210,0.6)]">Switch between supported assets at the best available Stellar DEX rate, directly inside the app.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                <Repeat2 className="text-teal-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-white font-bold mb-1">Auto-Rebalancing</h4>
                  <p className="text-sm text-[rgba(180,210,210,0.6)]">Set target allocations and let Nestera automatically rebalance when drift exceeds your threshold.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiAssetSection;
