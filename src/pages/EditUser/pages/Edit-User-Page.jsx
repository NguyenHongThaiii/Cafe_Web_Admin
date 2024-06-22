import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// import LayoutUser from "../../../components/Layout/Layout-User";
import LayoutUser from "@/widgets/layout/layout-user";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BasicInfor from "../components/Basic-Infor";
import ImageFrame from "../components/Image-Frame";
import usersApi from "@/api/usersApi";
import rolesApi from "@/api/rolesApi";
import { toast } from "react-toastify";
const schema = yup.object({
  name: yup
    .string("Vui lòng nhập tên quán.")
    .trim()
    .max(50, "Tên quán không được vượt quá 50 ký tự")
    .required("Vui lòng nhập tên quán"),
  // password: yup
  //   .string("Vui lòng nhập tên quán.")
  //   .trim()
  //   .min(6, "Tên quán không được vượt quá 6 ký tự")
  //   .max(20, "Tên quán không được vượt quá 50 ký tự")
  //   .required("Vui lòng nhập tên quán"),
  roles: yup
    .string("Vui lòng chọn kiểu quán")
    .trim()
    .required("Vui lòng chọn kiểu quán"),
});
EditUserPage.propTypes = {};

function EditUserPage(props) {
  const location = useLocation();
  const slug = location.pathname.split("/")[3];
  const user = useSelector((state) => state.auth.current);
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [roles, setRoles] = useState([]);

  const [error, setError] = useState({});
  const [state, setState] = useState({});
  const { control, handleSubmit, setValue, formState } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  useEffect(() => {
    (async () => {
      const roleData = await rolesApi.getAll();
      const userData = await usersApi.getBySlug(slug);
      setValue("name", userData?.name);
      setValue("address", userData?.address);
      setValue("email", userData?.email);
      setValue("phone", userData?.phone);
      setValue("roles", userData?.roles[0]?.id);
      setState(userData);
      setRoles(roleData);
    })();
  }, [location, location.pathname]);
  const handleOnChange = (value) => {
    setValues((prev) => ({ ...prev, ...value }));
  };
  const handleOnSubmit = async (data) => {
    data = { ...data, ...values, password: null };
    console.log(data);
    if (
      data?.roles === null ||
      data?.roles === undefined ||
      +data?.roles === 0
    ) {
      toast.error("Please choose your role!");
      return;
    }
    if (+data?.roles === 1) data.roles = [1, 2];
    else data.roles = [1];
    try {
      await usersApi.updateUser(state?.slug, data);
      if (values?.avatar) {
        const formData = new FormData();
        formData.append("avatar", values?.avatar);
        await usersApi.uploadAvatar(state?.slug, formData);
      }
      toast("Edit User Successfully");

      navigate("/dashboard/users");
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <LayoutUser>
      <div className="flex justify-center ">
        <div className=" shadow-[0_2px_8px_rgba(0,0,0,.15)] bg-white lg:px-5 px-3 py-3  xs:px-2 m-2 w-[928px] rounded-md mb-0 xs:mb-20">
          <p className="font-medium text-[28px] mb-3">Edit User</p>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <BasicInfor
              control={control}
              onChange={handleOnChange}
              roles={roles}
              formState={formState}
              errorMessage={error?.description}
            />
            <ImageFrame
              onChange={handleOnChange}
              error={error}
              avatar={state?.image?.url}
            />
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
              + Edit User
            </button>
          </form>
        </div>
      </div>
    </LayoutUser>
  );
}

export default EditUserPage;
