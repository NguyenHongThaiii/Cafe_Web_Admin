import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaCamera } from "react-icons/fa";

ImageFrame.propTypes = {
  onChange: PropTypes.func,
  error: PropTypes.object,
  image: PropTypes.string,
};

function ImageFrame({ onChange = null, error = {}, image = "" }) {
  const [fileImages, setFileImages] = useState([]);
  const handleOnChangeImage = (e) => {
    const files = Array.from(e.target.files).map((item, index) => {
      return URL.createObjectURL(e.target.files[index]);
    });
    const arrayFiles = Array.from(e.target.files).map((item, index) => {
      return e.target.files[index];
    });
    setFileImages((prev) => [...prev, ...files]);
    if (!onChange) return;
    onChange({ imageFile: arrayFiles[0] });
  };

  return (
    <>
      <p className="text-[21px] font-medium text-[rgb(238,0,3)] pb-2  border-b-[1px]">
        Image
      </p>

      <div className="mt-4 grid grid-cols-3 lg:grid-cols-7 gap-3">
        {fileImages.map((item, index) => (
          <div
            key={index}
            className="w-[104px] h-[104px]   opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer relative"
          >
            <div className="absolute inset-0  bg-[rgba(0,0,0,0.3) hover:bg-[rgba(0,0,0,0.5)] rounded-[10px] transition-all duration-300 z-10"></div>
            <img
              src={item}
              alt={item}
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
        ))}
        {fileImages?.length === 0 && image && (
          <div className="w-[104px] h-[104px]   opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer relative">
            <div className="absolute inset-0  bg-[rgba(0,0,0,0.3) hover:bg-[rgba(0,0,0,0.5)] rounded-[10px] transition-all duration-300 z-10"></div>
            <img
              src={image}
              alt={image}
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
        )}
        <div className="mb-2 mr-2 text-sm rounded-[10px] w-[104px] h-[104px] border flex items-center justify-center">
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center cursor-pointer gap-y-2"
          >
            <FaCamera className="text-[20px]" />
            <span>Add Image</span>
          </label>
          <input
            onChange={handleOnChangeImage}
            type="file"
            name="image"
            id="image"
            className="hidden"
          />
        </div>
      </div>

      {error?.image && (
        <span className="block font-medium text-sm text-[rgb(238,0,3)] transition-all duration-150">
          {error.image}
        </span>
      )}
    </>
  );
}

export default ImageFrame;
