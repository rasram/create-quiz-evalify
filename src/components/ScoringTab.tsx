import { useState } from 'react';
import styles from '@/styles/createQuiz.module.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface ScoringTabProps {
  quizData?: {
    scoring?: {
      method: string;
      pointsPerQuestion: number;
      penalizeWrong: boolean;
      penaltyAmount: number;
    }
  };
  onSave?: (scoringData: any) => void;
}

export default function ScoringTab({ quizData, onSave }: ScoringTabProps) {
  const [scoringMethod, setScoringMethod] = useState(quizData?.scoring?.method || 'standard');
  const [pointsPerQuestion, setPointsPerQuestion] = useState(quizData?.scoring?.pointsPerQuestion || 1);
  const [penalizeWrong, setPenalizeWrong] = useState(quizData?.scoring?.penalizeWrong || false);
  const [penaltyAmount, setPenaltyAmount] = useState(quizData?.scoring?.penaltyAmount || 0);

  const handleSave = () => {
    if (onSave) {
      onSave({
        method: scoringMethod,
        pointsPerQuestion,
        penalizeWrong,
        penaltyAmount
      });
    }
  };

  return (
    <div className={`${styles.tabContent} p-4 max-w-3xl mx-auto`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${styles.formGroup} col-span-2`}>
          <label htmlFor="scoringMethod" className="block mb-2 font-medium">Scoring Method</label>
          <Select
            value={scoringMethod}
            onValueChange={(value) => setScoringMethod(value)}
          >
            <SelectTrigger className={`${styles.formControl} w-full p-2 rounded border border-gray-300 dark:border-gray-600 mb-6`}>
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='standard'>Standard (Fixed points per question)</SelectItem>
              <SelectItem value='weighted'>Weighted (Different points per question)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {scoringMethod === 'standard' && (
          <div className={`${styles.formGroup} col-span-2 md:col-span-1`}>
            <label htmlFor="pointsPerQuestion" className="block mb-2 font-medium">Points per Question</label>
            <Input
              id="pointsPerQuestion"
              type="number" 
              min="1"
              value={pointsPerQuestion}
              onChange={(e) => setPointsPerQuestion(Number(e.target.value))}
              className={`${styles.formControl} w-full p-2 rounded border border-gray-300`}
            />
          </div>
        )}
        
        <div className={`${styles.formGroup} col-span-2 flex items-center py-2`}>
          <label className="inline-flex items-center cursor-pointer">
            <span className='font-medium me-3'>Penalize Wrong Answers</span>
            <Switch
              checked={penalizeWrong}
              onCheckedChange={setPenalizeWrong}
            />
          </label>
        </div>
        
        {penalizeWrong && (
          <div className={`${styles.formGroup} col-span-2 md:col-span-1`}>
            <label htmlFor="penaltyAmount" className="block mb-2 font-medium">Penalty Amount</label>
            <Input
              id="penaltyAmount"
              type="number" 
              min="0"
              value={penaltyAmount}
              onChange={(e) => setPenaltyAmount(Number(e.target.value))}
              className={`${styles.formControl} w-full p-2 rounded border border-gray-300`}
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end mt-8">
        <Button 
          onClick={handleSave}
          className={`${styles.primaryButton} px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition`}
        >
          Save Scoring Settings
        </Button>
      </div>
    </div>
  );
}