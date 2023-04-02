import React from "react";
import { Container } from "..";

const classes = {
  header_text: "text-white capitalize font-semibold text-xs",
};

function Header() {
  return (
    <div className="h-8 bg-black">
      <Container>
        <div className=" flex justify-between items-center h-full">
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
      </Container>
    </div>
  );
}

export default Header;
