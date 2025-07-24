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
      question: '这个工具是免费的吗？',
      answer: '是的，循思AI目前完全免费使用。我们希望帮助更多人发现自己的价值和潜力。'
    },
    {
      id: 2,
      question: '我的数据会被保存吗？',
      answer: '我们非常重视您的隐私。所有对话数据仅在本地存储，不会上传到服务器。您可以随时清除本地数据。'
    },
    {
      id: 3,
      question: '如何重新开始一个新的探索？',
      answer: '点击侧边栏的"+ 新的探索"按钮即可开始新的技能发现之旅。之前的对话会保存在历史记录中。'
    },
    {
      id: 4,
      question: '生成的商业计划靠谱吗？',
      answer: 'AI生成的建议仅供参考，请结合您的实际情况进行判断和调整。我们建议在实施前咨询相关专业人士。'
    },
    {
      id: 5,
      question: '可以导出我的行动计划吗？',
      answer: '在行动蓝图页面，您可以保存计划到个人档案，PDF导出功能正在开发中，敬请期待。'
    },
    {
      id: 6,
      question: '如何联系客服或提供反馈？',
      answer: '如果您有任何问题或建议，欢迎通过邮箱 support@loopmind.ai 联系我们，我们会尽快回复。'
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