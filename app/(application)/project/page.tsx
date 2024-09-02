import { columns } from "../../../components/columns";
import { DataTable } from "../../../components/data-table";
import { Card, CardContent } from "@/components/ui/card";

const ProjectPage = async () => {
  return (
    <>
      <Card className="bg-[#F2EAE5] mt-12">
        <CardContent>
          <DataTable columns={columns} />
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectPage;
