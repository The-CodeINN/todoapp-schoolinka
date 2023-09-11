"use client";
import { useState } from "react";

import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  onClick: () => void;
}

export const TaskCard = ({ onClick }: TaskCardProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Card
      className='rounded-lg shadow-sm hover:shadow-md px-4 py-3 md:px-6 md:py-4 bg-[#F9FAFB] border-[#EAECF0] cursor-pointer'
      onClick={onClick}
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='items-center flex space-x-6'>
          <Checkbox
            id='terms1'
            checked={isChecked}
            onCheckedChange={handleCheckboxChange}
          />
          <div className={`grid gap-1.5 leading-none`}>
            <label
              htmlFor='terms1'
              className={cn(
                "text-md font-semibold leading-none",
                isChecked && "text-muted-foreground opacity-75"
              )}
            >
              Create a new design
            </label>
            <p
              className={cn(
                "text-sm",
                isChecked && "text-muted-foreground opacity-75 line-through"
              )}
            >
              10:30 am - 12:00 pm
            </p>
          </div>
        </div>
        <p className='text-md'>Today</p>
      </div>
    </Card>
  );
};
