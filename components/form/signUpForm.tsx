"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { signUpFormSchema } from "@/lib/formSchema";
import { login } from "@/actions/auth-action";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SignUpForm: React.FC<{}> = () => {
  const router = useRouter();
  const [formStep, setFormStep] = useState("organisation_info");
  const changeToOrganisationInfoHandler = () => setFormStep("organisation_info");
  const changeToEmployeeInfoHandler = () => setFormStep("employee_info");
  const changeToMetricInfoHandler = () => setFormStep("metric_info");

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      organisation_name: "",
      organisation_email: "",
      administrator_name: "",
      administrator_email: "",
      employee_name: "",
      employee_email: "",
      job_title: "",
      last_month_revenue: null,
      last_month_project: null,
      last_month_time: null,
      last_month_resources: null,
    },
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    setIsLoading(true);
    const result = await login(values);
    setIsLoading(false);
    if (!result.success) {
      setErrorMessage(result.message || "An unknown error occurred");
    } else {
      setErrorMessage("");
      router.push("/dashboard");
    }
  }

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <div className={`${formStep === "organisation_info" ? "bg-[#E65F2B]" : "bg-[#0606063f]"} w-[50px] h-[50px] rounded-full my-8 flex items-center justify-center cursor-pointer`} onClick={changeToOrganisationInfoHandler}>
          <span className="bg-[#FAFFFB] w-[40px] h-[40px] rounded-full my-8 text-black flex items-center justify-center text-lg">1</span>
        </div>
        <div className="bg-[#060606] w-[34%] h-[2px]"></div>
        <div className={`${formStep === "employee_info" ? "bg-[#E65F2B]" : "bg-[#0606063f]"} w-[50px] h-[50px] rounded-full my-8 flex items-center justify-center cursor-pointer`} onClick={changeToEmployeeInfoHandler}>
          <span className="bg-[#FAFFFB] w-[40px] h-[40px] rounded-full my-8 text-black flex items-center justify-center text-lg">2</span>
        </div>
        <div className="bg-[#060606] w-[34%] h-[2px]"></div>
        <div className={`${formStep === "metric_info" ? "bg-[#E65F2B]" : "bg-[#0606063f]"} w-[50px] h-[50px] rounded-full my-8 flex items-center justify-center cursor-pointer`} onClick={changeToMetricInfoHandler}>
          <span className="bg-[#FAFFFB] w-[40px] h-[40px] rounded-full my-8 text-black flex items-center justify-center text-lg">3</span>
        </div>
      </div>

      {formStep === "organisation_info" && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[450px]">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="organisation_name"
                render={({ field }) => (
                  <FormItem className="text-black w-full">
                    <FormLabel>Organisation name</FormLabel>
                    <FormControl>
                      <Input placeholder="Boltzmenn" {...field} className="p-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organisation_email"
                render={({ field }) => (
                  <FormItem className="text-black w-full">
                    <FormLabel>Organisation email</FormLabel>
                    <FormControl>
                      <Input placeholder="boltzmenn@gmail.com" {...field} className="p-3" />
                    </FormControl>
                    <FormMessage>{!isLoading && errorMessage}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="administrator_name"
                render={({ field }) => (
                  <FormItem className="text-black w-full">
                    <FormLabel>Administrator name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ajayi David" {...field} className="p-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="administrator_email"
                render={({ field }) => (
                  <FormItem className="text-black w-full">
                    <FormLabel>Administrator email</FormLabel>
                    <FormControl>
                      <Input placeholder="ajayidavid@gmail.com" {...field} className="p-3" />
                    </FormControl>
                    <FormMessage>{!isLoading && errorMessage}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              {isLoading ? "Submiting..." : "Submit"}
            </Button>
          </form>
        </Form>
      )}

      {formStep === "employee_info" && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[450px]">
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
                    <FormMessage>{!isLoading && errorMessage}</FormMessage>
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
            </div>

            <Button type="submit" className="w-full">
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      )}

      {formStep === "metric_info" && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[450px]">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="last_month_revenue"
                render={({ field }) => (
                  <FormItem className="text-black w-full">
                    <FormLabel>What was your revenue for last month?</FormLabel>
                    <FormControl>
                      <Input placeholder="600000000" {...field} className="p-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_month_project"
                render={({ field }) => (
                  <FormItem className="text-black w-full">
                    <FormLabel>How many projects did you work on last month?</FormLabel>
                    <FormControl>
                      <Input placeholder="10" {...field} className="p-3" />
                    </FormControl>
                    <FormMessage>{!isLoading && errorMessage}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_month_time"
                render={({ field }) => (
                  <FormItem className="text-black w-full">
                    <FormLabel>What was the total time you spent working on projects last month?</FormLabel>
                    <FormControl>
                      <Input placeholder="12000 hours" {...field} className="p-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_month_resources"
                render={({ field }) => (
                  <FormItem className="text-black w-full">
                    <FormLabel>How many employee did you have last month?</FormLabel>
                    <FormControl>
                      <Input placeholder="15" {...field} className="p-3" />
                    </FormControl>
                    <FormMessage>{!isLoading && errorMessage}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default SignUpForm;
