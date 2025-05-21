import { useState } from 'react'
import { format, set } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { DateTimePicker } from './datetime-picker'
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
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
        Publishing Settings
      </h2>

      <Card className="bg-[#1e293b] border-gray-800 text-white">
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Quiz Publish Date & Time
              </label>
              <DateTimePicker
                value={publishDate && publishTime ? new Date(`${publishDate}T${publishTime}`) : undefined}
                onChange={(date) => {
                  if (date) {
                    setPublishDate(date.toISOString().split('T')[0]);
                    setPublishTime(date.toTimeString().split(' ')[0].substring(0, 5));
                  }
                }}
                use12HourFormat={true}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Visibility
              </label>
              <Select
                value={visibility}
                onValueChange={(value) => setVisibility(value)}
              >
                <SelectTrigger className="bg-[#0f172a] border-gray-700 w-full">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Batch 1">Batch 1</SelectItem>
                  <SelectItem value="Batch 2">Batch 2</SelectItem>
                  <SelectItem value="All Students">All Students</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="bg-gray-700 my-4" />

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
              Show results after submission?
            </label>
            <Switch
              checked={showResultsAfterSubmission}
              onCheckedChange={(checked) => setShowResultsAfterSubmission(checked)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Results Publish Date & Time
              </label>
              <DateTimePicker
                value={resultsPublishDate && resultsPublishTime ? new Date(`${resultsPublishDate}T${resultsPublishTime}`) : undefined}
                onChange={(date) => {
                  if (date) {
                    setResultsPublishDate(date.toISOString().split('T')[0]);
                    setResultsPublishTime(date.toTimeString().split(' ')[0].substring(0, 5));
                  }
                }}
                use12HourFormat={true}
              />
            </div>
          </div>

          <Separator className="bg-gray-700 my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                Post Quiz feedback
              </label>
              <Switch
                checked={postQuizFeedback}
                onCheckedChange={(checked) => setPostQuizFeedback(checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                Allow quiz retake
              </label>
              <Switch
                checked={allowRetake}
                onCheckedChange={(checked) => setAllowRetake(checked)}
              />
            </div>
          </div>

          {allowRetake && (
            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Number of retakes allowed
              </label>
              <Input
                type="number"
                min="1"
                value={retakeCount}
                onChange={(e) => setRetakeCount(Number(e.target.value))}
                className="bg-[#0f172a] border-gray-700 w-full md:w-1/3"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
