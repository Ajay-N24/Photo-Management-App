import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Download from "yet-another-react-lightbox/plugins/download";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Photos from "./Photos";

const Gallery = () => {
  let [pd, setPd] = useState([]);
  let [index, setIndex] = useState(-1);
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = useState();
  const [searchResult, setsearchResult] = useState();
  let photoD = useSelector((state) => state.photos.value);
  // console.log(photoD);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/getPhotoData", {
        method: "GET",
      });
      const res = await response.json();
      if (!res) {
        console.log("Unable to Find Photo Data");
      } else {
        console.log(res);
        setPd(res);
        console.log(pd);
      }
    }
    fetchData();
  }, []);
  const slides = pd.map((photo) => ({
    src: photo.url,
    // Add additional properties if needed, such as title, description, etc.
    title: photo.title || "",
    description: photo.description || "",
  }));
  const handlePhotoClick = (count) => {
    setIndex(count);
    setOpen(true);
  };
  const handleEnter = () => {
    const titleSearch = pd.filter(
      (data) => data.title.toLowerCase() == searchText.toLowerCase()
    );
    console.log(titleSearch);
    setsearchResult(titleSearch);
  };
  useEffect(() => {
    if (searchText === "" || undefined) {
      setsearchResult();
    }
  }, [searchText]);
  return (
    <div>
      <Navbar />
      <div className="mx-16 max-lg:mx-6 my-3">
        {/* <button type="button" onClick={() => setOpen(true)}>
          Open Lightbox
        </button> */}
        {console.log(photoD)}
        <div className="flex mt-10 relative items-center mx-20">
          <input
            type="text"
            className="w-full h-10 border-2 border-black rounded-xl pl-6 pr-14 text-lg"
            placeholder="Search for Photos"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEnter();
            }}
          />
          <div
            className="absolute z-10 ml-[95.4%] max-lg:ml-[93.6%] max-md:ml-[93%] max-sm:ml-[89%] cursor-pointer"
            onClick={handleEnter}
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
            >
              <path
                d="M17 17L21 21"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        {console.log(searchText)}
        {console.log(searchResult)}
        <Photos
          data={pd}
          onHandle={handlePhotoClick}
          searchData={searchResult}
        />
        <Lightbox
          plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
          open={open}
          captions={{
            descriptionTextAlign: "center",
          }}
          close={() => setOpen(false)}
          slides={slides}
          index={index}
        />
      </div>
    </div>
  );
};

export default Gallery;
