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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectInputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  options: { key: string; value: string }[];
  desc?: string;
  className?: string;
  labelClass?: string;
}

const SelectInput = ({
  control,
  name,
  label,
  placeholder,
  options,
  desc,
  className,
  labelClass,
}: SelectInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={cn("capitalize", labelClass)}>
            {label}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} className="capitalize" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((el) => {
                return (
                  <SelectItem
                    className="capitalize"
                    key={el?.value}
                    value={el?.value}
                  >
                    {el?.key}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {desc && <FormDescription>{desc}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectInput;
