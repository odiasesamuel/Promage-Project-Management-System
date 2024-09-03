import { columns } from "../../../components/task-columns";
import { DataTable } from "../../../components/task-data-table";
import { Card, CardContent } from "@/components/ui/card";

const TaskPage = async () => {
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

export default TaskPage;
