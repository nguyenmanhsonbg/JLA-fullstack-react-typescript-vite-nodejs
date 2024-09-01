import { Modal, Form, Input, Button, Checkbox, Typography, Flex } from "antd";
import { useEffect, useState } from "react";

function AddDayModal({
  visible,
  onCancel,
  setDayData,
  dayData,
  daySelected,
  id,
  dayIndexSelected,
  weekData,
  weekIndex,
}) {
  const [form] = Form.useForm();
  const [dayTitle, setDayTitle] = useState("");
  const [repeatData, setRepeatData] = useState([]);
  const [repeatValue, setRepeatValue] = useState([]);

  const onSubmit = () => {
    if (id && daySelected) {
      const cloneData = [...dayData];
      cloneData[dayIndexSelected].day_name = dayTitle;
      cloneData[dayIndexSelected].repeat_lesson = repeatValue;
      setDayData(cloneData);
    } else {
      setDayData([
        ...dayData,
        {
          day_name: dayTitle,
          lessons: [],
          day_status_id: 1,
          week_id: null,
          repeat_lesson: repeatValue,
        },
      ]);
    }
    setDayTitle("");
    onCancel();
  };
  useEffect(() => {
    if (daySelected) {
      setDayTitle(daySelected.day_name);
      form.setFieldsValue({
        day_name: daySelected.day_name,
      });
      let _repeatLesson;
      if (typeof daySelected.repeat_lesson === "string") {
        _repeatLesson = JSON.parse(daySelected.repeat_lesson) || [];
      } else {
        _repeatLesson = daySelected.repeat_lesson || [];
      }
      setRepeatValue(_repeatLesson);
    } else {
      form.setFieldsValue({
        day_name: "",
      });
      setRepeatValue([]);
      setDayTitle("");
    }
  }, [daySelected]);

  useEffect(() => {
    setRepeatData(() => weekData.filter((_, index) => index <= weekIndex));
  }, [weekData]);
  return (
    <Modal
      title={id && daySelected ? "Cập nhật ngày học" : "Thêm ngày học mới"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose={true}
    >
      <Form form={form}>
        <Form.Item
          name="day_name"
          label="Tên ngày học :"
          rules={[{ required: true, message: "Hãy nhập tên ngày học" }]}
        >
          <Input
            value={dayTitle}
            onChange={(e) => setDayTitle(e.target.value)}
          />
        </Form.Item>
        {/* <Form.Item>
          <Typography>Repeat Day:</Typography>
          <Flex style={{ flexDirection: "column" }}>
            {repeatData.map((repeat, pos) => {
              return (
                <>
                  {repeat?.days.map((_, index) => {
                    const reapValue = `Week ${pos + 1} - Day ${index + 1}`;

                    if (pos === weekIndex) {
                      if (typeof dayIndexSelected !== "number") {
                        return (
                          <Checkbox
                            checked={repeatValue.includes(reapValue)}
                            onChange={() => {
                              let cloneRepeatValue = [...repeatValue];
                              if (cloneRepeatValue.includes(reapValue)) {
                                cloneRepeatValue = cloneRepeatValue.filter(
                                  (item) => item !== reapValue
                                );
                              } else {
                                cloneRepeatValue.push(reapValue);
                              }
                              setRepeatValue(cloneRepeatValue);
                            }}
                          >
                            {reapValue}
                          </Checkbox>
                        );
                      } else if (dayIndexSelected > index) {
                        return (
                          <Checkbox
                            checked={repeatValue.includes(reapValue)}
                            onChange={() => {
                              let cloneRepeatValue = [...repeatValue];
                              if (cloneRepeatValue.includes(reapValue)) {
                                cloneRepeatValue = cloneRepeatValue.filter(
                                  (item) => item !== reapValue
                                );
                              } else {
                                cloneRepeatValue.push(reapValue);
                              }
                              setRepeatValue(cloneRepeatValue);
                            }}
                          >
                            {reapValue}
                          </Checkbox>
                        );
                      }
                    } else {
                      return (
                        <Checkbox
                          checked={repeatValue.includes(reapValue)}
                          onChange={() => {
                            let cloneRepeatValue = [...repeatValue];
                            if (cloneRepeatValue.includes(reapValue)) {
                              cloneRepeatValue = cloneRepeatValue.filter(
                                (item) => item !== reapValue
                              );
                            } else {
                              cloneRepeatValue.push(reapValue);
                            }
                            setRepeatValue(cloneRepeatValue);
                          }}
                        >
                          {reapValue}
                        </Checkbox>
                      );
                    }
                  })}
                </>
              );
            })}
          </Flex>
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" onClick={onSubmit}>
            {id && daySelected ? "Cập nhật" : "Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddDayModal;
