import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { FaGamepad, FaPaintBrush, FaCode, FaMicrophone, FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const ValueMappingScreen: React.FC<ValueMappingScreenProps> = ({ 
  skills, 
  onNext, 
  onSkillsSelected, 
  onBack 
}) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null);
  const [showQuestion, setShowQuestion] = useState(true);

  // Kahoot风格的商业机会选项 - 使用柔和的颜色
  const businessOpportunities: BusinessOpportunity[] = [
    {
      id: 1,
      title: '游戏内容创作',
      description: '利用游戏技能创建教育内容、攻略视频或游戏评测',
      icon: <FaGamepad className="w-16 h-16" />,
      color: 'text-white',
      bgColor: 'bg-red-400'
    },
    {
      id: 2,
      title: '创意设计服务',
      description: '提供品牌设计、UI/UX设计或插画服务',
      icon: <FaPaintBrush className="w-16 h-16" />,
      color: 'text-white',
      bgColor: 'bg-blue-400'
    },
    {
      id: 3,
      title: '技术咨询',
      description: '为企业提供技术解决方案和数字化转型咨询',
      icon: <FaCode className="w-16 h-16" />,
      color: 'text-white',
      bgColor: 'bg-yellow-400'
    },
    {
      id: 4,
      title: '在线教育',
      description: '开设在线课程，分享专业知识和技能',
      icon: <FaMicrophone className="w-16 h-16" />,
      color: 'text-white',
      bgColor: 'bg-green-400'
    }
  ];

  const handleOptionSelect = (opportunityId: number) => {
    setSelectedOpportunity(opportunityId);
    // 模拟选择后的处理
    setTimeout(() => {
      const selected = businessOpportunities.find(op => op.id === opportunityId);
      onSkillsSelected([selected?.title || '']);
      onNext();
    }, 1500);
  };

  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden rounded-2xl">
      {/* Dynamic Island 风格悬浮标题 */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-black/90 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl border border-white/10"
        >
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              startContent={<FaArrowLeft className="w-3 h-3" />}
              onClick={onBack}
              className="text-white hover:bg-white/10 rounded-full min-w-0 px-2 py-1 text-xs"
              size="sm"
            >
              返回
            </Button>
            
            <div className="text-center">
              <h1 className="text-sm font-bold text-white leading-tight">
                基于你的技能
              </h1>
              <p className="text-white/70 text-xs leading-tight">
                你最想探索哪个商业方向？
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Kahoot风格的四分屏选项 - 全屏 */}
      <div className="h-full grid grid-cols-2 grid-rows-2">
        {businessOpportunities.map((opportunity, index) => (
          <motion.div
            key={opportunity.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <button
              onClick={() => handleOptionSelect(opportunity.id)}
              className={`
                w-full h-full ${opportunity.bgColor}
                transition-all duration-300 
                hover:brightness-110 active:scale-95
                ${selectedOpportunity === opportunity.id ? 'brightness-125 ring-8 ring-white/50' : ''}
                flex flex-col items-center justify-center text-center
                group cursor-pointer border-2 border-white/20
                relative overflow-hidden
              `}
            >
              {/* 背景装饰图案 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-32 h-32 rounded-full border-8 border-white/20"></div>
                <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full border-4 border-white/20"></div>
                <div className="absolute top-1/2 right-8 w-16 h-16 rounded-full border-4 border-white/20"></div>
              </div>
              
              {/* 内容 */}
              <div className="relative z-10 p-8 flex flex-col items-center justify-center h-full">
                <div className={`${opportunity.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {opportunity.icon}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {opportunity.title}
                </h3>
                
                <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-xs">
                  {opportunity.description}
                </p>
              </div>

              {/* 选择反馈动画 */}
              {selectedOpportunity === opportunity.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 bg-white/20 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
                  />
                </motion.div>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* 进度指示器 - Dynamic Island 风格 */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="bg-black/90 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl border border-white/10"
        >
          <div className="text-white/90 text-sm font-medium flex items-center space-x-2">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
            <span>选择一个选项继续</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ValueMappingScreen;