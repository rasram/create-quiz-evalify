'use client'
import { useState } from 'react';
import { Switch } from "@headlessui/react";
import { XMarkIcon } from '@heroicons/react/20/solid';

export default function MetadataTab() {
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

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 max-w-6xl mx-auto">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter quiz title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            className="w-full p-2.5 h-32 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter quiz description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Quiz Duration</label>
          <div className="flex space-x-3">
            <input 
              type="number" 
              value={duration} 
              onChange={e => setDuration(e.target.value)} 
              className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500" 
              placeholder="Duration"
            />
            <select 
              value={durationUnit} 
              onChange={e => setDurationUnit(e.target.value)} 
              className="w-1/2 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
            >
              <option>Minutes</option>
              <option>Hours</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Start Time</label>
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="date" 
              value={startDate} 
              onChange={e => setStartDate(e.target.value)} 
              className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              type="time" 
              value={startTime} 
              onChange={e => setStartTime(e.target.value)} 
              className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">End Time</label>
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="date" 
              value={endDate} 
              onChange={e => setEndDate(e.target.value)} 
              className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              type="time" 
              value={endTime} 
              onChange={e => setEndTime(e.target.value)} 
              className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Associated Course</label>
          <select 
            value={course} 
            onChange={e => setCourse(e.target.value)} 
            className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
          >
            <option>Math</option>
            <option>Physics</option>
            <option>Chemistry</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Add Tags</label>
          <div className="flex space-x-2 mb-3">
            <input 
              value={tagInput} 
              onChange={e => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500" 
              placeholder="Add a tag..." 
            />
            <button 
              onClick={addTag} 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700">
                {tag}
                <button 
                  onClick={() => removeTag(tag)} 
                  className="ml-1.5 hover:text-red-500"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium">Password Protection</span>
            <Switch 
              checked={isPasswordProtected} 
              onChange={setPasswordProtected} 
              className={`${isPasswordProtected ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Password Protection</span>
              <span className={`${isPasswordProtected ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
            </Switch>
          </div>
          
          {isPasswordProtected && (
            <input 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="ENTER KEY HERE" 
              className="w-full mt-3 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500" 
            />
          )}
        </div>

        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium">Auto-submit</span>
            <Switch 
              checked={autoSubmit} 
              onChange={setAutoSubmit} 
              className={`${autoSubmit ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Auto-submit</span>
              <span className={`${autoSubmit ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
            </Switch>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium">Calculator Access</span>
            <Switch 
              checked={calculatorAccess} 
              onChange={setCalculatorAccess} 
              className={`${calculatorAccess ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Calculator Access</span>
              <span className={`${calculatorAccess ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
            </Switch>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium">Allow Tab Switching</span>
            <Switch 
              checked={allowTabSwitching} 
              onChange={setAllowTabSwitching} 
              className={`${allowTabSwitching ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Allow Tab Switching</span>
              <span className={`${allowTabSwitching ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
