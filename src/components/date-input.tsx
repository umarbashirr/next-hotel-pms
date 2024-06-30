"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

interface DateInputProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  desc?: string;
  className?: string;
  labelClass?: string;
  disabled?: boolean;
}

const DateInput = ({
  control,
  name,
  label,
  placeholder,
  desc,
  className,
  labelClass,
  disabled = false,
}: DateInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className={cn("capitalize", labelClass)}>
              {label}
            </FormLabel>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant={"outline"}
                  className={cn(
                    "flex items-center w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto flex items-center p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date("1990-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {desc && <FormDescription>{desc}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateInput;
