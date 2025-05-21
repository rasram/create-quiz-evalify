import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface TopBarProps {
  username: string;
}

export default function TopBar({ username }: TopBarProps) {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 z-10 bg-[#0f172a] mb-12">
      <h1 className="text-2xl md:text-3xl font-semibold text-white">
        Create Quiz
      </h1>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="avatar.jpg" alt="User Avatar" />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
