// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, FileText, MessageSquare, ListChecks, ChevronRight, Copy, Check, AlertTriangle } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

export default function Solutions(props) {
  const {
    toast
  } = useToast();
  const {
    navigateTo,
    navigateBack
  } = props.$w.utils;
  const riskLevel = props.$w.page.dataset.params.riskLevel || 'medium';
  const [copiedId, setCopiedId] = useState(null);
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: '已复制到剪贴板',
      description: '话术已复制，可直接使用'
    });
    setTimeout(() => setCopiedId(null), 2000);
  };
  const negotiationScripts = [{
    id: 1,
    title: '说明当前困难',
    category: '协商话术',
    content: `您好，我目前确实遇到了一些经济困难，暂时无法按时还款。但我有还款意愿，希望能与贵方协商一个合理的还款方案。`,
    tags: ['通用', '初次沟通']
  }, {
    id: 2,
    title: '申请延期还款',
    category: '协商话术',
    content: `由于近期收入减少，我希望能申请延期3个月还款。在此期间，我会尽力筹集资金，并在延期结束后恢复正常还款。请问是否可以办理？`,
    tags: ['延期', '收入减少']
  }, {
    id: 3,
    title: '申请减免利息',
    category: '协商话术',
    content: `考虑到我的实际还款能力，希望能申请减免部分利息或罚息。我承诺会尽快偿还本金，希望贵方能给予一定支持。`,
    tags: ['减免', '利息']
  }, {
    id: 4,
    title: '分期还款方案',
    category: '协商话术',
    content: `我希望能申请分期还款，每月还款XXX元，分XX期还清。这样既能保证我按时还款，也不会影响我的基本生活。请贵方考虑这个方案。`,
    tags: ['分期', '长期']
  }, {
    id: 5,
    title: '应对催收电话',
    category: '应对话术',
    content: `我理解贵方的工作，但请保持专业沟通。我会积极处理债务问题，但请不要频繁打扰我的家人和朋友。如有需要，请通过正规渠道联系我。`,
    tags: ['催收', '第三方']
  }, {
    id: 6,
    title: '拒绝不合理要求',
    category: '应对话术',
    content: `我理解贵方的立场，但您提出的要求超出了我的实际能力范围。我愿意在合理范围内协商，但请尊重我的实际情况。`,
    tags: ['拒绝', '不合理']
  }];
  const checklists = [{
    id: 1,
    title: '协商前准备',
    items: ['整理所有债务明细（本金、利息、罚息）', '准备收入证明和财务状况说明', '制定可行的还款计划', '了解相关法律法规', '准备好录音设备（合法范围内）']
  }, {
    id: 2,
    title: '协商中注意事项',
    items: ['保持冷静和礼貌', '如实说明情况，不要夸大或隐瞒', '不要做出无法兑现的承诺', '记录协商过程和结果', '要求对方提供书面确认']
  }, {
    id: 3,
    title: '协商后跟进',
    items: ['确认协商结果并保留书面凭证', '按时履行协商约定', '定期与债权方沟通进度', '如遇问题及时联系', '保存所有还款记录']
  }];
  const communicationTips = [{
    id: 1,
    title: '沟通前准备',
    tips: ['保持冷静，不要情绪化', '准备好相关文件和证据', '明确自己的还款能力和底线', '选择合适的沟通时间', '确保通话环境安静']
  }, {
    id: 2,
    title: '沟通中要点',
    tips: ['态度诚恳，表达还款意愿', '如实说明困难情况', '不要做出无法兑现的承诺', '记录对方的承诺和要求', '要求对方提供书面确认']
  }, {
    id: 3,
    title: '沟通后跟进',
    tips: ['及时整理沟通记录', '确认协商结果并保留凭证', '按时履行约定', '定期主动联系更新情况', '如遇问题及时沟通']
  }, {
    id: 4,
    title: '避免行为',
    tips: ['不要失联或拒接电话', '不要辱骂或威胁对方', '不要提供虚假信息', '不要轻易转账给个人账户', '不要签署不明确的协议']
  }];
  const complaintInfo = [{
    id: 1,
    title: '投诉渠道',
    type: '信息型',
    content: [{
      label: '银保监会投诉热线',
      value: '12378'
    }, {
      label: '互联网金融协会',
      value: 'www.nifa.org.cn'
    }, {
      label: '消费者协会',
      value: '12315'
    }, {
      label: '公安机关',
      value: '110（紧急情况）'
    }]
  }, {
    id: 2,
    title: '可投诉行为',
    type: '条件触发',
    content: ['暴力催收、威胁恐吓', '骚扰第三方（亲友、单位）', '泄露个人信息', '虚假诉讼或伪造证据', '收取不合理费用', '超出法定利率上限']
  }, {
    id: 3,
    title: '投诉要点',
    type: '信息型',
    content: ['提供具体事实和时间', '保留相关证据（录音、截图、短信）', '说明受到的影响和损失', '提出合理的诉求', '保持客观和理性']
  }];
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
            <FileText className="w-8 h-8 text-[#F59E0B]" />
            <span className="text-xl font-bold font-['Space_Grotesk']">应对方案</span>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Risk Level Indicator */}
        <Card className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold font-['Space_Grotesk'] text-[#1E3A5F] mb-1">
                当前风险等级
              </h2>
              <p className="text-sm text-[#64748B]">
                {riskLevel === 'low' && '低风险 - 保持沟通，按时还款'}
                {riskLevel === 'medium' && '中等风险 - 主动协商，制定方案'}
                {riskLevel === 'high' && '高风险 - 寻求专业帮助，谨慎应对'}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-lg font-semibold ${riskLevel === 'low' ? 'bg-green-100 text-green-700' : riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
              {riskLevel === 'low' && '低风险'}
              {riskLevel === 'medium' && '中等风险'}
              {riskLevel === 'high' && '高风险'}
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="scripts" className="space-y-6">
          <TabsList className="bg-white p-1 rounded-lg shadow">
            <TabsTrigger value="scripts" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              话术模板
            </TabsTrigger>
            <TabsTrigger value="checklists" className="flex items-center gap-2">
              <ListChecks className="w-4 h-4" />
              清单指引
            </TabsTrigger>
            <TabsTrigger value="complaint" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              投诉信息
            </TabsTrigger>
          </TabsList>

          {/* Scripts Tab */}
          <TabsContent value="scripts">
            <div className="grid grid-cols-3 gap-6">
              {/* 话术模板区域 - 占2列 */}
              <div className="col-span-2 grid grid-cols-2 gap-6">
                {negotiationScripts.map(script => <Card key={script.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-xs font-semibold text-[#F59E0B] uppercase tracking-wider">
                          {script.category}
                        </span>
                        <h3 className="text-lg font-bold font-['Space_Grotesk'] text-[#1E3A5F] mt-1">
                          {script.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {script.tags.map(tag => <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                          {tag}
                        </span>)}
                    </div>
                    <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                      {script.content}
                    </p>
                    <Button onClick={() => handleCopy(script.content, script.id)} variant="outline" size="sm" className="w-full">
                      {copiedId === script.id ? <>
                          <Check className="w-4 h-4 mr-2" />
                          已复制
                        </> : <>
                          <Copy className="w-4 h-4 mr-2" />
                          复制话术
                        </>}
                    </Button>
                  </Card>)}
              </div>

              {/* 沟通注意事项区域 - 占1列 */}
              <div className="col-span-1 space-y-6">
                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-lg border-2 border-amber-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-['Space_Grotesk'] text-[#1E3A5F]">
                        沟通注意事项
                      </h3>
                      <p className="text-xs text-amber-600 font-semibold">
                        重要提示
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {communicationTips.map(tip => <div key={tip.id}>
                        <h4 className="text-sm font-bold text-[#1E3A5F] mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          {tip.title}
                        </h4>
                        <ul className="space-y-2">
                          {tip.tips.map((item, index) => <li key={index} className="flex items-start gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span className="text-xs text-[#64748B] leading-relaxed">{item}</span>
                            </li>)}
                        </ul>
                      </div>)}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Checklists Tab */}
          <TabsContent value="checklists">
            <div className="grid grid-cols-3 gap-6">
              {checklists.map(checklist => <Card key={checklist.id} className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-4">
                    {checklist.title}
                  </h3>
                  <ul className="space-y-3">
                    {checklist.items.map((item, index) => <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#10B981]" />
                        </div>
                        <span className="text-sm text-[#64748B] leading-relaxed">{item}</span>
                      </li>)}
                  </ul>
                </Card>)}
            </div>
          </TabsContent>

          {/* Complaint Tab */}
          <TabsContent value="complaint">
            <div className="space-y-6">
              {complaintInfo.map(info => <Card key={info.id} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${info.type === '条件触发' ? 'bg-red-100' : 'bg-blue-100'}`}>
                      <FileText className={`w-5 h-5 ${info.type === '条件触发' ? 'text-red-600' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-['Space_Grotesk'] text-[#1E3A5F]">
                        {info.title}
                      </h3>
                      <span className={`text-xs font-semibold ${info.type === '条件触发' ? 'text-red-600' : 'text-blue-600'}`}>
                        {info.type}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {info.content.map((item, index) => <div key={index} className={`p-4 rounded-lg ${info.type === '条件触发' ? 'bg-red-50 border-l-4 border-red-500' : 'bg-blue-50 border-l-4 border-blue-500'}`}>
                        {typeof item === 'string' ? <p className="text-sm text-[#64748B]">{item}</p> : <div className="flex justify-between items-center">
                            <span className="text-sm text-[#64748B]">{item.label}</span>
                            <span className="text-sm font-semibold text-[#1E3A5F]">
                              {item.value}
                            </span>
                          </div>}
                      </div>)}
                  </div>
                </Card>)}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>;
}