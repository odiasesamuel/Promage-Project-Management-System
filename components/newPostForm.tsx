"use client";

import { useRouter, redirect } from "next/navigation";
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

export function NewPostForm() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof createNewProjectSchema>>({
    resolver: zodResolver(createNewProjectSchema),
    // defaultValues: {
    //   projectName: "HMS",
    // },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createNewProjectSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
              <FormLabel>Revenue</FormLabel>
              <FormControl>
                <Input type="number" placeholder="60000000" {...field} className="p-3" />
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
                <Input type="number" placeholder="70%" {...field} className="p-3" />
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
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus  />
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
                <Input type="number" placeholder="60000000" {...field} className="p-3" />
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
