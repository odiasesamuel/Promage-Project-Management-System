"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/formSchema";
import { login } from "@/actions/auth-action";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import logoIcon from "@/assets/logo.svg";

export function AuthPage() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      employee_id: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof authFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    login(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[450px]">
        <div className="flex items-center mb-3">
          <Image src={logoIcon} alt="Logo of promage" />
          <h1 className="ml-1 text-2xl font-medium text-black">Promage</h1>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="text-black">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@gmail.com" {...field} className="p-3" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employee_id"
          render={({ field }) => (
            <FormItem className="text-black">
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input placeholder="45673" {...field} className="p-3" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </Form>
  );
}

export default AuthPage;
