'use client'

import { useState, KeyboardEvent } from 'react';
import { Switch } from "@/components/ui/switch";
import { XMarkIcon } from '@heroicons/react/20/solid';
import {Textarea} from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MetadataTabProps {
  quizData?: {
    metadata?: {
      title: string;
      description: string;
      duration: string;
      durationUnit: string;
      startTime: string;
      startDate: string;
      endTime: string;
      endDate: string;
      course: string;
      tags: string[];
      isPasswordProtected: boolean;
      password: string;
      autoSubmit: boolean;
      calculatorAccess: boolean;
      allowTabSwitching: boolean;
    }
  };
  onSave?: (metadataData: any) => void;
}

export default function MetadataTab({ quizData, onSave }: MetadataTabProps) {
  const [title, setTitle] = useState(quizData?.metadata?.title || "");
  const [description, setDescription] = useState(quizData?.metadata?.description || "");
  const [duration, setDuration] = useState(quizData?.metadata?.duration || "");
  const [durationUnit, setDurationUnit] = useState(quizData?.metadata?.durationUnit || "Minutes");
  const [startTime, setStartTime] = useState(quizData?.metadata?.startTime || "");
  const [startDate, setStartDate] = useState(quizData?.metadata?.startDate || "");
  const [endTime, setEndTime] = useState(quizData?.metadata?.endTime || "");
  const [endDate, setEndDate] = useState(quizData?.metadata?.endDate || "");
  const [course, setCourse] = useState(quizData?.metadata?.course || "Math");
  const [tags, setTags] = useState(quizData?.metadata?.tags || ["Mid Sem", "End Sem", "Daily test", "Practice"]);
  const [tagInput, setTagInput] = useState("");
  const [isPasswordProtected, setPasswordProtected] = useState(quizData?.metadata?.isPasswordProtected || false);
  const [password, setPassword] = useState(quizData?.metadata?.password || "");
  const [autoSubmit, setAutoSubmit] = useState(quizData?.metadata?.autoSubmit || false);
  const [calculatorAccess, setCalculatorAccess] = useState(quizData?.metadata?.calculatorAccess || false);
  const [allowTabSwitching, setAllowTabSwitching] = useState(quizData?.metadata?.allowTabSwitching || false);

  const addTag = (): void => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string): void => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSave = (): void => {
    if (onSave) {
      onSave({
        title,
        description,
        duration,
        durationUnit,
        startTime,
        startDate,
        endTime,
        endDate,
        course,
        tags,
        isPasswordProtected,
        password,
        autoSubmit,
        calculatorAccess,
        allowTabSwitching
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto p-6">
      <Card className="bg-black-800 text-white space-y-4 p-6">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <div className="flex gap-2">
          <Input type="number" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <Select value={durationUnit} onValueChange={setDurationUnit}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Minutes">Minutes</SelectItem>
              <SelectItem value="Hours">Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>

        <Select value={course} onValueChange={setCourse}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Math">Math</SelectItem>
            <SelectItem value="Physics">Physics</SelectItem>
            <SelectItem value="Chemistry">Chemistry</SelectItem>
          </SelectContent>
        </Select>

        <div>
          <div className="flex gap-2">
            <Input placeholder="Add a tag..." value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleKeyDown} />
            <Button onClick={addTag}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(tag => (
              <span key={tag} className="text-black inline-flex items-center px-3 py-1 bg-muted text-sm rounded-full">
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-1 text-red-500 hover:text-red-700">
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </Card>

      <Card className="bg-black-800 text-white space-y-4 p-6">
        <div className="flex items-center justify-between">
          <span>Password Protected</span>
          <Switch checked={isPasswordProtected} onCheckedChange={setPasswordProtected} />
        </div>
        {isPasswordProtected && (
          <Input placeholder="ENTER KEY HERE" value={password} onChange={(e) => setPassword(e.target.value)} />
        )}

        <div className="flex items-center justify-between">
          <span>Auto-submit</span>
          <Switch checked={autoSubmit} onCheckedChange={setAutoSubmit} />
        </div>

        <div className="flex items-center justify-between">
          <span>Calculator Access</span>
          <Switch checked={calculatorAccess} onCheckedChange={setCalculatorAccess} />
        </div>

        <div className="flex items-center justify-between">
          <span>Allow Tab Switching</span>
          <Switch checked={allowTabSwitching} onCheckedChange={setAllowTabSwitching} />
        </div>

        <Button className="w-full mt-4" onClick={handleSave}>Save Metadata</Button>
      </Card>
    </div>
  );
}