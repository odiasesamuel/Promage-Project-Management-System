import { Skeleton } from "@/components/ui/skeleton";

export const OverviewTab = () => {
  return (
    <div className="flex justify-between">
      <Skeleton className="w-[32%] h-[200px] rounded-xl" />
      <Skeleton className="w-[32%] h-[200px] rounded-xl" />
      <Skeleton className="w-[32%] h-[200px] rounded-xl" />
    </div>
  );
};
