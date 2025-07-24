import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { ChatAPIService } from '../services/chatAPI';

interface WelcomeScreenProps {
  onNext: () => void;
  onSkillsGenerated: (skills: string[]) => void;
  skills: string[];
}

interface Question {
  id: number;
  question: string;
  options: {
    value: string;
    label: string;
  }[];
}

interface Answer {
  questionId: number;
  question: string;
  selectedOption: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext, onSkillsGenerated, skills }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showIntro, setShowIntro] = useState(true);
  const [showConclusion, setShowConclusion] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: '哪种活动最能让你感到充实感和成就感？',
      options: [
        { value: 'A', label: '帮助别人解决问题' },
        { value: 'B', label: '完成一项有创造性的作品' },
        { value: 'C', label: '学习并掌握一个全新技能' },
        { value: 'D', label: '组织一次高效的团队协作' }
      ]
    },
    {
      id: 2,
      question: '如果你可以选择一种方式度过一个自由的下午，你会选择？',
      options: [
        { value: 'A', label: '阅读一本书或听播客' },
        { value: 'B', label: '写下你的想法或创作点子' },
        { value: 'C', label: '和朋友聊天、参与讨论' },
        { value: 'D', label: '去尝试一个从没做过的新事物' }
      ]
    },
    {
      id: 3,
      question: '朋友最常因为哪种事情来请教你？',
      options: [
        { value: 'A', label: '心理支持或情感建议' },
        { value: 'B', label: '写作或表达上的建议' },
        { value: 'C', label: '技术类问题或工具推荐' },
        { value: 'D', label: '如何做决定或安排计划' }
      ]
    },
    {
      id: 4,
      question: '哪种任务让你最容易进入"心流状态"？',
      options: [
        { value: 'A', label: '深度研究某个感兴趣的主题' },
        { value: 'B', label: '创造新的东西（设计、写作、视频等）' },
        { value: 'C', label: '教别人知识或做演示' },
        { value: 'D', label: '做计划、整理信息或复盘总结' }
      ]
    },
    {
      id: 5,
      question: '哪种评价听起来最像别人对你的印象？',
      options: [
        { value: 'A', label: '"你总能想到别人想不到的点"' },
        { value: 'B', label: '"你是我们这群人中最会照顾人的"' },
        { value: 'C', label: '"和你聊天总能获得启发"' },
        { value: 'D', label: '"你太会规划了，安排得明明白白"' }
      ]
    },
    {
      id: 6,
      question: '面对一个陌生但有趣的领域，你会怎么做？',
      options: [
        { value: 'A', label: '马上查资料、上手试一试' },
        { value: 'B', label: '找人聊聊，看看他们怎么看' },
        { value: 'C', label: '给自己设个小目标挑战一下' },
        { value: 'D', label: '把它拆解成步骤，做一个探索计划' }
      ]
    },
    {
      id: 7,
      question: '哪一种状态最符合你觉得"活着真好"的时刻？',
      options: [
        { value: 'A', label: '和喜欢的人一起做喜欢的事' },
        { value: 'B', label: '完成一个原本以为做不到的挑战' },
        { value: 'C', label: '有人因为你的建议变得更好' },
        { value: 'D', label: '把一个混乱的局面理清楚了' }
      ]
    },
    {
      id: 8,
      question: '你最希望自己的哪一方面被别人看到？',
      options: [
        { value: 'A', label: '洞察力和思考力' },
        { value: 'B', label: '情感上的理解力和陪伴感' },
        { value: 'C', label: '好奇心和快速学习能力' },
        { value: 'D', label: '行动力和执行力' }
      ]
    },
    {
      id: 9,
      question: '你最容易坚持下去的事情是？',
      options: [
        { value: 'A', label: '有人一起做、有交流反馈的事' },
        { value: 'B', label: '能让你表达内心想法的事情' },
        { value: 'C', label: '能持续挑战、升级难度的事情' },
        { value: 'D', label: '有明确目标和可见进展的事情' }
      ]
    },
    {
      id: 10,
      question: '你觉得哪种"工作状态"最吸引你？',
      options: [
        { value: 'A', label: '不断学习新技能、探索新方向' },
        { value: 'B', label: '把创意想法落地成具体成果' },
        { value: 'C', label: '成为某个领域里值得信赖的人' },
        { value: 'D', label: '和一群志同道合的人一起把事做好' }
      ]
    }
  ];

  const handleStartQuestions = () => {
    setShowIntro(false);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (!selectedOption) return;

    const currentQuestion = questions[currentQuestionIndex];
    const selectedOptionLabel = currentQuestion.options.find(opt => opt.value === selectedOption)?.label || '';
    
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedOption: `${selectedOption}: ${selectedOptionLabel}`
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption('');
    } else {
      // 所有问题完成，显示结束语
      const jsonOutput = JSON.stringify(updatedAnswers, null, 2);
      console.log('=== 用户答案输出 ===');
      console.log(jsonOutput);
      console.log('=== 输出结束 ===');
      
      // 下载 JSON 文件
      downloadAnswersAsJSON(updatedAnswers);
      
      // 调用AI分析接口
      analyzeSkillsWithAI(updatedAnswers);
      
      setShowConclusion(true);
      // 生成模拟技能
      const mockSkills = ['沟通理解能力', '创意思维能力', '学习适应能力', '组织规划能力'];
      onSkillsGenerated(mockSkills);
    }
  };

  const downloadAnswersAsJSON = (answers: Answer[]) => {
    const dataStr = JSON.stringify(answers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `skill-assessment-answers-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const analyzeSkillsWithAI = async (answers: Answer[]) => {
    try {
      const chatAPI = ChatAPIService.getInstance();
      const query = chatAPI.formatSkillAssessmentQuery(answers);
      
      console.log('\n' + '='.repeat(50));
      console.log('🤖 正在调用AI分析接口...');
      console.log('='.repeat(50));
      
      const result = await chatAPI.sendMessage(query);
      
      if (result.success) {
        console.log('\n' + '='.repeat(50));
        console.log('✅ AI分析成功完成！');
        console.log('🆔 Conversation ID:', result.conversation_id);
        console.log('='.repeat(50) + '\n');
      } else {
        console.error('\n' + '='.repeat(50));
        console.error('❌ AI分析失败:', result.error);
        console.error('='.repeat(50) + '\n');
      }
    } catch (error) {
      console.error('\n' + '='.repeat(50));
      console.error('❌ 调用AI分析接口失败:', error);
      console.error('='.repeat(50) + '\n');
    }
  };

  const handleFinish = () => {
    onNext();
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-gray-100 p-4 gap-4">
      {/* 头部 */}
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200/50 px-6 py-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">技能发现之旅</h2>
        <p className="text-sm text-gray-500 mt-1">让我们一起探索你的独特价值</p>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-y-auto px-6 py-6 bg-gradient-to-b from-white/70 to-gray-50/50 backdrop-blur-sm rounded-xl border border-gray-200/40 shadow-inner">
        {/* 引导语 */}
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-200/50 shadow-sm">
              <div className="text-center space-y-4">
                <div className="text-3xl">🎯</div>
                <h3 className="text-2xl font-bold text-gray-800 leading-tight">
                  发现你的热情与隐藏技能
                </h3>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>
                    想知道自己适合什么方向？我们先不谈职位，也不说简历，而是回到你自己：
                  </p>
                  <p className="font-medium">
                    你喜欢什么？你擅长什么？别人眼中的你，是怎样的？
                  </p>
                  <p>
                    以下是 <span className="font-semibold text-primary-600">10 个轻松的小问题</span>，无需深思熟虑，选出最贴近你的一项就好。
                  </p>
                </div>
                <Button 
                  className="primary-button mt-6"
                  size="lg"
                  onClick={handleStartQuestions}
                >
                  开始探索 🚀
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 选择题 */}
        {!showIntro && !showConclusion && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {/* 进度条 */}
            <div className="bg-white/80 rounded-xl p-4 shadow-sm border border-gray-200/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  题目 {currentQuestionIndex + 1} / {questions.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* 当前问题 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
                {questions[currentQuestionIndex].question}
              </h3>
              
              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleOptionSelect(option.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      selectedOption === option.value
                        ? 'border-primary-500 bg-primary-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                        selectedOption === option.value
                          ? 'border-primary-500 bg-primary-500 text-white'
                          : 'border-gray-300 text-gray-500'
                      }`}>
                        {option.value}
                      </div>
                      <span className="text-gray-700 font-medium">
                        {option.label}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  className="primary-button"
                  onClick={handleNextQuestion}
                  disabled={!selectedOption}
                  size="lg"
                >
                  {currentQuestionIndex === questions.length - 1 ? '完成' : '下一题'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 结束语 */}
        {showConclusion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200/50 shadow-sm">
              <div className="text-center space-y-4">
                <div className="text-3xl">✅</div>
                <h3 className="text-2xl font-bold text-gray-800 leading-tight">
                  你的画像已经初步生成。
                </h3>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>
                    你刚才的选择，已经帮我们描绘出一个更清晰的你。
                  </p>
                  <p className="font-medium">
                    接下来，我们会带你一起探索"你可以走的路"，看看你现在的技能和偏好如何转化为未来的方向。
                  </p>
                </div>
                <Button 
                  className="primary-button mt-6"
                  size="lg"
                  onClick={handleFinish}
                >
                  探索你的商业价值 🔍
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;