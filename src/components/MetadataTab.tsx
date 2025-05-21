'use client'

import { useState, KeyboardEvent } from 'react';
import { Switch } from "@/components/ui/switch";
import {Textarea} from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Clock, Calendar as CalendarIcon, Tag, Lock, Calculator, ExternalLink } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { DateTimePicker } from "./datetime-picker";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState("Minutes");
  const [startTime, setStartTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [course, setCourse] = useState("Math");
  const [tags, setTags] = useState(["Mid Sem", "End Sem", "Daily test", "Practice"]);
  const [tagInput, setTagInput] = useState("");
  const [isPasswordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [autoSubmit, setAutoSubmit] = useState(false);
  const [calculatorAccess, setCalculatorAccess] = useState(false);
  const [allowTabSwitching, setAllowTabSwitching] = useState(false);

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
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
        Quiz Metadata
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-[#1e293b] border-gray-800 lg:col-span-2 text-white">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Title
              </label>
              <Input
                placeholder="Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#0f172a] border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Description
              </label>
              <Textarea
                placeholder="Quiz Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[#0f172a] border-gray-700 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Course
                </label>
                <Select
                  value={course}
                  onValueChange={(value) => setCourse(value)}
                >
                  <SelectTrigger className="bg-[#0f172a] border-gray-700 w-full">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Math">Math</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Duration
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="bg-[#0f172a] border-gray-700"
                  />
                  <Select
                    value={durationUnit}
                    onValueChange={(value) => setDurationUnit(value)}
                  >
                    <SelectTrigger className="bg-[#0f172a] border-gray-700 w-full">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Minutes">Minutes</SelectItem>
                      <SelectItem value="Hours">Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" /> Start Date & Time
                </label>
                <div>
                  <DateTimePicker
                    value={startDate && startTime ? new Date(`${startDate}T${startTime}`) : undefined}
                    onChange={(date) => {
                      if (date) {
                        setStartDate(date.toISOString().split('T')[0]);
                        setStartTime(date.toTimeString().split(' ')[0].substring(0, 5));
                      }
                    }}
                    use12HourFormat={true}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" /> End Date & Time
                </label>
                <div>
                  <DateTimePicker
                    value={endDate && endTime ? new Date(`${endDate}T${endTime}`) : undefined}
                    onChange={(date) => {
                      if (date) {
                        setEndDate(date.toISOString().split('T')[0]);
                        setEndTime(date.toTimeString().split(' ')[0].substring(0, 5));
                      }
                    }}
                    use12HourFormat={true}
                    min={startDate && startTime ? new Date(`${startDate}T${startTime}`) : undefined}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                <Tag className="h-4 w-4" /> Tags
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-[#0f172a] border-gray-700"
                />
                <Button onClick={addTag} size="icon" variant="secondary" className="border-gray-700">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    {tag}
                    <Button onClick={() => removeTag(tag)} className="text-gray-400 hover:text-gray-200 h-6 w-6" variant="ghost">
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b] border-gray-800 text-white">
          <CardHeader>
            <CardTitle>Quiz Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-sm">
                <Lock className="h-4 w-4" />
                <span>Password Protected</span>
              </div>
              <Switch
                checked={isPasswordProtected}
                onCheckedChange={(checked) => setPasswordProtected(checked)}
              />
            </div>

            {isPasswordProtected && (
              <Input
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#0f172a] border-gray-700 mt-2"
              />
            )}

            <Separator className="bg-gray-700" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-sm">
                <Clock className="h-4 w-4" />
                <span>Auto-submit</span>
              </div>
              <Switch
                checked={autoSubmit}
                onCheckedChange={(checked) => setAutoSubmit(checked)}
              />
            </div>

            <Separator className="bg-gray-700" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-sm">
                <Calculator className="h-4 w-4" />
                <span>Calculator Access</span>
              </div>
              <Switch
                checked={calculatorAccess}
                onCheckedChange={(checked) => setCalculatorAccess(checked)}
              />
            </div>

            <Separator className="bg-gray-700" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-sm">
                <ExternalLink className="h-4 w-4" />
                <span>Allow Tab Switching</span>
              </div>
              <Switch
                checked={allowTabSwitching}
                onCheckedChange={(checked) => setAllowTabSwitching(checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}