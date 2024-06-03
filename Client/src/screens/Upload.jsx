import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { addData } from "../Redux/PhotoSlice";
import Navbar from "../components/Navbar";
export default function Upload() {
  const photoD = useSelector((state) => state.photos.value);
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileRejections, setFileRejections] = useState([]);
  const [errors, setErrors] = useState({});
  const isImage = (file) => {
    return file.type.startsWith("image/");
  };
  const handleForm = () => {
    let err = {};
    if (!title) {
      // setErrors({ ...errors, title: "Title is Required!" });
      err.title = "Title is Required!";
    }
    if (!description) {
      // setErrors({ ...errors, description: "Description is Required!" });
      err.description = "Description is required!";
    }
    setErrors(err);
    console.log(errors);
    return Object.keys(err).length === 0;
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles, rejectedFiles) => {
      const validFiles = acceptedFiles.filter(isImage);
      const invalidFiles = rejectedFiles;
      setUploadedFiles(validFiles);
      console.log(validFiles);
      setFileRejections(invalidFiles);
      // Call your backend API endpoint to upload files
    },
    accept: "image/*",
    multiple: false,
  });
  const submitData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (handleForm()) {
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", uploadedFiles[0]);
      try {
        const response = await fetch("http://localhost:5000/uploadimage", {
          method: "POST",
          body: formData,
        });
        const json = await response.json();
        //   setUploadedResult(json);
        console.log(json);
        if (!json.success && json.message === "Error uploading to ImageBB") {
          toast.error("Error uploading Image!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else if (
          !json.success &&
          json.message ===
            "Image Uploaded already Exists uploading any other image"
        ) {
          toast.error(json.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          dispatch(addData(json.url));
          console.log(photoD);
          // alert(`Uploaded Successfully! ${json.url.url}`);
          toast.success("Uploaded Successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    } else if (!handleForm()) {
      console.log("Im Here");
      toast.error("All Fields are Required!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    console.log(errors);
    // console.log(formData);

    console.log("Clicked");
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center min-h-screen bg-[#f0f0f4]">
        <div className="flex flex-col mt-10 min-h-full mb-8 w-[700px] gap-9 bg-white p-10 shadow-lg border rounded-2xl">
          <h2 className="flex w-full justify-center font-bold text-2xl">
            Enter Details and Upload Photo
          </h2>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full px-3 h-10 border-2 border-slate-300 rounded-lg bg-[#f3f4f6]"
            placeholder="Enter Title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {errors.title && (
            <div className="text-red-600 p-0 my-[-10px]">{errors.title}</div>
          )}
          <textarea
            name="description"
            id="description"
            className="w-full p-3 h-32 border-2 border-slate-300 rounded-lg bg-[#f3f4f6]"
            placeholder="Enter the Description"
            required
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          {console.log(photoD)}
          {errors.description && (
            <div className="text-red-600 p-0 my-[-10px]">
              {errors.description}
            </div>
          )}
          <div className="flex flex-col items-center justify-center gap-4 bg-blue-50 p-10 border-dotted cursor-pointer border-2 border-slate-500">
            <svg
              width="50px"
              height="50px"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
            >
              <path
                d="M12 22V13M12 13L15.5 16.5M12 13L8.5 16.5"
                stroke="#4682B4"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M20 17.6073C21.4937 17.0221 23 15.6889 23 13C23 9 19.6667 8 18 8C18 6 18 2 12 2C6 2 6 6 6 8C4.33333 8 1 9 1 13C1 15.6889 2.50628 17.0221 4 17.6073"
                stroke="#4682B4"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <div {...getRootProps()}>
              <input {...getInputProps()} required />
              <div className="flex justify-center">
                <button
                  className="px-3 py-2 bg-blue-500 rounded-lg shadow-lg"
                  required
                >
                  Select File
                </button>
              </div>
              <ul>
                {uploadedFiles.length > 0 && (
                  <ul>
                    {uploadedFiles.map((file, index) => (
                      <li key={index}>{file.path}</li>
                    ))}
                  </ul>
                )}
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-14 py-2 bg-violet-500 rounded-lg shadow-lg"
              onClick={submitData}
            >
              Submit
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
