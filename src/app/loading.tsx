import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#FFFFFF] to-[#FFEFBA]">
      <Skeleton className="h-24 w-24 rounded-full" />
    </div>
  );
}