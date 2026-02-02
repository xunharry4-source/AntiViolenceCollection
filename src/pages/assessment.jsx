// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, AlertTriangle, Shield, CheckCircle, XCircle, ChevronRight, Plus, Scale, FileText, AlertCircle, Info } from 'lucide-react';
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
    id: 'occupation',
    title: '职业',
    description: '请选择您的职业类型',
    options: [{
      value: 'employee',
      label: '企业员工',
      risk: 1
    }, {
      value: 'freelancer',
      label: '自由职业者',
      risk: 2
    }, {
      value: 'business',
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
    id: 'contact_method',
    title: '催收方式',
    description: '催收方主要通过什么方式联系您？（可多选）',
    multiSelect: true,
    options: [{
      value: 'phone',
      label: '电话',
      risk: 1,
      illegal: false
    }, {
      value: 'sms',
      label: '短信',
      risk: 1,
      illegal: false
    }, {
      value: 'visit',
      label: '上门',
      risk: 3,
      illegal: true,
      law: '《民法典》第1032条：自然人享有隐私权。任何组织或者个人不得以刺探、侵扰、泄露、公开等方式侵害他人的隐私权。',
      lawDetail: '未经同意上门催收可能构成非法侵入住宅或侵犯隐私权',
      handlingMethod: '1. 明确拒绝上门催收，要求通过电话或书面方式沟通\n2. 如对方坚持上门，可报警处理\n3. 保留对方上门的证据（录音、录像）\n4. 向监管部门投诉其违规行为'
    }, {
      value: 'sued',
      label: '起诉',
      risk: 3,
      illegal: false
    }, {
      value: 'lawyer_letter',
      label: '律师函',
      risk: 2,
      illegal: false
    }, {
      value: 'emergency_contact',
      label: '打紧急联系人电话',
      risk: 3,
      illegal: true,
      law: '《个人信息保护法》第6条：处理个人信息应当具有明确、合理的目的，应当与处理目的直接相关，采取对个人权益影响最小的方式。',
      lawDetail: '未经授权联系紧急联系人属于侵犯个人信息权益',
      handlingMethod: '1. 明确告知对方未经授权联系紧急联系人违法\n2. 要求对方立即停止联系紧急联系人\n3. 保留通话记录和短信截图作为证据\n4. 向银保监会等监管部门投诉\n5. 如造成严重后果，可向法院起诉'
    }, {
      value: 'wechat_private',
      label: '强烈要求加微信/私下沟通',
      risk: 2,
      illegal: true,
      law: '《互联网金融逾期债务催收自律公约》第18条：催收人员不得诱导或逼迫债务人通过违法违规途径筹集资金。',
      lawDetail: '要求私下沟通可能涉及不当要求或诱导违规行为',
      handlingMethod: '1. 拒绝添加微信，坚持通过官方渠道沟通\n2. 保留对方要求私下沟通的聊天记录\n3. 警惕对方可能提出的不当要求\n4. 如对方持续骚扰，可向监管部门投诉'
    }, {
      value: 'non_working_hours',
      label: '非工时间联系',
      risk: 2,
      illegal: true,
      law: '《互联网金融逾期债务催收自律公约》第16条：催收人员应在每日8:00-22:00进行催收，不得在非工作时间进行催收。',
      lawDetail: '非工作时间（晚22:00-早8:00）催收违反行业自律规范',
      handlingMethod: '1. 明确告知对方非工作时间联系违规\n2. 要求对方只在工作时间联系\n3. 保留非工作时间联系的通话记录\n4. 向监管部门投诉其违规行为'
    }, {
      value: 'auto_robot',
      label: '自动语音与机器人外呼',
      risk: 2,
      illegal: true,
      law: '《个人信息保护法》第24条：通过自动化决策方式向个人进行信息推送、营销，应当提供不针对其个人特征的选项或提供便捷的拒绝方式。',
      lawDetail: '未经同意的自动外呼可能侵犯个人信息权益',
      handlingMethod: '1. 明确拒绝自动外呼，要求人工客服沟通\n2. 保留自动外呼的录音证据\n3. 向运营商投诉骚扰电话\n4. 向监管部门投诉其违规使用自动化催收'
    }, {
      value: 'high_frequency',
      label: '高频电话轰炸',
      risk: 3,
      illegal: true,
      law: '《治安管理处罚法》第42条：多次发送淫秽、侮辱、恐吓或者其他信息，干扰他人正常生活的，处五日以下拘留或者五百元以下罚款。',
      lawDetail: '高频骚扰电话可能构成违法行为',
      handlingMethod: '1. 保留所有骚扰电话的通话记录和录音\n2. 明确告知对方停止骚扰行为\n3. 向公安机关报案，依据《治安管理处罚法》第42条\n4. 向监管部门投诉\n5. 如造成严重精神损害，可向法院起诉索赔'
    }, {
      value: 'third_party',
      label: '第三方（亲友、单位）',
      risk: 3,
      illegal: true,
      law: '《个人信息保护法》第6条：处理个人信息应当具有明确、合理的目的，应当与处理目的直接相关。',
      lawDetail: '未经授权向第三方泄露债务信息属于侵犯个人信息权益',
      handlingMethod: '1. 明确告知对方未经授权向第三方泄露信息违法\n2. 要求对方立即停止联系第三方\n3. 保留对方联系第三方的证据\n4. 向监管部门投诉其侵犯个人信息\n5. 如造成名誉损害，可向法院起诉'
    }, {
      value: 'threat',
      label: '威胁或恐吓',
      risk: 3,
      illegal: true,
      law: '《刑法》第293条：有下列寻衅滋事行为之一，破坏社会秩序的，处五年以下有期徒刑、拘役或者管制：（二）追逐、拦截、辱骂、恐吓他人。',
      lawDetail: '威胁或恐吓可能构成寻衅滋事罪或其他违法犯罪行为',
      handlingMethod: '1. 立即保留威胁或恐吓的证据（录音、短信、聊天记录）\n2. 立即向公安机关报案，可能构成寻衅滋事罪\n3. 向监管部门投诉\n4. 咨询专业律师，了解刑事和民事维权途径\n5. 如人身安全受到威胁，立即报警并寻求保护'
    }, {
      value: 'fake_police',
      label: '冒充公检法',
      risk: 3,
      illegal: true,
      law: '《刑法》第279条：冒充国家机关工作人员招摇撞骗的，处三年以下有期徒刑、拘役、管制或者剥夺政治权利；情节严重的，处三年以上十年以下有期徒刑。',
      lawDetail: '冒充公安、检察院、法院等国家机关工作人员进行催收属于严重违法犯罪行为',
      handlingMethod: '1. 立即保留对方冒充公检法的证据（录音、短信、聊天记录）\n2. 立即向公安机关报案，可能构成招摇撞骗罪\n3. 向银保监会等监管部门投诉\n4. 咨询专业律师，了解刑事和民事维权途径\n5. 不要向对方转账或提供任何个人信息'
    }, {
      value: 'unofficial_payment',
      label: '非官方收款',
      risk: 3,
      illegal: true,
      law: '《刑法》第266条：诈骗公私财物，数额较大的，处三年以下有期徒刑、拘役或者管制，并处或者单处罚金。',
      lawDetail: '要求向非官方账户还款可能构成诈骗或非法集资',
      handlingMethod: '1. 立即停止向非官方账户转账\n2. 保留对方要求非官方收款的证据\n3. 向公安机关报案，可能构成诈骗罪\n4. 向监管部门投诉\n5. 只通过官方渠道还款'
    }, {
      value: 'third_party_outsource',
      label: '第三方外包催促',
      risk: 3,
      illegal: true,
      law: '《个人信息保护法》第21条：个人信息处理者委托处理个人信息的，应当与受托人约定委托处理的目的、期限、处理方式、个人信息的种类、保护措施以及双方的权利和义务。',
      lawDetail: '未经授权将债务信息外包给第三方催收可能侵犯个人信息权益',
      handlingMethod: '1. 明确告知对方未经授权外包催收违法\n2. 要求对方停止第三方催收行为\n3. 保留第三方催收的证据\n4. 向监管部门投诉其违规外包\n5. 如造成名誉损害，可向法院起诉'
    }, {
      value: 'frequent_change',
      label: '频繁更换号码/平台',
      risk: 3,
      illegal: true,
      law: '《互联网金融逾期债务催收自律公约》第14条：催收人员不得频繁更换联系方式或平台进行骚扰。',
      lawDetail: '频繁更换号码或平台进行催收属于逃避监管和持续骚扰行为',
      handlingMethod: '1. 保留所有不同号码和平台的催收记录\n2. 明确告知对方频繁更换联系方式违规\n3. 向监管部门投诉其逃避监管行为\n4. 如造成严重骚扰，可向公安机关报案\n5. 咨询律师，了解维权途径'
    }, {
      value: 'other',
      label: '其他',
      risk: 2,
      illegal: false
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
    // 对于催收方式问题，支持多选
    if (questionId === 'contact_method') {
      setAnswers(prev => {
        const currentAnswer = prev[questionId] || {
          value: [],
          risk: 0
        };
        const selectedValues = Array.isArray(currentAnswer.value) ? currentAnswer.value : [currentAnswer.value];
        if (selectedValues.includes(value)) {
          // 取消选择
          const newValues = selectedValues.filter(v => v !== value);
          const newRisk = newValues.length > 0 ? Math.max(...newValues.map(v => {
            const option = questions.find(q => q.id === questionId).options.find(o => o.value === v);
            return option ? option.risk : 0;
          })) : 0;
          return {
            ...prev,
            [questionId]: {
              value: newValues,
              risk: newRisk
            }
          };
        } else {
          // 添加选择
          const newValues = [...selectedValues, value];
          const newRisk = Math.max(...newValues.map(v => {
            const option = questions.find(q => q.id === questionId).options.find(o => o.value === v);
            return option ? option.risk : 0;
          }));
          return {
            ...prev,
            [questionId]: {
              value: newValues,
              risk: newRisk
            }
          };
        }
      });
    } else {
      // 其他问题保持单选
      setAnswers(prev => ({
        ...prev,
        [questionId]: {
          value,
          risk
        }
      }));
    }
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

    // 对于多选问题，检查是否至少选择了一个选项
    if (currentQuestion.id === 'contact_method') {
      const selectedValues = Array.isArray(currentAnswer.value) ? currentAnswer.value : [currentAnswer.value];
      if (selectedValues.length === 0) {
        toast({
          title: '请至少选择一个选项',
          variant: 'destructive'
        });
        return;
      }
      // 如果选择了"其他"，检查是否填写了具体内容
      if (selectedValues.includes('other') && !otherContactMethod.trim()) {
        toast({
          title: '请填写其他催收方式的具体内容',
          variant: 'destructive'
        });
        return;
      }
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

    // 检查违法的催收方式
    const illegalBehaviors = [];
    const contactMethodAnswer = answers['contact_method'];
    if (contactMethodAnswer && Array.isArray(contactMethodAnswer.value)) {
      const contactMethodQuestion = questions.find(q => q.id === 'contact_method');
      contactMethodAnswer.value.forEach(value => {
        const option = contactMethodQuestion.options.find(o => o.value === value);
        if (option && option.illegal) {
          illegalBehaviors.push({
            label: option.label,
            law: option.law,
            lawDetail: option.lawDetail,
            handlingMethod: option.handlingMethod
          });
        }
      });
    }

    // 暂时去掉保存用户选择的功能
    // TODO: 后续如需保存，可恢复调用云函数保存评估结果
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
      <header className="bg-[#1E3A5F] text-white py-3 md:py-4 px-4 md:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={navigateBack} className="flex items-center gap-2 hover:bg-white/10 px-2 md:px-3 py-2 rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">返回</span>
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" />
            <span className="text-lg md:text-xl font-bold font-['Space_Grotesk']">风险评估</span>
          </div>
          <div className="w-12 md:w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-12">
        {!riskLevel ? <>
            {/* Progress Bar */}
            <div className="mb-4 md:mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs md:text-sm text-[#64748B]">
                  问题 {currentStep + 1} / {questions.length}
                </span>
                <span className="text-xs md:text-sm font-semibold text-[#1E3A5F]">
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
            <Card className="bg-white rounded-2xl p-4 md:p-8 shadow-xl">
              <div className="mb-4 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-2 md:mb-3">
                  {questions[currentStep].title}
                </h2>
                <p className="text-xs md:text-sm text-[#64748B]">{questions[currentStep].description}</p>
              </div>

              <div className="space-y-2 md:space-y-4">
                {questions[currentStep].options.map(option => {
              const currentAnswer = answers[questions[currentStep].id];
              const isMultiSelect = questions[currentStep].id === 'contact_method';
              let isSelected;
              if (isMultiSelect) {
                const selectedValues = Array.isArray(currentAnswer?.value) ? currentAnswer.value : currentAnswer?.value ? [currentAnswer.value] : [];
                isSelected = selectedValues.includes(option.value);
              } else {
                isSelected = currentAnswer?.value === option.value;
              }
              return <button key={option.value} onClick={() => handleAnswer(questions[currentStep].id, option.value, option.risk)} className={`w-full text-left p-3 md:p-4 rounded-xl border-2 transition-all duration-300 ${isSelected ? 'border-[#1E3A5F] bg-[#1E3A5F]/5' : 'border-slate-200 hover:border-[#1E3A5F]/30 hover:bg-slate-50'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm md:text-base font-medium text-[#1E3A5F]">{option.label}</span>
                        {isSelected && <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#1E3A5F]" />}
                      </div>
                    </button>;
            })}
              </div>

              {/* 其他催收方式输入框 */}
              {questions[currentStep].id === 'contact_method' && (() => {
            const currentAnswer = answers['contact_method'];
            const selectedValues = Array.isArray(currentAnswer?.value) ? currentAnswer.value : currentAnswer?.value ? [currentAnswer.value] : [];
            if (selectedValues.includes('other')) {
              return <div className="mt-3 md:mt-4 p-3 md:p-4 bg-slate-50 rounded-xl border-2 border-[#1E3A5F]/20">
                      <label className="block text-xs md:text-sm font-medium text-[#1E3A5F] mb-2">
                        请具体说明其他催收方式
                      </label>
                      <Input value={otherContactMethod} onChange={e => setOtherContactMethod(e.target.value)} placeholder="例如：通过社交媒体联系、发送邮件等" className="w-full text-xs md:text-sm" />
                    </div>;
            }
            return null;
          })()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6 md:mt-8 gap-3">
                <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline" className="px-4 md:px-6 text-xs md:text-sm">
                  上一题
                </Button>
                <Button onClick={handleNext} className="bg-[#1E3A5F] hover:bg-[#0F2744] px-4 md:px-6 text-xs md:text-sm">
                  {currentStep === questions.length - 1 ? '查看结果' : '下一项'}
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </> : <>
            {/* Risk Result */}
            <Card className="bg-white rounded-2xl p-4 md:p-8 shadow-xl">
              {(() => {
            const riskInfo = getRiskInfo(riskLevel.level);
            const RiskIcon = riskInfo.icon;
            return <>
                    <div className="text-center mb-6 md:mb-8">
                      <div className="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center" style={{
                  backgroundColor: `${riskInfo.color}20`
                }}>
                        <RiskIcon className="w-8 h-8 md:w-12 md:h-12" style={{
                    color: riskInfo.color
                  }} />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] mb-2" style={{
                  color: riskInfo.color
                }}>
                        {riskInfo.title}
                      </h2>
                      <p className="text-xs md:text-sm text-[#64748B]">{riskInfo.description}</p>
                    </div>

                    {/* Risk Score */}
                    <div className="bg-slate-50 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs md:text-sm text-[#64748B]">风险评分</span>
                        <span className="text-xl md:text-2xl font-bold font-['Space_Grotesk'] text-[#1E3A5F]">
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
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-lg md:text-xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-3 md:mb-4">
                        建议措施
                      </h3>
                      <div className="space-y-2 md:space-y-3">
                        {riskInfo.suggestions.map((suggestion, index) => <div key={index} className="flex items-start gap-2 md:gap-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                      backgroundColor: `${riskInfo.color}20`
                    }}>
                              <span className="text-xs font-bold" style={{
                        color: riskInfo.color
                      }}>
                                {index + 1}
                              </span>
                            </div>
                            <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">{suggestion}</p>
                          </div>)}
                      </div>
                    </div>

                    {/* Legal Warning - 如果有违法行为 */}
                    {riskLevel.illegalBehaviors && riskLevel.illegalBehaviors.length > 0 && <div className="mb-6 md:mb-8 bg-red-50 border-2 border-red-200 rounded-xl p-4 md:p-6">
                        <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
                          <Scale className="w-5 h-5 md:w-6 md:h-6 text-red-600 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-red-700 mb-2">
                              检测到可能的违法催收行为
                            </h3>
                            <p className="text-xs md:text-sm text-red-600 mb-3 md:mb-4">
                              根据您提供的信息，检测到 {riskLevel.illegalBehaviors.length} 种可能违反相关法律法规的催收方式，请注意保护自身权益。
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                          {riskLevel.illegalBehaviors.map((behavior, index) => <div key={index} className="bg-white rounded-lg p-3 md:p-4 border border-red-100">
                              <div className="flex items-start gap-2">
                                <FileText className="w-3 h-3 md:w-4 md:h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm md:text-base font-semibold text-red-700">{behavior.label}</span>
                              </div>
                            </div>)}
                        </div>
                        <Button onClick={() => navigateTo({
                  pageId: 'illegal-collection',
                  params: {
                    illegalBehaviors: encodeURIComponent(JSON.stringify(riskLevel.illegalBehaviors))
                  }
                })} className="w-full bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm">
                          查看违法催收行为详情
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                        </Button>
                      </div>}

                    {/* Risk Warning Card - 债务清算/协商代理风险提示 */}
                    <div className="mb-6 md:mb-8 bg-amber-50 border-2 border-amber-200 rounded-xl p-4 md:p-6">
                      <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
                        <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-amber-700 mb-2">
                            风险提示｜关于"债务清算/债务协商代理"的常见风险
                          </h3>
                          <p className="text-xs md:text-sm text-amber-600 mb-3 md:mb-4">
                            请注意：目前市场上存在以"债务清算""债务优化""停息挂账代理"等名义提供服务的机构或个人，其中部分存在较高风险。
                          </p>
                        </div>
                      </div>
                      <Button onClick={() => navigateTo({
                  pageId: 'risk-warning'
                })} className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs md:text-sm">
                          查看风险提示详情
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                        </Button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 md:gap-4">
                      <Button onClick={() => {
                  setCurrentStep(0);
                  setAnswers({});
                  setRiskLevel(null);
                }} variant="outline" className="flex-1 text-xs md:text-sm">
                        重新评估
                      </Button>
                      <Button onClick={() => navigateTo({
                  pageId: 'solutions',
                  params: {
                    riskLevel: riskLevel.level
                  }
                })} className="flex-1 bg-[#1E3A5F] hover:bg-[#0F2744] text-xs md:text-sm">
                        查看应对方案
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                      </Button>
                    </div>
                  </>;
          })()}
            </Card>
          </>}
      </main>
    </div>;
}