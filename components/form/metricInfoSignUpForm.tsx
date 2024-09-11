"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { metricInfoSignUpFormSchema } from "@/lib/formSchema";
import { signup } from "@/actions/auth-action";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getQuarter, getPreviousQuarter } from "@/utils/dateUtils";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const MetricInfoSignUpForm: React.FC<{ changeToEmployeeInfoHandler: () => void }> = ({ changeToEmployeeInfoHandler }) => {
  const router = useRouter();
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

  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof metricInfoSignUpFormSchema>) {
    sessionStorage.setItem("metric_information", JSON.stringify(values));
    const organisation_info = JSON.parse(sessionStorage.getItem("organisation_information") || "{}");
    const employee_info = JSON.parse(sessionStorage.getItem("employee_information") || "[]");
    const metric_info = JSON.parse(sessionStorage.getItem("metric_information") || "{}");
    if (organisation_info && employee_info && metric_info) {
      setIsLoading(true);
      const result = await signup(organisation_info, employee_info, metric_info);
      setIsLoading(false);
      if (!result.success) {
        setErrorMessage(result.message || "An unknown error occurred");
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
          duration: 3000,
        });
      } else {
        setErrorMessage("");
        router.push("/dashboard");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <div className="flex items-center text-black">
          <ChevronLeft className="w-10 h-8 cursor-pointer" onClick={changeToEmployeeInfoHandler} />
          <Button type="submit" className="w-2/3 mx-auto" disabled={isLoading}>
            Submit
            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
          <ChevronRight className="w-10 h-8 cursor-pointer invisible" />
        </div>
      </form>
    </Form>
  );
};

export default MetricInfoSignUpForm;
