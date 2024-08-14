import { useEffect, useState } from "react";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";

export default function ChoonKata() {
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidthScreen(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWidthScreen(window.innerWidth);
      });
    };
  });
  if (widthScreen > 1200)
    return (
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold text-[#7db660]">TRƯỜNG ÂM</div>
        <div className="flex flex-col gap-3">
          <div className="bg-[#f1f1ee] w-full h-[105px] rounded-lg p-5 gap-2 flex flex-col">
            <div className="flex flex-row items-center gap-5">
              <Bs1CircleFill size={30} color="#7db660" />
              <div className="text-xl font-semibold">Khái niệm</div>
            </div>
            <div>
              Trường âm là những nguyên âm kéo dài, có độ dài gấp đôi các nguyên
              âm [ア] [イ] [ウ] [エ] [オ]
            </div>
          </div>
          <div className="bg-[#f1f1ee] w-full h-[370px] rounded-lg p-5 gap-2 flex flex-col">
            <div className="flex flex-row items-center gap-5">
              <Bs2CircleFill size={30} color="#7db660" />
              <div className="text-xl font-semibold">Cách ghi</div>
            </div>
            <div className="mt-5">Sử dụng kí hiệu trường âm ―</div>
            <div>Ví dụ:</div>
            <div className="flex flex-row mt-3">
              <div className="flex flex-col gap-3 ml-32 basis-1/4">
                <div className="text-xl">
                  カ<span className="text-[#7db660] font-semibold">ー</span>ド
                </div>
                <div className="text-xl">
                  タクシ<span className="text-[#7db660] font-semibold">ー</span>
                </div>
                <div className="text-xl">
                  ス<span className="text-[#7db660] font-semibold">ー</span>パ
                  <span className="text-[#7db660] font-semibold">ー</span>
                </div>
                <div className="text-xl">
                  ノ<span className="text-[#7db660] font-semibold">ー</span>ト
                </div>
                <div className="text-xl">
                  エスカレ
                  <span className="text-[#7db660] font-semibold">ー</span>タ
                  <span className="text-[#7db660] font-semibold">ー</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 ml-32 basis-1/4">
                <div className="text-xl">Thẻ, bưu thiếp</div>
                <div className="text-xl">Taxi</div>
                <div className="text-xl">Siêu thị</div>
                <div className="text-xl">Quyển vở</div>
                <div className="text-xl">Thang cuốn</div>
              </div>
            </div>
          </div>
          <div className="bg-[#f1f1ee] w-full h-[720px] rounded-lg p-5 gap-2 flex flex-col">
            <div className="flex flex-row items-center gap-5">
              <Bs3CircleFill size={30} color="#7db660" />
              <div className="text-xl font-semibold">Cách viết</div>
            </div>
            <div className="mt-3">
              Nếu âm ア có độ dài là 1 thì âm アー có độ dài là 2, nói cách khác
              nếu dung khái niệm đợn vị âm thì âm ア có độ dài 1 đơn vị, còn âm
              アー có độ dài 2 đơn vị.
            </div>
            <div className="flex flex-col gap-5 mt-3">
              <div className="flex flex-col gap-3">
                <div className="font-semibold">
                  Trường âm của cột ア khi đọc sẽ kéo dài âm ア thành 2 đơn vị
                  âm.
                </div>
                <div>Ví dụ:</div>
                <div className="ml-20">
                  カ<span className="text-[#7db660] font-semibold">ー</span>ド
                  ka
                  <span className="text-[#7db660] font-semibold">a</span>do Thẻ,
                  bưu thiếp
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="font-semibold">
                  Trường âm của cột イ khi đọc sẽ kéo dài âm イ thành 2 đơn vị
                  âm.
                </div>
                <div>Ví dụ:</div>
                <div className="ml-20">
                  ディズニ
                  <span className="text-[#7db660] font-semibold">ー</span>
                  ランド dizuni
                  <span className="text-[#7db660] font-semibold">i</span>rando
                  Disneyland
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="font-semibold">
                  Trường âm của cột ウ khi đọc sẽ kéo dài âm ウ thành 2 đơn vị
                  âm.
                </div>
                <div>Ví dụ:</div>
                <div className="ml-20">
                  ク<span className="text-[#7db660] font-semibold">ー</span>ラ
                  <span className="text-[#7db660] font-semibold">ー</span> ku
                  <span className="text-[#7db660] font-semibold">u</span>raa Máy
                  lạnh
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="font-semibold">
                  Trường âm của cột エ khi đọc sẽ kéo dài âm エ thành 2 đơn vị
                  âm.
                </div>
                <div>Ví dụ:</div>
                <div className="ml-20">
                  セ<span className="text-[#7db660] font-semibold">ー</span>タ
                  <span className="text-[#7db660] font-semibold">ー</span> sei
                  <span className="text-[#7db660] font-semibold">i</span>taa Áo
                  len
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="font-semibold">
                  Trường âm của cột オ khi đọc sẽ kéo dài âm オ thành 2 đơn vị
                  âm.
                </div>
                <div>Ví dụ:</div>
                <div className="ml-20">
                  オ<span className="text-[#7db660] font-semibold">ー</span>バ
                  <span className="text-[#7db660] font-semibold">ー</span> o
                  <span className="text-[#7db660] font-semibold">o</span>ba
                  <span className="text-[#7db660] font-semibold">a</span> Áo
                  choàng
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  if (widthScreen <= 1200)
    return (
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold text-[#7db660]">TRƯỜNG ÂM</div>
        <div className="flex flex-col gap-3">
          <div className="bg-[#f1f1ee] w-full h-[105px] rounded-lg p-3 gap-2 flex flex-col">
            <div className="flex flex-row items-center gap-5">
              <Bs1CircleFill size={30} color="#7db660" />
              <div className="text-xl font-semibold">Khái niệm</div>
            </div>
            <div>
              Trường âm là những nguyên âm kéo dài, có độ dài gấp đôi các nguyên
              âm [ア] [イ] [ウ] [エ] [オ]
            </div>
          </div>
          <div className="bg-[#f1f1ee] w-full h-[370px] rounded-lg p-3 gap-2 flex flex-col">
            <div className="flex flex-row items-center gap-5">
              <Bs2CircleFill size={30} color="#7db660" />
              <div className="text-xl font-semibold">Cách ghi</div>
            </div>
            <div className="mt-5">Sử dụng kí hiệu trường âm ―</div>
            <div>Ví dụ:</div>
            <div className="flex flex-row mt-3">
              <div className="flex flex-col gap-3 ml-32 basis-1/4">
                <div className="text-base">
                  カ<span className="text-[#7db660] font-semibold">ー</span>ド
                </div>
                <div className="text-base">
                  タクシ<span className="text-[#7db660] font-semibold">ー</span>
                </div>
                <div className="text-base">
                  ス<span className="text-[#7db660] font-semibold">ー</span>パ
                  <span className="text-[#7db660] font-semibold">ー</span>
                </div>
                <div className="text-base">
                  ノ<span className="text-[#7db660] font-semibold">ー</span>ト
                </div>
                <div className="text-base">
                  エスカレ
                  <span className="text-[#7db660] font-semibold">ー</span>タ
                  <span className="text-[#7db660] font-semibold">ー</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 ml-32 basis-1/4">
                <div className="text-base">Thẻ, bưu thiếp</div>
                <div className="text-base">Taxi</div>
                <div className="text-base">Siêu thị</div>
                <div className="text-base">Quyển vở</div>
                <div className="text-base">Thang cuốn</div>
              </div>
            </div>
          </div>
          <div className="bg-[#f1f1ee] w-full h-[720px] rounded-lg p-3 gap-2 flex flex-col">
            <div className="flex flex-row items-center gap-2">
              <Bs3CircleFill size={30} color="#7db660" />
              <div className="text-xl font-semibold">Cách viết</div>
            </div>
            <div className="mt-3">
              Nếu âm ア có độ dài là 1 thì âm アー có độ dài là 2, nói cách khác
              nếu dung khái niệm đợn vị âm thì âm ア có độ dài 1 đơn vị, còn âm
              アー có độ dài 2 đơn vị.
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex flex-col gap-3">
                <div className="font-semibold">
                  Trường âm của cột ア khi đọc sẽ kéo dài âm ア thành 2 đơn vị
                  âm.
                </div>
                <div>Ví dụ:</div>
                <div className="ml-20">
                  カ<span className="text-[#7db660] font-semibold">ー</span>ド
                  ka
                  <span className="text-[#7db660] font-semibold">a</span>do Thẻ,
                  bưu thiếp
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold">
                  Trường âm của cột イ khi đọc sẽ kéo dài âm イ thành 2 đơn vị
                  âm.
                </div>
                <div>Ví dụ:</div>
                <div className="ml-20">
                  ディズニ
                  <span className="text-[#7db660] font-semibold">ー</span>
                  ランド dizuni
                  <span className="text-[#7db660] font-semibold">i</span>rando
                  Disneyland
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold">
                  Trường âm của cột ウ khi đọc sẽ kéo dài âm ウ thành 2 đơn vị
                  âm.
                </div>
                <div>Ví dụ:</div>
                <div className="ml-20">
                  ク<span className="text-[#7db660] font-semibold">ー</span>ラ
                  <span className="text-[#7db660] font-semibold">ー</span> ku
                  <span className="text-[#7db660] font-semibold">u</span>raa Máy
                  lạnh
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold">
                  Trường âm của cột エ khi đọc sẽ kéo dài âm エ thành 2 đơn vị
                  âm.
                </div>
                <div>Ví dụ:</div>
                <div className="ml-20">
                  セ<span className="text-[#7db660] font-semibold">ー</span>タ
                  <span className="text-[#7db660] font-semibold">ー</span> sei
                  <span className="text-[#7db660] font-semibold">i</span>taa Áo
                  len
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold">
                  Trường âm của cột オ khi đọc sẽ kéo dài âm オ thành 2 đơn vị
                  âm.
                </div>
                <div>Ví dụ:</div>
                <div className="ml-20">
                  オ<span className="text-[#7db660] font-semibold">ー</span>バ
                  <span className="text-[#7db660] font-semibold">ー</span> o
                  <span className="text-[#7db660] font-semibold">o</span>ba
                  <span className="text-[#7db660] font-semibold">a</span> Áo
                  choàng
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
