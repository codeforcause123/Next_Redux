"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddButton = () => {
  const handleClick = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <>
      <button className="btn btn-wide rounded-md" onClick={handleClick}>
        Click me
      </button>
      <ToastContainer />
    </>
  );
};

export default AddButton;
