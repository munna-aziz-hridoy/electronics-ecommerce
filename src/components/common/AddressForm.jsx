import React from "react";

const AddressForm = ({
  setStreet,
  setPostCode,
  setState,
  setCity,
  setCountry,
  setAddress,
  address,
  city,
  country,
  postCode,
  state,
  street,
  error,
}) => {
  return (
    <form onSubmit={(e) => e.preventDefault}>
      <div className="flex justify-center items-center gap-5">
        <div className="w-1/2">
          <p className="text-sm font-semibold text-gray-700 my-2">Street</p>
          <input
            onChange={(e) => setStreet(e.target.value)}
            value={street}
            type="text"
            className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
          />
          {error && !street && (
            <span className="text-xs font-medium text-red-600">
              Street Required
            </span>
          )}
        </div>
        <div className="w-1/2">
          <p className="text-sm font-semibold text-gray-700 my-2">Post Code</p>
          <input
            onChange={(e) => setPostCode(e.target.value)}
            value={postCode}
            type="text"
            className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
          />
          {error && !postCode && (
            <span className="text-xs font-medium text-red-600">
              Postcode Required
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center gap-5 my-3">
        <div className="w-1/2">
          <p className="text-sm font-semibold text-gray-700 my-2">State</p>
          <input
            onChange={(e) => setState(e.target.value)}
            value={state}
            type="text"
            className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
          />
          {error && !state && (
            <span className="text-xs font-medium text-red-600">
              State Required
            </span>
          )}
        </div>
        <div className="w-1/2">
          <p className="text-sm font-semibold text-gray-700 my-2">City</p>
          <input
            onChange={(e) => setCity(e.target.value)}
            value={city}
            type="text"
            className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
          />
          {error && !city && (
            <span className="text-xs font-medium text-red-600">
              City Required
            </span>
          )}
        </div>
      </div>
      <div className="w-full my-3">
        <p className="text-sm font-semibold text-gray-700 my-2">Country</p>
        <input
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          type="text"
          className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
        />
        {error && !country && (
          <span className="text-xs font-medium text-red-600">
            Country Required
          </span>
        )}
      </div>
      <div className="w-full my-3">
        <p className="text-sm font-semibold text-gray-700 my-2">Address</p>
        <textarea
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          type="text"
          rows={4}
          className="w-full px-2 py-2 border border-gray-200 outline-none shadow"
        />
        {error && !address && (
          <span className="text-xs font-medium text-red-600">
            Address Required
          </span>
        )}
      </div>
    </form>
  );
};

export default AddressForm;
