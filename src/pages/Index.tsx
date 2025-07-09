
import React, { useState } from 'react';
import { Mic, Camera, TrendingUp, Calendar, Cloud, Bell, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VoiceAssistant from '../components/VoiceAssistant';
import CropDiagnosis from '../components/CropDiagnosis';
import MarketPrices from '../components/MarketPrices';
import WeatherCard from '../components/WeatherCard';
import CropCalendar from '../components/CropCalendar';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const { toast } = useToast();

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      toast({
        title: "🎤 आवाज़ सहायक सक्रिय",
        description: "अपना सवाल पूछें...",
      });
    }
  };

  const navigationItems = [
    { id: 'home', label: 'होम', icon: Menu, color: 'bg-green-600' },
    { id: 'diagnosis', label: 'रोग निदान', icon: Camera, color: 'bg-orange-600' },
    { id: 'market', label: 'मंडी भाव', icon: TrendingUp, color: 'bg-blue-600' },
    { id: 'calendar', label: 'कैलेंडर', icon: Calendar, color: 'bg-purple-600' },
    { id: 'profile', label: 'प्रोफाइल', icon: User, color: 'bg-gray-600' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'diagnosis':
        return <CropDiagnosis />;
      case 'market':
        return <MarketPrices />;
      case 'calendar':
        return <CropCalendar />;
      case 'profile':
        return <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">प्रोफाइल सेटिंग्स</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>;
      default:
        return (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">🌾 नमस्ते किसान जी!</h1>
              <p className="text-green-100 mb-4">आज आपकी खेती में कैसे मदद कर सकते हैं?</p>
              <Button 
                onClick={handleVoiceToggle}
                className="bg-white text-green-700 hover:bg-green-50 font-semibold px-6 py-3"
              >
                <Mic className="mr-2 h-5 w-5" />
                किसान से पूछें
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setActiveSection('diagnosis')}>
                <CardContent className="p-4 text-center">
                  <Camera className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">🔍 फसल जांच</h3>
                  <p className="text-sm text-gray-600">तस्वीर लेकर रोग पहचानें</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setActiveSection('market')}>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">📈 मंडी भाव</h3>
                  <p className="text-sm text-gray-600">आज के दाम देखें</p>
                </CardContent>
              </Card>
            </div>

            {/* Weather Card */}
            <WeatherCard />

            {/* Today's Reminders */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Bell className="mr-2 h-5 w-5 text-purple-500" />
                  आज के काम
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-lg mr-3">🌱</span>
                  <div>
                    <p className="font-medium">खाद डालने का समय</p>
                    <p className="text-sm text-gray-600">सुबह 6 बजे तक</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-lg mr-3">💧</span>
                  <div>
                    <p className="font-medium">सिंचाई का समय</p>
                    <p className="text-sm text-gray-600">शाम 5 बजे</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-amber-800">💡 आज की सलाह</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700">कल बारिश की संभावना है। कीटनाशक का छिड़काव आज ही कर लें।</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl">🌾</span>
            <h1 className="ml-2 text-xl font-bold text-green-800">किसान AI</h1>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Cloud className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        <div className="max-w-md mx-auto p-4">
          {renderActiveSection()}
        </div>
      </main>

      {/* Voice Assistant Overlay */}
      {isVoiceActive && (
        <VoiceAssistant 
          isActive={isVoiceActive} 
          onClose={() => setIsVoiceActive(false)} 
        />
      )}

      {/* Floating Voice Button */}
      <div className="fixed bottom-24 right-4 z-50">
        <Button
          size="lg"
          onClick={handleVoiceToggle}
          className={`rounded-full w-16 h-16 shadow-lg transition-all ${
            isVoiceActive 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          <Mic className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex justify-around py-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Index;
