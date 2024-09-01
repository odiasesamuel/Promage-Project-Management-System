"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { signInFormSchema } from "@/lib/formSchema";
import { login } from "@/actions/auth-action";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const SignInForm: React.FC<{}> = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      employee_id: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="text-black w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="employee@gmail.com" {...field} className="p-3" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employee_id"
          render={({ field }) => (
            <FormItem className="text-black w-full">
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input placeholder="EMP749" {...field} className="p-3" />
              </FormControl>
              <FormMessage>{!isLoading && errorMessage}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          Sign in
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
