"use client";

import { useState } from "react";
import { XCircle, PhoneCallIcon, MapPinned, Facebook } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import arianaImg from "@/assets/ariana.png";
import styles from "@/components/FullScreenNav.module.scss";

interface FullScreenNavProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function FullScreenNav({ isOpen, onClose }: FullScreenNavProps) {
  return (
    <nav
      className={`fixed top-0 bg-opacity-95 h-full z-9 transition-transform duration-300 scroll- ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-row h-full">
        <div className="w-1/2">
          <div className="flex h-3/5">
            <div
              className={`${styles.logo} w-1/2 flex justify-center items-center`}
            >
              <Image src={logo} alt="image" priority quality={100} />
            </div>
            <div className={`${styles.image} w-1/2`}>
              <Image
                src={arianaImg}
                alt="ariana"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div className="flex h-2/5">
            <div className="w-1/2 bg-gray-100">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                sed voluptate laudantium aperiam tempore corporis, quasi
                veritatis distinctio nemo rem accusantium quae consequuntur
                alias quas aut deleniti sunt beatae praesentium?
              </p>
            </div>
            <div className="w-1/2 flex justify-center items-start flex-col p-16">
              <p className="flex items-center mb-5">
                <PhoneCallIcon className="flex-shrink-0 mr-2" /> +88
                017010101010
              </p>
              <p className="flex items-center mb-5">
                <Facebook className="flex-shrink-0 mr-2" /> /equityPmlCtg
              </p>
              <p className="flex items-center mb-5">
                <MapPinned className="flex-shrink-0 mr-2" /> Equity Point,
                Prabartak Circle, Chattogram 4203
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <div className="flex flex-col">
            <div className="p-24 mt-16 ml-32">
              <div className="">
                <p className="text-5xl mb-4">Projects</p>
                <div className="border-l-2 ml-4 my-7">
                  <p className="text-3xl ml-4 pt-6 mx-3">Ongoing</p>
                  <p className="text-3xl ml-4 mx-3 my-6">Upcoming</p>
                  <p className="text-3xl ml-4 pb-6 mx-3">Completed</p>
                </div>
              </div>

              <ul>
                <li className="text-5xl my-7">News</li>
                <li className="text-5xl my-7">Contact</li>
                <li className="text-5xl my-7">About</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
