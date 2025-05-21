import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

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
                value={scoringMethod}
                onValueChange={(value) => setScoringMethod(value)}
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

            {scoringMethod === "standard" && (
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Points per Question
                </label>
                <Input
                  type="number"
                  min="1"
                  value={pointsPerQuestion}
                  onChange={(e) => setPointsPerQuestion(Number(e.target.value))}
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
              checked={penalizeWrong}
              onCheckedChange={(checked) => setPenalizeWrong(checked)}
            />
          </div>

          {penalizeWrong && (
            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Penalty Amount
              </label>
              <Input
                type="number"
                min="0"
                value={penaltyAmount}
                onChange={(e) => setPenaltyAmount(Number(e.target.value))}
                className="bg-[#0f172a] border-gray-700 w-full md:w-1/3"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}