"use client";
import { Circle, CircleCheck, Plus } from "lucide-react";
import { useState } from "react";

interface Condition {
  id: string;
  label: string;
}

interface ConditionProps {
  conditions: Condition[];
}
const ConditionSelector = ({ conditions }: ConditionProps) => {
  const [conSelected, setConSelected] = useState("");
  return (
    <div className="">
      <span className="font-semibold mb-4">
        Condition <span className="text-red-600 ml-2">*</span>
      </span>
      <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 mt-4">
        {conditions.map((item) => (
          <label
            key={item.id}
            htmlFor={item.id}
            className="flex items-center cursor-pointer"
          >
            <input
              type="radio"
              name="condition"
              id={item.id}
              className="sr-only"
              checked={conSelected === item.id}
              onChange={() => setConSelected(item.id)}
            />
            <div className="w-5 h-5">
              {conSelected === item.id ? (
                <CircleCheck className="text-blue-600" size={20} />
              ) : (
                <Circle className="text-gray-500" size={20} />
              )}
            </div>
            <span className="ml-2 text-sm sm:text-base">{item.label}</span>
          </label>
        ))}
      </div>

      <button className="text-blue-600 mt-4 flex items-center text-wrap text-sm sm:text-base gap-1 sm:gap-2 cursor-pointer">
        <Plus /> Add Condition
      </button>
    </div>
  );
}

export default ConditionSelector
