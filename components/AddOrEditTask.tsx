import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Calendar as CalendarIcon, X, Bell } from "lucide-react";
import { format } from "date-fns";

import { Card, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";

const addTaskSchema = z.object({
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(10, { message: "Description must be at least 10 characters" }),
  date: z.date({
    required_error: "Date is required",
  }),
  start_time: z.string({
    required_error: "Start Time is required",
  }),
  end_time: z.string({
    required_error: "End time is required",
  }),
});

const defaultValues: Partial<TaskFormValues> = {
  description: "Create wireframe",
  date: new Date(),
  start_time: "10:00",
  end_time: "11:00",
};

type TaskFormValues = z.infer<typeof addTaskSchema>;

interface AddTaskProps {
  onClose?: () => void;
  type?: "add" | "edit";
}

export const AddOrEditTask = ({ onClose, type }: AddTaskProps) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: type === "edit" ? defaultValues : undefined,
  });

  const isLoading = form.formState.isSubmitting;
  const hasFormError = Object.keys(form.formState.errors).length > 0;

  function onSubmit(data: TaskFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    form.reset();
  }

  const handleClose = (event: any) => {
    event.preventDefault();
    onClose?.();
  };

  return (
    <Card className={cn("h-[380px]", hasFormError && "h-[420px]")}>
      <CardHeader className='flex flex-row items-centers justify-between space-y-0 pb-4'>
        <CardTitle className='text-md font-semibold'>
          {type === "add" ? "Add Task" : "Edit Task"}
        </CardTitle>
        <X onClick={onClose} className='cursor-pointer' />
      </CardHeader>
      <div className='px-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isLoading}
                      placeholder='Create wireframe'
                      rows={5}
                      className='border-2 border-gray-300 rounded-md'
                    />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <div className='flex justify-between py-3 space-x-3'>
              <div className='grid gap-2'>
                <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              className={cn(
                                "space-x-1 p-2",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className='w-4 h-4' />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Today</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-2'>
                <FormField
                  control={form.control}
                  name='start_time'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='time'
                          placeholder='00'
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-2'>
                <FormField
                  control={form.control}
                  name='end_time'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='time'
                          placeholder='00'
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='space-x-2 flex items-center'>
                <Bell fill='#000' className='w-4 h-4 ' />
                <h3>10 minutes before</h3>
              </div>
              <X />
            </div>
            <div className='grid grid-cols-2 gap-6 pt-5'>
              <Button onClick={handleClose} variant='outline'>
                Cancel
              </Button>
              <Button disabled={isLoading} type='submit'>
                {type === "add" ? "Add" : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
};
