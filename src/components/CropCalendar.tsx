
import React, { useState } from 'react';
import { Calendar, Clock, Droplets, Scissors, Leaf, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const CropCalendar = () => {
  const [selectedCrop, setSelectedCrop] = useState('गेहूं');
  const [currentWeek, setCurrentWeek] = useState(0);
  const { toast } = useToast();

  const crops = ['गेहूं', 'धान', 'मक्का', 'सरसों', 'चना', 'प्याज'];

  const calendarData = {
    'गेहूं': [
      {
        week: 'सप्ताह 1-2',
        stage: 'बुआई',
        tasks: [
          { task: 'खेत की तैयारी', icon: '🚜', status: 'completed', date: '15 नवंबर' },
          { task: 'बीज बुआई', icon: '🌱', status: 'completed', date: '20 नवंबर' },
          { task: 'पहली सिंचाई', icon: '💧', status: 'pending', date: '25 नवंबर' }
        ]
      },
      {
        week: 'सप्ताह 3-4',
        stage: 'अंकुरण',
        tasks: [
          { task: 'खरपतवार नियंत्रण', icon: '🌿', status: 'upcoming', date: '5 दिसंबर' },
          { task: 'यूरिया डालें', icon: '🥄', status: 'upcoming', date: '8 दिसंबर' },
          { task: 'दूसरी सिंचाई', icon: '💧', status: 'upcoming', date: '12 दिसंबर' }
        ]
      },
      {
        week: 'सप्ताह 5-8',
        stage: 'वृद्धि काल',
        tasks: [
          { task: 'कीट नियंत्रण', icon: '🐛', status: 'upcoming', date: '20 दिसंबर' },
          { task: 'NPK खाद', icon: '🧪', status: 'upcoming', date: '25 दिसंबर' },
          { task: 'तीसरी सिंचाई', icon: '💧', status: 'upcoming', date: '2 जनवरी' }
        ]
      },
      {
        week: 'सप्ताह 12-14',
        stage: 'कटाई',
        tasks: [
          { task: 'फसल कटाई', icon: '🔪', status: 'future', date: '15 मार्च' },
          { task: 'सुखाना', icon: '☀️', status: 'future', date: '20 मार्च' },
          { task: 'भंडारण', icon: '🏠', status: 'future', date: '25 मार्च' }
        ]
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '✅ पूरा';
      case 'pending': return '⏳ बाकी';
      case 'upcoming': return '📅 आगामी';
      default: return '🔮 भविष्य';
    }
  };

  const markAsCompleted = (taskName: string) => {
    toast({
      title: "✅ काम पूरा हुआ",
      description: `${taskName} को पूरा का निशान लगा दिया गया`,
    });
  };

  const setReminder = (taskName: string, date: string) => {
    toast({
      title: "🔔 रिमाइंडर सेट हो गया",
      description: `${date} को ${taskName} की याद दिलाई जाएगी`,
    });
  };

  const currentCalendar = calendarData[selectedCrop] || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📅 फसल कैलेंडर</h2>
        <p className="text-gray-600">समय पर करें सभी काम</p>
      </div>

      {/* Crop Selection */}
      <div className="flex items-center space-x-2 overflow-x-auto">
        <Calendar className="h-5 w-5 text-gray-600 flex-shrink-0" />
        <div className="flex space-x-2">
          {crops.map(crop => (
            <Button
              key={crop}
              variant={selectedCrop === crop ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCrop(crop)}
              className="whitespace-nowrap"
            >
              {crop}
            </Button>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">5</div>
              <div className="text-xs text-gray-600">पूरे काम</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">2</div>
              <div className="text-xs text-gray-600">बाकी काम</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">8</div>
              <div className="text-xs text-gray-600">आगामी</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Timeline */}
      <div className="space-y-4">
        {currentCalendar.map((period, index) => (
          <Card key={index} className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div>
                  <span className="text-lg">{period.stage}</span>
                  <span className="text-sm text-gray-500 ml-2">({period.week})</span>
                </div>
                <Clock className="h-5 w-5 text-purple-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {period.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className={`p-3 rounded-lg border ${getStatusColor(task.status)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{task.icon}</span>
                      <div>
                        <h4 className="font-medium">{task.task}</h4>
                        <p className="text-xs opacity-75">{task.date}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                      {getStatusText(task.status)}
                    </span>
                  </div>
                  
                  {task.status === 'pending' && (
                    <div className="flex space-x-2 mt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs h-8"
                        onClick={() => markAsCompleted(task.task)}
                      >
                        ✅ पूरा हुआ
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs h-8"
                        onClick={() => setReminder(task.task, task.date)}
                      >
                        🔔 याद दिलाएं
                      </Button>
                    </div>
                  )}
                  
                  {task.status === 'upcoming' && (
                    <div className="mt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs h-8"
                        onClick={() => setReminder(task.task, task.date)}
                      >
                        🔔 रिमाइंडर सेट करें
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Custom Task */}
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="p-4 text-center">
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            अपना काम जोड़ें
          </Button>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-amber-800 mb-2">💡 फसल कैलेंडर टिप्स:</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• मौसम देखकर काम का समय तय करें</li>
            <li>• हर काम को समय पर करने से अच्छी पैदावार मिलती है</li>
            <li>• रिमाइंडर लगाकर कोई काम न भूलें</li>
            <li>• स्थानीय कृषि विशेषज्ञ से सलाह लें</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropCalendar;
