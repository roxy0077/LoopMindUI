import React, { useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, Input } from '@nextui-org/react';
import { Screen } from '../App';
import { FaBullseye, FaGem, FaRocket, FaUser, FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight, FaFlask } from 'react-icons/fa';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  completedScreens: Set<Screen>;
}

interface ConversationItem {
  id: number;
  title: string;
  date: string;
  isExpanded?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate, completedScreens }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [expandedConversations, setExpandedConversations] = useState<Set<number>>(new Set());
  
  const conversations: ConversationItem[] = [
    { id: 1, title: '技能发现之旅', date: '今天' },
    { id: 2, title: '商业价值探索', date: '昨天' },
    { id: 3, title: '创业想法分析', date: '3天前' },
  ];

  // 根据当前步骤计算进度百分比
  const getProgressPercentage = () => {
    switch (currentScreen) {
      case 'welcome':
        return 33.33; // 1/3
      case 'valueMapping':
        return 66.66; // 2/3
      case 'blueprint':
        return 100; // 3/3
      default:
        return 0;
    }
  };

  // 根据当前步骤获取进度颜色
  const getProgressColor = () => {
    switch (currentScreen) {
      case 'welcome':
        return 'text-green-300'; // 浅绿色
      case 'valueMapping':
        return 'text-green-500'; // 中绿色
      case 'blueprint':
        return 'text-green-600'; // 深绿色
      default:
        return 'text-gray-300'; // 灰色
    }
  };

  // 切换对话展开状态
  const toggleConversation = (id: number) => {
    setExpandedConversations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // 圆形进度条组件
  const CircularProgress = () => {
    const percentage = getProgressPercentage();
    const circumference = 2 * Math.PI * 8; // radius = 8
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-6 h-6 flex items-center justify-center">
        <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 20 20">
          {/* 背景圆环 */}
          <circle
            cx="10"
            cy="10"
            r="8"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            className="text-gray-200"
          />
          {/* 进度圆环 */}
          <circle
            cx="10"
            cy="10"
            r="8"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={getProgressColor()}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.3s ease-in-out'
            }}
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="w-64 bg-white rounded-2xl shadow-lg border border-gray-200/50 flex flex-col h-full overflow-hidden backdrop-blur-sm">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">循思 AI</h1>
            <p className="text-sm text-gray-500 mt-1">你的AI导师</p>
          </div>
          <CircularProgress />
        </div>
      </div>

      {/* 新对话按钮 */}
      <div className="p-4">
        <Button 
          className="w-full primary-button"
          onClick={() => onNavigate('welcome')}
        >
          + 新的探索
        </Button>
      </div>

      {/* 导航菜单 */}
      <div className="px-4 mb-4">
        <div className="space-y-2">
          <button
            onClick={() => onNavigate('welcome')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              currentScreen === 'welcome' 
                ? 'bg-primary-50 text-primary-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaBullseye className="inline w-4 h-4 mr-2" />技能发现
          </button>
          <button
            onClick={() => onNavigate('valueMapping')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              currentScreen === 'valueMapping' 
                ? 'bg-primary-50 text-primary-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaGem className="inline w-4 h-4 mr-2" />价值映射
          </button>
          <button
            onClick={() => onNavigate('blueprint')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              currentScreen === 'blueprint' 
                ? 'bg-primary-50 text-primary-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaRocket className="inline w-4 h-4 mr-2" />行动蓝图
          </button>
          <button
            onClick={() => onNavigate('apiTest')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              currentScreen === 'apiTest' 
                ? 'bg-primary-50 text-primary-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaFlask className="inline w-4 h-4 mr-2" />API测试
          </button>
        </div>
      </div>

      {/* 历史对话 */}
      <div className="flex-1 px-4 overflow-y-auto">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          历史对话
        </h3>
        <div className="space-y-1">
          {conversations.map((conv) => {
            const isExpanded = expandedConversations.has(conv.id);
            return (
              <div key={conv.id} className="space-y-1">
                {/* 主对话项 */}
                <div
                  onClick={() => toggleConversation(conv.id)}
                  className="flex items-center p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    {isExpanded ? (
                      <FaFolderOpen className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                    ) : (
                      <FaFolder className="w-3.5 h-3.5 text-yellow-600 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 truncate">
                        {conv.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {conv.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isExpanded ? (
                      <FaChevronDown className="w-3 h-3 text-gray-400" />
                    ) : (
                      <FaChevronRight className="w-3 h-3 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {/* 子项目 */}
                {isExpanded && (
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                      <FaBullseye className="w-3 h-3 mr-2 text-blue-500" />
                      技能发现
                    </div>
                    <div className="flex items-center px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                      <FaGem className="w-3 h-3 mr-2 text-purple-500" />
                      价值映射
                    </div>
                    <div className="flex items-center px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                      <FaRocket className="w-3 h-3 mr-2 text-orange-500" />
                      行动蓝图
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 登录按钮 */}
      <div className="p-4 border-t border-gray-100">
        <Button 
          className="w-full mb-3"
          variant="bordered"
          startContent={<FaUser className="w-4 h-4" />}
          onClick={() => setIsLoginOpen(true)}
        >
          登录
        </Button>
        <div className="text-xs text-gray-500 text-center">
          循思 AI v1.0
        </div>
      </div>
      
      {/* 登录弹窗 */}
      <Modal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">登录到循思 AI</ModalHeader>
          <ModalBody className="pb-6">
            <Input
              label="邮箱"
              placeholder="请输入邮箱"
              value={email}
              onValueChange={setEmail}
              className="mb-4"
            />
            <Input
              label="密码"
              placeholder="请输入密码"
              type="password"
              value={password}
              onValueChange={setPassword}
              className="mb-4"
            />
            <Button 
              color="primary" 
              className="w-full"
              onClick={() => {
                // 这里可以添加登录逻辑
                console.log('登录:', email, password);
                setIsLoginOpen(false);
              }}
            >
              登录
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Sidebar;