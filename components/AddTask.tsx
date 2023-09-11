import { IoCloseOutline } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";
import { AiFillBell } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { LuClock } from "react-icons/lu";

export const AddTask = () => {
  return (
    
        <div className=" rounded-t-3xl md:rounded-none p-4 max-w-[350px] shadow-md ">
            <div className="flex justify-between">
              <p>Add Task</p> <IoCloseOutline className="cursor-pointer" />{" "}
            </div>
            <div className="border-2 border-gray-300 h-[150px]  rounded-md mt-6">
              <textarea
                id="addTask"
                placeholder="Create wireframe"
                name="addTask"
                className="w-full h-full p-4"
              ></textarea>
            </div>
            <div className="flex justify-between my-4">
              <div className="border-2 border-gray-200 text-[12px] p-2 rounded-md flex items-center space-x-2 w-fit ">
                <FiCalendar />
                <p>Today</p>
              </div>
              <div className="border-2 border-gray-200 text-[12px] p-2 rounded-md flex items-center space-x-2 w-fit ">
                <LuClock />
                <p>10:30 am</p>
              </div>
              <div className="border-2 border-gray-200 text-[12px] p-2 rounded-md flex items-center space-x-2 w-fit ">
                <LuClock />
                <p>11:30 am</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="flex items-center">
                <span className="mr-2">
                  <AiFillBell />
                </span>
                10 Minute before
              </p>
              <IoCloseOutline className="cursor-pointer" />
            </div>
            {/* buttons */}
            <div className="gap-4 flex mt-8">
              <Button className="border-gray-300 border-2 hover:bg-white bg-white text-gray-500 w-[250px] hidden md:flex py-4">
                <div className="gap-x-2 px-2">Cancel</div>
              </Button>
              <Button className="bg-primary hover:bg-blue-700 w-[250px] hidden md:flex py-4">
                <div className="gap-x-2 px-2">Save</div>
              </Button>
            </div>
          </div>

   
  );
};
