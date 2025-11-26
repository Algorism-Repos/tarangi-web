import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import desktop_flower from "../assets/login_flower.png";
import mobile_flower from "../assets/login_flower_mobile.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { checkCustomer } from "../handler/api Handler";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Login() {
  const navigate = useNavigate();
  const { setLoggedCustomerId, loggedCustomerId, setIsLoggedIn } =
    useContext(AppContext);
  const formik = useFormik({
    initialValues: {
      contact: "",
    },
    validationSchema: Yup.object({
      contact: Yup.string()
        .required("Mobile or Email is required")
        .test(
          "is-valid",
          "Enter a valid email or 10-digit mobile number",
          (value) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
            /^[0-9]{10}$/.test(value)
        ),
    }),
    onSubmit: async (values) => {
      const customerResult = await checkCustomer(values);
             console.log(customerResult);

      setLoggedCustomerId(customerResult.data);
      if (customerResult) {
        navigate("/home");
        setIsLoggedIn(true);
      } else {
        navigate("/profile");
      }
    },
  });
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);


  return (
    <>
      <div className="xl:h-[800px] w-full bg-[#6E0027] flex flex-col xl:flex-row font-[poppins] 2xl:min-h-screen">
        {/* Left image */}
        <div className="hidden xl:flex xl:w-1/2">
          <img
            src={desktop_flower}
            alt="floral design"
            className="max-w-[90%]"
          />
        </div>

        {/* Right section */}
        <div className="flex w-full xl:w-1/2 justify-center items-center px-6 pt-28 sm:py-10 mr-[10px]">
          <div className="w-full max-w-[628px]">
            <div className="flex flex-col items-center">
              <img
                src={logo}
                alt="Tarangi Logo"
                className="w-[261px] h-[175px] sm:w-[303px] sm:h-[208px]"
              />
            </div>

            {/* Formik Form */}
            <form onSubmit={formik.handleSubmit}>
              {/* Contact Input */}
              <p className="text-white text-[16px] font-medium mt-[30px]">
                Login Using Mobile/Email
              </p>
              <input
                type="text"
                name="contact"
                placeholder="Enter Mobile/Email"
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full bg-[#FFF8E4] p-3 rounded-[8px] mt-2 focus:outline-none placeholder:font-normal sm:p-4 ${
                  formik.touched.contact && formik.errors.contact
                    ? "border-2 border-red-500"
                    : ""
                }`}
              />
              {formik.touched.contact && formik.errors.contact && (
                <p className="text-red-400 text-sm mt-1">
                  {formik.errors.contact}
                </p>
              )}

              {/* OTP Input (No Validation) */}

              {/* <div className="mt-5">
                <p className="text-white text-[16px] font-medium">Enter OTP</p>
                <div className="flex gap-x-[8px] mt-2">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="flex-1 bg-[#FFF8E4] p-3 rounded-[8px] focus:outline-none placeholder:font-normal sm:p-4"
                  />
                  <button
                    type="button"
                    className="bg-[#F8EEDC] text-primary px-4 rounded-[8px] text-[16px] font-medium whitespace-nowrap hover:bg-[#e5d6b7] transition-all"
                  >
                    Get OTP
                  </button>
                </div>
              </div> */}

              {/* Submit Button */}
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="w-[302px] bg-[#CFA266] text-white py-3 rounded-full mt-8 text-[20px] font-medium hover:opacity-90 hover:scale-105 transition duration-300 ease-in-out sm:py-3.5"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Signup Redirect */}
            <p className="text-center text-white text-[18px] mt-6">
              Don’t have an account?
              <Link
                to="/signup"
                href="#"
                className="text-[#F8EEDC] ml-2 no-underline hover:underline hover:text-[#CFA266] transition-all duration-300"
              >
                SIGN UP
              </Link>
            </p>
          </div>
        </div>

        {/* Mobile image */}
        <div className="w-full mx-auto xl:hidden">
          <img
            src={mobile_flower}
            alt="floral design"
            className="w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
