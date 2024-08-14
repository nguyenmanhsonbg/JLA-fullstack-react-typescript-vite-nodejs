import React, { useEffect, useState } from "react";
import {
  Bs1CircleFill,
  Bs2CircleFill,
  Bs3CircleFill,
  Bs4CircleFill,
} from "react-icons/bs";
export default function ChoonHira() {

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
      <div className="text-xl font-semibold text-[#7db660] ">TRƯỜNG ÂM</div>
      <div className="flex flex-row w-full h-[150px] gap-3">
        {/*khai niem */}
        <div className="bg-[#f1f1ee] basis-1/2 rounded-lg p-5 flex flex-col gap-5">
          <div className="flex flex-row items-center gap-5">
            <Bs1CircleFill size={30} color="#7db660" />
            <div className="text-xl font-semibold">Khái niệm</div>
          </div>
          <div>
            Trường âm là các nguyên âm kéo dài, có độ dài gấp đôi các nguyên âm.
          </div>
        </div>
        {/*cach doc */}
        <div className="bg-[#f1f1ee] basis-1/2 rounded-lg p-5 flex flex-col gap-5">
          <div className="flex flex-row items-center gap-5">
            <Bs2CircleFill size={30} color="#7db660" />
            <div className="text-xl font-semibold">Cách đọc</div>
          </div>
          <div>
            Nếu âm あ có độ dài là 1 âm thì âm ああ có độ dài là 2, nói cách
            khác đọc kéo dài gấp đôi.
          </div>
        </div>
      </div>
      {/*truong am lam thay doi nghia */}
      <div className="bg-[#f1f1ee] h-[300px] w-full rounded-lg p-5 flex flex-col gap-3">
        <div className="flex flex-row items-center gap-5">
          <Bs3CircleFill size={30} color="#7db660" />
          <div className="text-xl font-semibold">
            Trường âm làm thay đổi nghĩa của từ
          </div>
        </div>
        <div>Ví dụ:</div>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-3 pl-16">
            <div>おばさん (cô, bác gái)</div>
            <div>おじさん (chú, bác trai)</div>
            <div>ゆき (tuyết)</div>
            <div>え (tranh)</div>
            <div>へや (phòng)</div>
          </div>
          <div className="flex flex-col gap-3 pr-16">
            <div>
              おば<span className="text-[#7db660] font-semibold">あ</span>さん
              (bà)
            </div>
            <div>
              おじ<span className="text-[#7db660] font-semibold">い</span>さん
              (ông)
            </div>
            <div>
              ゆ<span className="text-[#7db660] font-semibold">う</span>き (dũng
              cảm)
            </div>
            <div>
              え<span className="text-[#7db660] font-semibold">え</span> (vâng)
            </div>
            <div>
              へ<span className="text-[#7db660] font-semibold">い</span>や (đồng
              bằng)
            </div>
          </div>
        </div>
      </div>
      {/*cach viet */}
      <div className="bg-[#f1f1ee] h-[750px] w-full rounded-lg p-5 flex flex-col">
        <div className="flex flex-row items-center gap-5">
          <Bs4CircleFill size={30} color="#7db660" />
          <div className="text-xl font-semibold">Cách viết</div>
        </div>
        <div className="flex flex-col gap-6 mt-3">
          <div className="flex flex-col gap-3">
            <div className="font-semibold">
              1. Trường âm của cột あ ta thêm あ sau các chữ thuộc cột あ
            </div>
            <div>
              Ví dụ: chữ か thuộc cột あ khi thêm trường âm ta thêm あ vào sau
              chữ か
            </div>
            <div className="pl-10">
              おか<span className="text-[#7db660] font-semibold">あ</span>さん
              Mẹ
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-semibold">
              2. Trường âm của cột い ta thêm い vào sau các chữ thuộc cột い
            </div>
            <div>
              Ví dụ: chữ じ thuộc cột い ta thêm い vào sau じ để tạo thành
              trường âm
            </div>
            <div className="pl-10">
              おじ<span className="text-[#7db660] font-semibold">い</span>さん
              Ông 
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-semibold">
              3. Trường âm cột う thêm う vào sau các chữ thuộc cột う
            </div>
            <div>
            Ví dụ: chữ く thuộc cột う thì khi ghi trường âm ta thêm chữ う vào sau chữ く
            </div>
            <div className="pl-10">
            く<span className="text-[#7db660] font-semibold">う</span>こう Máy bay
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-semibold">
              4. Trường âm cột え thêm い vào sau các chữ thuộc cột え
            </div>
            <div>
            Ví dụ: chữ れ thuộc cột え thì khi ghi trường âm ta thêm chữ い vào sau chữ れ
            </div>
            <div className="pl-10">
            れ<span className="text-[#7db660] font-semibold">い</span>ぶん Câu ví dụ
            </div>
            <div className="pl-10">
            <span className="font-semibold">Chú ý</span>: trong nhiều trường hợp trường âm của cột え thêm え. Ví dụ: ね<span className="text-[#7db660] font-semibold">え</span> Này
            </div>
            
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-semibold">
              5. Trường âm cột お thêm う vào sau các chữ thuộc cột お
            </div>
            <div>
            Ví dụ: chữ よ thuộc cột お thì khi ghi trường âm ta thêm chữ う vào sau chữ よ
            </div>
            <div className="pl-10">
            よ<span className="text-[#7db660] font-semibold">う</span>やく Dần dần, từ từ
            </div>
            <div className="pl-10">
            <span className="font-semibold">Chú ý</span>: trong nhiều trường hợp trường âm của cột お thêm お. Ví dụ: と<span className="text-[#7db660] font-semibold">お</span>い Xa
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if(widthScreen <= 1200)
    return (
      <div className="flex flex-col gap-3">
        <div className="text-xl font-semibold text-[#7db660] ">TRƯỜNG ÂM</div>
        <div className="flex flex-row w-full h-[150px] gap-3">
          {/*khai niem */}
          <div className="bg-[#f1f1ee] basis-1/2 rounded-lg p-3 flex flex-col gap-3">
            <div className="flex flex-row items-center gap-3">
              <Bs1CircleFill size={30} color="#7db660" />
              <div className="text-xl font-semibold">Khái niệm</div>
            </div>
            <div>
              Trường âm là các nguyên âm kéo dài, có độ dài gấp đôi các nguyên âm.
            </div>
          </div>
          {/*cach doc */}
          <div className="bg-[#f1f1ee] basis-1/2 rounded-lg p-3 flex flex-col gap-3">
            <div className="flex flex-row items-center gap-3">
              <Bs2CircleFill size={30} color="#7db660" />
              <div className="text-xl font-semibold">Cách đọc</div>
            </div>
            <div>
              Nếu âm あ có độ dài là 1 âm thì âm ああ có độ dài là 2, nói cách
              khác đọc kéo dài gấp đôi.
            </div>
          </div>
        </div>
        {/*truong am lam thay doi nghia */}
        <div className="bg-[#f1f1ee] h-[300px] w-full rounded-lg p-5 flex flex-col gap-3">
          <div className="flex flex-row items-center gap-5">
            <Bs3CircleFill size={30} color="#7db660" />
            <div className="text-xl font-semibold">
              Trường âm làm thay đổi nghĩa của từ
            </div>
          </div>
          <div>Ví dụ:</div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-3 pl-16">
              <div>おばさん (cô, bác gái)</div>
              <div>おじさん (chú, bác trai)</div>
              <div>ゆき (tuyết)</div>
              <div>え (tranh)</div>
              <div>へや (phòng)</div>
            </div>
            <div className="flex flex-col gap-1 pr-16">
              <div>
                おば<span className="text-[#7db660] font-semibold">あ</span>さん
                (bà)
              </div>
              <div>
                おじ<span className="text-[#7db660] font-semibold">い</span>さん
                (ông)
              </div>
              <div>
                ゆ<span className="text-[#7db660] font-semibold">う</span>き (dũng
                cảm)
              </div>
              <div>
                え<span className="text-[#7db660] font-semibold">え</span> (vâng)
              </div>
              <div>
                へ<span className="text-[#7db660] font-semibold">い</span>や (đồng
                bằng)
              </div>
            </div>
          </div>
        </div>
        {/*cach viet */}
        <div className="bg-[#f1f1ee] h-[750px] w-full rounded-lg p-5 flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <Bs4CircleFill size={30} color="#7db660" />
            <div className="text-xl font-semibold">Cách viết</div>
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <div className="flex flex-col gap-1">
              <div className="font-semibold">
                1. Trường âm của cột あ ta thêm あ sau các chữ thuộc cột あ
              </div>
              <div>
                Ví dụ: chữ か thuộc cột あ khi thêm trường âm ta thêm あ vào sau
                chữ か
              </div>
              <div className="pl-10">
                おか<span className="text-[#7db660] font-semibold">あ</span>さん
                Mẹ
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold">
                2. Trường âm của cột い ta thêm い vào sau các chữ thuộc cột い
              </div>
              <div>
                Ví dụ: chữ じ thuộc cột い ta thêm い vào sau じ để tạo thành
                trường âm
              </div>
              <div className="pl-10">
                おじ<span className="text-[#7db660] font-semibold">い</span>さん
                Ông 
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold">
                3. Trường âm cột う thêm う vào sau các chữ thuộc cột う
              </div>
              <div>
              Ví dụ: chữ く thuộc cột う thì khi ghi trường âm ta thêm chữ う vào sau chữ く
              </div>
              <div className="pl-10">
              く<span className="text-[#7db660] font-semibold">う</span>こう Máy bay
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold">
                4. Trường âm cột え thêm い vào sau các chữ thuộc cột え
              </div>
              <div>
              Ví dụ: chữ れ thuộc cột え thì khi ghi trường âm ta thêm chữ い vào sau chữ れ
              </div>
              <div className="pl-10">
              れ<span className="text-[#7db660] font-semibold">い</span>ぶん Câu ví dụ
              </div>
              <div className="pl-10">
              <span className="font-semibold">Chú ý</span>: trong nhiều trường hợp trường âm của cột え thêm え. Ví dụ: ね<span className="text-[#7db660] font-semibold">え</span> Này
              </div>
              
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold">
                5. Trường âm cột お thêm う vào sau các chữ thuộc cột お
              </div>
              <div>
              Ví dụ: chữ よ thuộc cột お thì khi ghi trường âm ta thêm chữ う vào sau chữ よ
              </div>
              <div className="pl-10">
              よ<span className="text-[#7db660] font-semibold">う</span>やく Dần dần, từ từ
              </div>
              <div className="pl-10">
              <span className="font-semibold">Chú ý</span>: trong nhiều trường hợp trường âm của cột お thêm お. Ví dụ: と<span className="text-[#7db660] font-semibold">お</span>い Xa
              </div>
            </div>
          </div>
        </div>
      </div>
    );  
}
