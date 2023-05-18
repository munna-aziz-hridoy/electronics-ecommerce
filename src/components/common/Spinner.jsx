import React from "react";

function Spinner() {
  return (
    <div class=" flex justify-center items-center py-3">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default Spinner;
