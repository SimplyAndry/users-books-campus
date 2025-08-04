
import { Card, CardContent } from "@/components/ui/card";

interface UserCardProps {
  name: string;
  avatar: string;
}

export function UserCard({ name, avatar }: UserCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4 flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{name}</p>
        </div>
      </CardContent>
    </Card>
  );
}