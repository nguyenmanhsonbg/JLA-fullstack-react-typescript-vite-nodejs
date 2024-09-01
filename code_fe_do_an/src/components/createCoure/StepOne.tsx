import { Form, Input, Button, Upload, notification, Select, Tooltip } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import { useEffect, useState } from "react";

const { Option } = Select;

const StepOne = ({
  course,
  setCourse,
  fileList,
  setFileList,
  onPreview,
  handleNextStep,
  mode,
  originalWeek
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const validateForm = () => {
    const { course_name, week, description, course_level, course_skill } = course;
    if (!course_name || !week || !description || !course_level || !course_skill) {
      setIsButtonDisabled(true);
    } else if (mode === "edit" && parseInt(week) < originalWeek) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const onChange = (info) => {
    if (info.file.status === "done") {
      const newImageUrl = info.file.response.filePath;
      setFileList([newImageUrl]);
      validateForm();
    }
  };

  const beforeUpload = (file) => {
    if (fileList.length >= 1) {
      //alert("Upload failed, just have one image in here");
      notification.error({
        message: "Tải lên thất bại",
        description: "Chỉ được sử dụng 1 file ảnh",
      });
      return false;
    }
    return true;
  };

  const handleUpload = async (options) => {
    const { file } = options;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload-file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { filePath } = response.data;
      setFileList([
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: filePath,
        },
      ]);
      validateForm();
    } catch (error) {
      notification.error({
        message: "Tải lên thất bại",
        description: `Error: ${error.message}`,
      });
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    let validateValue = value

    //set maximum value week
    if (name === "week") {
      validateValue = value > 12 ? 12 : value
    }
    setCourse({ ...course, [name]: validateValue });
    validateForm();
  };

  const handleSelectChange = (name, value) => {
    setCourse({ ...course, [name]: value });
    validateForm();
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      course_name: course.course_name,
      week: course.week,
      description: course.description,
      course_skill: course.course_skill,
      course_level: course.course_level,
    });
    validateForm(); 
  }, [course, form]);

  return (
    <>
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Tên khóa học"
          name="course_name"
          rules={[{ required: true, message: "Hãy nhập tên khóa học!" }]}
        >
          <Input
            placeholder="Nhập tên khóa học"
            name="course_name"
            value={course.course_name}
            onChange={handleChangeInput}
            readOnly={mode === "view"}
          />
        </Form.Item>

        <Form.Item
          label="Số tuần"
          name="week"
          rules={[{ required: true, message: "Hãy nhập số tuần!" }]}
        >
          <Input
            readOnly={mode === "view"}
            placeholder="Nhập số tuần"
            type="number"
            name="week"
            value={course.week}
            min={0}
            max={12}
            onChange={handleChangeInput}
          />
        </Form.Item>

        <Form.Item label="Hình ảnh" name="course_image">
          <ImgCrop rotationSlider>
            <Upload
              customRequest={handleUpload}
              action="http://localhost:5000/upload-file"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              name="files"
              disabled={mode === "view"}
              beforeUpload={beforeUpload}
              maxCount={1}
              onRemove={() => setFileList([])}
              showUploadList={{
                showPreviewIcon: false,
                showRemoveIcon: true,
                showDownloadIcon: false,
              }}
            >
              {fileList.length < 5 && "+ Chọn ảnh"}
            </Upload>
          </ImgCrop>
        </Form.Item>

        <Form.Item
          label="Mô tả khóa học :"
          name="description"
          rules={[{ required: true, message: "Hãy nhập mô tả!!" }]}
        >
          <Input.TextArea
            readOnly={mode === "view"}
            rows={4}
            placeholder="Nhập nội dung mô tả khóa học......"
            name="description"
            value={course.description}
            onChange={handleChangeInput}
          />
        </Form.Item>

        {/* New Form Item for Course Level */}
        <Form.Item
          label="Cấp độ"
          name="course_level"
          rules={[{ required: true, message: "Hãy chọn cấp độ học" }]}
        >
          <Select
            disabled={mode === "view"}
            value={course.course_level}
            onChange={(value) => handleSelectChange("course_level", value)}
          >
            {["N1", "N2", "N3", "N4", "N5"].map((level) => (
              <Option key={level} value={level}>
                {level}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* New Form Item for Course Skill */}
        <Form.Item
          label="Kĩ năng"
          name="course_skill"
          rules={[{ required: true, message: "Hãy chọn kĩ năng" }]}
        >
          <Input
            placeholder=""
            name="course_skill"
            value={course.course_skill}
            onChange={handleChangeInput}
            readOnly={mode === "view"}
          />
        </Form.Item>

        <Form.Item>
          <Tooltip title={isButtonDisabled ? "Hoàn thiện thông tin" : ""}>
            <Button
              type="primary"
              onClick={handleNextStep}
              style={{ width: "100%" }}
              disabled={isButtonDisabled}
            >
              {mode === "view" ? "Chi tiết khóa học" : "Tiếp theo"}
            </Button>
          </Tooltip>
        </Form.Item>
      </Form>
    </>
  );
};

export default StepOne;
