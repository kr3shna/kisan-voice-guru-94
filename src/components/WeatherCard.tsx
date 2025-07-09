
import React from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WeatherCard = () => {
  const weatherData = {
    current: {
      temp: 28,
      condition: 'sunny',
      humidity: 65,
      windSpeed: 12,
      description: 'साफ मौसम'
    },
    forecast: [
      { day: 'आज', temp: '28°', condition: 'sunny', icon: '☀️' },
      { day: 'कल', temp: '26°', condition: 'cloudy', icon: '☁️' },
      { day: 'परसों', temp: '24°', condition: 'rainy', icon: '🌧️' },
    ],
    alerts: [
      {
        type: 'warning',
        message: 'कल बारिश की संभावना - छिड़काव आज ही करें',
        icon: '⚠️'
      }
    ]
  };

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'cloudy': return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'rainy': return <CloudRain className="h-6 w-6 text-blue-500" />;
      default: return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          {getConditionIcon(weatherData.current.condition)}
          <span className="ml-2">🌤️ आज का मौसम</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-3xl font-bold text-gray-800">
              {weatherData.current.temp}°C
            </div>
            <div className="text-sm text-gray-600">
              {weatherData.current.description}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Droplets className="h-4 w-4 text-blue-500 mr-1" />
              <span>{weatherData.current.humidity}%</span>
            </div>
            <div className="flex items-center">
              <Wind className="h-4 w-4 text-gray-500 mr-1" />
              <span>{weatherData.current.windSpeed} km/h</span>
            </div>
          </div>
        </div>

        {/* 3-Day Forecast */}
        <div className="grid grid-cols-3 gap-2">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">{day.day}</div>
              <div className="text-lg mb-1">{day.icon}</div>
              <div className="text-sm font-medium">{day.temp}</div>
            </div>
          ))}
        </div>

        {/* Weather Alert */}
        {weatherData.alerts.map((alert, index) => (
          <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
            <div className="flex items-start">
              <span className="text-lg mr-2">{alert.icon}</span>
              <p className="text-sm text-yellow-800">{alert.message}</p>
            </div>
          </div>
        ))}

        {/* Farming Tips */}
        <div className="bg-green-50 rounded-lg p-3">
          <h4 className="font-semibold text-green-800 mb-1">🌱 मौसम के अनुसार सलाह:</h4>
          <p className="text-sm text-green-700">
            आज धूप अच्छी है। छिड़काव और बीज उपचार के लिए सही समय है।
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
