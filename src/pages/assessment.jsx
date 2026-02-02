// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, AlertTriangle, Shield, CheckCircle, XCircle, ChevronRight, Plus, Scale, FileText } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Card, Input } from '@/components/ui';

export default function Assessment(props) {
  const {
    toast
  } = useToast();
  const {
    navigateTo,
    navigateBack
  } = props.$w.utils;
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [riskLevel, setRiskLevel] = useState(null);
  const [otherContactMethod, setOtherContactMethod] = useState('');
  const questions = [{
    id: 'contact_frequency',
    title: '催收联系频率',
    description: '催收方联系您的频率如何？',
    options: [{
      value: 'low',
      label: '偶尔（每周1-2次）',
      risk: 1
    }, {
      value: 'medium',
      label: '频繁（每天1-2次）',
      risk: 2
    }, {
      value: 'high',
      label: '非常频繁（每天3次以上）',
      risk: 3
    }]
  }, {
    id: 'occupation',
    title: '职业',
    description: '请选择您的职业类型',
    multiSelect: false,
    options: [{
      value: 'employee',
      label: '企业员工',
      risk: 1
    }, {
      value: 'freelancer',
      label: '自由职业者',
      risk: 2
    }, {
      value: 'self_employed',
      label: '个体工商户',
      risk: 2
    }, {
      value: 'government',
      label: '公务员/事业单位',
      risk: 1
    }, {
      value: 'student',
      label: '学生',
      risk: 2
    }, {
      value: 'retired',
      label: '退休人员',
      risk: 1
    }, {
      value: 'unemployed',
      label: '待业/无业',
      risk: 3
    }, {
      value: 'other',
      label: '其他',
      risk: 2
    }]
  }, {
    id: 'debt_amount',
    title: '负债金额',
    description: '您的总负债金额大约是多少？',
    options: [{
      value: 'small',
      label: '5万以下',
      risk: 1
    }, {
      value: 'medium',
      label: '5-20万',
      risk: 2
    }, {
      value: 'large',
      label: '20-50万',
      risk: 2
    }, {
      value: 'huge',
      label: '50万以上',
      risk: 3
    }]
  }, {
    id: 'payment_ability',
    title: '还款能力',
    description: '您目前的还款能力如何？',
    options: [{
      value: 'good',
      label: '可以按时还款',
      risk: 1
    }, {
      value: 'partial',
      label: '可以部分还款',
      risk: 2
    }, {
      value: 'difficult',
      label: '暂时无法还款',
      risk: 3
    }]
  }, {
    id: 'legal_action',
    title: '法律行动',
    description: '是否已收到法律文书或被起诉？',
    options: [{
      value: 'no',
      label: '没有',
      risk: 1
    }, {
      value: 'notice',
      label: '收到律师函',
      risk: 2
    }, {
      value: 'sued',
      label: '已被起诉',
      risk: 3
    }]
  }];
  const handleAnswer = (questionId, value, risk) => {
    // 职业问题改为单选
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        value,
        risk
      }
    }));
  };
  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    const currentAnswer = answers[currentQuestion.id];

    // 检查是否已选择答案
    if (!currentAnswer) {
      toast({
        title: '请选择一个选项',
        variant: 'destructive'
      });
      return;
    }

    // 如果选择了"其他"，检查是否填写了具体内容
    if (currentQuestion.id === 'occupation' && currentAnswer.value === 'other' && !otherContactMethod.trim()) {
      toast({
        title: '请填写其他职业的具体内容',
        variant: 'destructive'
      });
      return;
    }
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateRisk();
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const calculateRisk = async () => {
    const totalRisk = Object.values(answers).reduce((sum, answer) => sum + answer.risk, 0);
    const maxRisk = questions.length * 3;
    const riskPercentage = totalRisk / maxRisk * 100;
    let level;
    if (riskPercentage <= 33) {
      level = 'low';
    } else if (riskPercentage <= 66) {
      level = 'medium';
    } else {
      level = 'high';
    }

    // 检查违法的催收方式（职业问题不涉及违法行为）
    const illegalBehaviors = [];

    // 保存评估结果到数据模型
    try {
      const result = await props.$w.cloud.callDataSource({
        dataSourceName: 'assessments',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            contact_frequency: answers['contact_frequency']?.value || '',
            occupation: answers['occupation']?.value || '',
            debt_amount: answers['debt_amount']?.value || '',
            payment_ability: answers['payment_ability']?.value || '',
            legal_action: answers['legal_action']?.value || '',
            other_occupation: otherContactMethod || '',
            risk_level: level,
            risk_percentage: Math.round(riskPercentage),
            total_risk: totalRisk,
            illegal_behaviors: illegalBehaviors
          }
        }
      });
      console.log('评估结果已保存:', result);
      toast({
        title: '评估结果已保存',
        description: '您的风险评估记录已成功保存'
      });
    } catch (error) {
      console.error('保存评估结果失败:', error);
      toast({
        title: '保存失败',
        description: error.message || '保存评估结果时出错',
        variant: 'destructive'
      });
    }
    setRiskLevel({
      level,
      percentage: riskPercentage,
      totalRisk,
      illegalBehaviors
    });
  };
  const getRiskInfo = level => {
    switch (level) {
      case 'low':
        return {
          color: '#10B981',
          icon: CheckCircle,
          title: '低风险',
          description: '当前风险较低，建议保持沟通，按时还款',
          suggestions: ['保持与债权方的正常沟通', '制定合理的还款计划', '保留所有沟通记录']
        };
      case 'medium':
        return {
          color: '#F59E0B',
          icon: AlertTriangle,
          title: '中等风险',
          description: '存在一定风险，建议主动协商，制定应对方案',
          suggestions: ['主动联系债权方说明情况', '准备详细的财务状况说明', '了解协商还款的可能性', '注意保留所有证据']
        };
      case 'high':
        return {
          color: '#EF4444',
          icon: XCircle,
          title: '高风险',
          description: '风险较高，建议寻求专业法律帮助，谨慎应对',
          suggestions: ['立即咨询专业律师', '收集和保存所有相关证据', '了解法律程序和您的权利', '避免做出任何可能加重风险的承诺', '如遇违法催收，及时投诉']
        };
      default:
        return null;
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-['JetBrains_Mono']">
      {/* Header */}
      <header className="bg-[#1E3A5F] text-white py-4 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={navigateBack} className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>返回</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#F59E0B]" />
            <span className="text-xl font-bold font-['Space_Grotesk']">风险评估</span>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-12">
        {!riskLevel ? <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#64748B]">
                  问题 {currentStep + 1} / {questions.length}
                </span>
                <span className="text-sm font-semibold text-[#1E3A5F]">
                  {Math.round((currentStep + 1) / questions.length * 100)}%
                </span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#1E3A5F] transition-all duration-500" style={{
              width: `${(currentStep + 1) / questions.length * 100}%`
            }}></div>
              </div>
            </div>

            {/* Question Card */}
            <Card className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-3">
                  {questions[currentStep].title}
                </h2>
                <p className="text-[#64748B]">{questions[currentStep].description}</p>
              </div>

              <div className="space-y-4">
                {questions[currentStep].options.map(option => {
              const currentAnswer = answers[questions[currentStep].id];
              const isSelected = currentAnswer?.value === option.value;
              return <button key={option.value} onClick={() => handleAnswer(questions[currentStep].id, option.value, option.risk)} className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${isSelected ? 'border-[#1E3A5F] bg-[#1E3A5F]/5' : 'border-slate-200 hover:border-[#1E3A5F]/30 hover:bg-slate-50'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#1E3A5F]">{option.label}</span>
                        {isSelected && <CheckCircle className="w-5 h-5 text-[#1E3A5F]" />}
                      </div>
                    </button>;
            })}
              </div>

              {/* 其他职业输入框 */}
              {questions[currentStep].id === 'occupation' && currentAnswer?.value === 'other' && <div className="mt-4 p-4 bg-slate-50 rounded-xl border-2 border-[#1E3A5F]/20">
                      <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                        请具体说明您的职业
                      </label>
                      <Input value={otherContactMethod} onChange={e => setOtherContactMethod(e.target.value)} placeholder="例如：兼职、家庭主妇等" className="w-full" />
                    </div>}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline" className="px-6">
                  上一题
                </Button>
                <Button onClick={handleNext} className="bg-[#1E3A5F] hover:bg-[#0F2744] px-6">
                  {currentStep === questions.length - 1 ? '查看结果' : '下一项'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </> : <>
            {/* Risk Result */}
            <Card className="bg-white rounded-2xl p-8 shadow-xl">
              {(() => {
            const riskInfo = getRiskInfo(riskLevel.level);
            const RiskIcon = riskInfo.icon;
            return <>
                    <div className="text-center mb-8">
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center" style={{
                  backgroundColor: `${riskInfo.color}20`
                }}>
                        <RiskIcon className="w-12 h-12" style={{
                    color: riskInfo.color
                  }} />
                      </div>
                      <h2 className="text-3xl font-bold font-['Space_Grotesk'] mb-2" style={{
                  color: riskInfo.color
                }}>
                        {riskInfo.title}
                      </h2>
                      <p className="text-[#64748B]">{riskInfo.description}</p>
                    </div>

                    {/* Risk Score */}
                    <div className="bg-slate-50 rounded-xl p-6 mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-[#64748B]">风险评分</span>
                        <span className="text-2xl font-bold font-['Space_Grotesk'] text-[#1E3A5F]">
                          {riskLevel.totalRisk} / {questions.length * 3}
                        </span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full transition-all duration-1000" style={{
                    width: `${riskLevel.percentage}%`,
                    backgroundColor: riskInfo.color
                  }}></div>
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-4">
                        建议措施
                      </h3>
                      <div className="space-y-3">
                        {riskInfo.suggestions.map((suggestion, index) => <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                      backgroundColor: `${riskInfo.color}20`
                    }}>
                              <span className="text-xs font-bold" style={{
                        color: riskInfo.color
                      }}>
                                {index + 1}
                              </span>
                            </div>
                            <p className="text-[#64748B] leading-relaxed">{suggestion}</p>
                          </div>)}
                      </div>
                    </div>

                    {/* Legal Warning - 如果有违法行为 */}
                    {riskLevel.illegalBehaviors && riskLevel.illegalBehaviors.length > 0 && <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-xl p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <Scale className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-red-700 mb-2">
                              检测到可能的违法催收行为
                            </h3>
                            <p className="text-sm text-red-600">
                              根据您提供的信息，以下催收方式可能违反相关法律法规，请注意保护自身权益。
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {riskLevel.illegalBehaviors.map((behavior, index) => <div key={index} className="bg-white rounded-lg p-4 border border-red-100">
                              <div className="flex items-start gap-2 mb-2">
                                <FileText className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                <span className="font-semibold text-red-700">{behavior.label}</span>
                              </div>
                              <p className="text-sm text-red-600 mb-2">{behavior.lawDetail}</p>
                              <div className="bg-red-50 rounded p-3 mb-3">
                                <p className="text-xs text-red-700 font-medium mb-1">法律依据：</p>
                                <p className="text-xs text-red-600 leading-relaxed">{behavior.law}</p>
                              </div>
                              <div className="bg-amber-50 rounded p-3">
                                <p className="text-xs text-amber-700 font-medium mb-1">处理方法：</p>
                                <p className="text-xs text-amber-600 leading-relaxed whitespace-pre-line">{behavior.handlingMethod}</p>
                              </div>
                            </div>)}
                        </div>
                        <div className="mt-4 pt-4 border-t border-red-200">
                          <p className="text-sm text-red-700 font-medium mb-2">建议采取以下措施：</p>
                          <ul className="text-sm text-red-600 space-y-1 list-disc list-inside">
                            <li>保留所有违法催收的证据（通话录音、短信截图等）</li>
                            <li>向监管部门投诉（银保监会、地方金融监管局）</li>
                            <li>如情节严重，可向公安机关报案</li>
                            <li>咨询专业律师，了解维权途径</li>
                          </ul>
                        </div>
                      </div>}

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <Button onClick={() => {
                  setCurrentStep(0);
                  setAnswers({});
                  setRiskLevel(null);
                }} variant="outline" className="flex-1">
                        重新评估
                      </Button>
                      <Button onClick={() => navigateTo({
                  pageId: 'solutions',
                  params: {
                    riskLevel: riskLevel.level
                  }
                })} className="flex-1 bg-[#1E3A5F] hover:bg-[#0F2744]">
                        查看应对方案
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </>;
          })()}
            </Card>
          </>}
      </main>
    </div>;
}