import { X, Calendar, Clock4 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface ViewTaskProps {
  onClose: () => void;
  onOpenEdit: () => void;
}

export default function ViewTask({ onClose, onOpenEdit }: ViewTaskProps) {
  return (
    <Card className={cn("w-full h-[230px]")}>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
        <CardTitle className='text-md font-semibold'>
          Create wireframe task
        </CardTitle>
        <X onClick={onClose} className='cursor-pointer' />
      </CardHeader>
      <div className='px-6'>
        <div
          className='space-y-3'
        >
          <span className="flex items-center">
            <Calendar className='mr-2 text-primary' />
            <span>20th January 2023</span>
          </span>
          <span className="flex items-center">
            <Clock4 className='mr-2 text-primary' />
            <span>8:00 - 10:00AM</span>
          </span>

        </div>
        <div className='grid grid-cols-2 gap-4 pt-4'>
          <Button variant='outline'>Delete</Button>
          <Button onClick={onOpenEdit}>Edit</Button>
        </div>
      </div>
    </Card>
  );
}
