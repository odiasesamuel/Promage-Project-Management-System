import { getMetrics } from "@/lib/dashboard";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import revenueIcon from "@/assets/Frame 1171275857.svg";
import projectIcon from "@/assets/Frame 1171275856.svg";
import timespentIcon from "@/assets/Frame 1171275859.svg";
import resourceIcon from "@/assets/Frame 1171275858.svg";
import incrementArrow from "@/assets/incrementArrow.svg";
import decrementArrow from "@/assets/decrementArrow.svg";

const Metrics: React.FC<{}> = async () => {
  const metrics = getMetrics();
  // Or using route handlers
//   const response = await fetch('http://localhost:3000/api/metrics');
//   const metricsRouteHandler = await response.json();

  const formatCurrency = (number: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const total_revenue = formatCurrency(metrics[0].total_revenue);
  const currentMonthRevenue = metrics[0].total_revenue;
  const previousMonthRevenue = metrics[1].total_revenue;
  const monthRevenuePercentage = Math.abs((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
  const RevenueArrow = currentMonthRevenue > previousMonthRevenue ? incrementArrow : decrementArrow;

  const currentMonthProject = metrics[0].project;
  const previousMonthProject = metrics[1].project;
  const monthProjectPercentage = Math.abs((currentMonthProject - previousMonthProject) / previousMonthProject) * 100;
  const projectArrow = currentMonthProject > previousMonthProject ? incrementArrow : decrementArrow;

  const currentMonthTime = metrics[0].time;
  const previousMonthTime = metrics[1].time;
  const monthTimePercentage = Math.abs((currentMonthTime - previousMonthTime) / previousMonthTime) * 100;
  const TimeArrow = currentMonthTime > previousMonthTime ? incrementArrow : decrementArrow;

  const currentMonthResource = metrics[0].resource;
  const previousMonthResource = metrics[1].resource;
  const monthResourcePercentage = Math.abs((currentMonthResource - previousMonthResource) / previousMonthResource) * 100;
  const resourceArrow = currentMonthResource > previousMonthResource ? incrementArrow : decrementArrow;

  return (
    <div className="flex justify-between">
      <Card className="w-[24%] h-[200px] bg-[#F2EAE5]">
        <CardHeader className="pt-4 pb-2">
          <CardDescription>
            <Image src={revenueIcon} alt="revenue icon" />
            <p className="mt-4">Total revenue</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold mb-3">{total_revenue}</p>
          <div className="flex gap-x-1">
            <Image src={RevenueArrow} alt="arrow" />
            <p className="text-xs">
              {monthRevenuePercentage.toFixed(2)}% {currentMonthRevenue > previousMonthRevenue ? "increase" : "decrease"} from last month
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[24%] h-[200px] bg-[#F2EAE5]">
        <CardHeader className="pt-4 pb-2">
          <CardDescription>
            <Image src={projectIcon} alt="project icon" />
            <p className="mt-4">Projects</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold mb-3">
            {currentMonthProject}
            <span className="text-base ml-1">/{previousMonthProject}</span>
          </p>

          <div className="flex gap-x-1">
            <Image src={projectArrow} alt="arrow" />
            <p className="text-xs">
              {monthProjectPercentage}% {currentMonthProject > previousMonthProject ? "increase" : "decrease"} from last month
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[24%] h-[200px] bg-[#F2EAE5]">
        <CardHeader className="pt-4 pb-2">
          <CardDescription>
            <Image src={timespentIcon} alt="revenue icon" />
            <p className="mt-4">Time spent</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold mb-3">
            {currentMonthTime}
            <span className="text-base ml-1">/{previousMonthTime}</span>
          </p>
          <div className="flex gap-x-1">
            <Image src={TimeArrow} alt="arrow" />
            <p className="text-xs">
              {monthTimePercentage.toFixed(2)}% {currentMonthTime > previousMonthTime ? "increase" : "decrease"} from last month
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[24%] h-[200px] bg-[#F2EAE5]">
        <CardHeader className="pt-4 pb-2">
          <CardDescription>
            <Image src={resourceIcon} alt="revenue icon" />
            <p className="mt-4">Resources</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold mb-3">
            {currentMonthResource}
            <span className="text-base ml-1">/{previousMonthResource}</span>
          </p>
          <div className="flex gap-x-1">
            <Image src={resourceArrow} alt="arrow" />
            <p className="text-xs">
              {Math.round(monthResourcePercentage)}% {currentMonthResource > previousMonthResource ? "increase" : "decrease"} from last month
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Metrics;
