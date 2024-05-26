import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// import LayoutUser from "../../../components/Layout/Layout-User";
import conveniencesApi from "@/api/conveniencesApi";
import LayoutUser from "@/widgets/layout/layout-user";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BasicInfor from "../components/Basic-Infor";
import ImageFrame from "../components/Image-Frame";
const schema = yup.object({
  name: yup
    .string("Please enter your name area")
    .trim()
    .max(50, "Max length is 50 characters")
    .required("Please enter your name area"),
});
CreateConveniencePage.propTypes = {};

function CreateConveniencePage(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [error, setError] = useState({});
  const { control, handleSubmit, setValue, formState } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  useEffect(() => {
    (async () => {})();
  }, []);
  const handleOnChange = (value) => {
    setValues((prev) => ({ ...prev, ...value }));
  };
  const handleOnSubmit = async (data) => {
    data = { ...data, ...values };
    if (!data?.imageFile) {
      setError({ image: "Upload your image please!" });
      return;
    }
    try {
      const formdata = new FormData();
      formdata.append("name", data?.name);
      formdata.append("status", 1);
      formdata.append("imageFile", data?.imageFile);
      await conveniencesApi.create(formdata);
      toast("Create Convenience Successfully");
      navigate("/dashboard/conveniences");
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <LayoutUser>
      <div className="flex justify-center ">
        <div className=" shadow-[0_2px_8px_rgba(0,0,0,.15)] bg-white lg:px-5 px-3 py-3  xs:px-2 m-2 w-[928px] rounded-md mb-0 xs:mb-20">
          <p className="font-medium text-[28px] mb-3">Add Convenience</p>

          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <BasicInfor
              control={control}
              onChange={handleOnChange}
              formState={formState}
            />
            <ImageFrame onChange={handleOnChange} error={error} />
            <button
              type="submit"
              className={`text-white text-xl mt-5 w-full h-10 px-5 rounded-lg bg-[rgb(238,0,3)] font-semibold  hover:bg-[#be0129] transition-all duration-300
                ${
                  formState.isSubmitting
                    ? "bg-gray-500 hover:bg-gray-500"
                    : "  "
                }                `}
              disabled={formState.isSubmitting}
            >
              + Add Convenience
            </button>
          </form>
        </div>
      </div>
    </LayoutUser>
  );
}

export default CreateConveniencePage;
