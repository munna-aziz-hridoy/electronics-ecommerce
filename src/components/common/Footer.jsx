import React from "react";

import { Container } from "..";

import { footerData } from "../../assets/data/footer";

function Footer() {
  return (
    <div>
      {/* footer top */}
      <div className="bg-[#f5f5f5] py-16">
        <Container>
          <div className="flex flex-col justify-center items-center gap-10  p-2">
            {/* payment options */}

            <p className="text-2xl font-light text-gray-900 capitalize">
              way to pay
            </p>
            <div className="flex justify-center items-center gap-5">
              {footerData.payment_options.map((item, i) => (
                <img key={i} src={item.icon.src} width={40} />
              ))}
            </div>

            {/* footer link */}

            <div className="flex justify-center items-center">
              <div className="w-32 h-[1px] bg-gray-400" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-14">
              {footerData.footer_link.map((item, i) => {
                return (
                  <div key={i}>
                    <h2 className="text-lg md:text-2xl font-light text-gray-900 capitalize ">
                      {item.name}
                    </h2>
                    <div className="flex flex-col items-start gap-2 md:gap-5 mt-10">
                      {item.links.map((link, i) => {
                        return (
                          <p
                            key={i}
                            className="text-gray-600 font-light text-xs md:text-base capitalize"
                          >
                            {link}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      {/* footer bottom */}

      <div className="bg-black py-10">
        {/* social icon */}

        <Container>
          <div className="flex flex-wrap justify-center items-center gap-5  p-2 ">
            {footerData.social_icon.map((social, i) => (
              <span
                key={i}
                className="text-white bg-[#161616] w-10 h-10 rounded-full text-xl flex justify-center items-center cursor-pointer"
              >
                {social.icon}
              </span>
            ))}
          </div>
        </Container>
        <div className="flex justify-center items-center my-5">
          <div className="bg-gray-300/40 w-[95%] mx-auto h-[2px] rounded-3xl" />
        </div>

        <Container>
          <div className="p-2 flex justify-center items-center gap-5 flex-wrap">
            <p className="text-xs text-slate-50 font-medium capitalize">
              © 2023 Marks and Spencer plc (UK)
            </p>
            <p className="text-xs text-slate-50 font-medium capitalize">
              Terms & Conditions
            </p>
            <p className="text-white">|</p>
            <p className="text-xs text-slate-50 font-medium capitalize">
              Privacy
            </p>
            <p className="text-white">|</p>
            <p className="text-xs text-slate-50 font-medium capitalize">
              Cookies
            </p>
            <p className="text-white">|</p>
            <p className="text-xs text-slate-50 font-medium capitalize">
              Accessibility
            </p>
            <p className="text-white">|</p>
            <p className="text-xs text-slate-50 font-medium capitalize">
              Modern Slavery Act
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Footer;
