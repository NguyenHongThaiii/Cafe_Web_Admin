import React, { useState } from "react";
import PropTypes from "prop-types";
import InputControlCommon from "@/Form-Control/Input-Control-Common";
import SelectControl from "@/Form-Control/Select-Control";
import TextareaCustomControl from "@/Form-Control/Textarea-Custom-Control";

BasicInfor.propTypes = {
  control: PropTypes.object,
  areas: PropTypes.array,
  onChange: PropTypes.func,
  formState: PropTypes.object,
  errorMessage: PropTypes.string,
  blog: PropTypes.object,
};

function BasicInfor({
  control = null,
  areas = [],
  onChange = null,
  formState = null,
  errorMessage = "",
  blog = {},
}) {
  const options = areas.map((area) => ({
    id: area?.id,
    label: area?.name,
    value: area?.id,
  }));
  const optionsStatus = [
    {
      id: 1,
      label: "Active",
      value: 1,
    },
    {
      id: 2,
      label: "Inactive",
      value: 0,
    },
  ];
  return (
    <>
      <p className="text-[21px] font-medium text-[rgb(238,0,3)] pb-2  border-b-[1px]">
        Basic Informations
      </p>
      <div>
        <div className="py-5 lg:px-4 flex flex-col gap-5 px-0">
          <div className="flex items-center ">
            <label
              htmlFor="name"
              className="min-w-[80px] text-[14px] lg:mr-16 mr-3"
            >
              Name
              <span className="text-[rgb(238,0,3)] pl-1 font-bold">*</span>
            </label>
            <InputControlCommon
              control={control}
              name="name"
              id="name"
              type="text"
              placeholder="Cafe Ha Noi"
              data={blog?.name}
            />
          </div>
          {formState?.errors["name"] && (
            <span className="block font-medium text-sm text-[rgb(238,0,3)] transition-all duration-150">
              {formState.errors["name"]?.message}
            </span>
          )}
          <div className="flex items-center ">
            <label
              htmlFor="area_id"
              className="min-w-[80px] text-[14px] lg:mr-16 mr-3"
            >
              Area
              <span className="text-[rgb(238,0,3)] pl-1 font-bold">*</span>
            </label>
            <SelectControl
              control={control}
              name="area_id"
              id="area_id"
              options={options}
              className="w-full h-[38px]"
              defaultValue={blog?.areas?.length > 0 ? blog?.areas[0]?.id : 0}
            />
          </div>
          {formState?.errors["area_id"] && (
            <span className="block font-medium text-sm text-[rgb(238,0,3)] transition-all duration-150">
              {formState.errors["area_id"]?.message}
            </span>
          )}
          <div className="flex items-center ">
            <label
              htmlFor="location"
              className="min-w-[80px] text-[14px] lg:mr-16 mr-3"
            >
              Address
              <span className="text-[rgb(238,0,3)] pl-1 font-bold">*</span>
            </label>
            <InputControlCommon
              control={control}
              name="location"
              id="location"
              type="text"
              placeholder="Dong Da Ha Noi"
            />
          </div>
          {formState?.errors["location"] && (
            <span className="block font-medium text-sm text-[rgb(238,0,3)] transition-all duration-150">
              {formState.errors["location"]?.message}
            </span>
          )}
          <div className="flex items-center ">
            <label
              htmlFor="description"
              className="min-w-[80px] text-[14px] lg:mr-16 mr-3"
            >
              Description
              <span className="text-[rgb(238,0,3)] pl-1 font-bold">*</span>
            </label>
            <TextareaCustomControl
              control={control}
              name="description"
              id="description"
              placeholder="Quan cafe rat dep"
              className="w-full mt-0"
              onChange={onChange}
              onKeyPress={null}
              dValue={blog?.description}
            />
          </div>
          {errorMessage && (
            <span className="block font-medium text-sm text-[rgb(238,0,3)] transition-all duration-150">
              {errorMessage}
            </span>
          )}
          <div className="flex items-center ">
            <label
              htmlFor="status"
              className="min-w-[80px] text-[14px] lg:mr-16 mr-3"
            >
              Status
              <span className="text-[rgb(238,0,3)] pl-1 font-bold">*</span>
            </label>
            <SelectControl
              control={control}
              name="status"
              id="status"
              options={optionsStatus}
              className="w-full h-[38px]"
              defaultValue={blog?.status}
            />
          </div>
          {formState?.errors["status"] && (
            <span className="block font-medium text-sm text-[rgb(238,0,3)] transition-all duration-150">
              {formState.errors["status"]?.message}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default BasicInfor;
