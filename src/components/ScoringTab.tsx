import { useState } from 'react';
import styles from '@/styles/createQuiz.module.css';

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
          <select 
            id="scoringMethod"
            value={scoringMethod}
            onChange={(e) => setScoringMethod(e.target.value)}
            className={`${styles.formControl} w-full p-2 rounded border border-gray-300`}
          >
            <option value="standard">Standard (Fixed points per question)</option>
            <option value="weighted">Weighted (Different points per question)</option>
          </select>
        </div>
        
        {scoringMethod === 'standard' && (
          <div className={`${styles.formGroup} col-span-2 md:col-span-1`}>
            <label htmlFor="pointsPerQuestion" className="block mb-2 font-medium">Points per Question</label>
            <input 
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
            <input 
              type="checkbox"
              className="sr-only peer"
              checked={penalizeWrong}
              onChange={(e) => setPenalizeWrong(e.target.checked)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 font-medium">Penalize Wrong Answers</span>
          </label>
        </div>
        
        {penalizeWrong && (
          <div className={`${styles.formGroup} col-span-2 md:col-span-1`}>
            <label htmlFor="penaltyAmount" className="block mb-2 font-medium">Penalty Amount</label>
            <input 
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
        <button 
          onClick={handleSave}
          className={`${styles.primaryButton} px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition`}
        >
          Save Scoring Settings
        </button>
      </div>
    </div>
  );
}
