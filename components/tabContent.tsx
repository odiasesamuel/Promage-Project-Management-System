import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "@/components/taskList";
import NoteTabContent from "./noteTabContent";

const TabContent: React.FC<{}> = async () => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">
          <span>All</span>
        </TabsTrigger>
        <TabsTrigger value="note">
          <span>Notes</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-3">
        <TaskList />
      </TabsContent>
      <TabsContent value="note">
        <NoteTabContent />
      </TabsContent>
    </Tabs>
  );
};

export default TabContent;
