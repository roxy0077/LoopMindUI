import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaTimes, FaChevronDown } from 'react-icons/fa';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: '我们是做什么的？',
      answer: 'SkillCycle AI（循思）是一款基于AI的个性化职业发展工具，帮助用户发现自身技能的商业潜力，进而生成行动蓝图，实现技能变现。'
    },
    {
      id: 2,
      question: '我需要准备什么才能使用这个工具？',
      answer: '不需要提前准备任何简历或资料。你只需回答我们设计的10道轻松选择题，系统会自动识别你的潜在技能和特质。'
    },
    {
      id: 3,
      question: 'AI 是如何帮我找到适合的变现方向的？',
      answer: 'AI会根据你选择的技能，结合当前市场数据和知识库，生成3-5个具体的商业化建议，如“线上教学”、“社群陪伴服务”、“技能包设计”等。'
    },
    {
      id: 4,
      question: 'SkillCycle 是否会替我决定职业方向？',
      answer: '不会。AI会推荐最佳路径，但最终选择权在你手里。我们的目标是用AI帮助你缩小选择范围，降低探索的心理负担。'
    },
    {
      id: 5,
      question: 'SkillCycle 提供的是一次性建议还是持续陪伴？',
      answer: '目前版本聚焦于冷启动和初步方向建议，但最终目标是成为你“可持续使用”的职业教练，提供阶段性反馈与行动提醒。'
    },
    {
      id: 6,
      question: 'SkillCycle 适合哪些人使用？',
      answer: '本工具特别适合两类人：一是18-30岁、渴望探索非传统职业路径的年轻人；二是希望发展副业或转型的职场人士。'
    }
  ];

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setExpandedItems(new Set());
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <>
      {/* FAQ按钮 */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Button
          isIconOnly
          className="w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          radius="full"
          onClick={toggleFAQ}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaQuestionCircle className="w-5 h-5" />
            )}
          </motion.div>
        </Button>
      </motion.div>

      {/* FAQ面板 */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-6 w-96 max-h-96 bg-white rounded-2xl shadow-2xl border border-gray-200/50 z-40 overflow-hidden backdrop-blur-sm"
        >
          {/* 头部 */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-secondary-50">
            <h3 className="text-lg font-semibold text-gray-800">常见问题</h3>
            <p className="text-sm text-gray-600 mt-1">点击问题查看详细解答</p>
          </div>

          {/* 问题列表 */}
          <div className="max-h-80 overflow-y-auto">
            <div className="p-4 space-y-2">
              {faqItems.map((item, index) => {
                const isExpanded = expandedItems.has(item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    {/* 问题 */}
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
                    >
                      <span className="text-sm font-medium text-gray-800 pr-2">
                        {item.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-400 group-hover:text-gray-600 flex-shrink-0"
                      >
                        <FaChevronDown className="w-3 h-3" />
                      </motion.div>
                    </button>

                    {/* 答案 */}
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-3 pt-1 bg-gray-50/50">
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 底部 */}
          <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50">
            <p className="text-xs text-gray-500 text-center">
              还有其他问题？欢迎联系我们
            </p>
          </div>
        </motion.div>
      )}

      {/* 背景遮罩 */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={toggleFAQ}
        />
      )}
    </>
  );
};

export default FAQButton;
