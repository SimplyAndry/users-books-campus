import { Skeleton } from "@/components/ui/skeleton"

export default function UsersLoading() {
  return (
    <div className="flex min-h-screen p-4 bg-gradient-to-br from-[#FFFFFF] to-[#FFEFBA]">
      <div className="grid gap-4">
      <Skeleton className="h-30 w-50 rounded-2xl" />
      <Skeleton className="h-30 w-50 rounded-2xl" />
      <Skeleton className="h-30 w-50 rounded-2xl" />
      <Skeleton className="h-30 w-50 rounded-2xl" />
      </div>
    </div>
  );
}