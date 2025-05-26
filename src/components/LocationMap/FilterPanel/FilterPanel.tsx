import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { locations, status, type } from "./filterElements";
import { RotateCcw, Filter, MoveLeft } from "lucide-react";

type SelectionItem = {
  key: string;
  value: string;
};

const SelectField = ({ label, placeholder, selections }: { label: string; placeholder: string; selections: SelectionItem[] }) => {
  return (
    <div className="mb-2 w-full">
      <Label htmlFor="location-select">{label}</Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Locations</SelectLabel>
            {selections.map(({ key, value }: { key: string; value: string }) => (
              <SelectItem key={key} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

// const FilterPanelCollapsed = () => {
//   return (

//   );
// };

const FilterPanel = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return isCollapsed ? (
    <div className="p-3 absolute w-16 top-[20%] h-[400px] left-0 z-10 bg-white shadow-lg rounded-r-lg	">
      <Button
        variant="outline"
        size="icon"
        className="p-0 m-0"
        onClick={() => setIsCollapsed((state) => !state)}
      >
        <Filter strokeWidth={2} absoluteStrokeWidth />
      </Button>
    </div>
  ) : (
    <div className="p-4 absolute w-64 top-[20%] h-[400px] left-0 z-10 bg-white shadow-lg rounded-r-lg	">
      <Button
        variant="link"
        className="mb-6 p-0 m-0"
        onClick={() => setIsCollapsed((state) => !state)}
      >
        <MoveLeft
          size={22}
          strokeWidth={1}
          absoluteStrokeWidth
          className="mr-2 p-0"
        />
        <p>Collapse</p>
      </Button>

      <div className="flex mb-6">
        <Filter strokeWidth={2} absoluteStrokeWidth className="mr-2" />
        <p className="text-md font-bold">Filter Results</p>
      </div>

      <SelectField
        label="Select a Location"
        placeholder="Location"
        selections={locations}
      />
      <SelectField
        label="Select a Status"
        placeholder="Status"
        selections={status}
      />
      <SelectField label="Select Type" placeholder="Type" selections={type} />

      <div className="flex mt-6">
        <Button className="mr-2">Update</Button>
        <Button variant="ghost">
          <RotateCcw /> &nbsp; Reset
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
