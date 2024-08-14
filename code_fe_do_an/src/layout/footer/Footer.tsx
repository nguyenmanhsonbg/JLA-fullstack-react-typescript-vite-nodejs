import Logo from "../Logo";
import AboutFooter from "./AboutFooter";
import Contact from "./Contact";
import IconFooter from "./IconFooter";

export default function Footer() {
if(window.innerWidth > 800)
  return (
    <div className="relative w-auto">
      <div className="absolute flex flex-row items-center justify-between w-full pl-10 pr-10">
        <Logo />
        <Contact />
        <AboutFooter />
        <IconFooter />
      </div>
      <img src="/footer.png" className="w-full" />
    </div>
  );
if(window.innerWidth <= 800)
  return (
    <div className="relative w-auto">
      <div className="absolute flex flex-row items-center justify-between w-full pl-10 pr-10">
        <Contact />
        <AboutFooter />
      </div>
      <img src="/footer.png" className="w-full" />
    </div>
  );
}
