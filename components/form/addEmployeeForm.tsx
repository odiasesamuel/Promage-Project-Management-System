"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { employeeInfoSignUpFormSchema } from "@/lib/formSchema";
import { addNewEmployee } from "@/actions/employee";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

type AddEmployeeForm = {
  organisation_id: string;
};

const AddEmployeeForm: React.FC<AddEmployeeForm> = ({ organisation_id }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof employeeInfoSignUpFormSchema>>({
    resolver: zodResolver(employeeInfoSignUpFormSchema),
    defaultValues: {
      employee_name: "",
      employee_email: "",
      job_title: "",
    },
  });

  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof employeeInfoSignUpFormSchema>) {
    setIsLoading(true);
    const result = await addNewEmployee(organisation_id, values);
    setOpen(false);
    setIsLoading(false);
    form.reset();
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

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add employee</Button>
        </DialogTrigger>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Add a new employee</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="employee_name"
                  render={({ field }) => (
                    <FormItem className="text-black w-full">
                      <FormLabel>Employee name</FormLabel>
                      <FormControl>
                        <Input placeholder="Kunle Ojo" {...field} className="p-3" aria-label="Employee Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employee_email"
                  render={({ field }) => (
                    <FormItem className="text-black w-full">
                      <FormLabel>Employee email</FormLabel>
                      <FormControl>
                        <Input placeholder="kunleojo@gmail.com" {...field} className="p-3" aria-label="Employee Email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="job_title"
                  render={({ field }) => (
                    <FormItem className="text-black w-full">
                      <FormLabel>Job title</FormLabel>
                      <FormControl>
                        <Input placeholder="Software engineer" {...field} className="p-3" aria-label="Job Title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                Submit
                {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEmployeeForm;
