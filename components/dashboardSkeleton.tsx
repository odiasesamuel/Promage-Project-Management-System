import { Skeleton } from "@/components/ui/skeleton";

export const OverviewTabSkeleton = () => {
  return (
    <div className="flex justify-between">
      <Skeleton className="w-[32%] h-[200px] rounded-xl" />
      <Skeleton className="w-[32%] h-[200px] rounded-xl" />
      <Skeleton className="w-[32%] h-[200px] rounded-xl" />
    </div>
  );
};

export const ProjectTabSkeleton = () => {
  return <Skeleton className="w-[500px] h-[500px] rounded-xl" />;
};

export const ProgressTabSkeleton = () => {
  return <Skeleton className="w-full h-full rounded-xl" />;
};

export const ProjectAmdProgressSkeleton = () => {
  return (
    <div className="flex justify-between">
      <Skeleton className="w-[64%] h-[330px] rounded-xl" />
      <Skeleton className="w-[34%] h-[330px] rounded-xl" />
    </div>
  );
};
