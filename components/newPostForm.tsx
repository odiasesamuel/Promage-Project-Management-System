"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createNewProjectSchema } from "@/lib/formSchema";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNewProject } from "@/actions/project";
import { useToast } from "@/components/ui/use-toast";

type NewPostFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function NewPostForm({ setOpen }: NewPostFormProps) {
  const form = useForm<z.infer<typeof createNewProjectSchema>>({
    resolver: zodResolver(createNewProjectSchema),
  });

  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof createNewProjectSchema>) {
    try {
      await createNewProject({
        ...values,
        dueDate: values.dueDate.toISOString(),
      });
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
        duration: 2000,
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
            <FormItem className="text-black w-[48%]">
              <FormLabel>Project Manager</FormLabel>
              <FormControl>
                <Input placeholder="Samuel Adegoke" {...field} className="p-3" />
              </FormControl>
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
            <FormItem className="text-black w-[48%]">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input placeholder="Completed, On going, Delayed, At risk" {...field} className="p-3" />
              </FormControl>
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
        <FormField
          control={form.control}
          name="revenue"
          render={({ field }) => (
            <FormItem className="text-black w-[48%]">
              <FormLabel>Revenue</FormLabel>
              <FormControl>
                <Input placeholder="60000000" {...field} className="p-3" onInput={revenueValidation} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create Project
        </Button>
      </form>
    </Form>
  );
}

export default NewPostForm;
