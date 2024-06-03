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
  let photoD = useSelector((state) => state.photos.value);
  console.log(photoD);

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
  return (
    <div>
      <Navbar />
      <div className="mx-16 max-lg:mx-6 my-3">
        {/* <button type="button" onClick={() => setOpen(true)}>
          Open Lightbox
        </button> */}
        {console.log(photoD)}
        <Photos data={pd} onHandle={handlePhotoClick} />
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
