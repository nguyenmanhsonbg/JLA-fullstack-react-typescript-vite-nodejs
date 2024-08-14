import {
  Bs1CircleFill,
  Bs2CircleFill,
  Bs3CircleFill,
  Bs4CircleFill,
} from "react-icons/bs";

export default function SokuonHira() {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl font-semibold text-[#7db660] ">ÂM NGẮT</div>
      <div className="flex flex-col gap-3">
        <div className="bg-[#f1f1ee] w-full h-[165px] rounded-lg p-5 gap-2 flex flex-col">
          <div className="flex flex-row items-center gap-5">
            <Bs1CircleFill size={30} color="#7db660" />
            <div className="text-xl font-semibold">Khái niệm</div>
          </div>
          <div>
            Gọi là âm ngắt vì khi đọc nó ngắt từ ngữ ra làm 2 bộ phận. Âm ngắt
            trong tiếng Nhật được thể hiện bằng chữ っ.
          </div>
          <div>
            Âm ngắt thường xuất hiện trong các kết hợp mà các chữ Hiragana kế
            tiếp âm ngắt đó thuộc các hàng : か - さ - た - ぱ.
          </div>
        </div>

        <div className="bg-[#f1f1ee] w-full h-[335px] rounded-lg p-5 gap-2 flex flex-col">
          <div className="flex flex-row items-center gap-5">
            <Bs2CircleFill size={30} color="#7db660" />
            <div className="text-xl font-semibold">
              Âm ngắt làm thay đổi nghĩa của từ
            </div>
          </div>
          <div className="mt-1">Ví dụ:</div>
          <div className="grid grid-cols-2 gap-5 pt-5">
            <div className="flex flex-col gap-3 pl-16">
              <div className="flex flex-col items-center gap-1">
                <div className="text-xl">ぶか</div>
                <div>Cấp dưới</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-xl">かさい</div>
                <div>Hỏa hoạn</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-xl">おと</div>
                <div>Âm thanh</div>
              </div>
            </div>
            <div className="flex flex-col gap-3 pr-16">
              <div className="flex flex-col items-center gap-1">
                <div className="text-xl">
                  ぶ<span className="text-[#7db660] font-semibold">っ</span>か
                </div>
                <div>Mức giá</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-xl">
                  か<span className="text-[#7db660] font-semibold">っ</span>さい
                </div>
                <div>Vỗ tay</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-xl">
                  お<span className="text-[#7db660] font-semibold">っ</span>と
                </div>
                <div>Chồng</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f1f1ee] w-full h-[500px] rounded-lg p-5 gap-2 flex flex-col">
          <div className="flex flex-row items-center gap-5">
            <Bs3CircleFill size={30} color="#7db660" />
            <div className="text-xl font-semibold">Cách đọc</div>
          </div>
          <div className="flex flex-col gap-1 mt-7">
            <div>Âm có độ dài bằng một đơn vị âm.</div>
            <div>
              Khi phát âm, âm ngắt được phát âm với độ dài tương đương 1 phách
              như với các âm khác.
            </div>
            <div>
              Khi đọc chúng ta gấp đôi chữ cái đầu tiên của từ sau âm ngắt.
            </div>
          </div>
          <div className="my-5">Ví dụ:</div>
          <div className="flex flex-row pl-40">
            <div className="flex flex-col gap-7 basis-1/4">
              <div className="text-xl">
                に<span className="text-[#7db660] font-semibold">っ</span>き
              </div>
              <div className="text-xl">
                ざ<span className="text-[#7db660] font-semibold">っ</span>し
              </div>
              <div className="text-xl">
                き<span className="text-[#7db660] font-semibold">っ</span>て
              </div>
              <div className="text-xl">
                い<span className="text-[#7db660] font-semibold">っ</span>ぱい
              </div>
            </div>
            <div className="flex flex-col basis-1/4 gap-7">
              <div className="text-xl">
                ni<span className="text-[#7db660] font-semibold">kk</span>i
              </div>
              <div className="text-xl">
                za<span className="text-[#7db660] font-semibold">ss</span>hi
              </div>
              <div className="text-xl">
                ki<span className="text-[#7db660] font-semibold">tt</span>e
              </div>
              <div className="text-xl">
                i<span className="text-[#7db660] font-semibold">pp</span>ai
              </div>
            </div>
            <div className="flex flex-col basis-1/4 gap-7">
              <div className="text-xl">Nhật ký</div>
              <div className="text-xl">Tạp chí</div>
              <div className="text-xl">Con tem</div>
              <div className="text-xl">Đầy</div>
            </div>
          </div>
        </div>

        <div className="bg-[#f1f1ee] w-full h-[165px] rounded-lg p-5 gap-2 flex flex-col">
          <div className="flex flex-row items-center gap-5">
            <Bs4CircleFill size={30} color="#7db660" />
            <div className="text-xl font-semibold">Cách viết</div>
          </div>
          <div>
            Âm ngắt được viết bằng chữ っ . Cách viết giống như 1 chữ nhỏ.
          </div>
          <div>
            Khi viết, âm ngắt được viết nhỏ hơn, thấp hơn và hơi lui về bên trái
            so với các chữ Hiragana khác.
          </div>
        </div>
      </div>
    </div>
  );
}
