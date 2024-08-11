import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "@/components/taskList";
import { TaskListType } from "@/components/taskList";

type TabContentType = {
  taskList: TaskListType[];
  organisation_id: string;
  employee_id: string;
};

const TabContent: React.FC<TabContentType> = ({ taskList, organisation_id, employee_id }) => {
  return (
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
        <TaskList data={taskList} organisation_id={organisation_id} employee_id={employee_id} />
      </TabsContent>
      <TabsContent value="note">Note tab</TabsContent>
      <TabsContent value="link">link tab</TabsContent>
    </Tabs>
  );
};

export default TabContent;
