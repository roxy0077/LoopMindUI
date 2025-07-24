import React, { useState } from 'react';
import { Button, Checkbox } from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';

interface ValueMappingScreenProps {
  skills: string[];
  onNext: () => void;
  onSkillsSelected: (skills: string[]) => void;
  onBack: () => void;
}

interface BusinessOpportunity {
  id: number;
  title: string;
  description: string;
}

const ValueMappingScreen: React.FC<ValueMappingScreenProps> = ({ 
  skills, 
  onNext, 
  onSkillsSelected, 
  onBack 
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [businessOpportunities, setBusinessOpportunities] = useState<BusinessOpportunity[]>([]);
  const [showResults, setShowResults] = useState(false);

  const skillsData = [
    { emoji: '🎮', title: '游戏策略大师' },
    { emoji: '📝', title: 'PPT 视觉化专家' },
    { emoji: '❤️', title: '超强共情能力' },
    { emoji: '🎬', title: '视频剪辑能手' }
  ];

  const mockOpportunities: { [key: string]: BusinessOpportunity[] } = {
    '游戏策略大师': [
      { id: 1, title: '游戏陪练与高端教学', description: '为游戏玩家提供专业的策略指导和技能提升服务' },
      { id: 2, title: '撰写游戏攻略或视频脚本', description: '创作高质量的游戏内容，帮助玩家提升游戏体验' },
      { id: 3, title: '新游戏产品的用户体验测试员', description: '为游戏公司提供专业的测试和优化建议' }
    ],
    'PPT 视觉化专家': [
      { id: 4, title: '商业计划书美化服务', description: '帮助创业者制作专业的投资演示文稿' },
      { id: 5, title: '企业培训课件设计', description: '为企业提供高质量的培训材料设计服务' },
      { id: 6, title: '学术论文可视化', description: '帮助研究者将复杂数据转化为清晰的图表' }
    ],
    '超强共情能力': [
      { id: 7, title: '心理咨询与情感支持', description: '提供专业的心理健康服务和情感疏导' },
      { id: 8, title: '用户体验研究顾问', description: '帮助企业深度理解用户需求和痛点' },
      { id: 9, title: '团队沟通培训师', description: '提升团队协作和沟通效率的专业培训' }
    ],
    '视频剪辑能手': [
      { id: 10, title: '短视频内容创作', description: '为品牌和个人创作吸引人的短视频内容' },
      { id: 11, title: '婚礼纪录片制作', description: '制作温馨感人的婚礼回忆视频' },
      { id: 12, title: '企业宣传片制作', description: '帮助企业制作专业的品牌宣传视频' }
    ]
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => {
      const newSelected = prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill];
      return newSelected;
    });
  };

  const handleAnalyze = async () => {
    if (selectedSkills.length === 0) return;

    setIsAnalyzing(true);
    
    // 模拟分析过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 获取选中技能对应的商业机会
    const opportunities: BusinessOpportunity[] = [];
    selectedSkills.forEach(skill => {
      if (mockOpportunities[skill]) {
        opportunities.push(...mockOpportunities[skill]);
      }
    });
    
    setBusinessOpportunities(opportunities);
    setShowResults(true);
    setIsAnalyzing(false);
    onSkillsSelected(selectedSkills);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4">
              <Button
                variant="light"
                onClick={onBack}
                className="text-gray-600"
              >
                ← 返回
              </Button>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">步骤 2/3: 探索商业价值</h2>
                <p className="text-sm text-gray-500 mt-1">选择你感兴趣的技能，发现商业机会</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {/* 技能选择区域 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              请选择你感兴趣的技能 (可多选)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {skillsData.map((skill) => (
                <motion.div
                  key={skill.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`skill-card cursor-pointer transition-all duration-200 ${
                    selectedSkills.includes(skill.title) 
                      ? 'ring-2 ring-primary-500 bg-primary-50' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => handleSkillToggle(skill.title)}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      isSelected={selectedSkills.includes(skill.title)}
                      onChange={() => handleSkillToggle(skill.title)}
                      color="primary"
                    />
                    <div className="text-2xl">{skill.emoji}</div>
                    <div className="font-medium text-gray-800">{skill.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 分析按钮 */}
            <div className="text-center">
              <Button
                className={`primary-button ${selectedSkills.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleAnalyze}
                disabled={selectedSkills.length === 0 || isAnalyzing}
                size="lg"
              >
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>正在扫描全球市场，为你寻找机会... 🌍</span>
                  </div>
                ) : (
                  `分析潜在商机 (${selectedSkills.length})`
                )}
              </Button>
            </div>
          </div>

          {/* 分析结果 */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    --- 分析结果 ---
                  </h3>

                  {selectedSkills.map((skill) => (
                    <div key={skill} className="mb-6">
                      <h4 className="font-medium text-gray-700 mb-3">
                        *对于 "{skill}"*
                      </h4>
                      <div className="space-y-2">
                        {mockOpportunities[skill]?.map((opportunity) => (
                          <motion.div
                            key={opportunity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between"
                          >
                            <div>
                              <h5 className="font-medium text-gray-800">{opportunity.title}</h5>
                              <p className="text-sm text-gray-600 mt-1">{opportunity.description}</p>
                            </div>
                            <div className="text-gray-400">
                              →
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* 下一步按钮 */}
                  <div className="text-center mt-8">
                    <Button
                      className="primary-button"
                      onClick={onNext}
                      size="lg"
                    >
                      下一步：制定行动蓝图
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ValueMappingScreen;