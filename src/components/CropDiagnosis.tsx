
import React, { useState } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const CropDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const { toast } = useToast();

  // Sample diagnosis data
  const sampleDiagnoses = [
    {
      disease: 'पत्ती का धब्बा रोग (Leaf Spot)',
      severity: 'मध्यम',
      confidence: 85,
      description: 'यह एक फंगल संक्रमण है जो नमी के कारण होता है।',
      treatment: {
        organic: 'नीम का तेल 2% घोल का छिड़काव करें',
        chemical: 'मैंकोजेब 75% WP - 2 ग्राम प्रति लीटर पानी',
        prevention: 'अच्छी जल निकासी और हवा का संचार बनाए रखें'
      },
      urgency: 'medium'
    },
    {
      disease: 'पीला पत्ता वायरस (Yellow Leaf Virus)',
      severity: 'गंभीर',
      confidence: 92,
      description: 'यह वायरल संक्रमण सफेद मक्खी के कारण फैलता है।',
      treatment: {
        organic: 'प्रभावित पौधों को हटा दें, नीम की खली डालें',
        chemical: 'इमिडाक्लोप्रिड का छिड़काव करें',
        prevention: 'रोग प्रतिरोधी बीज का उपयोग करें'
      },
      urgency: 'high'
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeCrop();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCrop = () => {
    setIsAnalyzing(true);
    setDiagnosis(null);

    // Simulate AI analysis
    setTimeout(() => {
      const randomDiagnosis = sampleDiagnoses[Math.floor(Math.random() * sampleDiagnoses.length)];
      setDiagnosis(randomDiagnosis);
      setIsAnalyzing(false);
      
      toast({
        title: "🔍 विश्लेषण पूरा",
        description: `${randomDiagnosis.disease} की पहचान हुई है`,
      });
    }, 3000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'high': return '🚨 तुरंत इलाज करें';
      case 'medium': return '⚠️ जल्दी इलाज करें';
      default: return '✅ सामान्य देखभाल';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🔍 फसल रोग निदान</h2>
        <p className="text-gray-600">तस्वीर लेकर अपनी फसल की जांच करें</p>
      </div>

      {/* Upload Section */}
      <Card className="border-2 border-dashed border-orange-300">
        <CardContent className="p-6">
          {!selectedImage ? (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <Camera className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">फसल की तस्वीर लें</h3>
              <p className="text-sm text-gray-600 mb-4">
                पत्तियों, तने या फल पर दिखने वाली समस्या की साफ तस्वीर लें
              </p>
              
              <div className="space-y-3">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Camera className="mr-2 h-4 w-4" />
                    कैमरा से तस्वीर लें
                  </Button>
                </label>
                
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    गैलरी से चुनें
                  </Button>
                </label>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <img 
                src={selectedImage} 
                alt="Uploaded crop" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <Button 
                variant="outline" 
                onClick={() => setSelectedImage(null)}
                className="mr-2"
              >
                दूसरी तस्वीर लें
              </Button>
              <Button onClick={analyzeCrop} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    विश्लेषण हो रहा है...
                  </>
                ) : (
                  'दोबारा जांचें'
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Loader2 className="h-5 w-5 text-blue-600 animate-spin mr-3" />
              <div>
                <p className="font-medium text-blue-800">AI विश्लेषण चल रहा है...</p>
                <p className="text-sm text-blue-600">कुछ सेकंड प्रतीक्षा करें</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Diagnosis Results */}
      {diagnosis && (
        <div className="space-y-4">
          {/* Main Diagnosis */}
          <Card className={`border-2 ${getUrgencyColor(diagnosis.urgency)}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{diagnosis.disease}</span>
                <span className="text-sm font-normal">{diagnosis.confidence}% सटीक</span>
              </CardTitle>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">{getUrgencyText(diagnosis.urgency)}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{diagnosis.description}</p>
              
              {/* Treatment Options */}
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-1">🌿 जैविक इलाज</h4>
                  <p className="text-sm text-green-700">{diagnosis.treatment.organic}</p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-1">💊 रासायनिक इलाज</h4>
                  <p className="text-sm text-blue-700">{diagnosis.treatment.chemical}</p>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-1">🛡️ बचाव</h4>
                  <p className="text-sm text-yellow-700">{diagnosis.treatment.prevention}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              📱 विशेषज्ञ से बात करें
            </Button>
            <Button variant="outline" className="h-12">
              🛒 दवा की दुकान खोजें
            </Button>
          </div>

          {/* Save Results */}
          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => toast({
              title: "💾 परिणाम सेव हो गया",
              description: "आप इसे बाद में प्रोफाइल सेक्शन में देख सकते हैं"
            })}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            इस निदान को सेव करें
          </Button>
        </div>
      )}

      {/* Tips */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-amber-800 mb-2">📸 बेहतर तस्वीर के लिए टिप्स:</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• प्राकृतिक रोशनी में तस्वीर लें</li>
            <li>• समस्या वाले हिस्से को पास से दिखाएं</li>
            <li>• पत्ती के दोनों तरफ की तस्वीर लें</li>
            <li>• धुंधली तस्वीर न लें</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropDiagnosis;
