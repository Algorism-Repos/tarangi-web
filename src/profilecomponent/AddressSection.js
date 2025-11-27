// src/pages/AddressSection.jsx
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import editIcon from "../assets/editIcon.png";
import deleteIcon from "../assets/deleteIcon.png";

// schema only used here
const addressValidationSchema = Yup.object({
  id: Yup.number().nullable(),
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  details: Yup.string(),
  city: Yup.string().required("City is required"),
  pin: Yup.string()
    .matches(/^[0-9]{6}$/, "Enter a valid 6-digit PIN")
    .required("PIN code is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
});

const AddressSection = ({
  addresses,
  editingAddressId,
  handleAddNew,
  handleEditClick,
  handleSave,
  handleCancel,
  handleAddressDelete,
  successMessage,
}) => (
  <div className="space-y-4 max-w-[633px]">
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div></div>
      {successMessage && (
        <div className="text-[#318C66] text-[14px] font-medium bg-[#B5E2C7] px-6 py-2 rounded-[20px]">
          {successMessage}
        </div>
      )}
      <button
        onClick={handleAddNew}
        className="bg-[#5A0010] text-white px-4 py-2 rounded-[8px] text-[14px]"
      >
        + Add Address
      </button>
    </div>

    {addresses.map((addr) => (
      <div
        key={addr.id}
        className="relative border border-[#ADADAD] rounded-[8px] p-4 bg-white"
      >
        {editingAddressId !== addr.id && (
          <div className="absolute top-3 right-3 flex gap-3">
            <img
              src={editIcon}
              alt="Edit"
              className="w-[24px] h-[24px] cursor-pointer"
              onClick={() => handleEditClick(addr.id)}
            />
            <img
              src={deleteIcon}
              alt="Delete"
              className="w-[24px] h-[24px] cursor-pointer"
              onClick={() => handleAddressDelete(addr.id)}
            />
          </div>
        )}

        {editingAddressId === addr.id ? (
          <Formik
            initialValues={{
              id: addr.id,
              name: addr.name || "",
              address: addr.address || "",
              details: addr.details || "",
              city: addr.city || "",
              pin: addr.pin || "",
              state: addr.state || "",
              country: addr.country || "",
              isNew: addr.isNew || false,
            }}
            validationSchema={addressValidationSchema}
            onSubmit={handleSave}
            enableReinitialize
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full border border-[#ADADAD] px-3 py-2 rounded-[8px] text-[14px] placeholder-[#979797]"
                />
                {touched.name && errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}

                <input
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  placeholder="Address Line"
                  className="w-full border border-[#ADADAD] px-3 py-2 rounded-[8px] text-[14px] placeholder-[#979797]"
                />
                {touched.address && errors.address && (
                  <p className="text-red-500 text-xs">{errors.address}</p>
                )}

                <input
                  name="details"
                  value={values.details}
                  onChange={handleChange}
                  placeholder="Details"
                  className="w-full border border-[#ADADAD] px-3 py-2 rounded-[8px] text-[14px] placeholder-[#979797]"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="border border-[#ADADAD] px-3 py-2 rounded-[8px] text-[14px] placeholder-[#979797]"
                  />
                  <input
                    name="pin"
                    value={values.pin}
                    onChange={handleChange}
                    placeholder="Pin Code"
                    className="border border-[#ADADAD] px-3 py-2 rounded-[8px] text-[14px] placeholder-[#979797]"
                  />
                  <input
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="border border-[#ADADAD] px-3 py-2 rounded-[8px] text-[14px] placeholder-[#979797]"
                  />
                  <input
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="border border-[#ADADAD] px-3 py-2 rounded-[8px] text-[14px] placeholder-[#979797]"
                  />
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    type="submit"
                    className="bg-[#5A0010] text-white px-6 py-2 rounded-lg text-[14px]"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCancel(values.id)}
                    className="border border-[#5A0010] text-[#5A0010] px-6 py-2 rounded-[8px] text-[14px]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          <div>
            <p className="font-semibold">{addr.name}</p>
            <p>{addr.address}</p>
            <p>{addr.details}</p>
            <p>
              {addr.city}, {addr.state}, {addr.country} - {addr.pin}
            </p>
          </div>
        )}
      </div>
    ))}
  </div>
);

export default AddressSection;

