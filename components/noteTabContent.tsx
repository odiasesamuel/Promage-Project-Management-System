"use client";

import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { saveNoteAction, clearNoteAction } from "@/actions/task";
import { useToast } from "@/components/ui/use-toast";

type NoteTabContentType = {
  organisation_id: string;
  employee_id: string;
  defaultNoteContent: string;
};

const NoteTabContent: React.FC<NoteTabContentType> = ({ organisation_id, employee_id, defaultNoteContent }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { toast } = useToast();
  const saveNoteHandler = async () => {
    const currentNoteContent = textareaRef.current ? textareaRef.current.value : defaultNoteContent;
    const result = await saveNoteAction(organisation_id, employee_id, currentNoteContent);
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
        duration: 3000,
      });
    }
  };

  const clearNoteHandler = async () => {
    const result = await clearNoteAction(organisation_id, employee_id);
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
        duration: 3000,
      });
    }
  };

  return (
    <div className="grid w-full gap-3 mt-3">
      <Textarea placeholder="Jot down your thoughts, reminders, or key points here..." rows={5} defaultValue={defaultNoteContent} ref={textareaRef} />
      <div className="ml-auto">
        <Button onClick={saveNoteHandler} className="mr-3">
          Save note
        </Button>
        <Button onClick={clearNoteHandler} variant="destructive">
          Clear note
        </Button>
      </div>
    </div>
  );
};

export default NoteTabContent;
