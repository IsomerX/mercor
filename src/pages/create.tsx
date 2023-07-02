import { type NextPage } from "next";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { api } from "~/utils/api";
import Nav from "~/components/Nav";
import { useState } from "react";

const formSchema = z.object({
  title: z.string(),
  date: z.string(),
  price: z.coerce.number(),
  capacity: z.coerce.number(),
  duration: z.coerce.number(),
});

const CreateEvent: NextPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [done, setDone] = useState(false);
  const mutation = api.event.createEvent.useMutation();
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutation.mutate({
      capacity: values.capacity,
      name: values.title,
      price: values.price,
      beginsAt: new Date(values.date).toUTCString(),
      duration: values.duration,
    });
    setDone(true);
  }

  return (
    <div className="relative">
      <Nav />

      {/*
      <div className="absolute h-48 w-48 rounded-full bg-[#0F172A]/50 top-44 filter blur-2xl"> </div>
      <div className="absolute h-48 w-48 rounded-full bg-[#F0C37C]/50 top-64 left-24 filter blur-2xl mix-blend-multiply"> </div>
      <div className="absolute h-48 w-48 rounded-full bg-[#0F172A]/50 bottom-24 right-4 filter blur-2xl mix-blend-multiply"> </div>
      <div className="absolute h-48 w-48 rounded-full bg-[#F0C37C]/50 bottom-14 right-24 filter blur-2xl"> </div>
      */}

      <div className=" mx-auto my-10 max-w-[600px] rounded-md border-[1px] border-slate-100 bg-[#0F172A] p-4 shadow-lg hover:shadow-lg hover:shadow-[#0F1729] ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 rounded-md bg-white p-4 "
          >
            <div className="flex flex-col">
              <h1 className="flex justify-center font-primary text-3xl  font-bold">
                Come and register
                <div>{done && "Thank you! Event Created"}</div>
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

              <h1 className="flex justify-center font-primary text-3xl font-bold">
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

            <div className="mr-3 flex w-full justify-between">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col justify-between">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="datetime-local" />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full justify-between">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="INR 199" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Duration</FormLabel>
                  <FormControl className="w-fit rounded-md border-[1px] border-slate-200 p-2">
                    <select {...field}>
                      <option value="30">30 min</option>
                      <option value="45">45 min</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hour</option>
                      <option value="120">2 hour</option>
                    </select>
                  </FormControl>
                  <FormDescription>
                    This is the duration of the event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>

            <FormMessage />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateEvent;
