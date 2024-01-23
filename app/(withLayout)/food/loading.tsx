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
    <Skeleton className="w-[110px] h-4 mb-2" />
    <Skeleton className="w-full mb-6 h-36" />
    <div className="grid grid-cols-2 gap-2">
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
    </div>
  </div>)
}