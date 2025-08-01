import { Card, CardContent } from "@/components/ui/card";

interface BookCardProps {
  title: string;
  userFullName: string;
}

export function BookCard({ title, userFullName }: BookCardProps) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">Written by: {userFullName}</p>
      </CardContent>
    </Card>
  );
}