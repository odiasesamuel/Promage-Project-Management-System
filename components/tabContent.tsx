import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "@/components/taskList";
import NoteTabContent from "./noteTabContent";
import { TaskListType } from "@/components/taskList";
import { getNoteContent } from "@/lib/task";

type TabContentType = {
  taskList: TaskListType[];
  organisation_id: string;
  employee_id: string;
};

type NoteDataType = {
  id: number;
  organisation_id: string;
  employee_id: string;
  note: string;
};

const TabContent: React.FC<TabContentType> = async ({ taskList, organisation_id, employee_id }) => {
  const note: NoteDataType = await getNoteContent(organisation_id, employee_id);
  const noteContent = note.note;

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
        <TaskList data={taskList} organisation_id={organisation_id} employee_id={employee_id} />
      </TabsContent>
      <TabsContent value="note">
        <NoteTabContent organisation_id={organisation_id} employee_id={employee_id} defaultNoteContent={noteContent} />
      </TabsContent>
    </Tabs>
  );
};

export default TabContent;
