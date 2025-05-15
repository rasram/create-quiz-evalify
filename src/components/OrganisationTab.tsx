import { useState } from 'react';
import styles from '@/styles/createQuiz.module.css';

interface OrganisationTabProps {
  onSave?: (organizationData: any) => void;
}

export default function OrganisationTab({ onSave }: OrganisationTabProps) {
  const [searchTag, setSearchTag] = useState<string>('');
  const [searchCourse, setSearchCourse] = useState<string>('');
  const [searchSem, setSearchSem] = useState<string>('');
  const [difficultyHigh, setDifficultyHigh] = useState<boolean>(true);
  const [difficultyMedium, setDifficultyMedium] = useState<boolean>(true);
  const [difficultyLow, setDifficultyLow] = useState<boolean>(false);
  const [questionType, setQuestionType] = useState<string>('Descriptive');
  const [linearNavigation, setLinearNavigation] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [enableIDE, setEnableIDE] = useState<boolean>(false);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string>('');
  const [questionsShuffled, setQuestionsShuffled] = useState<boolean>(true);
  const [questionsFixed, setQuestionsFixed] = useState<boolean>(false);
  const [optionsShuffled, setOptionsShuffled] = useState<boolean>(false);
  const [optionsFixed, setOptionsFixed] = useState<boolean>(true);
  const [partBySections, setPartBySections] = useState<boolean>(false);
  const [questionsPerSection, setQuestionsPerSection] = useState<string>('');

  return (
    <div className={`${styles.section} grid grid-cols-1 md:grid-cols-2 gap-6 p-4`}>
      {/* Left Section */}
      <div className={`${styles.box} bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md`}>
        <h3 className="text-lg font-semibold mb-4">Question Source</h3>
        <div className="flex flex-col space-y-3 mb-6">
          <button 
            className={`${styles.defaultButton} px-4 py-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded transition`}
            aria-label="Add questions from bank"
          >
            Add from bank
          </button>
          <button 
            className={`${styles.defaultButton} px-4 py-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded transition`}
            aria-label="Add new question"
          >
            Add new question
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-4 mt-6">Smart Bank Filter</h3>
        <div className="flex flex-col space-y-3 mb-4">
          <input 
            title="Linear Navigation Toggle"
            placeholder="Toggle Linear Navigation"

            type="text" 
            className={`${styles.formControl} p-2 rounded border border-gray-300 dark:border-gray-600`}
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Search Course" 
            className={`${styles.formControl} p-2 rounded border border-gray-300 dark:border-gray-600`}
            value={searchCourse}
            onChange={(e) => setSearchCourse(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Search Sem" 
            className={`${styles.formControl} p-2 rounded border border-gray-300 dark:border-gray-600`}
            value={searchSem}
            onChange={(e) => setSearchSem(e.target.value)}
          />
        </div>
        
        <div className={`${styles.difficulty} flex space-x-4 my-4`}>
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              checked={difficultyHigh}
              onChange={(e) => setDifficultyHigh(e.target.checked)}
              className="rounded text-blue-600" 
            />
            <span className="ml-2">High</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              checked={difficultyMedium}
              onChange={(e) => setDifficultyMedium(e.target.checked)}
              className="rounded text-blue-600" 
            />
            <span className="ml-2">Medium</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              checked={difficultyLow}
              onChange={(e) => setDifficultyLow(e.target.checked)}
              className="rounded text-blue-600" 
            />
            <span className="ml-2">Low</span>
          </label>
        </div>
        
        <select 
          className={`${styles.formControl} w-full p-2 rounded border border-gray-300 dark:border-gray-600 mb-4`}
          title="Select question type"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option>Descriptive</option>
          <option>MCQ</option>
        </select>
        
        <div className={`${styles.buttonRow} flex space-x-3 mb-4`}>
          <button 
            className={`${styles.defaultButton} ${styles.gradientBtn} flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:opacity-90 transition`}
            aria-label="View questions"
          >
            View questions
          </button>
          <button 
            className={`${styles.defaultButton} ${styles.gradientBtn} flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:opacity-90 transition`}
            aria-label="Edit questions"
          >
            Edit questions
          </button>
        </div>
        
        <div className={`${styles.toggle} flex items-center justify-between py-2 mb-2`}>
          <span>Linear Navigation</span>
          <label className="inline-flex items-center cursor-pointer">
            <label className="inline-flex items-center cursor-pointer">
              <label className="inline-flex items-center cursor-pointer">
                <label>
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={linearNavigation}
                    onChange={(e) => setLinearNavigation(e.target.checked)}
                    title="Toggle linear navigation"
                    aria-label="Linear Navigation"
                  />
                  <span className="ml-2">Linear Navigation</span>
                </label>
                <span className="ml-2">Linear Navigation</span>
              </label>
              <span className="ml-2">Linear Navigation</span>
            </label>
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className={`${styles.toggle} flex items-center justify-between py-2`}>
          <span>Full screen</span>
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              aria-label='Full screen toggle'
              checked={fullScreen}
              onChange={(e) => setFullScreen(e.target.checked)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Right Section */}
      <div className={`${styles.box} bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md`}>
        <h3 className="text-lg font-semibold mb-4">IDE Access:</h3>
        <div className={`${styles.toggle} flex items-center justify-between py-2 mb-4`}>
          <span>Enable IDE</span>
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              aria-label='Enable IDE'
              checked={enableIDE}
              onChange={(e) => setEnableIDE(e.target.checked)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <select 
          className={`${styles.formControl} w-full p-2 rounded border border-gray-300 dark:border-gray-600 mb-6`}
          aria-label="Select questions"
        >
          <option>Question list (can select multiple questions from dropdown)</option>
        </select>

        <div className={`${styles.instructionBox} border border-gray-300 dark:border-gray-600 rounded overflow-hidden mb-6`}>
          <div className={`${styles.instructionHeader} flex items-center bg-gray-100 dark:bg-gray-700 p-2 space-x-2 flex-wrap`}>
            <button 
              className={`${styles.defaultButton} px-3 py-1 bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500`}
              aria-label="Text style"
            >Aa</button>
            <button 
              className={`${styles.defaultButton} px-3 py-1 bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500`}
              aria-label="Underline text"
            ><strong>U</strong></button>
            <button 
              className={`${styles.defaultButton} px-3 py-1 bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500`}
              aria-label="Italic text"
            ><em>I</em></button>
            <button 
              className={`${styles.defaultButton} px-3 py-1 bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500`}
              aria-label="Bold text"
            ><b>B</b></button>
            <select 
              className={`${styles.formControl} flex-grow p-1 text-sm rounded border border-gray-300 dark:border-gray-600`}
              aria-label="Question selection"
            >
              <option>Question list</option>
            </select>
            <button 
              className={`${styles.defaultButton} px-3 py-1 bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500`}
              aria-label="Upload file"
            >📤</button>
          </div>
          <textarea
            placeholder={`Add instruction..\n+ hints/explanations\n+ can add img file`}
            rows={5}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className={`${styles.formControl} w-full p-3 border-0 focus:ring-0`}
            aria-label="Instruction text"
          ></textarea>
        </div>

        <div className={`${styles.questionOptions} grid grid-cols-2 gap-y-3 mb-6`}>
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              checked={questionsShuffled}
              onChange={(e) => setQuestionsShuffled(e.target.checked)}
              className="rounded text-blue-600"
              id="question-shuffle"
            />
            <span className="ml-2">Question order Shuffled</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              checked={questionsFixed}
              onChange={(e) => setQuestionsFixed(e.target.checked)}
              className="rounded text-blue-600"
              id="question-fixed"
            />
            <span className="ml-2">Fixed</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              checked={optionsShuffled}
              onChange={(e) => setOptionsShuffled(e.target.checked)}
              className="rounded text-blue-600"
              id="options-shuffle"
            />
            <span className="ml-2">Options order Shuffled</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              checked={optionsFixed}
              onChange={(e) => setOptionsFixed(e.target.checked)}
              className="rounded text-blue-600"
              id="options-fixed"
            />
            <span className="ml-2">Fixed</span>
          </label>
        </div>

        <div className={`${styles.toggle} flex items-center justify-between py-2 mb-4`}>
          <span>Part by sections</span>
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              aria-label='Part by sections'
              checked={partBySections}
              onChange={(e) => setPartBySections(e.target.checked)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <input
          type="text"
          placeholder="How many questions per section?"
          value={questionsPerSection}
          onChange={(e) => setQuestionsPerSection(e.target.value)}
          className={`${styles.formControl} w-full p-2 rounded border border-gray-300 dark:border-gray-600`}
          aria-label="Questions per section"
        />
      </div>
    </div>
  );
}
