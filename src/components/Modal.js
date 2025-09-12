import React, { useState } from "react";

//assets import
import close_icon from "../assets/close_icon.png";

function Modal({ modal, active, isOpen, onClose }) {
  const initialvalues = {
    name: "",
    email: "",
    phone: "",
    product: "",
  };

  const [formValues, setFormValues] = useState(initialvalues);
  const [formErrors, setFormErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      console.log(formValues);

    const error = validate(formValues);
    setFormErrors(error);
      console.log(error);

    if (Object.keys(error).length === 0) {
      console.log(formValues);
      handleGSheet();
    }
    
  };

  //Error hiding function (UX Improvement)
  const handleFocus = (e) => {
    const { name } = e.target;
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors.name = "Name is Required";
    }
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email";
    }
    if (!values.phone) {
      errors.phone = "Phone Number is Required";
    } else if (isNaN(values.phone)) {
      errors.phone = "Invalid Phone Number";
    } else if (values.phone.length !== 10) {
      errors.phone = "Invalid Phone Number";
    }
    if (!values.product) {
      errors.product = "Please enter a Product";
    }

    return errors;
  };

const handleGSheet = () => {
  console.log("Submitting to GSheet", formValues);

  const url ="https://script.google.com/macros/s/AKfycbyLu_paGx69o9r0gR8ixKCVQeU0B85xk1oT0Rz9FFpgYguE5e5iiUW_BqvxoNnbP-Td/exec";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formValues).toString(),
  })
    .then((res) => {
      console.log("response", res);
      return res.text();
    })
    .then((data) => {
      console.log("data", data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

  return (
    <>
      <div
        className={
          modal === true
            ? "bg-black bg-opacity-70 inset-0 fixed z-50 w-full h-full flex flex-col items-center justify-center"
            : "hidden"
        }
      >
        <div className="bg-secondary p-7 rounded-lg relative w-[393px]">
          <img
            src={close_icon}
            alt="close-icon"
            className="w-[29px] h-[29px] absolute top-3 right-3 cursor-pointer"
            onClick={() => {
              active();
            }}
          />

          <h4 className="font-poppins text-center text-[#28040E] text-[18px] font-normal leading-normal mt-5">
            Please fill out this form. We will get in touch with you soon.
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-y-5 max-w-[317px] mx-auto mt-7">
              <div className="flex flex-col w-full">
                <label className="font-poppins text-[12px] font-medium leading-[16.8px] text-[#03060D]">
                  Name
                </label>
                <input
                  className="input-box"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                <h4 className="font-poppins text-red-700 text-[12px] mt-1">
                  {formErrors.name}
                </h4>
              </div>

              <div className="flex flex-col w-full">
                <label className="font-poppins text-[12px] font-medium leading-[16.8px] text-[#03060D]">
                  Phone Number
                </label>
                <input
                  className="input-box"
                  name="phone"
                  type="tel"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="+91 00000 00000"
                />
                <h4 className="font-poppins text-red-700 text-[12px] mt-1">
                  {formErrors.phone}
                </h4>
              </div>

              <div className="flex flex-col w-full">
                <label className="font-poppins text-[12px] font-medium leading-[16.8px] text-[#03060D]">
                  E-mail
                </label>
                <input
                  className="input-box"
                  name="email"
                  type="Email"
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                <h4 className="font-poppins text-red-700 text-[12px] mt-1">
                  {formErrors.email}
                </h4>
              </div>

              <div className="flex flex-col w-full">
                <label className="font-poppins text-[12px] font-medium leading-[16.8px] text-[#03060D]">
                  Products interested in
                </label>
                <input
                  className="input-box"
                  name="product"
                  type="text"
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                <h4 className="font-poppins text-red-700 text-[12px] mt-1">
                  {formErrors.product}
                </h4>
              </div>
              <button
                type="submit"
                className="bg-[#4B001A] w-[184px] rounded-[93px] font-[poppins] text-[20px] text-white font-normal leading-normal px-[26px] py-[16px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
