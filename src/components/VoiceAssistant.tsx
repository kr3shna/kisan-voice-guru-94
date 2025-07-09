
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, X, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface VoiceAssistantProps {
  isActive: boolean;
  onClose: () => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isActive, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Sample farming responses
  const farmingResponses = {
    'मौसम': 'आज का मौसम साफ है, तापमान 28°C। कल हल्की बारिश की संभावना है। आज छिड़काव कर सकते हैं।',
    'भाव': 'आज गेहूं का भाव ₹2,150 प्रति क्विंटल है। कल से ₹50 बढ़ा है। बेचने का अच्छा समय है।',
    'खाद': 'इस समय यूरिया खाद डालने का सही समय है। 50 किलो प्रति एकड़ सुबह के समय डालें।',
    'बीमारी': 'पत्तियों पर धब्बे दिख रहे हैं? तस्वीर लेकर रोग जांच सेक्शन में जाएं। मैं पूरी जानकारी दूंगा।',
    'योजना': 'PM-KISAN योजना के तहत ₹6000 सालाना मिलते हैं। आपका अगला पैसा 15 जनवरी को आएगा।'
  };

  const getResponse = (text: string) => {
    const lowerText = text.toLowerCase();
    for (const [key, value] of Object.entries(farmingResponses)) {
      if (lowerText.includes(key)) {
        return value;
      }
    }
    return 'मैं आपकी मदद करने के लिए यहाँ हूँ। कृपया फसल, मौसम, मंडी भाव, या योजनाओं के बारे में पूछें।';
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    
    // Simulate voice recognition
    setTimeout(() => {
      const sampleQuestions = [
        'आज का मौसम कैसा है?',
        'गेहूं का भाव क्या है?',
        'कब खाद डालना चाहिए?',
        'PM-KISAN की जानकारी चाहिए'
      ];
      const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
      setTranscript(randomQuestion);
      setIsListening(false);
      processQuery(randomQuestion);
    }, 3000);
  };

  const processQuery = (query: string) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const aiResponse = getResponse(query);
      setResponse(aiResponse);
      setIsProcessing(false);
      
      // Simulate text-to-speech
      toast({
        title: "🔊 उत्तर बोला जा रहा है",
        description: "आवाज़ में सुनने के लिए प्रतीक्षा करें...",
      });
    }, 2000);
  };

  const speakResponse = () => {
    toast({
      title: "🔊 दोबारा सुनाया जा रहा है",
      description: response.slice(0, 50) + "...",
    });
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-green-800 flex items-center">
              🤖 किसान AI सहायक
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Voice Animation */}
          <div className="text-center mb-6">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all ${
              isListening ? 'bg-red-100 animate-pulse' : 'bg-green-100'
            }`}>
              {isListening ? (
                <Mic className="h-8 w-8 text-red-600" />
              ) : (
                <MicOff className="h-8 w-8 text-green-600" />
              )}
            </div>
            
            <p className="mt-3 text-sm text-gray-600">
              {isListening ? '🎤 सुन रहा हूँ...' : 
               isProcessing ? '🧠 सोच रहा हूँ...' : 
               '🗣️ अपना सवाल पूछें'}
            </p>
          </div>

          {/* Transcript */}
          {transcript && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">आपका सवाल:</p>
              <p className="font-medium text-blue-800">{transcript}</p>
            </div>
          )}

          {/* Response */}
          {response && (
            <div className="mb-4 p-3 bg-green-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-gray-600">किसान AI का जवाब:</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={speakResponse}
                  className="p-1 h-auto"
                >
                  <Volume2 className="h-4 w-4 text-green-600" />
                </Button>
              </div>
              <p className="text-green-800">{response}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={startListening}
              disabled={isListening || isProcessing}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isListening ? (
                <>
                  <Mic className="mr-2 h-4 w-4 animate-pulse" />
                  सुन रहा हूँ...
                </>
              ) : isProcessing ? (
                'जवाब तैयार कर रहा हूँ...'
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" />
                  बोलना शुरू करें
                </>
              )}
            </Button>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => processQuery('आज का मौसम कैसा है?')}
              >
                🌤️ मौसम
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => processQuery('गेहूं का भाव क्या है?')}
              >
                💰 भाव
              </Button>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-xs text-yellow-800">
              💡 <strong>सुझाव:</strong> मौसम, मंडी भाव, फसल की बीमारी, सरकारी योजना के बारे में पूछें
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAssistant;
