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

type MetricsProps = {
  metricsData: MetricsType[];
};

export type MetricsType = {
  metric_id: number;
  organisation_id: string;
  quarter: string;
  total_revenue: number;
  project: number;
  time: number;
  resource: number;
};

const Metrics: React.FC<MetricsProps> = ({ metricsData }) => {
  // using route handlers To get the list of employees and their organisations
  // const response = await fetch("http://localhost:3000/api/user_list");
  // const metricsRouteHandler = await response.json();
  // console.log(metricsRouteHandler);

  // const metrics = useRef<MetricsType[]>(metricsData);
  const [metrics, setMetrics] = useState<MetricsType[]>(metricsData);

  useEffect(() => {
    const channel = supabase
      .channel("metric-channel")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "metric" }, (payload) => {
        const newMetric = payload.new as MetricsType;

        setMetrics((prevMetrics) => {
          let updatedMetrics;

          updatedMetrics = prevMetrics.map((metric) => (metric.metric_id === newMetric.metric_id ? newMetric : metric));

          return updatedMetrics;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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

  const currentQuarterProject = currentQuarterMetrics.project;
  const previousQuarterProject = previousQuarterMetrics.project;
  const projectPercentageChange = previousQuarterProject === 0 ? 100 : Math.abs((currentQuarterProject - previousQuarterProject) / previousQuarterProject) * 100;
  const projectArrow = currentQuarterProject > previousQuarterProject ? incrementArrow : decrementArrow;

  const currentQuarterTime = currentQuarterMetrics.time;
  const previousQuarterTime = previousQuarterMetrics.time;
  const timePercentageChange = previousQuarterTime === 0 ? 100 : Math.abs((currentQuarterTime - previousQuarterTime) / previousQuarterTime) * 100;
  const timeArrow = currentQuarterTime > previousQuarterTime ? incrementArrow : decrementArrow;

  const currentQuarterResource = currentQuarterMetrics.resource;
  const previousQuarterResource = previousQuarterMetrics.resource;
  const resourcePercentageChange = previousQuarterResource === 0 ? 100 : Math.abs((currentQuarterResource - previousQuarterResource) / previousQuarterResource) * 100;
  const resourceArrow = currentQuarterResource > previousQuarterResource ? incrementArrow : decrementArrow;

  return (
    <div className="flex flex-wrap gap-4">
      <Card className="w-[32%] xl:w-[100%] h-[200px] bg-[#F2EAE5]">
        <CardHeader className="pt-4 pb-2">
          <CardDescription>
            <Image src={revenueIcon} alt="revenue icon" />
            <p className="mt-4">Total revenue</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold mb-3">
            {total_revenue}
            <span className="text-base ml-1">/{formatCurrency(previousQuarterRevenue)}</span>
          </p>
          <div className="flex gap-x-1">
            <Image src={revenueArrow} alt="arrow" />
            <p className="text-xs">
              {revenuePercentageChange.toFixed(2)}% {currentQuarterRevenue > previousQuarterRevenue ? "increase" : "decrease"} from last quarter ({previousQuarter})
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[32%] xl:w-[100%] h-[200px] bg-[#F2EAE5]">
        <CardHeader className="pt-4 pb-2">
          <CardDescription>
            <Image src={projectIcon} alt="project icon" />
            <p className="mt-4">Projects</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
      {/* Implement Time sheet later */}
      {/* <Card className="w-[24%] h-[200px] bg-[#F2EAE5]">
        <CardHeader className="pt-4 pb-2">
          <CardDescription>
            <Image src={timespentIcon} alt="time spent icon" />
            <p className="mt-4">Time spent</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold mb-3">
            {currentQuarterTime}
            <span className="text-base ml-1">/{previousQuarterTime}</span>
          </p>
          <div className="flex gap-x-1">
            <Image src={timeArrow} alt="arrow" />
            <p className="text-xs">
              {timePercentageChange.toFixed(2)}% {currentQuarterTime > previousQuarterTime ? "increase" : "decrease"} from last quarter ({previousQuarter})
            </p>
          </div>
        </CardContent>
      </Card> */}
      <Card className="w-[32%] xl:w-[100%] h-[200px] bg-[#F2EAE5]">
        <CardHeader className="pt-4 pb-2">
          <CardDescription>
            <Image src={resourceIcon} alt="resource icon" />
            <p className="mt-4">Resources</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Metrics;
