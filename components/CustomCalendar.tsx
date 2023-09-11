'use client';

import React, { useEffect, useState } from 'react';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

import { Button } from './ui/button';

interface CalendarProps {
  onMonthChange: (newMonth: Date) => void;
  onDateSelect: (date: Date) => void;
}

const meetings = [
  {
    id: 1,
    startDatetime: '2023-09-11T13:00',
    endDatetime: '2023-09-11T14:30',
  },
  {
    id: 2,
    startDatetime: '2023-09-20T09:00',
    endDatetime: '2023-09-20T11:30',
  },
  {
    id: 3,
    startDatetime: '2023-08-20T17:00',
    endDatetime: '2023-08-20T18:30',
  },
  {
    id: 4,
    startDatetime: '2023-08-09T13:00',
    endDatetime: '2023-08-09T14:30',
  },
  {
    id: 5,
    startDatetime: '2022-05-13T14:00',
    endDatetime: '2022-05-13T14:30',
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

// ... (imports and other code)

export default function CustomCalendar({
  onMonthChange,
  onDateSelect,
}: CalendarProps) {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  // Create an array to store dates with meetings
  let datesWithMeetings = meetings.map((meeting) =>
    parseISO(meeting.startDatetime)
  );

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  useEffect(() => {
    onMonthChange(firstDayCurrentMonth);
  }, [firstDayCurrentMonth, onMonthChange]);

  return (
    <div className='border border-[#D0D5DD] rounded-md p-4 shadow-xl w-full h-[405px]'>
      <div className='flex items-center justify-between'>
        <div>
          <span className='sr-only'>Previous month</span>
          <HiOutlineChevronLeft
            onClick={previousMonth}
            className='text-xl cursor-pointer'
            aria-hidden='true'
          />
        </div>
        <h2 className='font-semibold text-gray-900'>
          {format(firstDayCurrentMonth, 'MMMM yyyy')}
        </h2>
        <div>
          <span className='sr-only'>Next month</span>
          <HiOutlineChevronRight
            onClick={nextMonth}
            className='text-xl cursor-pointer'
            aria-hidden='true'
          />
        </div>
      </div>

      <div className='flex justify-between items-center py-4 gap-x-4'>
        <Button variant='outline' className='justify-start py-1 w-[75%]'>
          <h2 className='font-semibold'>
            <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
              {format(selectedDay, 'MMM dd, yyy')}
            </time>
          </h2>
        </Button>
        <Button variant='outline' className='py-1 w-[25%]'>
          <h2 className='font-semibold'>Today</h2>
        </Button>
      </div>

      <div className='grid grid-cols-7 text-xs leading-6 text-center text-gray-500'>
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>

      <div className='grid grid-cols-7 mt-2 text-sm'>
        {days.map((day, dayIdx) => {
          // Check if the current date has a meeting
          const hasMeeting = datesWithMeetings.some((meetingDate) =>
            isSameDay(meetingDate, day)
          );

          return (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                'py-1.5'
              )}
            >
              <button
                type='button'
                onClick={() => {
                  setSelectedDay(day);
                  onDateSelect(day);
                }}
                className={classNames(
                  isEqual(day, selectedDay) && 'text-white',
                  !isEqual(day, selectedDay) && isToday(day) && 'text-red-500',
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    'text-gray-900',
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    'text-gray-400',
                  isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                  isEqual(day, selectedDay) && !isToday(day) && 'bg-primary',
                  !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    'font-semibold',
                  'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                )}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>
                  {format(day, 'd')}
                </time>
              </button>

              {hasMeeting && (
                <div className='w-1 h-1 mx-auto mt-1 rounded-full bg-sky-500'></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];
