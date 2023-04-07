import React from "react";

const AddressForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex justify-center items-center gap-5">
        <div className="w-1/2">
          <p className="text-sm font-semibold text-gray-700 my-2">Street</p>
          <input
            type="text"
            className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
          />
        </div>
        <div className="w-1/2">
          <p className="text-sm font-semibold text-gray-700 my-2">Post Code</p>
          <input
            type="text"
            className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
          />
        </div>
      </div>
      <div className="flex justify-center items-center gap-5 my-3">
        <div className="w-1/2">
          <p className="text-sm font-semibold text-gray-700 my-2">State</p>
          <input
            type="text"
            className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
          />
        </div>
        <div className="w-1/2">
          <p className="text-sm font-semibold text-gray-700 my-2">City</p>
          <input
            type="text"
            className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
          />
        </div>
      </div>
      <div className="w-full my-3">
        <p className="text-sm font-semibold text-gray-700 my-2">Country</p>
        <input
          type="text"
          className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
        />
      </div>
      <div className="w-full my-3">
        <p className="text-sm font-semibold text-gray-700 my-2">Address</p>
        <textarea
          type="text"
          rows={4}
          className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
        />
      </div>
    </form>
  );
};

export default AddressForm;
