import React, { useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import ValueMappingScreen from './components/ValueMappingScreen';
import BlueprintScreen from './components/BlueprintScreen';
import './App.css';

export type Screen = 'welcome' | 'valueMapping' | 'blueprint';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleSkillsGenerated = (generatedSkills: string[]) => {
    setSkills(generatedSkills);
  };

  const handleSkillsSelected = (selected: string[]) => {
    setSelectedSkills(selected);
  };

  return (
    <NextUIProvider>
      <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 gap-4">
        <Sidebar currentScreen={currentScreen} onNavigate={navigateToScreen} />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full rounded-2xl bg-white shadow-xl border border-gray-200/50 overflow-hidden backdrop-blur-sm">
            {currentScreen === 'welcome' && (
              <WelcomeScreen 
                onNext={() => navigateToScreen('valueMapping')}
                onSkillsGenerated={handleSkillsGenerated}
                skills={skills}
              />
            )}
            
            {currentScreen === 'valueMapping' && (
              <ValueMappingScreen 
                skills={skills}
                onNext={() => navigateToScreen('blueprint')}
                onSkillsSelected={handleSkillsSelected}
                onBack={() => navigateToScreen('welcome')}
              />
            )}
            
            {currentScreen === 'blueprint' && (
              <BlueprintScreen 
                selectedSkills={selectedSkills}
                onBack={() => navigateToScreen('valueMapping')}
              />
            )}
          </div>
        </main>
      </div>
    </NextUIProvider>
  );
}

export default App;