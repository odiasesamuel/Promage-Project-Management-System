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
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      employee_id: "",
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
        <div className="bg-[#E65F2B] w-[50px] h-[50px] rounded-full my-8 flex items-center justify-center">
          <span className="bg-[#FAFFFB] w-[40px] h-[40px] rounded-full my-8 text-black flex items-center justify-center text-lg">1</span>
        </div>
        <div className="bg-[#060606] w-[11%] h-[2px]"></div>
        <div className="bg-[#0606063f] w-[50px] h-[50px] rounded-full my-8 flex items-center justify-center">
          <span className="bg-[#FAFFFB] w-[40px] h-[40px] rounded-full my-8 text-black flex items-center justify-center text-lg">2</span>
        </div>
        <div className="bg-[#060606] w-[11%] h-[2px]"></div>
        <div className="bg-[#0606063f] w-[50px] h-[50px] rounded-full my-8 flex items-center justify-center">
          <span className="bg-[#FAFFFB] w-[40px] h-[40px] rounded-full my-8 text-black flex items-center justify-center text-lg">3</span>
        </div>
        <div className="bg-[#060606] w-[11%] h-[2px]"></div>
        <div className="bg-[#0606063f] w-[50px] h-[50px] rounded-full my-8 flex items-center justify-center">
          <span className="bg-[#FAFFFB] w-[40px] h-[40px] rounded-full my-8 text-black flex items-center justify-center text-lg">4</span>
        </div>
        <div className="bg-[#060606] w-[11%] h-[2px]"></div>
        <div className="bg-[#0606063f] w-[50px] h-[50px] rounded-full my-8 flex items-center justify-center">
          <span className="bg-[#FAFFFB] w-[40px] h-[40px] rounded-full my-8 text-black flex items-center justify-center text-lg">5</span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[450px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="text-black w-full">
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
              <FormItem className="text-black w-full">
                <FormLabel>Employee ID</FormLabel>
                <FormControl>
                  <Input placeholder="45673" {...field} className="p-3" />
                </FormControl>
                <FormMessage>{!isLoading && errorMessage}</FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isLoading ? "Signing in..." : "Sign up"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
