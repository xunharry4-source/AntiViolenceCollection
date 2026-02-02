// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Shield, AlertTriangle, FileText, Scale, ArrowRight } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

export default function Home(props) {
  const {
    toast
  } = useToast();
  const {
    navigateTo
  } = props.$w.utils;
  const handleNavigate = (pageId, params = {}) => {
    navigateTo({
      pageId,
      params
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-['JetBrains_Mono']">
      {/* Header */}
      <header className="bg-[#1E3A5F] text-white py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10 text-[#F59E0B]" />
            <div>
              <h1 className="text-2xl font-bold font-['Space_Grotesk']">DebtShield</h1>
              <p className="text-sm text-slate-300">负债风险应对与协商指引</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">当前日期</p>
            <p className="text-sm font-semibold">2026年2月2日</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-7">
              <h2 className="text-5xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] leading-tight mb-6">
                理性应对
                <span className="text-[#F59E0B]">负债风险</span>
              </h2>
              <p className="text-lg text-[#64748B] mb-8 leading-relaxed">
                为负债人提供合法、低冲突的应对方案，帮助您理性协商、降低风险。
                不代替律师，不提供确定性法律结论，但为您提供专业的应对指引。
              </p>
              <button onClick={() => handleNavigate('assessment')} className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3">
                开始风险评估
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="col-span-5 relative">
              <div className="bg-[#1E3A5F] rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-8 h-8 text-[#F59E0B]" />
                  <span className="text-white font-semibold text-lg">合规声明</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  本产品仅提供一般性信息，不构成法律意见或结果保证。
                  如需专业法律建议，请咨询执业律师。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-8">
            核心功能
          </h3>
          <div className="grid grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div onClick={() => handleNavigate('assessment')} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 border-[#F59E0B] hover:-translate-y-2">
              <div className="bg-[#F59E0B]/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-7 h-7 text-[#F59E0B]" />
              </div>
              <h4 className="text-xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-3">
                风险评估
              </h4>
              <p className="text-[#64748B] text-sm leading-relaxed">
                行为识别与风险等级评估，快速了解当前处境
              </p>
            </div>

            {/* Feature 2 */}
            <div onClick={() => handleNavigate('solutions')} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 border-[#10B981] hover:-translate-y-2">
              <div className="bg-[#10B981]/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-[#10B981]" />
              </div>
              <h4 className="text-xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-3">
                应对方案
              </h4>
              <p className="text-[#64748B] text-sm leading-relaxed">
                协商话术、清单指引，提供实用应对策略
              </p>
            </div>

            {/* Feature 3 */}
            <div onClick={() => handleNavigate('knowledge')} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 border-[#1E3A5F] hover:-translate-y-2">
              <div className="bg-[#1E3A5F]/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Scale className="w-7 h-7 text-[#1E3A5F]" />
              </div>
              <h4 className="text-xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-3">
                法律知识
              </h4>
              <p className="text-[#64748B] text-sm leading-relaxed">
                法律与监管知识引用，了解您的合法权益
              </p>
            </div>
          </div>
        </div>

        {/* What We Don't Do */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-6">
            明确不做
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[#64748B]">不代替律师</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[#64748B]">不提供确定性法律结论</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[#64748B]">不教逃避债务</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[#64748B]">不直接对抗催收</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1E3A5F] text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2026 DebtShield. 本产品仅提供一般性信息，不构成法律意见。
          </p>
        </div>
      </footer>
    </div>;
}