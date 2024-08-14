import { Button } from "../ui/button";

export default function ResetDeadline() {
  return (
    <div className="w-[800px] h-[120px] border shadow-md rounded-md flex flex-row py-7 pl-7 pr-3 items-center">
      <div className="flex flex-col gap-3 basis-5/6">
        <div className="text-2xl font-semibold">
          Làm mới thời gian học của tuần
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Bạn cần 100 </span>
          <img
            src={"/lasen.png"}
            style={{ width: "20px", height: "20px", margin: "0 5px" }}
          />
          <span> để làm mới thời gian học của tuần này</span>
        </div>
      </div>
      <div className="basis-1/6">
        <Button className="px-7 bg-[#f8d29a] hover:bg-[#fac474] text-black">Làm mới</Button>
      </div>
    </div>
  );
}
