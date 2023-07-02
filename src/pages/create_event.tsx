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
import Nav from "~/components/Nav";


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

    <div className="relative">

   <Nav/>

   <div className="absolute h-48 w-48 rounded-full bg-[#0F172A]/50 top-44 filter blur-2xl">
      </div>

      <div className="absolute h-48 w-48 rounded-full bg-[#F0C37C]/50 top-64 left-24 filter blur-2xl mix-blend-multiply">
        </div>

        <div className="absolute h-48 w-48 rounded-full bg-[#0F172A]/50 bottom-24 right-4 filter blur-2xl mix-blend-multiply">
      </div>

      <div className="absolute h-48 w-48 rounded-full bg-[#F0C37C]/50 bottom-14 right-24 filter blur-2xl">
        </div>
    <div className=" bg-[#0F172A] max-w-[600px] mx-auto my-10 p-4 shadow-lg rounded-md border-[1px] border-slate-100 hover:shadow-[#0F1729] hover:shadow-lg ">
    <Form 
    className=""
    {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-md p-4 bg-white space-y-8 ">

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
            {/* <FormLabel className="my-1">Duration</FormLabel>
         */}
              
              <div className="w-full">
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input placeholder="Date" {...field} />
              </FormControl>
              </div>
</div>

<div className="w-4/5 ml-3">
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="INR 199" {...field} />
              </FormControl>
              </div>
</div>

<div className="flex justify-between">
<div className="w-4/5">
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input placeholder="Date" {...field} />
              </FormControl>
              </div>

              <div>
              <FormLabel>Duration</FormLabel>

              <DropdownMenu>
  <DropdownMenuTrigger 
  className="justify-center flex items-center bg-gray-100 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >Duration</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Select Time Duration</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>30 mins</DropdownMenuItem>
    <DropdownMenuItem>45 mins</DropdownMenuItem>
    <DropdownMenuItem>60 mins</DropdownMenuItem>
    <DropdownMenuItem>90 mins</DropdownMenuItem>
    {/* <DropdownMenuItem>Subscription</DropdownMenuItem> */}
  </DropdownMenuContent>
</DropdownMenu>
              </div>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
    </div>
  )
}

export default CreateEvent;