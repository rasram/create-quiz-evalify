import { useState } from 'react';
import styles from '@/styles/createQuiz.module.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';


interface QManagementTabProps {
  onSave?: (qmanagementdata: any) => void;
}

export default function QManagementTab({ onSave }: QManagementTabProps) {
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
  const [optionsShuffled, setOptionsShuffled] = useState<boolean>(false);
  const [partBySections, setPartBySections] = useState<boolean>(false);
  const [questionsPerSection, setQuestionsPerSection] = useState<string>('');

  return (
    <div className={`${styles.section} grid grid-cols-1 md:grid-cols-2 gap-6 p-4`}>
      {/* Left Section */}
      <div className={`${styles.box} dark:bg-gray-800 p-5 rounded-lg`}>
        <h3 className="text-lg font-semibold mb-4">Question Source</h3>
        <div className="flex flex-col space-y-3 mb-6">
          <Button 
            className={`${styles.defaultButton} px-4 py-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded transition`}
          >
            Add from bank
          </Button>
          <Button 
            className={`${styles.defaultButton} px-4 py-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded transition`}
          >
            Add new question
          </Button>
        </div>

        <h3 className="text-lg font-semibold mb-4 mt-6">Smart Bank Filter</h3>
        <div className="flex flex-col space-y-3 mb-4">
          <Input 
            className={`${styles.formControl} w-full p-2 rounded border border-gray-300 dark:border-gray-600`}
            placeholder='Toggle Linear Navigation' 
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          >
          </Input>
          <Input 
            className={`${styles.formControl} w-full p-2 rounded border border-gray-300 dark:border-gray-600`}
            placeholder='Search Course' 
            value={searchCourse}
            onChange={(e) => setSearchCourse(e.target.value)}
          >
          </Input>
          <Input 
            className={`${styles.formControl} w-full p-2 rounded border border-gray-300 dark:border-gray-600`}
            placeholder='Search Sem' 
            value={searchSem}
            onChange={(e) => setSearchSem(e.target.value)}
          >
          </Input>
        </div>
        
        <div className={`${styles.difficulty} flex space-x-4 my-4`}>
          <Label>
            <Checkbox
              checked={difficultyHigh}
              onCheckedChange={(e) => {
                if (typeof e === "boolean") {
                  setDifficultyHigh(e);
                }
              }}
            >
            </Checkbox>
            High
          </Label>
          <Label>
            <Checkbox
              checked={difficultyMedium}
              onCheckedChange={(e) => {
                if (typeof e === "boolean") {
                  setDifficultyMedium(e);
                }
              }}
            >
            </Checkbox>
            Medium
          </Label>
          <Label>
            <Checkbox
              checked={difficultyLow}
              onCheckedChange={(e) => {
                if (typeof e === "boolean") {
                  setDifficultyLow(e);
                }
              }}
            >
            </Checkbox>
            Low
          </Label>
        </div>
        
        <Select
          value={questionType}
          onValueChange={(value) => setQuestionType(value)}
        >
          <SelectTrigger className={`${styles.formControl} w-full p-2 rounded border border-gray-300 dark:border-gray-600 mb-4`}>
            <SelectValue placeholder="Select Question Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Descriptive">Descriptive</SelectItem>
            <SelectItem value="MCQ">MCQ</SelectItem>
          </SelectContent>
        </Select>
        
        <div className={`${styles.buttonRow} flex space-x-3 mb-4`}>
          <Button
            className={`${styles.defaultButton} ${styles.gradientBtn} flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:opacity-90 transition`}
          >
            View questions
          </Button>
          <Button
            className={`${styles.defaultButton} ${styles.gradientBtn} flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:opacity-90 transition`}
          >
            Edit questions
          </Button>
        </div>
        
        <div className={`${styles.toggle} flex items-center justify-between py-2 mb-2`}>
          <span>Linear Navigation</span>
          <Switch
            checked={linearNavigation}
            onCheckedChange={setLinearNavigation}
          />
        </div>
        
        <div className={`${styles.toggle} flex items-center justify-between py-2`}>
          <span>Full Screen</span>
          <Switch
            checked={fullScreen}
            onCheckedChange={setFullScreen}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className={`${styles.box} dark:bg-gray-800 p-5 rounded-lg`}>
        <h3 className="text-lg font-semibold mb-4">IDE Access:</h3>
        <div className={`${styles.toggle} flex items-center justify-between py-2`}>
          <span>Enable IDE</span>
          <Switch
            checked={enableIDE}
            onCheckedChange={setEnableIDE}
          />
        </div>
        
        <Select>
          <SelectTrigger className={`${styles.formControl} w-full p-2 rounded border border-gray-300 dark:border-gray-600 mb-6`}>
            <SelectValue placeholder="Select Questions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Question List">Question list (can select multiple questions from dropdown)</SelectItem>
          </SelectContent>
        </Select>

        <div className={`${styles.instructionBox} border border-gray-300 dark:border-gray-600 rounded overflow-hidden mb-6`}>
          <div className={`${styles.instructionHeader} flex items-center dark:bg-gray-700 p-2 space-x-2 flex-row`}>
            <Button
              className={`${styles.defaultButton} px-3 py-1 bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500`}
            >
              Aa
            </Button>
            <Button
              className={`${styles.defaultButton} px-3 py-1 bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500`}
            >
              U
            </Button>
            <Button
              className={`${styles.defaultButton} px-3 py-1 bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500`}
            >
              I
            </Button>
            <Button
              className={`${styles.defaultButton} px-3 py-1 bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500`}
            >
              B
            </Button>
            <Select>
              <SelectTrigger className={`${styles.formControl} w-full p-2 rounded border border-gray-300 dark:border-gray-600 mb-6`}>
                <SelectValue placeholder="Question List" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Question List">Question list</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className={`${styles.defaultButton} px-3 py-1 bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500`}
            >
              📤
            </Button>
          </div>
          <Textarea
            placeholder="Add instruction.."
            rows={5}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className={`${styles.formControl} w-full p-3 border-0 focus:ring-0`}
            >
          </Textarea>
        </div>

        <div className={`${styles.questionOptions} py-2 mb-4`}>
          <div className={`${styles.toggle} flex items-center justify-between mb-2`}>
            <span>Question Order Shuffled</span>
            <Switch
              checked={questionsShuffled}
              onCheckedChange={setQuestionsShuffled}
            />
          </div>
          <div className={`${styles.toggle} flex items-center justify-between py-2 mb-2`}>
            <span>Options Order Shuffled</span>
            <Switch
              checked={optionsShuffled}
              onCheckedChange={setOptionsShuffled}
            />
          </div>
        </div>

        <div className={`${styles.toggle} flex items-center justify-between py-2 mb-4`}>
          <span>Part by sections</span>
            <Switch
              checked={partBySections}
              onCheckedChange={setPartBySections}
            />
        </div>
        
        <Input 
            className={`${styles.formControl} w-full p-2 rounded border border-gray-300 dark:border-gray-600`}
            placeholder='How many questions per section?' 
            value={questionsPerSection}
            onChange={(e) => setQuestionsPerSection(e.target.value)}
          >
        </Input>
      </div>
    </div>
  );
}
