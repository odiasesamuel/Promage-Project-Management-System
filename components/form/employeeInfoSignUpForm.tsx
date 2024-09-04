"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { employeeInfoSignUpFormSchema } from "@/lib/formSchema";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const EmployeeInfoSignUpForm = () => {
  const [employeeInformation, setEmployeeInformation] = useState<z.infer<typeof employeeInfoSignUpFormSchema>[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const form = useForm<z.infer<typeof employeeInfoSignUpFormSchema>>({
    resolver: zodResolver(employeeInfoSignUpFormSchema),
    defaultValues: {
      employee_name: "",
      employee_email: "",
      job_title: "",
    },
  });

  useEffect(() => {
    const storedInformation: z.infer<typeof employeeInfoSignUpFormSchema>[] = JSON.parse(sessionStorage.getItem("employee_information") || "[]");
    setEmployeeInformation(storedInformation);
  }, []);

  const loadEmployeeDetails = (employee: z.infer<typeof employeeInfoSignUpFormSchema>, index: number) => {
    form.reset(employee);
    setEditIndex(index);
  };
  const removeEmployee = (indexToRemove: number) => {
    const updatedEmployees = employeeInformation.filter((_, index) => index !== indexToRemove);
    sessionStorage.setItem("employee_information", JSON.stringify(updatedEmployees));
    setEmployeeInformation(updatedEmployees);
    if (indexToRemove === editIndex) {
      setEditIndex(null);
      form.reset({ employee_name: "", employee_email: "", job_title: "" });
    }
  };

  async function onSubmit(values: z.infer<typeof employeeInfoSignUpFormSchema>) {
    const existingEmployees = JSON.parse(sessionStorage.getItem("employee_information") || "[]");
    const trimValues = {
      employee_name: values.employee_name.trim(),
      employee_email: values.employee_email.trim(),
      job_title: values.job_title.trim(),
    };

    if (editIndex !== null) {
      existingEmployees[editIndex] = trimValues;
    } else {
      existingEmployees.push(trimValues);
    }

    sessionStorage.setItem("employee_information", JSON.stringify(existingEmployees));
    setEmployeeInformation(existingEmployees);
    form.reset({ employee_name: "", employee_email: "", job_title: "" });
    setEditIndex(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="employee_name"
            render={({ field }) => (
              <FormItem className="text-black w-full">
                <FormLabel>Employee name</FormLabel>
                <FormControl>
                  <Input placeholder="Kunle Ojo" {...field} className="p-3" />
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
                  <Input placeholder="kuleojo@gmail.com" {...field} className="p-3" />
                </FormControl>
                <FormMessage></FormMessage>
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
                  <Input placeholder="Software engineer" {...field} className="p-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-2 text-sm text-black">
            {employeeInformation.map((employee, index) => (
              <div key={index} className="bg-white border border-[#060606] w-fit rounded-full flex items-center px-2 gap-2 cursor-pointer">
                <span onClick={() => loadEmployeeDetails(employee, index)}>{employee.employee_name}</span>
                <X className="w-4 h-4 text-[#E65F2B]" onClick={() => removeEmployee(index)} />
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EmployeeInfoSignUpForm;
