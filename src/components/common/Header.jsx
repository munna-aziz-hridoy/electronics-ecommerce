import React from "react";
import { Container } from "..";
import useAuthStore from "@/store/auth";
import { removeToken } from "@/allApis/token";

const classes = {
  header_text: "text-white capitalize font-semibold text-xs cursor-pointer",
};

function Header() {
  const { user, removeUser } = useAuthStore();

  const handleLogout = () => {
    removeToken();
    removeUser();
  };

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
            {user && (
              <>
                <p className="text-white font-black">|</p>
                <p onClick={handleLogout} className={classes.header_text}>
                  Logout
                </p>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
