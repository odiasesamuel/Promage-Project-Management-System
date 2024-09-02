import Image from "next/image";
import { ReveneueMetric, ProjectMetric, ResourceMetric } from "@/components/metrics";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { columns } from "../../../components/columns";
import { DataTable } from "../../../components/data-table";
import OverallProgress from "@/components/overallProgress";
import ProjectWorkload from "@/components/projectWorkload";
import TabContent from "@/components/tabContent";
import revenueIcon from "@/assets/Frame 1171275857.svg";
import projectIcon from "@/assets/Frame 1171275856.svg";
import resourceIcon from "@/assets/Frame 1171275858.svg";

const Home = async () => {
  return (
    <div className="text-black">
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight my-5">Overview</h3>

      <div className="flex justify-between">
        <Card className="w-[32%] h-[200px] bg-[#F2EAE5]">
          <CardHeader className="pt-4 pb-2">
            <CardDescription>
              <Image src={revenueIcon} alt="revenue icon" />
              <p className="mt-4">Total revenue</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReveneueMetric />
          </CardContent>
        </Card>
        <Card className="w-[32%] h-[200px] bg-[#F2EAE5]">
          <CardHeader className="pt-4 pb-2">
            <CardDescription>
              <Image src={projectIcon} alt="project icon" />
              <p className="mt-4">Projects</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectMetric />
          </CardContent>
        </Card>
        <Card className="w-[32%] h-[200px] bg-[#F2EAE5]">
          <CardHeader className="pt-4 pb-2">
            <CardDescription>
              <Image src={resourceIcon} alt="resource icon" />
              <p className="mt-4">Resources</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResourceMetric />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between my-6">
        <Card className="w-[64%] bg-[#F2EAE5]">
          <CardContent>
            <DataTable columns={columns} dataTableHeading={"Project summary"} />
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
            <CardTitle>Task</CardTitle>
          </CardHeader>
          <CardContent>
            <TabContent />
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
