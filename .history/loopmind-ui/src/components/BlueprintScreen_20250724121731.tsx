import React, { useState } from 'react';
import { Button, Checkbox } from '@heroui/react';
import { motion } from 'framer-motion';

interface BlueprintScreenProps {
  selectedSkills: string[];
  onBack: () => void;
}

interface ActionItem {
  id: number;
  text: string;
  completed: boolean;
}

const BlueprintScreen: React.FC<BlueprintScreenProps> = ({ selectedSkills, onBack }) => {
  const [actionItems, setActionItems] = useState<ActionItem[]>([
    { id: 1, text: '注册一个专业的小红书账号', completed: false },
    { id: 2, text: '制作并上传3个PPT美化前后的对比图', completed: false },
    { id: 3, text: '发布第一篇笔记，标题"3个技巧让你的PPT看起来价值百万"', completed: false }
  ]);

  const handleToggleAction = (id: number) => {
    setActionItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleSavePlan = () => {
    alert('计划已保存到你的个人档案！');
  };

  const handleExportPDF = () => {
    alert('PDF导出功能开发中...');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="light"
            onClick={onBack}
            className="text-gray-600"
          >
            ← 返回
          </Button>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">你的行动蓝图</h2>
            <p className="text-sm text-gray-500 mt-1">将想法转化为具体的行动计划</p>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 商业方向标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                商业计划书美化服务
              </h3>
              <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </div>
          </motion.div>

          {/* 问题解决 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
              <span className="text-2xl mr-3">🎯</span>
              它解决了什么问题?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              帮助早期创业者、学生将优秀的创意通过精美的PPT呈现给投资者或评委，
              解决"有好想法但做不好看"的痛点。
            </p>
          </motion.div>

          {/* 目标用户 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
              <span className="text-2xl mr-3">👤</span>
              你的第一批用户是谁?
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                正在参加创业大赛的大学生
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                寻求种子轮融资的独立开发者
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                需要制作项目报告的职场新人
              </li>
            </ul>
          </motion.div>

          {/* 价值主张 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
              <span className="text-2xl mr-3">✨</span>
              你的价值主张 (一句话)
            </h4>
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 border-l-4 border-primary-500">
              <p className="text-lg font-medium text-gray-800 italic">
                "让我用专业的PPT设计，点亮你的绝佳创意。"
              </p>
            </div>
          </motion.div>

          {/* 启动平台 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
              <span className="text-2xl mr-3">🚀</span>
              在哪里开始? (启动平台)
            </h4>
            <div className="bg-red-50 rounded-lg p-4 border border-red-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                  小
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">小红书</h5>
                  <p className="text-sm text-gray-600">
                    原因: 用户乐于为"变美"和"效率"付费，社区氛围好
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 行动清单 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <span className="text-2xl mr-3">🛠️</span>
              "破冰"三步曲 (现在就做!)
            </h4>
            <div className="space-y-3">
              {actionItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                    item.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Checkbox
                    isSelected={item.completed}
                    onChange={() => handleToggleAction(item.id)}
                    color="success"
                  />
                  <span className={`flex-1 ${
                    item.completed 
                      ? 'text-green-700 line-through' 
                      : 'text-gray-700'
                  }`}>
                    步骤{item.id}: {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 操作按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center space-x-4 pb-8"
          >
            <Button
              className="secondary-button"
              onClick={handleSavePlan}
            >
              保存到我的计划
            </Button>
            <Button
              className="primary-button"
              onClick={handleExportPDF}
            >
              导出为PDF
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlueprintScreen;