import React, { useState } from "react";
import { GiVillage } from "react-icons/gi";
import { FaRegHandshake } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { BsShare } from "react-icons/bs";
import { CustomButton, Loading, TextInput } from "../components";
import { useForm } from "react-hook-form";
// import BgImg from "../assets/img.jpeg";
import BgImage from "../assets/BG3.png";
import { Link } from "react-router-dom";
import { apiRequest } from "../utils";
import { useDispatch } from "react-redux";
import { UserLogin } from "../redux/userSlice";

const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrMsg("");
    try {
      const res = await apiRequest({
        url: "/auth/login",
        data: data,
        method: "POST",
      });

      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg("");

        const newData = { token: res?.token, ...res?.user };
        dispatch(UserLogin(newData));
        window.location.replace("/");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full h-[100vh] bg-bgColor flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl'>
        {/* LEFT */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>
          <div className='w-full flex gap-2 items-center mb-6'>
            <div className='p-2 bg-[#065ad8] rounded text-white'>
              <GiVillage />
            </div>
            <span className='text-3xl text-[#065ad8] font-semibold'>
              Social Village
            </span>
          </div>
          <p className='text-ascent-1 text-lg font-semibold'>
            Log in to your account
          </p>
          <span className='text-md nt-2 text-ascent-2'>Welcome back,</span>

          <form
            className='py-8 flex flex-col gap-5'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name='email'
              label='Email Address'
              placeholder='email@example.com'
              type='email'
              register={register("email", {
                required: "Email Address is required!",
              })}
              styles='w-full transition duration-200 ease-in-out focus:border-blue focus:border-2'
              labelStyle='ml-2 font-bold text-lg'
              error={errors.email ? errors.email.message : ""}
            />

            <TextInput
              name='password'
              label='Password'
              placeholder='Password'
              type='password'
              styles='w-full transition duration-200 ease-in-out focus:border-blue focus:border-2'
              labelStyle='ml-2 font-bold text-lg'
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password ? errors.password?.message : ""}
            />

            <Link
              to='/reset-password'
              className='text-sm text-right text-blue font-semibold'
            >
              Forgot Password ?
            </Link>

            {errMsg?.message && (
              <span
                role='alert'
                className={`text-sm ${
                  errMsg?.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type='submit'
                containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                title='Login'
              />
            )}
          </form>

          <p className='text-ascent-2 text-sm text-center'>
            Don't have an account?{""}
            <Link
              to='/register'
              className='text-[#065ad8] font-semibold ml-2 cursor-pointer'
            >
              Create An Account
            </Link>
          </p>
        </div>
        {/* RIGHT */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue'>
          <div className='relative w-full flex  items-center justify-center'>
            <img
              src={BgImage}
              alt='Background'
              className='w-64 2xl:w-80 h-64 2xl:h-80 rounded-full object-cover'
            />
            <div className='absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full'>
              <BsShare size={14} />
              <span className='text-xs font-medium'>Share</span>
            </div>
            <div className='absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full'>
              <IoPeopleOutline />
              <span className='text-xs font-medium'>Connect</span>
            </div>
            <div className='absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full'>
              <FaRegHandshake />
              <span className='text-xs font-medium'>Interact</span>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='text-white text-base'>
              Connect with friends and make new ones.
            </p>
            <span className='text-sm text-white/80'>
              Share memories with friends and the world.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
