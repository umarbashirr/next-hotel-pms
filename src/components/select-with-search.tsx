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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

interface SelectWithSearchProps {
  form: any;
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  desc?: string;
  className?: string;
  labelClass?: string;
  valueToSetFor: string;
}

const SelectWithSearch = ({
  form,
  control,
  name,
  label,
  placeholder,
  options,
  desc,
  className,
  labelClass,
  valueToSetFor,
}: SelectWithSearchProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={cn("capitalize", labelClass)}>
            {label}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl className="flex w-full text-start">
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? options.find((option) => option.value === field.value)
                        ?.label
                    : placeholder}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command className="w-full">
                <CommandInput
                  placeholder={placeholder}
                  className="h-9 w-full"
                />
                <CommandEmpty>No found.</CommandEmpty>
                <CommandList className="w-full">
                  {options.map((option) => (
                    <CommandItem
                      value={option.label}
                      key={option.value}
                      onSelect={() => {
                        form.setValue(valueToSetFor, option.value);
                      }}
                    >
                      {option.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          option.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {desc && <FormDescription>{desc}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectWithSearch;
