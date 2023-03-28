import { FaFacebookF } from "react-icons/fa";
import {
  AiOutlineInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BsPinterest } from "react-icons/bs";

import amex from "../amex.svg";
import applePay from "../apple.png";
import mastercard from "../mastercard.svg";
import paypal from "../paypal.svg";
import visa from "../visa.svg";

export const footerData = {
  social_icon: [
    {
      name: "facebook",
      icon: <FaFacebookF />,
    },
    {
      name: "instagram",
      icon: <AiOutlineInstagram />,
    },
    {
      name: "youTube",
      icon: <AiFillYoutube />,
    },
    {
      name: "twitter",
      icon: <AiOutlineTwitter />,
    },
    {
      name: "pinterest",
      icon: <BsPinterest />,
    },
  ],

  footer_link: [
    {
      name: "here to help",
      links: [
        "help  & contact us",
        "free returns for online orders",
        "accessibility in our stores",
        "product recalls",
        "site map",
        "advice before you buy",
      ],
    },
    {
      name: "delivery & returns",
      links: [
        "where's my order?",
        "delivery & collection",
        "guest order tracking",
        "guest order return",
        "returns & refunds",
      ],
    },
    {
      name: "shopping with us",
      links: [
        "sparks",
        "sparks FAQs",
        "gift card balance",
        "size guides",
        "sustainability",
      ],
    },
    {
      name: "more from M&S",
      links: [
        "ocado",
        "corporate site",
        "M&S corporate gifts",
        "M&S bank",
        "M&S energy",
        "M&S opticians",
        "careers",
      ],
    },
  ],

  payment_options: [
    {
      name: "paypal",
      icon: paypal,
    },
    {
      name: "american express",
      icon: amex,
    },
    {
      name: "visa",
      icon: visa,
    },
    {
      name: "apple pay",
      icon: applePay,
    },
    {
      name: "mastercard",
      icon: mastercard,
    },
  ],
};
