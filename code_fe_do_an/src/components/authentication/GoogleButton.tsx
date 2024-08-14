import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

export default function GoogleButton() {
  return (
    <div>
      <Button
        className="text-center w-full rounded-full
     shadow-md bg-[#fbe9e7] text-[#ff8a65] hover:bg-[#f1ccc7]"
      >
        <div className="flex justify-center items-center gap-3"><FaGoogle />
        Đăng ký bằng tài khoản Google</div>
        
      </Button>
    </div>
  );
}
