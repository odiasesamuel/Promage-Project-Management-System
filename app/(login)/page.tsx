"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { authFormSchema } from "@/lib/formSchema";
import { login } from "@/actions/auth-action";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(values: z.infer<typeof authFormSchema>) {
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
              <FormLabel errormessage={!isLoading && errorMessage}>Employee ID</FormLabel>
              <FormControl>
                <Input placeholder="45673" {...field} className="p-3" />
              </FormControl>
              <FormMessage>{!isLoading && errorMessage}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}

export default AuthPage;
