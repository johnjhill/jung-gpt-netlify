import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface DreamAnalysisProps {
  analysis: {
    initialAnalysis: string;
    questions: string[];
  } | null;
  onAnswer: (answers: string[]) => void;
}

export const DreamAnalysis = ({ analysis, onAnswer }: DreamAnalysisProps) => {
  const [answers, setAnswers] = useState<string[]>(Array(3).fill(''));

  if (!analysis) return null;

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.some(answer => !answer.trim())) {
      return; // Don't submit if any answer is empty
    }
    onAnswer(answers);
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg animate-fadeIn">
      <div className="mb-6">
        <h2 className="text-2xl font-serif text-dream-purple mb-4">Initial Analysis</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{analysis.initialAnalysis}</p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-serif text-dream-purple mb-4">Exploring Deeper</h3>
        <div className="space-y-4">
          {analysis.questions.map((question, index) => (
            <div key={index} className="p-4 bg-dream-lavender/50 rounded-lg">
              <p className="text-gray-800 mb-2">{question}</p>
              <Textarea 
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder="Your response..."
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <Button 
        onClick={handleSubmit} 
        className="w-full bg-dream-purple hover:bg-dream-purple/90 text-white"
        disabled={answers.some(answer => !answer.trim())}
      >
        Continue Analysis
      </Button>
    </Card>
  );
};