'use client';

import React, { useState } from 'react';
import TodoListTab from './TodoListTab';
import OperationalSection from './OperationalSection';
import TeamSection from './TeamSection';
import VisionBox from './VisionBox';
import MissionBox from './MissionBox';
import CommunicationSection from './CommunicationSection';
import UnstakeTab from './UnstakeTab';
import ContractsTab from './ContractsTab';

type TabId = 'todo' | 'operations' | 'contracts' | 'team' | 'vision' | 'communications' | 'unstaking';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: 'todo', label: 'Todo List', icon: '📋' },
  { id: 'operations', label: 'Operations', icon: '⚙️' },
  { id: 'contracts', label: 'Contracts', icon: '📜' },
  { id: 'team', label: 'Team', icon: '🐺' },
  { id: 'vision', label: 'Vision', icon: '✨' },
  { id: 'communications', label: 'Communications', icon: '💬' },
  { id: 'unstaking', label: 'Unstaking', icon: '🔓' },
];

const TabLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('todo');

  const renderContent = () => {
    switch (activeTab) {
      case 'todo':
        return <TodoListTab />;
      case 'operations':
        return <OperationalSection />;
      case 'contracts':
        return <ContractsTab />;
      case 'team':
        return <TeamSection />;
      case 'vision':
        return (
          <div className="w-full py-8">
            <VisionBox />
            <MissionBox />
          </div>
        );
      case 'communications':
        return <CommunicationSection />;
      case 'unstaking':
        return <UnstakeTab />;
      default:
        return <TodoListTab />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-16 sm:w-20 lg:w-64 bg-black/60 backdrop-blur-md border-r border-purple-500/30 z-50 flex flex-col">
        {/* Logo area */}
        <div className="p-3 lg:py-4 lg:px-3 border-b border-purple-500/30 overflow-hidden">
          <div className="flex flex-col items-center text-center w-full">
            <span className="text-2xl lg:text-4xl">🐺</span>
            <span className="hidden lg:block text-base font-bold text-white mt-1">Moonrunners 2.0</span>
            <span className="hidden lg:block text-[10px] text-purple-300 italic">Protect the Pack</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600/50 to-blue-600/50 text-white border border-purple-400/50'
                      : 'text-gray-300 hover:bg-purple-600/20 hover:text-white border border-transparent'
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{tab.icon}</span>
                  <span className="hidden lg:block text-sm font-medium truncate">
                    {tab.label}
                  </span>
                  {/* Active indicator for mobile */}
                  {activeTab === tab.id && (
                    <div className="lg:hidden absolute right-0 w-1 h-8 bg-purple-400 rounded-l-full" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="p-3 lg:p-4 border-t border-purple-500/30">
          <a
            href="https://discord.gg/CNg6gBCF7T"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center lg:justify-start gap-2 px-3 py-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-white transition-colors"
          >
            <span className="text-lg">💬</span>
            <span className="hidden lg:block text-sm font-medium">Join Discord</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-16 sm:ml-20 lg:ml-64">
        {/* Content with padding */}
        <div className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default TabLayout;
