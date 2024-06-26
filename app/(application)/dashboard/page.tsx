import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "../../../components/columns";
import { DataTable } from "../../../components/data-table";
import OverallProgress from "@/components/overallProgress";
import ProjectWorkload from "@/components/projectWorkload";
import projectList from "@/data/projectList.json";
import TaskList from "@/components/taskList";
import revenueIcon from "@/assets/Frame 1171275857.svg";
import projectIcon from "@/assets/Frame 1171275856.svg";
import timespentIcon from "@/assets/Frame 1171275859.svg";
import resourceIcon from "@/assets/Frame 1171275858.svg";
import incrementArrow from "@/assets/incrementArrow.svg";
import decrementArrow from "@/assets/decrementArrow.svg";

import Link from "next/link";
import Image from "next/image";

const Home = () => {
  const data = projectList;

  return (
    <div className="text-black">
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight my-5">Overview</h3>
      <div className="flex justify-between">
        <Card className="w-[24%] h-[200px] bg-[#F2EAE5]">
          <CardHeader className="pt-4 pb-2">
            <CardDescription>
              <Image src={revenueIcon} alt="revenue icon" />
              <p className="mt-4">Total revenue</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold mb-3">$53,00989</p>
            <div className="flex gap-x-1">
              <Image src={incrementArrow} alt="increment arrow" />
              <p className="text-xs">12% increase from last month</p>
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
              95<span className="text-base ml-1">/100</span>
            </p>

            <div className="flex gap-x-1">
              <Image src={decrementArrow} alt="increment arrow" />
              <p className="text-xs">10% decrease from last month</p>
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
              1022<span className="text-base ml-1">/1300</span>
            </p>
            <div className="flex gap-x-1">
              <Image src={incrementArrow} alt="increment arrow" />
              <p className="text-xs">8% increase from last month</p>
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
              101<span className="text-base ml-1">/120</span>
            </p>
            <div className="flex gap-x-1">
              <Image src={incrementArrow} alt="increment arrow" />
              <p className="text-xs">2% increase from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between my-6">
        <Card className="w-[64%] bg-[#F2EAE5]">
          <CardContent>
            <DataTable columns={columns} data={data} className="" />
          </CardContent>
        </Card>
        <Card className="w-[34%] h-[330px] bg-[#F2EAE5]">
          <CardHeader className="py-8">
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent className="px-3">
            <OverallProgress />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between my-6">
        <Card className="w-[64%] bg-[#F2EAE5] self-start min-h-[300px]">
          <CardHeader className="pt-6 pb-4">
            <CardTitle>Today Task</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="important" className="w-full">
              <TabsList>
                <TabsTrigger value="all">
                  <span>All</span>
                  <span className="ml-2 rounded-full bg-[#DEDCE5] w-5 h-5 flex justify-center items-center text-[0.7rem] text-[#2B5CE6]">10</span>
                </TabsTrigger>
                <TabsTrigger value="important">
                  <span>Important</span>
                  {/* <span className="ml-2 rounded-full bg-[#DEDCE5] w-5 h-5 flex justify-center items-center text-[0.7rem] text-[#2B5CE6]">05</span> */}
                </TabsTrigger>
                <TabsTrigger value="note">
                  <span>Notes</span>
                  <span className="ml-2 rounded-full bg-[#DEDCE5] w-5 h-5 flex justify-center items-center text-[0.7rem] text-[#2B5CE6]">02</span>
                </TabsTrigger>
                <TabsTrigger value="link">
                  <span>Links</span>
                  <span className="ml-2 rounded-full bg-[#DEDCE5] w-5 h-5 flex justify-center items-center text-[0.7rem] text-[#2B5CE6]">17</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all">All tab</TabsContent>
              <TabsContent value="important" className="mt-3">
                <TaskList />
              </TabsContent>
              <TabsContent value="note">Note tab</TabsContent>
              <TabsContent value="link">link tab</TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="w-[34%] min-h-[330px] bg-[#F2EAE5]">
          <CardHeader className="py-8">
            <CardTitle>Project Workload</CardTitle>
          </CardHeader>
          <CardContent className="px-3">
            <ProjectWorkload />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
