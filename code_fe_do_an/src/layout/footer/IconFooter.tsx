import { FaFacebook } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

export default function IconFooter() {
  return (
    <div className="flex flex-col gap-y-5 text-[#7d9c64]">
      <FaFacebook size={50} />
      <FaFacebookMessenger size={50} />
      <FaLinkedin size={50} />
    </div>
  );
}
