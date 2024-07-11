"use client";
import React, { useEffect, useState } from "react";
import { BackgroundBeams } from "../components/ui/background-beams";
import axios from "axios";
import { TbHandClick } from "react-icons/tb";
import Link from "next/link";

const Middle = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/apiV1/profiles`);
        // console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(`error getting profile`, error);
      }
    };
    loadProfiles();
  }, []);

  return (
    <div>
      <div className="  px-3 pb-4 sm:px-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {data?.map((profile) => (
          <div id="cards" className=" cards card glass w-80 sm:w-96">
            <figure>
              <img src={profile.imageSrc} alt="user image" />
            </figure>
            <div className="flex w-full justify-around p-2">
              <span className="card-title">{profile.name}</span>
              <span className="pt-1">{profile.collage}</span>
              <Link href={`./profile/${profile.id}`}>
                <button className="btn btn-info btn-sm ">
                  Go to
                  <TbHandClick />
                </button>
              </Link>
            </div>
          </div>
        ))}

        <BackgroundBeams />
      </div>
    </div>
  );
};

export default Middle;
