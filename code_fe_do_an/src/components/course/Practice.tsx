import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export default function Practice({ data = [] }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  console.log(
    "🚀 ~ Practice ~ currentQuestion:",
    data[currentQuestion]?.question_answer
  );
  const [answer, setAnswer] = useState(null);
  const [noti, setNoti] = useState(null);
  const [showNoti, setShowNoti] = useState(false);

  const handleChooseAnswer = (item) => {
    setAnswer(item.option_content);
    if (
      item.option_content?.split(". ")[0] ===
      data[currentQuestion]?.question_answer
    ) {
      setNoti("Correct");
      setShowNoti(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        let nextQuestion = currentQuestion + 1;
        if (!data[nextQuestion]) {
          setNoti("Congratulations");
          setShowNoti(true);
          return;
        }
        setNoti(null);
        setShowNoti(false);
      }, 2000);
    } else {
      setNoti("Wrong");
      setShowNoti(true);
    }
  };
  return (
    <div className="w-full h-[700px] bg-[#fff8e1] rounded-md flex flex-col px-20 py-10 gap-7">
      <div className="text-xl text-[#4b9c47] font-semibold">
        Luyện tập: Hãy chọn đáp án!
      </div>
      <div className="px-20">
        <Progress
          className="h-[20px]"
          value={((currentQuestion + 1) / data.length) * 100}
        />
      </div>
      <div className="w-full h-[600px] bg-white rounded-md px-20 py-10 flex flex-col gap-3">
        {showNoti && <div>{noti}</div>}
        {data[currentQuestion] && (
          <>
            <div className="basis-[10%] text-xl text-[#4b9c47]">
              Câu {currentQuestion + 1}:
            </div>
            <div className="basis-[30%] flex flex-col gap-3">
              <div className=" text-[#4b9c47] font-semibold">
                Điền vào chỗ trống:
              </div>
              <div className="flex items-center justify-center pl-10 text-xl">
                {data[currentQuestion]?.question_content}
              </div>
            </div>
            <div className="basis-1/2">
              <div className=" text-[#4b9c47] font-semibold">
                Hãy chọn đáp án đúng:
              </div>
              <div className="grid grid-cols-2 gap-10 py-10 px-28">
                {data[currentQuestion]?.options?.map((item, index) => (
                  <div
                    className={
                      answer === item.option_content
                        ? "flex items-center justify-center border border-[#4b9c47] rounded-md h-[70px] w-[200px] bg-[#4b9c47] text-white cursor-pointer"
                        : "flex items-center justify-center border border-[#4b9c47] rounded-md h-[70px] w-[200px] hover:bg-[#4b9c47] hover:text-white cursor-pointer"
                    }
                    key={index}
                    onClick={() => handleChooseAnswer(item)}
                  >
                    {item.option_content}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
