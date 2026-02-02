// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, Scale, BookOpen, Search, ChevronRight, ExternalLink } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Card, Input } from '@/components/ui';

export default function Knowledge(props) {
  const {
    toast
  } = useToast();
  const {
    navigateTo,
    navigateBack
  } = props.$w.utils;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = [{
    id: 'all',
    name: '全部'
  }, {
    id: 'law',
    name: '法律法规'
  }, {
    id: 'regulation',
    name: '监管政策'
  }, {
    id: 'rights',
    name: '权益保护'
  }, {
    id: 'case',
    name: '典型案例'
  }];
  const knowledgeItems = [{
    id: 1,
    title: '民法典关于债务的规定',
    category: 'law',
    summary: '了解民法典中关于借款合同、利息、违约责任等相关规定',
    content: `《中华人民共和国民法典》第六百六十七条至第六百八十一条对借款合同作出了明确规定：

1. 借款合同是借款人向贷款人借款，到期返还借款并支付利息的合同。

2. 借款的利息不得预先在本金中扣除。利息预先在本金中扣除的，应当按照实际借款数额返还借款并计算利息。

3. 借款人应当按照约定的期限返还借款。对借款期限没有约定或者约定不明确，借款人可以随时返还；贷款人可以催告借款人在合理期限内返还。

4. 借款人未按照约定的期限返还借款的，应当按照约定或者国家有关规定支付逾期利息。`,
    tags: ['民法典', '借款合同', '利息']
  }, {
    id: 2,
    title: '民间借贷利率上限',
    category: 'law',
    summary: '最高人民法院关于民间借贷利率司法保护上限的规定',
    content: `根据最高人民法院《关于审理民间借贷案件适用法律若干问题的规定》：

1. 民间借贷利率的司法保护上限为LPR的4倍。

2. 超过LPR4倍的利息部分，法院不予支持。

3. 借贷双方约定的利率未超过年利率24%，出借人请求借款人按照约定的利率支付利息的，人民法院应予支持。

4. 借贷双方约定的利率超过年利率36%，超过部分的利息约定无效。`,
    tags: ['利率', '民间借贷', '最高法']
  }, {
    id: 3,
    title: '个人信息保护法',
    category: 'rights',
    summary: '了解个人信息保护法对债务催收中个人信息使用的限制',
    content: `《中华人民共和国个人信息保护法》规定：

1. 处理个人信息应当遵循合法、正当、必要和诚信原则。

2. 不得通过误导、欺诈、胁迫等方式处理个人信息。

3. 个人信息处理者不得公开其处理的个人信息。

4. 债务催收过程中，不得向无关第三方泄露债务人的个人信息。`,
    tags: ['个人信息', '隐私保护', '催收']
  }, {
    id: 4,
    title: '禁止暴力催收规定',
    category: 'regulation',
    summary: '银保监会关于规范金融机构催收行为的规定',
    content: `中国银保监会《关于进一步规范商业银行互联网贷款业务的通知》规定：

1. 金融机构应当规范催收行为，不得采用暴力、恐吓、侮辱、诽谤、骚扰等不当催收方式。

2. 不得向债务人的亲属、朋友、同事等无关第三方透露债务信息。

3. 催收人员应当出示工作证件，表明身份。

4. 催收时间应当合理，不得在夜间或法定休息时间进行催收。`,
    tags: ['催收', '银保监会', '规范']
  }, {
    id: 5,
    title: '消费者权益保护法',
    category: 'rights',
    summary: '消费者在金融消费中的合法权益',
    content: `《中华人民共和国消费者权益保护法》规定：

1. 消费者享有知情权、选择权、公平交易权、求偿权等合法权益。

2. 经营者不得采用格式条款、通知、声明等方式，作出排除或者限制消费者权利的规定。

3. 消费者在购买、使用商品或者接受服务时，其合法权益受到损害的，可以向经营者要求赔偿。`,
    tags: ['消费者权益', '金融消费', '赔偿']
  }, {
    id: 6,
    title: '非法催收的法律责任',
    category: 'case',
    summary: '非法催收行为可能承担的法律责任',
    content: `非法催收行为可能承担以下法律责任：

1. 民事责任：赔偿损失、赔礼道歉等。

2. 行政责任：罚款、责令停业整顿等。

3. 刑事责任：构成犯罪的，依法追究刑事责任，如寻衅滋事罪、非法拘禁罪、侵犯公民个人信息罪等。

典型案例：某催收公司采用暴力、威胁手段催收债务，被法院以寻衅滋事罪判处有期徒刑。`,
    tags: ['法律责任', '刑事责任', '案例']
  }, {
    id: 7,
    title: '债务重组与协商',
    category: 'regulation',
    summary: '金融机构债务重组的相关政策和程序',
    content: `金融机构债务重组政策要点：

1. 对于暂时困难但有还款意愿的借款人，金融机构可以提供债务重组服务。

2. 债务重组方式包括：延期还款、减免利息、分期还款等。

3. 借款人需要提供真实的财务状况证明。

4. 债务重组协议应当以书面形式签订，明确双方权利义务。`,
    tags: ['债务重组', '协商', '政策']
  }, {
    id: 8,
    title: '诉讼时效规定',
    category: 'law',
    summary: '债务纠纷的诉讼时效及相关规定',
    content: `《中华人民共和国民法典》关于诉讼时效的规定：

1. 向人民法院请求保护民事权利的诉讼时效期间为三年。

2. 诉讼时效期间自权利人知道或者应当知道权利受到损害以及义务人之日起计算。

3. 诉讼时效期间届满的，义务人可以提出不履行义务的抗辩。

4. 在诉讼时效期间的最后六个月内，因不可抗力等障碍不能行使请求权的，诉讼时效中止。`,
    tags: ['诉讼时效', '民法典', '抗辩']
  }];
  const filteredItems = knowledgeItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.summary.toLowerCase().includes(searchQuery.toLowerCase()) || item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  const getCategoryName = categoryId => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };
  const getCategoryColor = categoryId => {
    switch (categoryId) {
      case 'law':
        return 'bg-blue-100 text-blue-700';
      case 'regulation':
        return 'bg-purple-100 text-purple-700';
      case 'rights':
        return 'bg-green-100 text-green-700';
      case 'case':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-slate-100 text-slate-700';
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
            <Scale className="w-8 h-8 text-[#F59E0B]" />
            <span className="text-xl font-bold font-['Space_Grotesk']">法律知识库</span>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* Search Bar */}
        <Card className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <Input placeholder="搜索法律知识、法规、案例..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-12 h-12" />
            </div>
          </div>
        </Card>

        {/* Category Filter */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map(category => <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${selectedCategory === category.id ? 'bg-[#1E3A5F] text-white' : 'bg-white text-[#64748B] hover:bg-slate-50'}`}>
              {category.name}
            </button>)}
        </div>

        {/* Knowledge Grid */}
        <div className="grid grid-cols-2 gap-6">
          {filteredItems.map(item => <Card key={item.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                  {getCategoryName(item.category)}
                </span>
                <BookOpen className="w-5 h-5 text-[#64748B]" />
              </div>
              <h3 className="text-lg font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                {item.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map(tag => <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                    {tag}
                  </span>)}
              </div>
              <Button variant="outline" className="w-full group" onClick={() => {
            toast({
              title: item.title,
              description: item.content.substring(0, 100) + '...'
            });
          }}>
                查看详情
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>)}
        </div>

        {filteredItems.length === 0 && <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
            <p className="text-[#64748B]">未找到相关内容</p>
          </div>}
      </main>
    </div>;
}