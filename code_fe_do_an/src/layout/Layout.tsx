import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  
  if(window.innerWidth >= 768)
  return (
    <div className="flex flex-col bg-[#F2FAE9]">
      <Header />
      <img className="w-full" src="/banner.png" />
      {children}
      <Footer />
    </div>
  );
  if(window.innerWidth < 768)
      return (
    <div className="flex flex-col bg-[#F2FAE9]">
      <Header />
      <img className="w-full" src="/banner.png" />
      {children}
      <Footer />
    </div>
  );
}
