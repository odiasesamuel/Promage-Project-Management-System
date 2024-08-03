"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createNewProjectSchema } from "@/lib/formSchema";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReactSelect, { MultiValue } from "react-select";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNewProject, reviewProjectAction, deleteProjectAction } from "@/actions/project";
import { useToast } from "@/components/ui/use-toast";
import { EmployeeListType } from "@/app/(application)/layout";
import { EditableProjectData } from "../columns";
import DeleteProjectConfirmation from "../deleteProjectConfirmation";

type NewProjectFormProps = {
  employeeList: EmployeeListType[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editableProjectData?: EditableProjectData;
};

export type EmployeeOptions = {
  value: string;
  label: string;
};

export function NewProjectForm({ employeeList, setOpen, editableProjectData }: NewProjectFormProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<MultiValue<EmployeeOptions>>(editableProjectData?.projectTeam ? JSON.parse(editableProjectData.projectTeam) : []);
  const [progressDisabled, setProgressDisabled] = useState<boolean>(false);

  const selectedEmployeeHandler = (selectedOptions: MultiValue<EmployeeOptions>) => {
    setSelectedEmployee(selectedOptions);
  };

  const employeeOptions = employeeList.map((employee) => ({
    value: employee.id,
    label: employee.employee_name,
  }));

  const form = useForm<z.infer<typeof createNewProjectSchema>>({
    resolver: zodResolver(createNewProjectSchema),
    defaultValues: {
      projectName: editableProjectData?.projectName,
      projectManager: editableProjectData?.projectManager,
      revenue: editableProjectData?.revenue,
      status: editableProjectData?.status,
      progress: editableProjectData?.progress,
      dueDate: editableProjectData?.dueDate && new Date(editableProjectData.dueDate),
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof createNewProjectSchema>) {
    // Submit and Create a new Project
    const projectManager = employeeList.find((employee) => employee.employee_name === values.projectManager);
    const projectManagerId = projectManager?.id;
    try {
      if (editableProjectData) {
        await reviewProjectAction(
          {
            organisation_id: employeeList[0].organisation_id,
            ...values,
            dueDate: values.dueDate.toISOString(),
          },
          selectedEmployee,
          projectManagerId,
          editableProjectData.project_id
        );
        setOpen(false);
      } else {
        await createNewProject(
          {
            organisation_id: employeeList[0].organisation_id,
            ...values,
            dueDate: values.dueDate.toISOString(),
          },
          selectedEmployee,
          projectManagerId
        );
        setOpen(false);
        toast({
          title: "Project created successfully",
          description: "Your project has been created.",
        });
      }
    } catch (error) {
      setOpen(false);
      if (editableProjectData) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to review project. Please try again.",
          duration: 3000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create project. Please try again.",
          duration: 3000,
        });
      }
    }
  }

  async function deleteProjectHandler(e: React.MouseEvent<HTMLButtonElement>) {
    setOpen(false);
    const organisation_id = employeeList[0].organisation_id;
    const project_id = editableProjectData?.project_id;
    const result = await deleteProjectAction(organisation_id, project_id);
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
        duration: 3000,
      });
    }
  }

  function revenueValidation(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    const regex = /^[0-9]*$/;
    if (!regex.test(value)) {
      e.currentTarget.value = value.replace(/[^0-9]/g, "");
    }
  }

  function progressValidation(e: React.FormEvent<HTMLInputElement>) {
    const inputValue = e.currentTarget.value;
    const regex = /^(100|[1-9]?[0-9])$/;
    if (!regex.test(inputValue)) {
      e.currentTarget.value = "";
    }
  }

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "status" && value.status === "Completed") {
        form.setValue("progress", 100);
        setProgressDisabled(true);
      } else if (name === "status") {
        setProgressDisabled(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-wrap gap-4 justify-between">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem className="text-black w-[48%]">
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Nesla Web Application" {...field} className="p-3" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectManager"
          render={({ field }) => (
            <FormItem className="w-[48%]">
              <FormLabel>Project Manager</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Samuel Adegoke" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employeeList.map((employee) => (
                    <SelectItem key={employee.id} value={employee.employee_name}>
                      {employee.employee_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="revenue"
          render={({ field }) => (
            <FormItem className="text-black w-[48%]">
              <FormLabel>Revenue in dollars</FormLabel>
              <FormControl>
                <Input placeholder="60000000" {...field} className="p-3" onInput={revenueValidation} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-[48%]">
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="On going" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="On going">On going</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                  <SelectItem value="At risk">At risk</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="progress"
          render={({ field }) => (
            <FormItem className="text-black w-[48%]">
              <FormLabel>Progress</FormLabel>
              <FormControl>
                <Input placeholder="70" {...field} className="p-3" onInput={progressValidation} disabled={progressDisabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent side="top" className="w-auto p-0 pointer-events-auto" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full text-sm text-black">
          <label htmlFor="projectTeam" className="font-medium">
            Project Team
          </label>
          <ReactSelect isMulti name="projectTeam" options={employeeOptions} className="basic-multi-select mt-2" classNamePrefix="select" onChange={selectedEmployeeHandler} defaultValue={selectedEmployee} />
        </div>

        {editableProjectData ? (
          <div className="w-full flex justify-between mt-5">
            <Button type="submit" className="w-[45%]">
              Review Project
            </Button>
            <DeleteProjectConfirmation deleteProjectHandler={deleteProjectHandler}>
              <Button type="button" variant="destructive" className="w-[45%]">
                Delete Project
              </Button>
            </DeleteProjectConfirmation>
          </div>
        ) : (
          <Button type="submit" className="w-full mt-5">
            Create Project
          </Button>
        )}
      </form>
    </Form>
  );
}

export default NewProjectForm;
