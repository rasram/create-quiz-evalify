import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export default function Footer() {
  return (
    <div className="left-0 right-0 bg-[#0f172a] border-t border-gray-800 p-4 flex justify-end">
      <Button size="lg" variant="secondary" className="flex items-center gap-2">
        <Save className="h-4 w-4" />
        Save Quiz
      </Button>
    </div>    
  )
}