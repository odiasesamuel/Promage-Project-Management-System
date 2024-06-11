import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
  variants: {
    variant: {
      success: "border-transparent bg-[#CBDAC4] text-[#1E9352] rounded-full",
      warning: "border-transparent bg-[#EFE0C5] text-[#DFA510] rounded-full",
      danger: "border-transparent bg-[#F1C6C1] text-[#EE201C] rounded-full",
      onGoing: "border-transparent bg-[#F0D1C4] text-[#E65F2B] rounded-full",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
