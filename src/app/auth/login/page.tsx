"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  username: z
    .string()
    .min(6, {
      message: "The username must have at least 6 characters",
    })
    .max(30),
  password: z
    .string()
    .min(8, {
      message: "The username must have at least 8 characters",
    })
    .max(80),
});

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();

  const [isWorking, setIsWorking] = useState(false);

  function onSubmitLogin(values: z.infer<typeof formSchema>) {
    setIsWorking(true);
    signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          push("/");
        }
      })
      .finally(() => setIsWorking(false));
  }

  return (
    <div className='container mx-auto'>
      <div className='bg-white absolute top-0 left-0 right-0 bottom-0 m-auto w-96 h-96 rounded-md '>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitLogin)}
            className='flex-1 h-full justify-center flex items-center'
          >
            <div className='space-y-3'>
              <h2 className='text-center text-2xl font-semibold'>
                Simple <span className='text-primary'>Login</span>
              </h2>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='JhonDoe1337'
                        className='w-64'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='flex'>
                        <Input
                          placeholder='MyPassword#44'
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <Button
                          size='icon'
                          type='button'
                          className='bg-transparent hover:bg-transparent text-black absolute right-16'
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeInvisibleOutlined size={22} />
                          ) : (
                            <EyeOutlined size={22} />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='my-2'>
                <p className='text-sm text-gray-400'>
                  Do not have an accout?{" "}
                  <Link
                    href='/auth/register'
                    className='text-blue-500 font-semibold hover:text-blue-400 underline'
                  >
                    Register
                  </Link>
                </p>
              </div>
              <Button
                type='submit'
                className='mx-auto flex items-center my-4 w-full bg-primary hover:bg-blue-400'
                disabled={isWorking}
              >
                <span>Login</span>
                <LoadingOutlined
                  className={cn(
                    "animate-spin ml-2",
                    isWorking ? "block" : "hidden"
                  )}
                  size={18}
                />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
export default Login;
