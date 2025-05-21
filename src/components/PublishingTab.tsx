import { useState } from 'react';
import styles from '@/styles/createQuiz.module.css';
import { Button } from './ui/button';
interface PublishingSettings {
  publishDate: string;
  publishTime: string;
  visibility: string;
  showResultsAfterSubmission: boolean;
  resultsPublishDate: string;
  resultsPublishTime: string;
  postQuizFeedback: boolean;
  allowRetake: boolean;
  retakeCount: number;
}

interface PublishingTabProps {
  quizData?: {
    publishing?: PublishingSettings;
  };
  onSave?: (publishingData: PublishingSettings) => void;
}

export default function PublishingTab({ quizData, onSave }: PublishingTabProps) {
  // Initialize state with props or default values
  const [publishDate, setPublishDate] = useState<string>(quizData?.publishing?.publishDate || '');
  const [publishTime, setPublishTime] = useState<string>(quizData?.publishing?.publishTime || '');
  const [visibility, setVisibility] = useState<string>(quizData?.publishing?.visibility || 'Batch 1');
  const [showResultsAfterSubmission, setShowResultsAfterSubmission] = useState<boolean>(
    quizData?.publishing?.showResultsAfterSubmission || false
  );
  const [resultsPublishDate, setResultsPublishDate] = useState<string>(quizData?.publishing?.resultsPublishDate || '');
  const [resultsPublishTime, setResultsPublishTime] = useState<string>(quizData?.publishing?.resultsPublishTime || '');
  const [postQuizFeedback, setPostQuizFeedback] = useState<boolean>(quizData?.publishing?.postQuizFeedback || false);
  const [allowRetake, setAllowRetake] = useState<boolean>(quizData?.publishing?.allowRetake || false);
  const [retakeCount, setRetakeCount] = useState<number>(quizData?.publishing?.retakeCount || 0);

  const handleSave = (): void => {
    if (onSave) {
      const publishingData: PublishingSettings = {
        publishDate,
        publishTime,
        visibility,
        showResultsAfterSubmission,
        resultsPublishDate,
        resultsPublishTime,
        postQuizFeedback,
        allowRetake,
        retakeCount
      };
      onSave(publishingData);
    }
  };

  return (
    <div className={`${styles.tabContent} p-4 max-w-3xl mx-auto`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${styles.formGroup} col-span-1`}>
          <label htmlFor="publish-date" className="block mb-2 font-medium">Quiz Publish Date</label>
          <input 
            id="publish-date"
            type="date" 
            className={`${styles.formControl} w-full p-2 rounded`}
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            title="Publish Date"
          />
        </div>
        
        <div className={`${styles.formGroup} col-span-1`}>
          <label htmlFor="publish-time" className="block mb-2 font-medium">Quiz Publish Time</label>
          <input 
            id="publish-time"
            type="time" 
            className={`${styles.formControl} w-full p-2 rounded`}
            value={publishTime}
            onChange={(e) => setPublishTime(e.target.value)}
            title="Publish Time"
            placeholder="Select publish time"
          />
        </div>

        <div className={`${styles.formGroup} col-span-2`}>
          <label htmlFor="visibility" className="block mb-2 font-medium">Visibility</label>
          <select 
            id="visibility"
            className={`${styles.formControl} w-full p-2 rounded`}
            value={visibility}
            title="Select Visibility"
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option>Batch 1</option>
            <option>Batch 2</option>
            <option>All Students</option>
          </select>
        </div>

        <div className={`${styles.formGroup} col-span-2 flex items-center justify-between py-2`}>
          <label htmlFor="results-after-submit" className="font-medium">Show results after submission?</label>
          <label className="inline-flex items-center cursor-pointer">
            <input 
              id="results-after-submit"
              type="checkbox" 
              className="sr-only peer"
              checked={showResultsAfterSubmission}
              onChange={(e) => setShowResultsAfterSubmission(e.target.checked)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className={`${styles.formGroup} col-span-1`}>
          <label htmlFor="results-publish-date" className="block mb-2 font-medium">Results Publish Date</label>
          <input 
            id="results-publish-date"
            type="date" 
            className={`${styles.formControl} w-full p-2 rounded`}
            value={resultsPublishDate}
            onChange={(e) => setResultsPublishDate(e.target.value)}
          />
        </div>
        
        <div className={`${styles.formGroup} col-span-1`}>
          <label htmlFor="results-publish-time" className="block mb-2 font-medium">Results Publish Time</label>
          <input 
            id="results-publish-time"
            type="time" 
            className={`${styles.formControl} w-full p-2 rounded`}
            value={resultsPublishTime}
            onChange={(e) => setResultsPublishTime(e.target.value)}
          />
        </div>

        <div className={`${styles.formGroup} col-span-2 flex items-center justify-between py-2`}>
          <label htmlFor="post-quiz-feedback" className="font-medium">Post Quiz feedback</label>
          <label className="inline-flex items-center cursor-pointer">
            <input 
              id="post-quiz-feedback"
              type="checkbox" 
              className="sr-only peer"
              checked={postQuizFeedback}
              onChange={(e) => setPostQuizFeedback(e.target.checked)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className={`${styles.formGroup} col-span-2 flex items-center justify-between py-2`}>
          <label htmlFor="allow-retake" className="font-medium">Allow quiz retake</label>
          <label className="inline-flex items-center cursor-pointer">
            <input 
              id="allow-retake"
              type="checkbox" 
              className="sr-only peer"
              checked={allowRetake}
              onChange={(e) => setAllowRetake(e.target.checked)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {allowRetake && (
          <div className={`${styles.formGroup} col-span-2`}>
            <label htmlFor="retake-count" className="block mb-2 font-medium">Number of retakes allowed</label>
            <input 
              id="retake-count"
              type="number" 
              className={`${styles.formControl} w-40 p-2 rounded`}
              value={retakeCount}
              onChange={(e) => setRetakeCount(Number(e.target.value))}
              min="1"
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end mt-8">
        <Button 
          onClick={handleSave}
        >
          Save Publishing Settings
        </Button>
      </div>
    </div>
  );
}
