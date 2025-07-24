import React, { useState } from 'react';
import { Button, Input } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeScreenProps {
  onNext: () => void;
  onSkillsGenerated: (skills: string[]) => void;
  skills: string[];
}

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface SkillCard {
  id: number;
  emoji: string;
  title: string;
  description: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext, onSkillsGenerated, skills }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: '你好，我是你的AI导师。准备好一起探索你独特的价值了吗？',
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'ai',
      content: '让我们从一个问题开始：你对什么事情充满热情，即使没有报酬也愿意去做？',
      timestamp: new Date()
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkills, setShowSkills] = useState(false);
  const [generatedSkills, setGeneratedSkills] = useState<SkillCard[]>([]);

  const questions = [
    '你对什么事情充满热情，即使没有报酬也愿意去做？',
    '朋友或同事通常会因为什么事来寻求你的帮助？',
    '在过去的项目或工作中，你最引以为豪的成就是什么？',
    '别人经常夸奖你哪方面的能力？'
  ];

  const mockSkills: SkillCard[] = [
    {
      id: 1,
      emoji: '🎮',
      title: '游戏策略大师',
      description: '擅长分析复杂局面，并制定最优获胜路线。'
    },
    {
      id: 2,
      emoji: '📝',
      title: 'PPT 视觉化专家',
      description: '能将复杂的信息转化为清晰、有吸引力的演示。'
    },
    {
      id: 3,
      emoji: '❤️',
      title: '超强共情能力',
      description: '能够深度理解他人情感，提供温暖的支持。'
    },
    {
      id: 4,
      emoji: '🎬',
      title: '视频剪辑能手',
      description: '擅长用镜头语言讲述动人的故事。'
    }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // 模拟AI回复
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        const aiMessage: Message = {
          id: messages.length + 2,
          type: 'ai',
          content: questions[currentStep + 1],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setCurrentStep(prev => prev + 1);
      } else {
        // 最后一个问题回答后，显示技能总结
        const summaryMessage: Message = {
          id: messages.length + 2,
          type: 'ai',
          content: '根据我们的对话，我发现了一些你身上闪光的技能点！',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, summaryMessage]);
        
        // 延迟显示技能卡片
        setTimeout(() => {
          setShowSkills(true);
          setGeneratedSkills(mockSkills);
          onSkillsGenerated(mockSkills.map(skill => skill.title));
        }, 1000);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">技能发现之旅</h2>
        <p className="text-sm text-gray-500 mt-1">让我们一起探索你的独特价值</p>
      </div>

      {/* 聊天区域 */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-start space-x-3 max-w-2xl">
              {message.type === 'ai' && (
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  AI
                </div>
              )}
              <div className={`chat-bubble ${message.type === 'ai' ? 'ai-bubble' : 'user-bubble'}`}>
                {message.content}
              </div>
            </div>
          </motion.div>
        ))}

        {/* 技能卡片展示 */}
        <AnimatePresence>
          {showSkills && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {generatedSkills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.2 }}
                    className="skill-card"
                  >
                    <div className="text-2xl mb-2">{skill.emoji}</div>
                    <h3 className="font-semibold text-gray-800 mb-1">{skill.title}</h3>
                    <p className="text-sm text-gray-600">{skill.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="text-center mt-6"
              >
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
                  <p className="text-gray-600">每一个技能，都是你独一无二的宝藏。✨</p>
                </div>
                <Button 
                  className="primary-button"
                  onClick={onNext}
                >
                  下一步：探索它们的商业价值
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 输入区域 */}
      {!showSkills && (
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex space-x-3">
            <Input
              placeholder="请在这里输入你的想法..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              variant="bordered"
            />
            <Button 
              className="primary-button"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              发送
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;