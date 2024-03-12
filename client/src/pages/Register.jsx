import React, { useState } from "react";
import { GiVillage } from "react-icons/gi";
import { BsShare } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { CustomButton, Loading, TextInput } from "../components";
import { useForm } from "react-hook-form";
import BgImg from "../assets/BG1.png";
import { Link } from "react-router-dom";
import { apiRequest } from "../utils";

const Register = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


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

    try {
      const res = await apiRequest({
        url: "/auth/register",
        data: data,
        method: "POST",
      });
      
      if (res?.success === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg(res);
        setInterval(() => {
          window.location.replace("/login");
        }, 2000);
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full h-[100vh] bg-bgColor flex items-center justify-center p-6 2xl:py-10'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-full py-8 lg:py-0 flex flex-row-reverse bg-primary rounded-xl overflow-hidden shadow-xl'>
        {/* LEFT */}
        <div className='w-full lg:w-1/2 h-full px-6 lg:p-10 2xl:px-20 flex flex-col justify-center'>
          <div className='w-full flex gap-2 items-center mb-3 2xl:mb-6'>
            <div className='p-2 bg-[#065ad8] rounded text-white'>
              <GiVillage />
            </div>
            <span className='text-3xl text-[#065ad8] font-semibold'>
              Social Village
            </span>
          </div>
          <p className='text-ascent-1 text-lg font-semibold'>
            Create your account
          </p>

          <form
            className='py-4 2xl:py-8 flex flex-col gap-3 2xl:gap-6'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
                name='firstName'
                label='First Name'
                placeholder='First Name'
                type='text'
                styles='w-full transition duration-200 ease-in-out focus:border-blue focus:border-2'
                labelStyle='font-bold text-lg'
                register={register("firstName", {
                  required: "First Name is required!",
                })}
                error={errors.firstName ? errors.firstName?.message : ""}
              />

              <TextInput
                label='Last Name'
                placeholder='Last Name'
                type='lastName'
                styles='w-full transition duration-200 ease-in-out focus:border-blue focus:border-2'
                labelStyle='font-bold text-lg'
                register={register("lastName", {
                  required: "Last Name do no match",
                })}
                error={errors.lastName ? errors.lastName?.message : ""}
              />
            </div>

            <TextInput
              name='email'
              label='Email Address'
              placeholder='email@example.com'
              type='email'
              labelStyle='font-bold text-lg'
              register={register("email", {
                required: "Email Address is required!",
              })}
              styles='w-full transition duration-200 ease-in-out focus:border-blue focus:border-2'
              error={errors.email ? errors.email.message : ""}
            />

            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
                name='password'
                label='Password'
                placeholder='Password'
                type='password'
                styles='w-full transition duration-200 ease-in-out focus:border-blue focus:border-2'
                labelStyle='font-bold text-lg'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password?.message : ""}
              />

              <TextInput
                label='Confirm Password'
                placeholder='Password'
                type='password'
                styles='w-full transition duration-200 ease-in-out focus:border-blue focus:border-2'
                labelStyle='font-bold text-lg'
                register={register("cPassword", {
                  validate: (value) => {
                    const { password } = getValues();

                    if (password !== value) {
                      return "Passwords do no match";
                    }
                  },
                })}
                error={
                  errors.cPassword && errors.cPassword.type === "validate"
                    ? errors.cPassword?.message
                    : ""
                }
              />
            </div>

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
      <>
      <Loading />
      <p className="text-ascent-2 text-sm text-center">
      <Link
          to='/login'
          className='text-[#065ad8] font-semibold ml-2 cursor-pointer'
        >
        Login Here
            </Link>
            {" "}if registration is taking longer than expected...
            </p>
      </>
    ) : (
              <CustomButton
                type='submit'
                containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none mt-5 2xl:mt-8`}
                title='Create Account'
              />
            )}
          </form>

          <p className='text-ascent-2 text-sm text-center'>
            Already have an account?{""}
            <Link
              to='/login'
              className='text-[#065ad8] font-semibold ml-2 cursor-pointer'
            >
              Login Here
            </Link>
          </p>
        </div>
        {/* RIGHT */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue'>
          <div className='relative w-full flex  items-center justify-center'>
            <img
              src={BgImg}
              alt='Background'
              className='w-64 2xl:w-80 h-64 2xl:h-80 rounded-full object-cover'
            />
            <div className='absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full'>
              <BsShare size={14} />
              <span className='text-xs font-medium'>Share</span>
            </div>
            <div className='absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full'>
              <IoPeopleOutline  />
              <span className='text-xs font-medium'>Connect</span>
            </div>
            <div className='absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full'>
              <FaRegHandshake  />
              <span className='text-xs font-medium'>Interact</span>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='text-white text-base'>
              Connect with friends and make new ones
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

export default Register;
