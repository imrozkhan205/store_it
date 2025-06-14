"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"

type FormType = 'sign-in' | 'sign-up'

const authFormSchema = (formType: FormType) => {
    return z.object({
        email: z.string().email(),
        fullName: formType === 'sign-up' ? z.string().min(2).max(50) : z.string().optional(),
    })
}
const AuthForm = ({ type }: { type: FormType }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  })
 
  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    console.log(values);
  }

  return (
     <>
     <Form {...form}>
        {/* flex max-h-[800px] w-full max-w-[580px] flex-col justify-center space-y-6 transition-all lg:h-full lg:space-y-8 */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-center space-y-6 transition-all lg:h-full lg:space-y-8">
        <h1 className="flex flex-col font-bold text-3xl items-center justify-center">
            {type === "sign-in" ? 'Sign In' : 'Sign Up'}
        </h1>
        {type === "sign-up" && (
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
                
                <div className="flex flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1 h-[78px] gap-2">
                    <FormLabel className="text-light-100 pt-2 text-[14px] leading-[20px] font-normal w-full">Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field}
                className="border-none shadow-none p-0 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-light-200 "
                />
              </FormControl>
                </div>
              <FormMessage />
            </FormItem>
          )}
        />)}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
                
                <div className="flex flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1 h-[78px] gap-2">
                    <FormLabel className="text-light-100 pt-2 text-[14px] leading-[20px] font-normal w-full">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Email" {...field}
                className="border-none shadow-none p-0 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-light-200 "
                />
              </FormControl>
                </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="bg-red-400 hover:bg-red-500 transition-all rounded-full h-[66px] text-[14px] leading-[20px] font-medium" disabled={isLoading}>
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'} 
            {isLoading && (
                <Image src='/assets/icons/loader.svg'  alt='loader'
                width={24} height={24} className="ml-2 animate-spin"
                />
            )}
        </Button>

        {errorMessage && 
            <p className="text-[14px] leading-[20px] font-normal mx-auto w-fit rounded-xl bg-error/5 px-8 py-4 text-center text-error ">{errorMessage}</p>
        }
        <div className="text-[14px] leading-[20px] font-normal flex justify-center">
            <p className="text-light-100">
                {type === "sign-in" ? "Don't have an account?" : "Already have an account?" }
            </p>
            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className=' underline ml-2 font-medium text-red-400'>{type==='sign-in' ? "Sign In" : "Sign Up"}</Link>
        </div>
      </form>
    </Form>
     </>
  )
}

export default AuthForm