"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { getQuarter, getPreviousQuarter } from "@/utils/dateUtils";
import Image from "next/image";
import revenueIcon from "@/assets/Frame 1171275857.svg";
import projectIcon from "@/assets/Frame 1171275856.svg";
import timespentIcon from "@/assets/Frame 1171275859.svg";
import resourceIcon from "@/assets/Frame 1171275858.svg";
import incrementArrow from "@/assets/incrementArrow.svg";
import decrementArrow from "@/assets/decrementArrow.svg";
import { useEmployeeContext } from "@/context/employeeContext";

export type MetricsType = {
  metric_id: number;
  organisation_id: string;
  quarter: string;
  total_revenue: number;
  project: number;
  time: number;
  resource: number;
};

export const ReveneueMetric = () => {
  const { isLoading, metrics } = useEmployeeContext();

  if (isLoading) return;

  const currentDate = new Date();
  const currentQuarter = getQuarter(currentDate);
  const previousQuarter = getPreviousQuarter(currentQuarter);

  const currentQuarterMetrics = metrics.find((metric) => metric.quarter === currentQuarter);
  const previousQuarterMetrics = metrics.find((metric) => metric.quarter === previousQuarter);

  if (!currentQuarterMetrics || !previousQuarterMetrics) return <div>No data available for the current or previous quarters.</div>;

  const formatCurrency = (number: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const total_revenue = formatCurrency(currentQuarterMetrics.total_revenue);
  const currentQuarterRevenue = currentQuarterMetrics.total_revenue;
  const previousQuarterRevenue = previousQuarterMetrics.total_revenue;
  const revenuePercentageChange = previousQuarterRevenue === 0 ? 100 : Math.abs((currentQuarterRevenue - previousQuarterRevenue) / previousQuarterRevenue) * 100;
  const revenueArrow = currentQuarterRevenue > previousQuarterRevenue ? incrementArrow : decrementArrow;

  return (
    <>
      <p className="text-2xl font-semibold mb-3">
        {total_revenue}
        <span className="text-base ml-1">/{previousQuarterRevenue}</span>
      </p>
      <div className="flex gap-x-1">
        <Image src={revenueArrow} alt="arrow" />
        <p className="text-xs">
          {revenuePercentageChange.toFixed(2)}% {currentQuarterRevenue > previousQuarterRevenue ? "increase" : "decrease"} from last quarter ({previousQuarter})
        </p>
      </div>
    </>
  );
};

export const ProjectMetric = () => {
  const { isLoading, metrics } = useEmployeeContext();

  if (isLoading) return;

  const currentDate = new Date();
  const currentQuarter = getQuarter(currentDate);
  const previousQuarter = getPreviousQuarter(currentQuarter);

  const currentQuarterMetrics = metrics.find((metric) => metric.quarter === currentQuarter);
  const previousQuarterMetrics = metrics.find((metric) => metric.quarter === previousQuarter);

  if (!currentQuarterMetrics || !previousQuarterMetrics) return <div>No data available for the current or previous quarters.</div>;

  const currentQuarterProject = currentQuarterMetrics.project;
  const previousQuarterProject = previousQuarterMetrics.project;
  const projectPercentageChange = previousQuarterProject === 0 ? 100 : Math.abs((currentQuarterProject - previousQuarterProject) / previousQuarterProject) * 100;
  const projectArrow = currentQuarterProject > previousQuarterProject ? incrementArrow : decrementArrow;

  return (
    <>
      <p className="text-2xl font-semibold mb-3">
        {currentQuarterProject}
        <span className="text-base ml-1">/{previousQuarterProject}</span>
      </p>
      <div className="flex gap-x-1">
        <Image src={projectArrow} alt="arrow" />
        <p className="text-xs">
          {projectPercentageChange.toFixed(2)}% {currentQuarterProject > previousQuarterProject ? "increase" : "decrease"} from last quarter ({previousQuarter})
        </p>
      </div>
    </>
  );
};

export const ResourceMetric = () => {
  const { isLoading, metrics } = useEmployeeContext();

  if (isLoading) return;

  const currentDate = new Date();
  const currentQuarter = getQuarter(currentDate);
  const previousQuarter = getPreviousQuarter(currentQuarter);

  const currentQuarterMetrics = metrics.find((metric) => metric.quarter === currentQuarter);
  const previousQuarterMetrics = metrics.find((metric) => metric.quarter === previousQuarter);

  if (!currentQuarterMetrics || !previousQuarterMetrics) return <div>No data available for the current or previous quarters.</div>;

  const currentQuarterResource = currentQuarterMetrics.resource;
  const previousQuarterResource = previousQuarterMetrics.resource;
  const resourcePercentageChange = previousQuarterResource === 0 ? 100 : Math.abs((currentQuarterResource - previousQuarterResource) / previousQuarterResource) * 100;
  const resourceArrow = currentQuarterResource > previousQuarterResource ? incrementArrow : decrementArrow;
  return (
    <>
      <p className="text-2xl font-semibold mb-3">
        {currentQuarterResource}
        <span className="text-base ml-1">/{previousQuarterResource}</span>
      </p>
      <div className="flex gap-x-1">
        <Image src={resourceArrow} alt="arrow" />
        <p className="text-xs">
          {resourcePercentageChange.toFixed(2)}% {currentQuarterResource > previousQuarterResource ? "increase" : "decrease"} from last quarter ({previousQuarter})
        </p>
      </div>
    </>
  );
};
