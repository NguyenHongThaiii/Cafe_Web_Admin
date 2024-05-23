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
const schema = yup.object({});
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
      setValue("email", userData?.name);
      setValue("phone", userData?.phone);
      setValue("roles", userData?.roles[0]?.id);
      setState(userData);
      setRoles(roleData);
    })();
  }, []);
  const handleOnChange = (value) => {
    setValues((prev) => ({ ...prev, ...value }));
  };
  const handleOnSubmit = async (data) => {
    console.log(data);
    if (data?.roles === 1) data.roles = [1, 2];
    else data.roles = [1];

    await usersApi.updateUser(state?.slug, data);
    if (values?.avatar) await usersApi.uploadAvatar(values);
    navigate("/dashboard/users");
  };

  return (
    <LayoutUser>
      <div className="flex justify-center ">
        <div className=" shadow-[0_2px_8px_rgba(0,0,0,.15)] bg-white lg:px-5 px-3 py-3  xs:px-2 m-2 w-[928px] rounded-md mb-0 xs:mb-20">
          <p className="font-medium text-[28px]">Thêm địa điểm</p>
          <p className="text-[14px] mb-3">
            Những quán cafe yêu thích của bạn chưa có trên Toidicafe.vn? Chia sẻ
            với cộng đồng ngay!
          </p>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <BasicInfor
              control={control}
              onChange={handleOnChange}
              roles={roles}
              formState={formState}
              errorMessage={error?.description}
            />
            <ImageFrame onChange={handleOnChange} error={error} />
            <button
              type="submit"
              className={`text-white text-xl mt-5 w-full h-10 px-5 rounded-lg bg-[rgb(238,0,3)] font-semibold  lg:hover:bg-[#be0129] transition-all duration-300
                ${
                  formState.isSubmitting ? "bg-gray-500" : "  "
                }                `}
              disabled={formState.isSubmitting}
            >
              + Thêm địa điểm
            </button>
          </form>
        </div>
      </div>
    </LayoutUser>
  );
}

export default EditUserPage;
