import React from "react";

const classes = {
  header_text: "text-white capitalize font-semibold text-xs",
};

function Header() {
  return (
    <div className="h-8 bg-black">
      <div className=" flex justify-between items-center container p-2 mx-auto h-full">
        <div />
        <div>
          <p className={classes.header_text}>welcome to our shop</p>
        </div>
        <div className="flex justify-end items-center gap-4">
          <p className={classes.header_text}>help</p>
          <p className="text-white font-black">|</p>
          <p className={classes.header_text}>contact</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
