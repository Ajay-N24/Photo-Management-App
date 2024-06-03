import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [IsOpen, setIsOpen] = useState(false);
  return (
    <section className="flex flex-row justify-between w-full text-white items-center px-16 max-lg:px-6 py-3 bg-[#2f2e41]">
      <div className="bg-white rounded-full p-2">
        <img
          src="https://cdn-icons-png.flaticon.com/128/2659/2659360.png"
          alt=""
          height={48}
          width={48}
        />
      </div>
      <div className={`pr-10 max-[1200px]:pr-0 md:block hidden`}>
        <ul className="flex flex-row justify-end items-end font-semibold gap-16 max-lg:gap-9">
          <li className="hover:text-red-700">
            <Link to="/upload">Upload Image</Link>
            {/* <a href="/upload">Upload Image</a> */}
          </li>
          <li className="hover:text-red-700">
            <Link to="/gallery">Gallery</Link>
            {/* <a href="/gallery">Gallery</a> */}
          </li>
        </ul>
      </div>
      {console.log(IsOpen)}
      <div
        className="md:hidden cursor-pointer"
        onClick={() => setIsOpen(!IsOpen)}
      >
        <i class="fa-solid fa-bars fa-xl"></i>
        <svg
          width="24px"
          height="24px"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#000000"
        >
          <path
            d="M3 5H21"
            stroke="#FFFFFF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M3 12H21"
            stroke="#FFFFFF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M3 19H21"
            stroke="#FFFFFF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>
      <div
        className={`absolute z-10 top-[86px] left-0 w-full bg-[#2f2e41] ${
          IsOpen ? "block" : "hidden"
        } md:hidden`}
      >
        <ul className="flex flex-col items-center font-semibold gap-6 my-5">
          <li className="hover:text-red-700">
            <Link to="/upload">Upload Image</Link>
            {/* <a href="/upload">Upload Image</a> */}
          </li>
          <li className="hover:text-red-700">
            <Link to="/gallery">Gallery</Link>
            {/* <a href="/gallery">Gallery</a> */}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Navbar;
