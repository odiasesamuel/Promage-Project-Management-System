"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { removeEmployeeFormSchema } from "@/lib/formSchema";
import { removeExistingEmployee } from "@/actions/employee";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useEmployeeContext } from "@/context/employeeContext";

const RemoveEmployeeForm: React.FC<{}> = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { organisationId: organisation_id, employeeList } = useEmployeeContext();

  const form = useForm<z.infer<typeof removeEmployeeFormSchema>>({
    resolver: zodResolver(removeEmployeeFormSchema),
  });

  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof removeEmployeeFormSchema>) {
    setIsLoading(true);
    const result = await removeExistingEmployee(organisation_id, values);
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
          <Button variant="destructive" className="ml-5">
            Remove employee
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Remove employee</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-wrap gap-4 justify-between">
              <FormField
                control={form.control}
                name="employee_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Employee name</FormLabel>
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

              <FormField
                control={form.control}
                name="removal_reason"
                render={({ field }) => (
                  <FormItem className="text-black w-full">
                    <FormLabel>Reason for removal</FormLabel>
                    <FormControl>
                      <Input placeholder="Resignation" {...field} className="p-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notify"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Do you want to inform employee of removal?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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

              <Button type="submit" variant="destructive" className="w-full mt-5" disabled={isLoading}>
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

export default RemoveEmployeeForm;
