import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AlphabetItem {
  alphabet_id: number;
  type_id: number;
  japanese_character: string;
  romaji_character: string;
  alphabet_audio: string;
  alphabet_image: string;
}

export default function NumberDisplay() {
  const [numberList, setNumberList] = useState<AlphabetItem[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<AlphabetItem | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        let token =""
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
        }
        const request = await axios.get("/alphabet", {
          headers: {
            Authorization: token
          },
          params: {
            type_id: 7
          }
        });
        const response = request.data;
        if (response.statusCode === 200) {
          setNumberList(response.data);
        }
      } catch (error) {
        if (error.response.status === 401) {
          const confirm = window.confirm("Bạn không có quyền truy cập và cần đăng nhập để xem");
          if(confirm) {
            window.location.href = "/";
          }
        }else {
          navigate('/error', { state: { message:error} });
        }
      }
    };
    handleFetchData();
  }, []);

  const handleNumberClick = (number: AlphabetItem) => {
    setSelectedNumber(number);
    // Thêm code để phát audio nếu cần
    const audio = new Audio(number.alphabet_audio);
    audio.play();
  };

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
    <div className="container mx-auto">
      <div className="text-xl font-semibold text-[#7db660] ">SỐ ĐẾM</div>
      {selectedNumber && (
        <div className="p-4 text-center bg-[#7db660] border border-[#7db660] rounded-lg mt-7">
          <h1 className="text-3xl font-semibold text-white">
            {selectedNumber.romaji_character} - {selectedNumber.japanese_character}
          </h1>
        </div>
      )}
      <div className="grid grid-cols-5 gap-4 p-4 mt-5">
        {numberList.map((number) => (
          <button
            key={number.alphabet_id}
            onClick={() => handleNumberClick(number)}
            className={`p-4 text-2xl font-semibold border h-[100px] rounded-lg ${
              selectedNumber?.romaji_character === number.romaji_character
                ? "bg-[#7db660] text-white"
                : "bg-white text-black"
            }`}
          >
            {number.romaji_character}
          </button>
        ))}
      </div>
    </div>
  );
  if (widthScreen <= 1200)
  return (
    <div className="container mx-auto">
      <div className="text-xl font-semibold text-[#7db660] ">SỐ ĐẾM</div>
      {selectedNumber && (
        <div className="p-4 text-center bg-[#7db660] border border-[#7db660] rounded-lg mt-7">
          <h1 className="text-3xl font-semibold text-white">
            {selectedNumber.romaji_character} - {selectedNumber.japanese_character}
          </h1>
        </div>
      )}
      <div className="grid grid-cols-5 gap-4 p-4 mt-5">
        {numberList.map((number) => (
          <button
            key={number.alphabet_id}
            onClick={() => handleNumberClick(number)}
            className={`p-4 text-base font-semibold border w-full h-[80px] rounded-lg ${
              selectedNumber?.romaji_character === number.romaji_character
                ? "bg-[#7db660] text-white"
                : "bg-white text-black"
            }`}
          >
            {number.romaji_character}
          </button>
        ))}
      </div>
    </div>
  );

  
}
