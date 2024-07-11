"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { useForm } from "react-hook-form";
import { BsIncognito } from "react-icons/bs";

const page = ({ params }) => {
  const id = params.id;
  const [pfpData, setPfpData] = useState();
  const [cmtData, setCmtData] = useState();

  useEffect(() => {
    const getData = async () => {
      const id = params.id;
      try {
        const res = await axios.get(
          `http://localhost:4000/apiV1/profiles/${id}`
        );
        const response = await axios.get(
          `http://localhost:4000/apiV1/cmts/${id}`
        );
        setPfpData(res.data);
        setCmtData(response.data);
        // console.log(res.data);
        // console.log(response.data);
      } catch (error) {
        console.log(`profile not found`, error);
      }
    };
    getData();
  }, []);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    data.pfpId = parseInt(data.pfpId);
    try {
      const res = await axios.post("http://localhost:4000/apiV1/cmt", data);

      if (res.data) {
        console.log(res.data.message);
      } else {
        console.log(res.data.error);
      }
    } finally {
      reset();
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.location.href = `/profile/${id}`;
    }
    console.log(data);
    reset();
  };

  return (
    <main className="h-full w-full  flex justify-center ">
      <div className="max-w-4xl p-4 pt-20">
        <div className="w-full flex justify-center">
          <div className=" card glass w-80 sm:w-96">
            <figure>
              <img src={pfpData?.imageSrc} alt="car!" />
            </figure>
            <div className="flex w-full justify-around p-2">
              <span className="card-title">{pfpData?.name}</span>
              <span className="pt-1">Collage:- {pfpData?.collage}</span>
            </div>

            <div className="flex w-full border-t justify-around p-2">
              <span className="card-title text-base">{pfpData?.email}</span>
              <Link
                className=" flex flex-col justify-center items-center"
                href={pfpData?.social || " "}
              >
                <MdAccountCircle size={25} />
                <span className="text-xs">(social)</span>
              </Link>
            </div>
          </div>
        </div>

        {pfpData?.id && (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full  relative mt-2 sm:flex gap-1  ">
                <div className="w-full  relative">
                  <input
                    type="text"
                    id="collage"
                    name="collage"
                    {...register("cmt")}
                    placeholder=" "
                    required
                    className={`[&:required:invalid:not(:focus)]:border-red-500 rounded-xl peer  w-full p-5 font-light bg-white/10 border-2  outline-none transition  disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black`}
                  />
                  <label
                    htmlFor="collage"
                    className={`absolute text-base duration-150 transform -translate-y-4 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-500 `}
                  >
                    Comment Here 👀
                  </label>
                </div>
                <div className="">
                  <input
                    className="hidden"
                    type=""
                    defaultValue={pfpData?.id}
                    {...register("pfpId")}
                  />
                </div>

                <button
                  className=" btn btn-info btn-sm sm:btn-lg  mt-1 sm:mt-0 w-full sm:w-auto "
                  type="submit"
                >
                  Send ✅
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-4">
          {cmtData?.toReversed().map((cmt) => (
            <div className="w-full border-2 rounded-xl border-blue-400 flex my-2">
              <div className="flex-col px-3 py-2  items-center ">
                <span className="flex justify-center">
                  <BsIncognito size={25} />
                </span>
                <span className="text-xs border-t-2 border-blue-400">User</span>
              </div>
              <div className="rounded-xl border-2 my-1 border-blue-400 flex justify-center items-center w-full mr-1 p-1">
                {cmt.cmt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
