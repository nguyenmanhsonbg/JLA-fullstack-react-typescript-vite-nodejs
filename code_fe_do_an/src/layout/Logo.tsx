import { NavLink } from "react-router-dom";

export default function Logo() {
  if (window.innerWidth > 1000)
  return (
    <div>
      <NavLink
        to={"/"}
        className="flex items-center gap-5 text-lg font-semibold md:text-base"
      >
        <img className="size-24" src="/logo.png" />
        <div>
          <div className="text-[#6fb24d]">Dekiru Nihongo</div>
          <div className="text-[#6fb24d]">Learning System</div>
        </div>
        {/* <span className="text-3xl font-semibold">DNLS</span> */}
      </NavLink>
    </div>
  );
  if(window.innerWidth <= 1000 && window.innerWidth > 750)
      return (
        <div>
          <NavLink to={"/"} className="flex items-center font-semibold ">
            <img className="size-14" src="/logo.png" />
            {/* <span className="text-3xl font-semibold">DNLS</span> */}
          </NavLink>
        </div>
      );
  if(window.innerWidth <= 750)
          return (
            <div>
              <NavLink to={"/"} className="flex items-center font-semibold ">
                <img className=" size-16" src="/logo.png" />
                {/* <span className="text-3xl font-semibold">DNLS</span> */}
              </NavLink>
            </div>
          );
}
