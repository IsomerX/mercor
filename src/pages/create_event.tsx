// import {FC} from 'react';
import {type NextPage} from 'next';
import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {useForm} from "react-hook-form"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"


const CreateEvent: NextPage = () => {

  


  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    date: z.date(),

  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Divanshu",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="max-w-[600px] mx-auto my-10 p-8">
    <Form 
    
    {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <div className="flex flex-col">
        <h1 className="font-primary font-bold text-3xl flex  justify-center">
          Come and register
          <div className="mx-3">
          <Image 
          src="/event.jpeg"
          alt="event image"
          width={100}
          height={50}
          className="rounded-full"
          />
        </div>
        </h1>


        <h1 className="font-primary font-bold text-3xl flex justify-center">
        <div className="mx-3">
          <Image 
          src="/corpo_event.jpeg"
          alt="event image"
          width={100}
          height={50}
          className="rounded-full"
          />
        </div>
        with us!
        </h1>
        </div>


        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="w-4/5 mr-3">
              <FormLabel >Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              </div>

              <div className="w-4/5 ml-3">
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input placeholder="Date" {...field} />
              </FormControl>
              </div>

              

              </div>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />

           <div className="flex flex-col md:flex-row w-full justify-between">
            <div className="flex flex-col w-4/5">
            <FormLabel className="my-1">Duration</FormLabel>
              <DropdownMenu >
              
  <DropdownMenuTrigger
  className="border-[1px] rounded-md text-slate-500 p-2 w-full mr-3"
  >Duration</DropdownMenuTrigger>
  
  <DropdownMenuContent>
    <DropdownMenuLabel>Duration</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>30 mins</DropdownMenuItem>
    <DropdownMenuItem>45 mins</DropdownMenuItem>
    <DropdownMenuItem>60 mins</DropdownMenuItem>
    <DropdownMenuItem>90 mins</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</div>

<div className="w-4/5 ml-3">
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="INR 199" {...field} />
              </FormControl>
              </div>
</div>

            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default CreateEvent;