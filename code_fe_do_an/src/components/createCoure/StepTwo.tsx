import { Button, Flex, Tabs } from "antd";
import WeekCard from "../Card/WeekCard";
import { useEffect } from "react";

const StepTwo = ({
  week,
  handleNextStep,
  handlePreviousStep,
  setWeekData,
  weekData,
  id,
  setReload,
  reload,
  mode,
  navigate
}) => {
  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    if (!id)
      setWeekData(
        Array.from({ length: week }, (_, index) => ({
          week_name: `Week ${index + 1}`,
          week_topic: `Title For Week ${index + 1}`,
          course_id: null,
          week_status_id: 1,
          days: [],
        }))
      );
  }, [week]);

  const weekCardData = id ? weekData : new Array(week).fill(null);

  return (
    <>
      <div>
        <Tabs
          onChange={onChange}
          type="card"
          items={weekCardData.map((_, i) => {
            const weekId = String(i + 1);
            return {
              label: `Week ${weekId}`,
              key: weekId,
              children: (
                <WeekCard
                  weekIndex={i}
                  weekData={weekData}
                  setWeekData={setWeekData}
                  id={id}
                  setReload={setReload}
                  reload={reload}
                  mode={mode}
                />
              ),
            };
          })}
        />
        <Flex
          align="center"
          justify="space-between"
          style={{ marginTop: "2%" }}
        >
          <Button onClick={handlePreviousStep} style={{ width: "30%" }}>
            Previous
          </Button>
          {mode === "view" ? (
            <Button
              onClick={()=>navigate("/admin/course-management")}
              
              type="primary"
              style={{ width: "30%" }}
            >
              Return Course Page
            </Button>
          ) : (
            <Button
              onClick={handleNextStep}
              type="primary"
              style={{ width: "30%" }}
            >
              Next
            </Button>
          )}
        </Flex>
      </div>
    </>
  );
};

export default StepTwo;
