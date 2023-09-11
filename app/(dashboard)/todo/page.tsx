"use client";

import CustomCalendar from "@/components/CustomCalendar";
import { useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  startOfMonth,
} from "date-fns";
import DateButton from "@/components/DateButton";
import { TaskCard } from "@/components/TaskCard";
import { Header } from "@/components/Header";
import { AddOrEditTask } from "@/components/AddOrEditTask";
import ViewTask from "@/components/ViewTask";
import MobileModal from "@/components/MobileModal";
import useModalStore from "@/app/store/modalStore";

type Type = "calender" | "addTask" | "editTask" | "viewTask";
const Dashboard = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sideBoxToShow, setShowSideBoxToShow] = useState<Type>("calender");
  const {
    addShowModal,
    setAddShowModal,
    viewShowModal,
    setViewShowModal,
    editShowModal,
    setEditShowModal,
  } = useModalStore();

  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const openViewTaskModal = () => {
    setViewShowModal(true);
  };

  const openEditMobileModal = () => {
    setEditShowModal(true);
  };

  const closeViewAndOpenEditModal = () => {
    setViewShowModal(false); // Close view task modal
    openEditMobileModal(); // Open edit modal
  };

  return (
    <>
      <Header
        clickHandler={() => {
          setShowSideBoxToShow("addTask");
        }}
      />

      <section className='flex gap-x-10 justify-between '>
        <div className='w-full md:w-[70%]'>
          <h1 className='font-semibold mb-3'>
            {format(currentMonth, "MMMM yyyy")}
          </h1>
          <div className='flex flex-row items-center gap-4'>
            <div className='overflow-x-scroll flex flex-row gap-4 p-4'>
              {eachDayOfInterval({
                start: startOfMonth(currentMonth),
                end: endOfMonth(currentMonth),
              }).map((day) => (
                <DateButton
                  key={format(day, "yyyy-MM-dd")}
                  day={format(day, "EEE")}
                  date={format(day, "d")}
                  isSelected={
                    selectedDate ? isSameDay(day, selectedDate) : false
                  }
                  onSelect={() => handleDateSelect(day)}
                />
              ))}
            </div>
          </div>
          <div className='grid gap-4 my-4'>
            <TaskCard
              onClick={() => {
                if (window.innerWidth <= 768) {
                  openViewTaskModal();
                } else {
                  setShowSideBoxToShow("viewTask");
                }
              }}
            />
            <TaskCard
              onClick={() => {
                if (window.innerWidth <= 768) {
                  openViewTaskModal();
                } else {
                  setShowSideBoxToShow("viewTask");
                }
              }}
            />
            <TaskCard
              onClick={() => {
                if (window.innerWidth <= 768) {
                  openViewTaskModal();
                } else {
                  setShowSideBoxToShow("viewTask");
                }
              }}
            />
          </div>
        </div>
        <div className='hidden md:flex md:w-full'>
          {sideBoxToShow === "calender" && (
            <CustomCalendar
              onMonthChange={handleMonthChange}
              onDateSelect={handleDateSelect}
            />
          )}
          {sideBoxToShow === "addTask" && (
            <AddOrEditTask
              type='add'
              onClose={() => setShowSideBoxToShow("calender")}
            />
          )}
          {sideBoxToShow === "editTask" && (
            <AddOrEditTask
              type='edit'
              onClose={() => setShowSideBoxToShow("calender")}
            />
          )}
          {sideBoxToShow === "viewTask" && (
            <ViewTask
              onOpenEdit={() => setShowSideBoxToShow("editTask")}
              onClose={() => setShowSideBoxToShow("calender")}
            />
          )}
        </div>
      </section>

      <MobileModal
        open={addShowModal || viewShowModal || editShowModal} // Combine add, view, and edit modals
        setOpen={setAddShowModal}
      >
        {addShowModal ? (
          <AddOrEditTask type='add' onClose={() => setAddShowModal(false)} />
        ) : viewShowModal ? (
          <ViewTask
            onOpenEdit={closeViewAndOpenEditModal}
            onClose={() => setViewShowModal(false)}
          />
        ) : (
          <AddOrEditTask type='edit' onClose={() => setEditShowModal(false)} />
        )}
      </MobileModal>
    </>
  );
};

export default Dashboard;
