import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import InputControl from "@/Form-Control/Input-Control";
import PasswordControl from "@/Form-Control/Password-Control";
import { login } from "./authSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const schema = yup.object({
  email: yup
    .string("Vui lòng nhập email của bạn.")
    .trim()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email của bạn"),
  password: yup
    .string()
    .trim()
    .required("Vui lòng nhập mật khẩu của bạn.")
    .min(6, "Password ít nhất là 6 kí tự."),
});
export function SignIn() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, formState } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async (value) => {
    try {
      const action = login(value);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      toast("Login successfully");
      navigate("/");
    } catch (error) {
      setError(error?.message);
    }
  };
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full  mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to Sign In.
          </Typography>
        </div>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Your email
            </Typography>
            <InputControl
              control={control}
              name="email"
              focus
              id="email"
              type="email"
              placeholder="example@gmail.com"
            />
            {formState?.errors["email"] && (
              <span className="block font-medium text-sm text-[#ff4500] transition-all duration-150">
                {formState.errors["email"]?.message}
              </span>
            )}

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <PasswordControl
              control={control}
              name="password"
              id="password"
              setValue={setValue}
              placeholder="********"
            />
            {formState?.errors["password"] && (
              <span className="block font-medium text-sm text-[#ff4500] transition-all duration-150">
                {formState.errors["password"]?.message}
              </span>
            )}
            {error.length > 0 && (
              <span className="block font-medium text-sm text-[#ff4500] transition-all duration-150">
                {error}
              </span>
            )}
          </div>

          <Button className="mt-6" fullWidth type="submit">
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">Forgot Password</a>
            </Typography>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
