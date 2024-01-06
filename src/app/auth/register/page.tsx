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
import fullUserSchema from "@/lib/validations/fullUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import useCases from "@/api/useCases";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

function Register() {
  const form = useForm<z.infer<typeof fullUserSchema>>({
    resolver: zodResolver(fullUserSchema),
    defaultValues: {
      lastname: "",
      name: "",
      username: "",
      password: "",
      repeatPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState({
    psw: false,
    rptPsw: false,
  });
  const [isWorking, setIsWorking] = useState(false);

  const { push } = useRouter();

  const handleSubmitSignUp = (values: z.infer<typeof fullUserSchema>) => {
    setIsWorking(true);
    useCases.auth
      .signUp(values)
      .then((response) => {
        if (response.status === 200) {
          signIn("credentials", {
            ...values,
            redirect: false,
          }).then((res) => {
            if (res?.ok) {
              push("/");
            }
          });
        }
      })
      .catch((err) => {
        console.log("Error on login", err);
      })
      .finally(() => setIsWorking(false));
  };

  return (
    <div className='container mx-auto'>
      <div className='bg-white absolute top-0 left-0 right-0 bottom-0 m-auto h-[600px] w-96 rounded-md '>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitSignUp)}
            className='flex-1 h-full justify-center flex items-center'
          >
            <div className='space-y-3'>
              <h2 className='text-center text-2xl font-semibold'>
                Simple <span className='text-primary'>SignUp</span>
              </h2>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Jhon' className='w-64' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder='Doe' className='w-64' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          type={showPassword.psw ? "text" : "password"}
                          {...field}
                        />
                        <Button
                          size='icon'
                          type='button'
                          className='bg-transparent hover:bg-transparent text-black absolute right-16'
                          onClick={() =>
                            setShowPassword({
                              ...showPassword,
                              psw: !showPassword.psw,
                            })
                          }
                        >
                          {showPassword.psw ? (
                            <EyeOff size={22} />
                          ) : (
                            <Eye size={22} />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='repeatPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat password</FormLabel>
                    <FormControl>
                      <div className='flex'>
                        <Input
                          placeholder='MyPassword#44'
                          type={showPassword.rptPsw ? "text" : "password"}
                          {...field}
                        />
                        <Button
                          size='icon'
                          type='button'
                          className='bg-transparent hover:bg-transparent text-black absolute right-16'
                          onClick={() =>
                            setShowPassword({
                              ...showPassword,
                              rptPsw: !showPassword.rptPsw,
                            })
                          }
                        >
                          {showPassword.rptPsw ? (
                            <EyeOff size={22} />
                          ) : (
                            <Eye size={22} />
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
                    href='/auth/login'
                    className='text-blue-500 font-semibold hover:text-blue-400 underline'
                  >
                    Login
                  </Link>
                </p>
              </div>
              <Button
                type='submit'
                className='mx-auto flex items-center my-4 w-full bg-primary hover:bg-blue-400'
                disabled={isWorking}
              >
                <span>SignUp</span>
                <Loader2
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
export default Register;
