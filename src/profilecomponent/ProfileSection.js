// src/pages/ProfileSection.jsx
import React from "react";

const ProfileSection = ({
  formik,
  isEditing,
  handleEdit,
  handleSave,
  handleCancel,
  hasSavedOnce,
  successMessage,
}) => (
  <div className="max-w-[633px] w-full space-y-1.5">
    <h2 className="text-[#6E0027] text-[14px] font-semibold font-poppins mb-[4px]">
      Contact Details
    </h2>
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-[16px] w-full font-poppins"
    >
      <div className="flex flex-col sm:flex-row gap-[20px]">
        <div className="flex-1">
          <input
            type="text"
            disabled={!isEditing}
            name="firstName"
            placeholder="First Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className="w-full border border-[#ADADAD] rounded-[8px] px-4 py-3.5 text-sm focus:outline-none placeholder-[#979797] placeholder:font-normal bg-white disabled:cursor-not-allowed"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.firstName}
            </p>
          )}
        </div>
        <div className="flex-1">
          <input
            type="text"
            disabled={!isEditing}
            name="lastName"
            placeholder="Last Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className="w-full border border-[#ADADAD] rounded-[8px] px-4 py-3.5 text-sm focus:outline-none placeholder-[#979797] placeholder:font-normal bg-white disabled:cursor-not-allowed"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center w-full py-3.5 px-3 border border-[#ADADAD] rounded-[8px] text-sm bg-white disabled:cursor-not-allowed">
          <span className="text-[#800020] font-semibold mr-2 whitespace-nowrap">
            IN +91
          </span>
          <span className="h-5 w-px bg-[#ADADAD] mr-2"></span>
          <input
            type="text"
            disabled={!isEditing}
            name="mobile"
            placeholder="Phone Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
            className="flex-1 bg-white font-light focus:outline-none placeholder-[#979797] placeholder:font-normal"
          />
        </div>
        {formik.touched.mobile && formik.errors.mobile && (
          <p className="text-red-500 text-xs mt-1">
            {formik.errors.mobile}
          </p>
        )}
      </div>

      <div>
        <input
          type="email"
          disabled={!isEditing}
          name="email"
          placeholder="Email ID"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full border border-[#ADADAD] rounded-[8px] px-4 py-3.5 text-sm focus:outline-none placeholder-[#979797] placeholder:font-normal bg-white disabled:cursor-not-allowed"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {formik.errors.email}
          </p>
        )}
      </div>

      <div className="flex gap-3 mt-4 justify-end">
        {successMessage && (
          <p className="text-[#318C66] text-[14px] font-medium mb-2 bg-[#B5E2C7] px-6 py-2 rounded-[20px]">
            {successMessage}
          </p>
        )}

        {!hasSavedOnce && isEditing && (
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#5A0010] text-white px-6 py-2 rounded-lg font-medium text-[14px]"
          >
            Save
          </button>
        )}

        {hasSavedOnce && !isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="bg-[#5A0010] text-white px-6 py-2 rounded-lg font-medium text-[14px]"
          >
            Edit
          </button>
        )}

        {hasSavedOnce && isEditing && (
          <>
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#5A0010] text-white px-6 py-2 rounded-lg font-medium text-[14px]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="border border-[#5A0010] text-[#5A0010] px-6 py-2 rounded-[8px] font-medium text-[14px]"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  </div>
);

export default ProfileSection;
