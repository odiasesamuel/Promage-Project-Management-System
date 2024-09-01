import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse bg-[#F2EAE5]/70", className)} {...props} />;
}

export { Skeleton };
