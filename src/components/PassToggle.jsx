import { Input } from "@heroui/react";
import React from "react";

export default function PassToggle({ isVisible, setIsVisible }) {
  const toggle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <Input
        type="checkbox"
        // id="passType"
        className="hidden peer"
        onClick={() => {}}
      />
      <label className="cursor-pointer" onClick={toggle}>
        <i
          className={`fa-regular ${!isVisible ? "fa-eye" : "fa-eye-slash"}`}
        ></i>
      </label>
    </>
  );
}
