import React from 'react';
import { Button } from './ui/button';

interface DateButtonProps {
  day: string;
  date: string;
  isSelected: boolean; // Add isSelected prop
  onSelect: () => void; // Add onSelect prop
}

const DateButton: React.FC<DateButtonProps> = ({ day, date, isSelected, onSelect }) => {
  return (
    <Button
      variant="outline"
      className={`px-3 py-8 bg-white border rounded-lg border-[#D0D5DD] hover:bg-white hover:border-[#D0D5DD] hover:shadow-md hover:border-opacity-0 hover:ring-1 hover:ring-offset- hover:ring-[#D0D5DD] ${
        isSelected ? 'bg-primary text-white' : ''
      }`}
      onClick={onSelect}
    >
      <div className="flex flex-col justify-center items-center h-full gap-y-2 font-semibold">
        <h1>{day}</h1>
        <h3>{date}</h3>
      </div>
    </Button>
  );
};

export default DateButton;
