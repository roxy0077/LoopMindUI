import React from 'react';
import { Button } from '@heroui/react';
import { Screen } from '../App';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate }) => {
  const conversations = [
    { id: 1, title: '技能发现之旅', date: '今天' },
    { id: 2, title: '商业价值探索', date: '昨天' },
    { id: 3, title: '创业想法分析', date: '3天前' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
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
            🎯 技能发现
          </button>
          <button
            onClick={() => onNavigate('valueMapping')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              currentScreen === 'valueMapping' 
                ? 'bg-primary-50 text-primary-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            💎 价值映射
          </button>
          <button
            onClick={() => onNavigate('blueprint')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              currentScreen === 'blueprint' 
                ? 'bg-primary-50 text-primary-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            🚀 行动蓝图
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

      {/* 底部信息 */}
      <div className="p-4 border-t border-gray-100">
        <div className="text-xs text-gray-500 text-center">
          循思 AI v1.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;