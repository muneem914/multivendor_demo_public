"use client";

import { Check, Plus, Trash2, Circle, CircleCheck, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

const FeaturesSelector = () => {
  const [open, setOpen] = useState(false);

  const featuresData = [
    { id: "fel5G", label: "5G", isCustom: false },
    { id: "fetWirelessCharge", label: "Wireless Charging", isCustom: false },
    { id: "fetFaceID", label: "Face ID", isCustom: false },
    { id: "fetFinger", label: "Fingerprint", isCustom: false },
    { id: "fetWaterResist", label: "Water Resistant", isCustom: false },
  ];
  const [features, setFeatures] = useState(featuresData);
  const [newFeature, setNewFeature] = useState("");

  const initialSelected = features.filter((f) => f.isCustom).map((f) => f.id);
  const [selectedFeatures, setSelectedFeatures] = useState(initialSelected);

  const handleAddFeature = () => {
    const label = newFeature.trim();
    if (!label) {
      toast.error("Feature label cannot be empty.");
      return;
    }

    const isDuplicate = features.some(
      (feature) => feature.label.toLowerCase() === label.toLowerCase()
    );
    if (isDuplicate) {
      toast.error("This feature already exists.");
      return;
    }

    const id = `feature-${label.toLowerCase().replace(/\s+/g, "-")}`;

    const newFeat = { id, label, isCustom: true };

    setFeatures([...features, newFeat]);
    setSelectedFeatures([...selectedFeatures, id]);
    setOpen(false);
    toast.success("feature created");
    setNewFeature("");
  };

  const handleRemove = (idToRemove: string) => {
    setFeatures(features.filter((feature) => feature.id !== idToRemove));
    setSelectedFeatures(selectedFeatures.filter((id) => id !== idToRemove));
  };

  const handleToggle = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((fid) => fid !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };
  return (
    <>
      <div className="">
        <span className="font-semibold mb-4">
          Features <span className="text-red-600 ml-2">*</span>
        </span>
        <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 mt-4">
          {features.map((feature) => (
            <div className="flex items-center justify-between" key={feature.id}>
              <label
                htmlFor={feature.id}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature.id)}
                  onChange={() => handleToggle(feature.id)}
                  name="features"
                  id={feature.id}
                  className="sr-only"
                />
                <div className="w-5 h-5">
                  {selectedFeatures.includes(feature.id) ? (
                    <CircleCheck className="text-blue-600" size={20} />
                  ) : (
                    <Circle className="text-gray-500" size={20} />
                  )}
                </div>
                <span className="ml-2 text-sm sm:text-base">
                  {feature.label}
                </span>
              </label>

              {feature.isCustom && (
                <button
                  onClick={() => handleRemove(feature.id)}
                  className="text-red-500"
                  title="Remove Feature"
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => setOpen(true)}
          className="text-blue-600 mt-4 flex items-center text-wrap text-sm sm:text-base gap-1 sm:gap-2 cursor-pointer"
        >
          <Plus /> Add feature
        </button>
      </div>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <DialogPanel
          className="
      relative z-50 w-full max-w-md sm:min-w-[300px] overflow-hidden
      rounded-xl bg-white p-6 shadow-xl
    "
        >
          <div className="p-3 sm:p4 flex flex-col items-center justify-center gap-3">
            <h1 className="text-xl font-semibold">Add Feature</h1>

            <div className="flex items-center gap-3">
              <CircleCheck className="text-blue-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Add new feature"
                className="border px-3 py-1 rounded w-full sm:w-auto"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-3">
            <button
              onClick={() => setOpen(false)}
              className="rounded border flex gap-2 items-center justify-center bg-white px-3 py-2 font-semibold  hover:bg-red-600 hover:text-white"
            >
              <X /> Cancel
            </button>
            <button
              onClick={handleAddFeature}
              className="rounded bg-red-600 px-3 py-2 flex gap-2 items-center justify-center font-semibold text-white hover:bg-red-500"
            >
              <Check /> Add
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default FeaturesSelector;
