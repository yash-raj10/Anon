"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Ex from "@/components/model/ex";
import axios from "axios";

const ProfileModel = ({ imageUrl, name, email }) => {
  const [showDoneModal, setShowDoneShowModal] = useState(false);
  console.log(email);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/apiV1/profile/${email}`
        );
        let x = res.data;
        console.log(x);
        if (res.data) {
          setShowDoneShowModal(true);
        } else {
          console.log("registered user not found");
        }
      } catch (error) {
        // console.log(`Data not Found`, error);
      }
    };
    getUser();
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/apiV1/profile`,
        data
      );

      if (res.data.success) {
        console.log(res.data.message);
      } else {
        console.log(res.data.error);
      }
    } finally {
      reset();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.href = `/`;
    }
    // console.log(data);
    // reset();
  };

  return (
    <div>
      {showDoneModal ? (
        <Dialog>
          <DialogTrigger asChild className="btn btn-info btn-xs border-2">
            <Button variant="outline">Add Yourself</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>You Profile is already there ✅</DialogTitle>
              <DialogDescription>
                Find your friends and tell them what you feel for them 👀
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog>
          <DialogTrigger asChild className="btn btn-info btn-xs border-2">
            <Button variant="outline">Add Yourself</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add yourself on Anon</DialogTitle>
              <DialogDescription>
                Fill all the details below, This will add your profile on Anon.
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex w-full justify-center mt-2 ">
                      <Image
                        src={imageUrl}
                        alt="
                        user"
                        width={300}
                        height={300}
                        className="rounded-lg border-2"
                      />
                    </div>

                    <div className="">
                      <input
                        className="hidden"
                        type=""
                        defaultValue={name}
                        {...register("name")}
                      />
                    </div>

                    <div className="">
                      <input
                        className="hidden"
                        type=""
                        defaultValue={imageUrl}
                        {...register("imageSrc")}
                      />
                    </div>

                    <div className="">
                      <input
                        className="hidden"
                        type=""
                        defaultValue={email}
                        {...register("email")}
                      />
                    </div>

                    <div className="w-full  relative mt-2">
                      <input
                        type="text"
                        id="collage"
                        name="collage"
                        {...register("collage")}
                        placeholder=" "
                        required
                        className={`[&:required:invalid:not(:focus)]:border-red-500 rounded-xl peer  w-full p-5 font-light bg-white/10 border-2  outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus`}
                      />
                      <label
                        htmlFor="collage"
                        className={`absolute text-base duration-150 transform -translate-y-4 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
                      >
                        Collage Name (Write short form)
                      </label>
                    </div>

                    <div className="w-full  relative mt-2">
                      <input
                        type="text"
                        id="social"
                        name="social"
                        {...register("social")}
                        placeholder=" "
                        className={` rounded-xl peer  w-full p-5 font-light bg-white/10 border-2  outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
                      />
                      <label
                        htmlFor="social"
                        className={`absolute text-base duration-150 transform -translate-y-4 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400 `}
                      >
                        Social Link
                      </label>
                    </div>

                    <div className="justify-center items-center flex mt-3">
                      <button className=" btn btn-info btn-md" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProfileModel;
