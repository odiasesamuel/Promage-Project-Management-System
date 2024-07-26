"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNewProject } from "@/actions/project";
import { useToast } from "@/components/ui/use-toast";
import { EmployeeListType } from "@/app/(application)/layout";

type NewProjectFormProps = {
  employeeList: EmployeeListType[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type employeeOptions = {
  value: string;
  label: string;
};

export function NewProjectForm({ employeeList, setOpen }: NewProjectFormProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<MultiValue<employeeOptions>>();
  const selectedEmployeeHandler = (selectedOptions: MultiValue<employeeOptions>) => {
    setSelectedEmployee(selectedOptions);
  };

  const employeeOptions = employeeList.map((employee) => ({
    value: employee.id,
    label: employee.employee_name,
  }));

  const form = useForm<z.infer<typeof createNewProjectSchema>>({
    resolver: zodResolver(createNewProjectSchema),
  });

  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof createNewProjectSchema>) {
    try {
      await createNewProject(
        {
          organisation_id: employeeList[0].organisation_id,
          ...values,
          dueDate: values.dueDate.toISOString(),
        },
        selectedEmployee
      );
      setOpen(false);
      toast({
        title: "Project created successfully",
        description: "Your project has been created.",
      });
    } catch (error) {
      setOpen(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create project. Please try again.",
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full flex flex-wrap gap-4 justify-between">
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
                <Input placeholder="70%" {...field} className="p-3" onInput={progressValidation} />
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
          <ReactSelect isMulti name="projectTeam" options={employeeOptions} className="basic-multi-select mt-2" classNamePrefix="select" onChange={selectedEmployeeHandler} />
        </div>

        <Button type="submit" className="w-full">
          Create Project
        </Button>
      </form>
    </Form>
  );
}

export default NewProjectForm;
