"use client";
import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";

export function BackgroundBeamsDemo() {
  function liveSearch() {
    let cards = document.querySelectorAll(".cards");
    let search_query = document.getElementById("searchbox").value;
    for (var i = 0; i < cards.length; i++) {
      if (
        cards[i].innerText.toLowerCase().includes(search_query.toLowerCase())
      ) {
        cards[i].classList.remove("is-hidden");
      } else {
        cards[i].classList.add("is-hidden");
      }
    }
  }
  return (
    <div className="h-[27rem] w-full rounded-md relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 pt-0">
        <h1 className="relative z-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-blue-500  text-center font-sans font-bold">
          Anon
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-2xl text-center relative z-10">
          Find people by Collage or Name and tell them what you feel for them 👀
        </p>
        <BackgroundBeams />
        <div className="  grid grid-cols-1 pt-2 ">
          <label className="input input-bordered flex items-center gap-2 z-50 bg-gray-200">
            <input
              type="search"
              id="searchbox"
              onInput={() => liveSearch()}
              className="grow text-blue-600"
              placeholder="Search Collage/Name"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 "
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
}
