
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, MapPin, RefreshCw, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const MarketPrices = () => {
  const [selectedMandi, setSelectedMandi] = useState('जयपुर');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const { toast } = useToast();

  const mandis = ['जयपुर', 'अलवर', 'भरतपुर', 'उदयपुर', 'कोटा'];

  const marketData = [
    {
      crop: 'गेहूं',
      emoji: '🌾',
      currentPrice: 2150,
      previousPrice: 2100,
      unit: 'क्विंटल',
      trend: 'up',
      change: 50,
      quality: 'FAQ (अच्छी)',
      advice: 'भाव बढ़ रहा है, बेचने का अच्छा समय'
    },
    {
      crop: 'धान',
      emoji: '🌾',
      currentPrice: 1950,
      previousPrice: 1980,
      unit: 'क्विंटल',
      trend: 'down',
      change: -30,
      quality: 'सामान्य',
      advice: 'थोड़ा इंतजार करें, भाव सुधर सकता है'
    },
    {
      crop: 'सरसों',
      emoji: '🌻',
      currentPrice: 5200,
      previousPrice: 5200,
      unit: 'क्विंटल',
      trend: 'stable',
      change: 0,
      quality: 'उत्तम',
      advice: 'स्थिर भाव, मौका देखकर बेचें'
    },
    {
      crop: 'मक्का',
      emoji: '🌽',
      currentPrice: 1800,
      previousPrice: 1750,
      unit: 'क्विंटल',
      trend: 'up',
      change: 50,
      quality: 'FAQ',
      advice: 'मांग बढ़ी है, बेचने का समय'
    },
    {
      crop: 'चना',
      emoji: '🫘',
      currentPrice: 4800,
      previousPrice: 4900,
      unit: 'क्विंटल',
      trend: 'down',
      change: -100,
      quality: 'बोल्ड',
      advice: 'कुछ दिन रुकें, भाव सुधर सकता है'
    },
    {
      crop: 'प्याज',
      emoji: '🧅',
      currentPrice: 2500,
      previousPrice: 2200,
      unit: 'क्विंटल',
      trend: 'up',
      change: 300,
      quality: 'मध्यम',
      advice: 'अच्छी मांग, तुरंत बेच सकते हैं'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50 border-green-200';
      case 'down': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const refreshPrices = () => {
    setLastUpdated(new Date());
    toast({
      title: "🔄 भाव अपडेट हो गया",
      description: "नवीनतम मंडी भाव लोड किया गया",
    });
  };

  const setAlert = (crop: string) => {
    toast({
      title: "🔔 अलर्ट सेट हो गया",
      description: `${crop} के भाव में बदलाव पर सूचना मिलेगी`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📈 आज के मंडी भाव</h2>
        <p className="text-gray-600">लाइव बाजार दरें और ट्रेंड</p>
      </div>

      {/* Mandi Selection & Refresh */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-600" />
          <select 
            value={selectedMandi}
            onChange={(e) => setSelectedMandi(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {mandis.map(mandi => (
              <option key={mandi} value={mandi}>{mandi} मंडी</option>
            ))}
          </select>
        </div>
        
        <Button variant="outline" size="sm" onClick={refreshPrices}>
          <RefreshCw className="h-4 w-4 mr-1" />
          रिफ्रेश
        </Button>
      </div>

      {/* Last Updated */}
      <div className="text-center text-sm text-gray-500">
        अंतिम अपडेट: {lastUpdated.toLocaleTimeString('hi-IN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </div>

      {/* Market Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-green-600">12</div>
            <div className="text-xs text-gray-600">भाव बढ़े</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-red-600">8</div>
            <div className="text-xs text-gray-600">भाव गिरे</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-gray-600">5</div>
            <div className="text-xs text-gray-600">स्थिर</div>
          </CardContent>
        </Card>
      </div>

      {/* Price Cards */}
      <div className="space-y-3">
        {marketData.map((item, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{item.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.crop}</h3>
                    <p className="text-xs text-gray-500">{item.quality}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">
                    ₹{item.currentPrice.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">प्रति {item.unit}</div>
                </div>
              </div>

              {/* Trend and Change */}
              <div className="flex justify-between items-center mb-3">
                <div className={`flex items-center px-2 py-1 rounded-full text-xs border ${getTrendColor(item.trend)}`}>
                  {getTrendIcon(item.trend)}
                  <span className="ml-1">
                    {item.change > 0 ? '+' : ''}{item.change}
                  </span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setAlert(item.crop)}
                  className="h-8 px-3"
                >
                  <Bell className="h-3 w-3 mr-1" />
                  अलर्ट
                </Button>
              </div>

              {/* Advice */}
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  💡 <strong>सुझाव:</strong> {item.advice}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-purple-800">📊 बाजार की खबर</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-start">
            <span className="text-sm mr-2">🌾</span>
            <p className="text-sm text-purple-700">रबी फसल की कटाई से मंडी में आवक बढ़ेगी</p>
          </div>
          <div className="flex items-start">
            <span className="text-sm mr-2">🚛</span>
            <p className="text-sm text-purple-700">ट्रांसपोर्ट हड़ताल के कारण भाव में तेजी</p>
          </div>
          <div className="flex items-start">
            <span className="text-sm mr-2">🌧️</span>
            <p className="text-sm text-purple-700">अगले हफ्ते बारिश की संभावना, भंडारण का ध्यान रखें</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-12">
          📱 व्यापारी से संपर्क करें
        </Button>
        <Button variant="outline" className="h-12">
          🚚 ट्रांसपोर्ट बुक करें
        </Button>
      </div>
    </div>
  );
};

export default MarketPrices;
