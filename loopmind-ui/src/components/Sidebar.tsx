import React, { useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, Input } from '@nextui-org/react';
import { Screen } from '../App';
import { FaBullseye, FaGem, FaRocket, FaUser } from 'react-icons/fa';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const conversations = [
    { id: 1, title: '技能发现之旅', date: '今天' },
    { id: 2, title: '商业价值探索', date: '昨天' },
    { id: 3, title: '创业想法分析', date: '3天前' },
  ];

  return (
    <div className="w-64 bg-white rounded-2xl shadow-lg border border-gray-200/50 flex flex-col h-full overflow-hidden backdrop-blur-sm">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-800">循思 AI</h1>
        <p className="text-sm text-gray-500 mt-1">你的AI导师</p>
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
        </div>
      </div>

      {/* 历史对话 */}
      <div className="flex-1 px-4 overflow-y-auto">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          历史对话
        </h3>
        <div className="space-y-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="text-sm font-medium text-gray-800 truncate">
                {conv.title}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {conv.date}
              </div>
            </div>
          ))}
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