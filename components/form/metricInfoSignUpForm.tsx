"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { metricInfoSignUpFormSchema } from "@/lib/formSchema";
import { signup } from "@/actions/auth-action";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getQuarter, getPreviousQuarter } from "@/utils/dateUtils";

const MetricInfoSignUpForm = () => {
  const form = useForm<z.infer<typeof metricInfoSignUpFormSchema>>({
    resolver: zodResolver(metricInfoSignUpFormSchema),
  });

  useEffect(() => {
    const storedInformation: z.infer<typeof metricInfoSignUpFormSchema> = JSON.parse(sessionStorage.getItem("metric_information") || "{}");
    const { last_quarter_project, last_quarter_resources, last_quarter_revenue, last_quarter_time } = storedInformation;
    const stringStoredInformation: any = {
      last_quarter_project: last_quarter_project?.toString(),
      last_quarter_resources: last_quarter_resources?.toString(),
      last_quarter_revenue: last_quarter_revenue?.toString(),
      last_quarter_time: last_quarter_time?.toString(),
    };
    form.reset(stringStoredInformation);
  }, [form]);

  const currentDate = new Date();
  const currentQuarter = getQuarter(currentDate);
  const previousQuarter = getPreviousQuarter(currentQuarter);

  async function onSubmit(values: z.infer<typeof metricInfoSignUpFormSchema>) {
    sessionStorage.setItem("metric_information", JSON.stringify(values));
    const organisation_info = JSON.parse(sessionStorage.getItem("organisation_information") || "{}");
    const employee_info = JSON.parse(sessionStorage.getItem("employee_information") || "[]");
    const metric_info = JSON.parse(sessionStorage.getItem("metric_information") || "{}");
    if (organisation_info && employee_info && metric_info) {
      const result = await signup(organisation_info, employee_info, metric_info);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[450px]">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="last_quarter_revenue"
            render={({ field }) => (
              <FormItem className="text-black w-full">
                <FormLabel>What was your revenue for last quarter ({previousQuarter})?</FormLabel>
                <FormControl>
                  <Input placeholder="600000000" {...field} className="p-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_quarter_project"
            render={({ field }) => (
              <FormItem className="text-black w-full">
                <FormLabel>How many projects did you work on last quarter ({previousQuarter})?</FormLabel>
                <FormControl>
                  <Input placeholder="10" {...field} className="p-3" />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_quarter_time"
            render={({ field }) => (
              <FormItem className="text-black w-full">
                <FormLabel>What was the total time you spent working on projects last quarter ({previousQuarter})?</FormLabel>
                <FormControl>
                  <Input placeholder="12000 hours" {...field} className="p-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_quarter_resources"
            render={({ field }) => (
              <FormItem className="text-black w-full">
                <FormLabel>How many employee did you have last quarter ({previousQuarter})?</FormLabel>
                <FormControl>
                  <Input placeholder="15" {...field} className="p-3" />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default MetricInfoSignUpForm;
