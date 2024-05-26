import React, { useState } from "react";
import PropTypes from "prop-types";
import InputControlCommon from "@/Form-Control/Input-Control-Common";
import SelectControl from "@/Form-Control/Select-Control";
import TextareaCustomControl from "@/Form-Control/Textarea-Custom-Control";
import PasswordControl from "@/Form-Control/Password-Control";

BasicInfor.propTypes = {
  control: PropTypes.object,
  formState: PropTypes.object,
  roles: PropTypes.array,
};

function BasicInfor({ roles = [], control = null, formState = null }) {
  const options = roles.map((role) => ({
    id: role?.id,
    label: role?.name,
    value: role?.id,
  }));
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
              className=" min-w-[120px] text-[14px] lg:mr-16 mr-3"
            >
              Name
              <span className="text-[rgb(238,0,3)] pl-1 font-bold">*</span>
            </label>
            <InputControlCommon
              control={control}
              name="name"
              id="name"
              type="text"
            />
          </div>
          {formState?.errors["name"] && (
            <span className="block font-medium text-sm text-[rgb(238,0,3)] transition-all duration-150">
              {formState.errors["name"]?.message}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default BasicInfor;
