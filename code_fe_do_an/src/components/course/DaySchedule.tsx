import React, { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import axios from 'axios';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

export default function DaySchedule({ weekSelected, id = null }) {
  const [daySelected, setDaySelected] = useState(() => weekSelected?.days ? weekSelected?.days[0] : {});
  const [weekData, setWeekData] = useState([]);
  const [weeklyExamId, setWeeklyExamId] = useState(0);
  const [dayData, setDayData] = useState({});
  const [loadingDayData, setLoadingDayData] = useState(null);

  const EmptyCircleIcon = () => (
    <span
      style={{
        display: 'inline-block',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        border: '2px solid green',
      }}
    ></span>
  );

  const isCompletedDay = (index) => {
    const day = weekData[index];
    if (!day) return false;

    return day.vocabulary?.percentage === 100 &&
      day.grammar?.percentage === 100 &&
      day.video?.percentage === 100 &&
      day.kanji?.percentage === 100;
  };

  const getBackgroundColor = (percentage) => {
    return percentage === 100 ? "bg-[#e0f7fa]" : "bg-green-100";
  };

  const handleFetchDetailCourseProgressByDayId = async (dayId) => {
    if (loadingDayData === dayId) return; // Prevent duplicate fetching for the same day

    setLoadingDayData(dayId); // Set loading state to the current day

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const accountId = JSON.parse(localStorage.getItem("user"))?.account_id;
      const response = await axios.post("/get_detail_course_progress_by_day", { accountId, dayId }, {
        headers: { Authorization: token },
      });

      if (response.data.statusCode === 200) {
        setDayData((prevData) => ({
          ...prevData,
          [dayId]: response.data.data,
        }));
      }
    } finally {
      setLoadingDayData(null); // Reset loading state
    }
  };

  const handleFetchDetailCourseProgressByWeekId = async (weekId) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    const accountId = JSON.parse(localStorage.getItem("user"))?.account_id;

    const response = await axios.post("/get_detail_course_progress_by_week", { accountId, weekId }, {
      headers: { Authorization: token },
    });

    if (response.data.statusCode === 200) {
      setWeekData(response.data.data);


      const requestExam = await axios.post("/get_exam_by_course_and_week", { courseId: id, weekId }, {
        headers: { Authorization: token },
      });

      const responseExam = requestExam.data;
      setWeeklyExamId(responseExam.statusCode === 200 ? responseExam.data.data.exam_id : 0);
    }
  };

  useEffect(() => {
    if (weekSelected.week_id) {
      handleFetchDetailCourseProgressByWeekId(weekSelected.week_id);
    }
  }, [weekSelected]);

  const handleDaySelect = (day) => {
    setDaySelected(day);
    if (!dayData[day.day_id]) {
      handleFetchDetailCourseProgressByDayId(day.day_id);
    }
  };

  const handleClickVocab = (day) => {
    window.location.href = `/${id}/${weekSelected.week_id}/${day.day_id}/vocabulary`;
  };

  const handleClickKanji = (day) => {
    window.location.href = `/${id}/${weekSelected.week_id}/${day.day_id}/kanji`;
  };

  const handleClickGrammar = (day) => {
    window.location.href = `/${id}/${weekSelected.week_id}/${day.day_id}/grammar`;
  };

  const handleClickVideo = (day) => {
    window.location.href = `/${id}/${weekSelected.week_id}/${day.day_id}/video`;
  };

  const handleClickExam = () => {
    window.location.href = `/${id}/${weekSelected.week_id}/${weeklyExamId}/weeklyExam`;
  };

  const handleClickExamHistory = () => {
    window.location.href = `/${id}/${weekSelected.week_id}/${weeklyExamId}/examsHistory`;
  };

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="flex flex-col w-full gap-3"
      >
        {weekSelected?.days?.map((day, index) => (
          <AccordionItem
            value={`item-${index + 1}`}
            key={index}
            onClick={() => handleDaySelect(day)}
          >
            <AccordionTrigger className='bg-[#c6edc3] pl-12 pr-6 flex items-center justify-between'>
              <div className="flex items-center">
                {isCompletedDay(index) && (
                  <Tooltip title="Learned">
                    <CheckCircleOutlined style={{ color: 'green', fontSize: '25px' }} />
                  </Tooltip>
                )}
                <span className='ml-2'>Ngày {index + 1}: {day?.day_name}</span>
              </div>
            </AccordionTrigger>

            {dayData[day.day_id]?.vocabulary?.total !== 0 && (
              <AccordionContent
                onClick={() => handleClickVocab(day)}
                className={`${getBackgroundColor(dayData[day.day_id]?.vocabulary?.percentage)} pt-4 pl-20 mt-1 cursor-pointer`}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    {dayData[day.day_id]?.vocabulary?.percentage === 100 ? (
                      <Tooltip title="Learned">
                        <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Not Learned">
                        <EmptyCircleIcon />
                      </Tooltip>
                    )}
                  </div>
                  <span style={{ marginLeft: '8px' }}>Từ vựng</span>
                </div>
              </AccordionContent>
            )}

            {dayData[day.day_id]?.grammar?.total !== 0 && (
              <AccordionContent
                onClick={() => handleClickGrammar(day)}
                className={`${getBackgroundColor(dayData[day.day_id]?.grammar?.percentage)} pt-4 pl-20 mt-1 cursor-pointer`}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    {dayData[day.day_id]?.grammar?.percentage === 100 ? (
                      <Tooltip title="Learned">
                        <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Not Learned">
                        <EmptyCircleIcon />
                      </Tooltip>
                    )}
                  </div>
                  <span style={{ marginLeft: '8px' }}>Ngữ pháp</span>
                </div>
              </AccordionContent>
            )}

            {dayData[day.day_id]?.video?.total !== 0 && (
              <AccordionContent
                onClick={() => handleClickVideo(day)}
                className={`${getBackgroundColor(dayData[day.day_id]?.video?.percentage)} pt-4 pl-20 mt-1 cursor-pointer`}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    {dayData[day.day_id]?.video?.percentage === 100 ? (
                      <Tooltip title="Learned">
                        <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Not Learned">
                        <EmptyCircleIcon />
                      </Tooltip>
                    )}
                  </div>
                  <span style={{ marginLeft: '8px' }}>Video bổ trợ</span>
                </div>
              </AccordionContent>
            )}

            {dayData[day.day_id]?.kanji?.total !== 0 && (
              <AccordionContent
                onClick={() => handleClickKanji(day)}
                className={`${getBackgroundColor(dayData[day.day_id]?.kanji?.percentage)} pt-4 pl-20 mt-1 cursor-pointer`}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    {dayData[day.day_id]?.kanji?.percentage === 100 ? (
                      <Tooltip title="Learned">
                        <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Not Learned">
                        <EmptyCircleIcon />
                      </Tooltip>
                    )}
                  </div>
                  <span style={{ marginLeft: '8px' }}>Kanji</span>
                </div>
              </AccordionContent>
            )}
          </AccordionItem>
        ))}

        {weeklyExamId !== 0 ? (
          <AccordionItem value="item-7">
            <AccordionTrigger className="bg-[#c6edc3] pl-12 pr-6">
              Kiểm tra tổng hợp
            </AccordionTrigger>
            <AccordionContent className="bg-[#effdee] pt-4 pl-20 mt-1 cursor-pointer" onClick={handleClickExam}>
              Kiểm tra
            </AccordionContent>
            <AccordionContent className="bg-[#effdee] pt-4 pl-20 mt-1 cursor-pointer" onClick={handleClickExamHistory}>
              Lịch sử kiểm tra
            </AccordionContent>
          </AccordionItem>
        ) : (
          <AccordionItem value="item-7">
            <AccordionTrigger className="bg-[#c6edc3] pl-12 pr-6">
              Kiểm tra tổng hợp
            </AccordionTrigger>
            <AccordionContent className="bg-[#effdee] pt-4 pl-20 mt-1 cursor-pointer">
              Trống
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}
