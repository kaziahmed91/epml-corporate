import React from "react";
import { XCircle, Umbrella } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/logo.png";

const Sidebar = ({
  onClose,
  isVisible,
}: {
  onClose: () => void;
  isVisible: boolean;
}) => {
  if (!isVisible) return null;
  return (
    <div className=" flex h-full">
      <div className="w-1/2 bg-slate-200">
        <div className="flex h-3/4">
          <div className="flex justify-center align-middle">
            <Image src={logo} alt="image" />
          </div>
          <div></div>
        </div>
        <div></div>
        <div></div>
      </div>
      <div className="w-1/2">
        <div className="w-full flex justify-end">
          <button onClick={onClose}>
            <XCircle />
          </button>
        </div>
        <div className="flex flex-col">
          <div className="p-24">
            <div className="">
              <p className="text-5xl mb-4">Projects</p>
              <div className="border-l-2 ml-4 my-7">
                <p className="text-3xl ml-4 pt-6 mx-3">Ongoing</p>
                <p className="text-3xl ml-4 mx-3">Upcoming</p>
                <p className="text-3xl ml-4 pb-6 mx-3">Completed</p>
              </div>
            </div>

            <ul>
              <li className="text-5xl my-4">News</li>
              <li className="text-5xl my-4">Contact</li>
              <li className="text-5xl my-4">About</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
