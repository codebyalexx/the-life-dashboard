import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function HabitsLoading() {
  return (<div>
    <div className="flex items-center justify-between mb-4">
      <Skeleton className={buttonVariants({
        variant: 'ghost'
      })} />
      <Skeleton className="h-10 w-[250px]" />
      <Skeleton className={buttonVariants({
        variant: 'ghost'
      })} />
    </div>
    <div className="mb-4">
      <Skeleton className="w-full h-12 mb-2" />
      <Skeleton className="w-full h-12 mb-2" />
      <Skeleton className="w-full h-12 mb-2" />
      <Skeleton className="w-full h-12 mb-2" />
      <Skeleton className="w-full h-12 mb-2" />
    </div>
  </div>)
}