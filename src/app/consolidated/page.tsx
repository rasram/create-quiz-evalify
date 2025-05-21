"use client"

import type React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Clock, Calendar as CalendarIcon, Tag, Lock, Calculator, ExternalLink, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface QuizData {
  metadata: {
    title: string
    description: string
    duration: string
    durationUnit: string
    startTime: string
    startDate: string
    endTime: string
    endDate: string
    course: string
    tags: string[]
    isPasswordProtected: boolean
    password: string
    autoSubmit: boolean
    calculatorAccess: boolean
    allowTabSwitching: boolean
  }
  scoring: {
    method: string
    pointsPerQuestion: number
    penalizeWrong: boolean
    penaltyAmount: number
  }
  publishing: {
    publishDate: string
    publishTime: string
    visibility: string
    showResultsAfterSubmission: boolean
    resultsPublishDate: string
    resultsPublishTime: string
    postQuizFeedback: boolean
    allowRetake: boolean
    retakeCount: number
  }
}

export default function QuizCreator() {
  const [quizData, setQuizData] = useState<QuizData>({
    metadata: {
      title: "",
      description: "",
      duration: "",
      durationUnit: "Minutes",
      startTime: "",
      startDate: "",
      endTime: "",
      endDate: "",
      course: "Math",
      tags: ["Mid Sem", "End Sem", "Daily test", "Practice"],
      isPasswordProtected: false,
      password: "",
      autoSubmit: false,
      calculatorAccess: false,
      allowTabSwitching: false,
    },
    scoring: {
      method: "standard",
      pointsPerQuestion: 1,
      penalizeWrong: false,
      penaltyAmount: 0,
    },
    publishing: {
      publishDate: "",
      publishTime: "",
      visibility: "Batch 1",
      showResultsAfterSubmission: false,
      resultsPublishDate: "",
      resultsPublishTime: "",
      postQuizFeedback: false,
      allowRetake: false,
      retakeCount: 0,
    },
  })

  const [tagInput, setTagInput] = useState("")

  const updateQuizData = (section: keyof QuizData, data: any) => {
    setQuizData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }))
  }

  const addTag = () => {
    if (tagInput && !quizData.metadata.tags.includes(tagInput)) {
      updateQuizData("metadata", {
        tags: [...quizData.metadata.tags, tagInput],
      })
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    updateQuizData("metadata", {
      tags: quizData.metadata.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const saveQuiz = () => {
    console.log("Quiz data saved:", quizData)
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <header className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 z-10 bg-[#0f172a]">
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Create Quiz
        </h1>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="avatar.jpg" alt="User Avatar" />
            <AvatarFallback>User123</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 pb-24">
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
                    value={quizData.metadata.title}
                    onChange={(e) => updateQuizData("metadata", { title: e.target.value })}
                    className="bg-[#0f172a] border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Description
                  </label>
                  <Textarea
                    placeholder="Quiz Description"
                    value={quizData.metadata.description}
                    onChange={(e) => updateQuizData("metadata", { description: e.target.value })}
                    className="bg-[#0f172a] border-gray-700 min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Course
                    </label>
                    <Select
                      value={quizData.metadata.course}
                      onValueChange={(value) => updateQuizData("metadata", { course: value })}
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
                        value={quizData.metadata.duration}
                        onChange={(e) => updateQuizData("metadata", { duration: e.target.value })}
                        className="bg-[#0f172a] border-gray-700"
                      />
                      <Select
                        value={quizData.metadata.durationUnit}
                        onValueChange={(value) => updateQuizData("metadata", { durationUnit: value })}
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full bg-[#0f172a] border-gray-700">
                            {quizData.metadata.startDate
                              ? format(new Date(quizData.metadata.startDate), "dd/MM/yyyy")
                              : "Start Date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={quizData.metadata.startDate ? new Date(quizData.metadata.startDate) : undefined}
                            onSelect={(date) => {
                              if (date) {
                                updateQuizData("metadata", { startDate: date.toISOString().split("T")[0] })
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Input
                        type="time"
                        value={quizData.metadata.startTime}
                        onChange={(e) => updateQuizData("metadata", { startTime: e.target.value })}
                        className="bg-[#0f172a] border-gray-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" /> End Date & Time
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full bg-[#0f172a] border-gray-700">
                            {quizData.metadata.endDate
                              ? format(new Date(quizData.metadata.endDate), "dd/MM/yyyy")
                              : "End Date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={quizData.metadata.endDate ? new Date(quizData.metadata.endDate) : undefined}
                            onSelect={(date) => {
                              if (date) {
                                updateQuizData("metadata", { endDate: date.toISOString().split("T")[0] })
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Input
                        type="time"
                        value={quizData.metadata.endTime}
                        onChange={(e) => updateQuizData("metadata", { endTime: e.target.value })}
                        className="bg-[#0f172a] border-gray-700"
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
                      onKeyDown={handleTagKeyDown}
                      className="bg-[#0f172a] border-gray-700"
                    />
                    <Button onClick={addTag} size="icon" variant="secondary" className="border-gray-700">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {quizData.metadata.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                        {tag}
                        <Button onClick={() => removeTag(tag)} className="text-gray-400 hover:text-gray-200 h-6" variant={"ghost"}>
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
                    checked={quizData.metadata.isPasswordProtected}
                    onCheckedChange={(checked) => updateQuizData("metadata", { isPasswordProtected: checked })}
                  />
                </div>

                {quizData.metadata.isPasswordProtected && (
                  <Input
                    placeholder="Enter password"
                    type="password"
                    value={quizData.metadata.password}
                    onChange={(e) => updateQuizData("metadata", { password: e.target.value })}
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
                    checked={quizData.metadata.autoSubmit}
                    onCheckedChange={(checked) => updateQuizData("metadata", { autoSubmit: checked })}
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-medium text-sm">
                    <Calculator className="h-4 w-4" />
                    <span>Calculator Access</span>
                  </div>
                  <Switch
                    checked={quizData.metadata.calculatorAccess}
                    onCheckedChange={(checked) => updateQuizData("metadata", { calculatorAccess: checked })}
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-medium text-sm">
                    <ExternalLink className="h-4 w-4" />
                    <span>Allow Tab Switching</span>
                  </div>
                  <Switch
                    checked={quizData.metadata.allowTabSwitching}
                    onCheckedChange={(checked) => updateQuizData("metadata", { allowTabSwitching: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
            Scoring Method
          </h2>

          <Card className="bg-[#1e293b] border-gray-800 text-white">
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Scoring Method
                  </label>
                  <Select
                    value={quizData.scoring.method}
                    onValueChange={(value) => updateQuizData("scoring", { method: value })}
                  >
                    <SelectTrigger className="bg-[#0f172a] border-gray-700 w-full">
                      <SelectValue placeholder="Select scoring method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (Fixed points per question)</SelectItem>
                      <SelectItem value="weighted">Weighted (Different points per question)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {quizData.scoring.method === "standard" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Points per Question
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={quizData.scoring.pointsPerQuestion}
                      onChange={(e) => updateQuizData("scoring", { pointsPerQuestion: Number(e.target.value) })}
                      className="bg-[#0f172a] border-gray-700"
                    />
                  </div>
                )}
              </div>

              <Separator className="bg-gray-700 my-4" />

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                  Penalize Wrong Answers
                </label>
                <Switch
                  checked={quizData.scoring.penalizeWrong}
                  onCheckedChange={(checked) => updateQuizData("scoring", { penalizeWrong: checked })}
                />
              </div>

              {quizData.scoring.penalizeWrong && (
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Penalty Amount
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={quizData.scoring.penaltyAmount}
                    onChange={(e) => updateQuizData("scoring", { penaltyAmount: Number(e.target.value) })}
                    className="bg-[#0f172a] border-gray-700 w-full md:w-1/3"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
            Publishing Settings
          </h2>

          <Card className="bg-[#1e293b] border-gray-800 text-white">
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Quiz Publish Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full bg-[#0f172a] border-gray-700">
                        {quizData.publishing.publishDate
                          ? format(new Date(quizData.publishing.publishDate), "dd/MM/yyyy")
                          : "Quiz Publish Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={quizData.publishing.publishDate ? new Date(quizData.publishing.publishDate) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            updateQuizData("metadata", { startDate: date.toISOString().split("T")[0] })
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Quiz Publish Time
                  </label>
                  <Input
                    type="time"
                    value={quizData.publishing.publishTime}
                    onChange={(e) => updateQuizData("publishing", { publishTime: e.target.value })}
                    className="bg-[#0f172a] border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Visibility
                  </label>
                  <Select
                    value={quizData.publishing.visibility}
                    onValueChange={(value) => updateQuizData("publishing", { visibility: value })}
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
                  checked={quizData.publishing.showResultsAfterSubmission}
                  onCheckedChange={(checked) => updateQuizData("publishing", { showResultsAfterSubmission: checked })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Results Publish Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full bg-[#0f172a] border-gray-700">
                        {quizData.publishing.resultsPublishDate
                          ? format(new Date(quizData.publishing.resultsPublishDate), "dd/MM/yyyy")
                          : "Results Publish Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={quizData.publishing.resultsPublishDate ? new Date(quizData.publishing.resultsPublishDate) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            updateQuizData("metadata", { startDate: date.toISOString().split("T")[0] })
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Results Publish Time
                  </label>
                  <Input
                    type="time"
                    value={quizData.publishing.resultsPublishTime}
                    onChange={(e) => updateQuizData("publishing", { resultsPublishTime: e.target.value })}
                    className="bg-[#0f172a] border-gray-700"
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
                    checked={quizData.publishing.postQuizFeedback}
                    onCheckedChange={(checked) => updateQuizData("publishing", { postQuizFeedback: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                    Allow quiz retake
                  </label>
                  <Switch
                    checked={quizData.publishing.allowRetake}
                    onCheckedChange={(checked) => updateQuizData("publishing", { allowRetake: checked })}
                  />
                </div>
              </div>

              {quizData.publishing.allowRetake && (
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Number of retakes allowed
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={quizData.publishing.retakeCount}
                    onChange={(e) => updateQuizData("publishing", { retakeCount: Number(e.target.value) })}
                    className="bg-[#0f172a] border-gray-700 w-full md:w-1/3"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <div className="left-0 right-0 bg-[#0f172a] border-t border-gray-800 p-4 flex justify-end">
          <Button onClick={saveQuiz} size="lg" variant="secondary" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Quiz
          </Button>
        </div>
      </div>
    </div>
  )
}
