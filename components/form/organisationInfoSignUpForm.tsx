"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { z } from "zod";
import { organisationInfoSignUpFormSchema } from "@/lib/formSchema";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";

const OrganisationInfoSignUpForm: React.FC<{ changeToEmployeeInfoHandler: () => void }> = ({ changeToEmployeeInfoHandler }) => {
  const form = useForm<z.infer<typeof organisationInfoSignUpFormSchema>>({
    resolver: zodResolver(organisationInfoSignUpFormSchema),
  });

  useEffect(() => {
    const storedInformation: z.infer<typeof organisationInfoSignUpFormSchema> = JSON.parse(sessionStorage.getItem("organisation_information") || "{}");
    form.reset(storedInformation);
  }, [form]);

  async function onSubmit(values: z.infer<typeof organisationInfoSignUpFormSchema>) {
    const trimValues = {
      organisation_name: values.organisation_name.trim(),
      organisation_email: values.organisation_email.trim(),
      administrator_name: values.administrator_name.trim(),
      administrator_email: values.administrator_email.trim(),
    };
    sessionStorage.setItem("organisation_information", JSON.stringify(trimValues));

    changeToEmployeeInfoHandler();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <FormMessage></FormMessage>
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
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center text-black">
          <ChevronLeft className="w-10 h-8 invisible" />
          <Button type="submit" className="w-2/3 mx-auto">
            Submit
          </Button>
          <ChevronRight className="w-10 h-8 cursor-pointer" onClick={changeToEmployeeInfoHandler} />
        </div>
      </form>
    </Form>
  );
};

export default OrganisationInfoSignUpForm;
