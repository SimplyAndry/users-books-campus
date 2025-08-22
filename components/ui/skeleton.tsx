import { cn } from "@/src/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-stone-500 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
