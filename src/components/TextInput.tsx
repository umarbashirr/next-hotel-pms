"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface TextInputProps {
  control: any;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  className?: string;
}

const TextInput = ({
  control,
  label,
  name,
  type,
  disabled = false,
  placeholder,
  min,
  max,
  className,
}: TextInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder || ""}
              disabled={disabled}
              min={min}
              max={max}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
