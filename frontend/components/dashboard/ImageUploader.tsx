"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Trash2, Upload } from "lucide-react";

const ImageUploader = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2 && typeof reader.result === "string") {
          setImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageDelete = (image: string) => {
    const filtered = images.filter((img) => img !== image);
    setImages(filtered);
  };

  return (
    <div className="w-full">
      {images.length === 0 ? (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full py-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-2">
            <Upload />
            <p className="text-base sm:text-lg font-semibold">
              Drag & drop product Images
            </p>
            <p className="text-xs text-gray-500 text-center">
              or click to browse files (PNG, JPG, WEBP up to 5MB each)
            </p>
            <div className="border rounded p-2 hover:border-red-300 hover:text-red-500 cursor-pointer">
              Select Files
            </div>
          </div>

          <input
            ref={fileInputRef}
            id="dropzone-file"
            type="file"
            multiple
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="hidden"
            onClick={handleResetFileInput}
            onChange={onChange}
          />
        </label>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img}
              className="relative w-full aspect-square border rounded overflow-hidden group"
            >
              <img
                src={img}
                alt="Uploaded"
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={() => handleImageDelete(img)}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow text-red-600 hover:text-red-800"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {images.length < 4 && (
            <label
              htmlFor="dropzone-file"
              className="flex items-center justify-center w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="text-center text-gray-500">
                <Upload className="mx-auto mb-1" />
                <p className="text-sm">Add more</p>
              </div>

              <input
                ref={fileInputRef}
                id="dropzone-file"
                type="file"
                multiple
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
                onClick={handleResetFileInput}
                onChange={onChange}
              />
            </label>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
