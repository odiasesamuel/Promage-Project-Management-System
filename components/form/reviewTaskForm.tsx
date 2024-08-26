"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { reviewTaskFormSchema } from "@/lib/formSchema";
import { reviewTaskAction, deleteTaskAction, createNewTask } from "@/actions/task";
import { EmployeeListType } from "@/app/(application)/layout";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { EditableTaskData } from "../task-columns";
import { DeleteProjectOrTaskConfirmation } from "../confirmationDialog";

type ReviewTaskFormType = {
  employeeList: EmployeeListType[];
  editableTaskData?: EditableTaskData;
  assigned_by?: string;
};

const ReviewTaskForm: React.FC<ReviewTaskFormType> = ({ employeeList, editableTaskData, assigned_by }) => {
  const [open, setOpen] = useState(false);
  const organisation_id = employeeList[0].organisation_id;

  const form = useForm<z.infer<typeof reviewTaskFormSchema>>({
    resolver: zodResolver(reviewTaskFormSchema),
    defaultValues: {
      task_description: editableTaskData?.taskDescription,
      assigned_to: editableTaskData?.assignedTo,
      checked: editableTaskData ? editableTaskData.checked : "No",
      status: editableTaskData ? editableTaskData?.status : "On going",
    },
  });

  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof reviewTaskFormSchema>) {
    setOpen(false);
    const result = editableTaskData ? await reviewTaskAction(organisation_id, values, editableTaskData.task_id) : await createNewTask(organisation_id, values, assigned_by!);

    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
        duration: 3000,
      });
    } else {
    }
  }

  async function deleteTaskHandler(e: React.MouseEvent<HTMLButtonElement>) {
    setOpen(false);
    const result = await deleteTaskAction(organisation_id, editableTaskData?.task_id);
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
        duration: 3000,
      });
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {editableTaskData ? (
            <Button variant="secondary" size="sm" className="bg-inherit text-xs border border-[#0000001f] text-black font-normal">
              Review
            </Button>
          ) : (
            <Button>Assign task</Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editableTaskData ? "Review task" : "Assign task"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-wrap gap-4 justify-between">
              <FormField
                control={form.control}
                name="task_description"
                render={({ field }) => (
                  <FormItem className="text-black w-full">
                    <FormLabel>Task description</FormLabel>
                    <FormControl>
                      <Input placeholder="Implement Authentication Module" {...field} className="p-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assigned_to"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Assigned to</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Samuel Adegoke" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employeeList.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.employee_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {editableTaskData && (
                <FormField
                  control={form.control}
                  name="checked"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Checked</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Yes" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {editableTaskData && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="On going" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="In review">In review</SelectItem>
                          <SelectItem value="On going">On going</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {editableTaskData ? (
                <div className="w-full flex justify-between mt-5">
                  <Button type="submit" className="w-[45%]">
                    Review Task
                  </Button>
                  <DeleteProjectOrTaskConfirmation deleteHandler={deleteTaskHandler} content="task">
                    <Button type="button" variant="destructive" className="w-[45%]">
                      Delete Task
                    </Button>
                  </DeleteProjectOrTaskConfirmation>
                </div>
              ) : (
                <Button type="submit" className="w-full mt-5">
                  Assign Task
                </Button>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewTaskForm;
