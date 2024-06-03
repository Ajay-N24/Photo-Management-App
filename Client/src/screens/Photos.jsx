import React, { useEffect, useState } from "react";
const Photos = ({ data, onHandle }) => {
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 gap-5 mt-16 mb-10">
      {data.map((data, index) => {
        return (
          <div
            key={index}
            className="relative cursor-pointer"
            onClick={() => {
              onHandle(index);
            }}
          >
            <div className="absolute pl-3 text-white">{data.title}</div>
            <img src={data.url} alt="" className=" max-w-full rounded-lg" />
            <div className="absolute pl-3 mt-[-30px] text-white">
              {data.description}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Photos;
