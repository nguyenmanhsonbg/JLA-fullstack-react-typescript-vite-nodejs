import { useEffect, useState } from "react";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from "react-icons/bs";

export default function SokuonKata() {

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
    <div className="flex flex-col gap-5">
      <div className="text-xl font-semibold text-[#7db660]">ÂM NGẮT</div>
      <div className="flex flex-col gap-3">
        <div className="bg-[#f1f1ee] w-full h-[150px] rounded-lg p-5 gap-2 flex flex-col">
          <div className="flex flex-row items-center gap-5 mb-3">
            <Bs1CircleFill size={30} color="#7db660" />
            <div className="text-xl font-semibold">Định nghĩa</div>
          </div>
          <div>
            Gọi là âm ngắt vì khi đọc nó ngắt từ ngữ ra làm 2 bộ phận. Âm ngắt
            trong tiếng Nhật được thể hiện bằng chữ ッ.
          </div>
          <div>
            Âm ngắt được sử dụng trước các âm thuộc hàng: カ, タ, サ, ザ, ダ ...
          </div>
        </div>
        <div className="bg-[#f1f1ee] w-full h-[150px] rounded-lg p-5 gap-2 flex flex-col">
          <div className="flex flex-row items-center gap-5 mb-3">
            <Bs2CircleFill size={30} color="#7db660" />
            <div className="text-xl font-semibold">Cách viết</div>
          </div>
          <div>
            Âm ngắt được viết bằng chữ ッ. Cách viết giống như 1 chữ ツ nhỏ.
          </div>
          <div>
            Khi viết, âm ngắt được viết nhỏ hơn, thấp hơn và hơi lui về bên trái
            so với các chữ katakana khác.
          </div>
        </div>
        <div className="bg-[#f1f1ee] w-full h-[400px] rounded-lg p-5 gap-2 flex flex-col">
          <div className="flex flex-row items-center gap-5 mb-3">
            <Bs3CircleFill size={30} color="#7db660" />
            <div className="text-xl font-semibold">Cách đọc</div>
          </div>
          <div className="mt-3">
            <div>Âm ngắt có độ dài bằng một đơn vị âm.</div>
            <div>
              Khi phát âm, âm ngắt được phát âm với độ dài tương đương 1 phách
              như với các âm khác.
            </div>
            <div>
              Khi đọc chúng ta gấp đôi chữ cái đầu tiên của từ sau âm ngắt.
            </div>
            <div className="mt-3">Ví dụ:</div>
            <div className="flex flex-row mt-7">
              <div className="flex flex-col gap-3 ml-20 basis-1/4">
                <div className="text-xl">
                  サ<span className="text-[#7db660] font-semibold">ッ</span>
                  カー
                </div>
                <div className="text-xl">
                  バ<span className="text-[#7db660] font-semibold">ッ</span>グ
                </div>
                <div className="text-xl">
                  カ<span className="text-[#7db660] font-semibold">ッ</span>ト
                </div>
                <div className="text-xl">
                  ク<span className="text-[#7db660] font-semibold">ッ</span>キ
                </div>
              </div>
              <div className="flex flex-col gap-3 basis-1/4">
                <div className="text-xl">
                  sa<span className="text-[#7db660] font-semibold">kk</span>a
                </div>
                <div className="text-xl">
                  ba<span className="text-[#7db660] font-semibold">gg</span>u
                </div>
                <div className="text-xl">
                  ka<span className="text-[#7db660] font-semibold">tt</span>o
                </div>
                <div className="text-xl">
                  ku<span className="text-[#7db660] font-semibold">kk</span>i
                </div>
              </div>
              <div className="flex flex-col gap-3 basis-1/4">
                <div className="text-xl">Bóng đá</div>
                <div className="text-xl">Túi xách</div>
                <div className="text-xl">Cắt</div>
                <div className="text-xl">Bánh quy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (widthScreen <= 1200)
    return (
      <div className="flex flex-col gap-5">
        <div className="text-xl font-semibold text-[#7db660]">ÂM NGẮT</div>
        <div className="flex flex-col gap-3">
          <div className="bg-[#f1f1ee] w-full h-[150px] rounded-lg p-3 gap-2 flex flex-col">
            <div className="flex flex-row items-center gap-2 mb-3">
              <Bs1CircleFill size={30} color="#7db660" />
              <div className="text-xl font-semibold">Định nghĩa</div>
            </div>
            <div>
              Gọi là âm ngắt vì khi đọc nó ngắt từ ngữ ra làm 2 bộ phận. Âm ngắt
              trong tiếng Nhật được thể hiện bằng chữ ッ.
            </div>
            <div>
              Âm ngắt được sử dụng trước các âm thuộc hàng: カ, タ, サ, ザ, ダ ...
            </div>
          </div>
          <div className="bg-[#f1f1ee] w-full h-[150px] rounded-lg p-3 gap-2 flex flex-col">
            <div className="flex flex-row items-center gap-2 mb-3">
              <Bs2CircleFill size={30} color="#7db660" />
              <div className="text-xl font-semibold">Cách viết</div>
            </div>
            <div>
              Âm ngắt được viết bằng chữ ッ. Cách viết giống như 1 chữ ツ nhỏ.
            </div>
            <div>
              Khi viết, âm ngắt được viết nhỏ hơn, thấp hơn và hơi lui về bên trái
              so với các chữ katakana khác.
            </div>
          </div>
          <div className="bg-[#f1f1ee] w-full h-[400px] rounded-lg p-3 gap-2 flex flex-col">
            <div className="flex flex-row items-center gap-2 mb-3">
              <Bs3CircleFill size={30} color="#7db660" />
              <div className="text-xl font-semibold">Cách đọc</div>
            </div>
            <div className="mt-3">
              <div>Âm ngắt có độ dài bằng một đơn vị âm.</div>
              <div>
                Khi phát âm, âm ngắt được phát âm với độ dài tương đương 1 phách
                như với các âm khác.
              </div>
              <div>
                Khi đọc chúng ta gấp đôi chữ cái đầu tiên của từ sau âm ngắt.
              </div>
              <div className="mt-3">Ví dụ:</div>
              <div className="flex flex-row mt-7">
                <div className="flex flex-col gap-3 ml-20 basis-1/4">
                  <div className="text-xl">
                    サ<span className="text-[#7db660] font-semibold">ッ</span>
                    カー
                  </div>
                  <div className="text-xl">
                    バ<span className="text-[#7db660] font-semibold">ッ</span>グ
                  </div>
                  <div className="text-xl">
                    カ<span className="text-[#7db660] font-semibold">ッ</span>ト
                  </div>
                  <div className="text-xl">
                    ク<span className="text-[#7db660] font-semibold">ッ</span>キ
                  </div>
                </div>
                <div className="flex flex-col gap-3 basis-1/4">
                  <div className="text-xl">
                    sa<span className="text-[#7db660] font-semibold">kk</span>a
                  </div>
                  <div className="text-xl">
                    ba<span className="text-[#7db660] font-semibold">gg</span>u
                  </div>
                  <div className="text-xl">
                    ka<span className="text-[#7db660] font-semibold">tt</span>o
                  </div>
                  <div className="text-xl">
                    ku<span className="text-[#7db660] font-semibold">kk</span>i
                  </div>
                </div>
                <div className="flex flex-col gap-3 basis-1/4">
                  <div className="text-xl">Bóng đá</div>
                  <div className="text-xl">Túi xách</div>
                  <div className="text-xl">Cắt</div>
                  <div className="text-xl">Bánh quy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
