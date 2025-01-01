import React, { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import LandscapePic from "@/public/landscape.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleX, Menu } from "lucide-react";

const PanelDetail = ({ header, text }) => {
  return (
    <div className="flex items-center mt-2 mb-2">
      <p className="w-32 text-sm mr-3 font-bold">{header}</p>
      <p className="text-sm font-base">{text}</p>
    </div>
  );
};

const DetailPanel = ({ id, title, location, type }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return isCollapsed ? (
    <div className="p-3 absolute w-16 top-[20%] h-[500px] right-0 z-10 bg-white shadow-lg rounded-l-lg	">
      <Button
        variant="outline"
        size="icon"
        className="p-0 m-0"
        onClick={() => setIsCollapsed((state) => !state)}
      >
        <Menu size={28} color="#1c1c1c" strokeWidth={1} absoluteStrokeWidth />
      </Button>
    </div>
  ) : (
    <div className="w-[550px] absolute top-[20%] right-0 z-10 bg-white shadow-lg rounded-l-lg	overflow-hidden">
      <div className="relative">
        <Button
          variant="outline"
          className="absolute bg-transparent border-none mt-3"
          onClick={() => setIsCollapsed((state) => !state)}
        >
          <CircleX
            size={38}
            color="#ffffff"
            strokeWidth={1}
            absoluteStrokeWidth
          />
        </Button>
        <Image
          src="/landscape.jpg"
          alt="Image"
          width={660}
          height={100}
          className="object-cover"
        />
      </div>
      {/* </AspectRatio> */}
      <div className="p-4">
        <div className="flex items-between align-content-center items-center justify-between	pb-3 border-b-2">
          <div className="flex-column">
            <p className="font-bold text-xl">{title}</p>
            <p className="text-sm mt-1">{location}</p>
          </div>
          <Link href={`projects/${id}`}>
            <Button variant="link">View Details</Button>
          </Link>
        </div>
        <div>
          <PanelDetail header="Project Type" text="Commercial" />
          <PanelDetail header="Total Units" text="120" />
          <PanelDetail header="Project Type" text="Mixed Use" />
          <PanelDetail header="Parking Units" text="120" />
          <PanelDetail header="Estimated Completion" text="10/10/2025" />
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
