import {
  Modal,
  Form,
  Radio,
  Button,
  Space,
  Input,
  Flex,
  Divider,
  Select,
  Upload,
  notification
} from "antd";
const { Option } = Select;
import ImgCrop from "antd-img-crop";
import { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import axios from "axios";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

function AddLessonModal({
  visible,
  onCancel,
  dayData,
  setDayData,
  lessonSelected,
  id,
  lessonIndexSelected,
  mode,
}) {
  const [form] = Form.useForm();
  const [fileImageList, setFileImageList] = useState<UploadFile[]>([]);
  const [fileAudioAndVideoList, setFileAudioAndVideoList] = useState<
    UploadFile[]
  >([]);

  const [userChose, setUserChose] = useState(0);
  const [userSelected, setUserSelected] = useState(null);

  const onImageChange = (info) => {
    if (info.file.status === "done") {
      const newImageUrl = info.file.response.filePath;
      setFileImageList([newImageUrl]);
    }
  };

  const onAudioOrVideoChange = (info) => {
    if (info.file.status === "done") {
      const newImageUrl = info.file.response.filePath;
      setFileAudioAndVideoList([newImageUrl]);
    }
  };

  const handleImageUpload = async (options) => {
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
      setFileImageList([
        ...fileImageList,
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: filePath,
        },
      ]);
    } catch (error) {
       notification.error({
          message: "Upload failed:",
          description: `Error: ${error.message}`,
        });
    
    }
  };

  const handleAudioOrVideoUpload = async (options) => {
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
      setFileAudioAndVideoList([
        ...fileAudioAndVideoList,
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: filePath,
        },
      ]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const beforeUpload = (file) => {
    if (fileImageList.length >= 1) {
      alert("Upload failed, just have one image in here");
      return false;
    }
    return true;
  };

  const beforeUploadAudioAndVideo = (file) => {
    if (fileAudioAndVideoList.length >= 1) {
      alert("Upload failed, just have one audio/video in here");
      return false;
    }
    return true;
  };

  const onSubmit = (values) => {
    const cloneDayData = [...dayData];
    if (id && lessonSelected) {
      const payload = values.vocab_name
        ? {
            ...values,
            vocab_audio: fileAudioAndVideoList.map((file) => file.url).join(),
            vocab_image: fileImageList.map((file) => file.url).join(),
            vocab_id: lessonSelected.vocab_id,
          }
        : values.kanji_name
        ? {
            ...values,
            kanji_image: fileImageList.map((file) => file.url).join(),
            kanji_id: lessonSelected.kanji_id,
          }
        : values.video_name
        ? {
            ...values,
            video_link: fileAudioAndVideoList.map((file) => file.url).join(),
            video_id: lessonSelected.video_id,
          }
        : values.grammar_name
        ? {
            ...values,
            grammar_image: fileImageList.map((file) => file.url).join(),
            grammar_id: lessonSelected.grammar_id,
          }
        : null;

      const index = cloneDayData.findIndex(
        (day) => day.day_id === values.day_id
      );
      cloneDayData[index].lessons[lessonIndexSelected] = {
        ...payload,
        type: values.vocab_name
          ? "vocab"
          : values.kanji_name
          ? "kanji"
          : values.video_name
          ? "video"
          : values.grammar_name
          ? "grammar"
          : null,
      };
    } else {
      const payload = values.vocab_name
        ? {
            ...values,
            vocab_audio: fileAudioAndVideoList.map((file) => file.url).join(),
            vocab_image: fileImageList.map((file) => file.url).join(),
            vocab_status_id: 1,
          }
        : values.kanji_name
        ? {
            ...values,
            kanji_image: fileImageList.map((file) => file.url).join(),
            kanji_status_id: 1,
          }
        : values.video_name
        ? {
            ...values,
            video_link: fileAudioAndVideoList.map((file) => file.url).join(),
          }
        : values.grammar_name
        ? {
            ...values,
            grammar_image: fileImageList.map((file) => file.url).join(),
            grammar_status_id: 1,
          }
        : null;

      cloneDayData[values.day_id].lessons.push({
        ...payload,
        type: values.vocab_name
          ? "vocab"
          : values.kanji_name
          ? "kanji"
          : values.video_name
          ? "video"
          : values.grammar_name
          ? "grammar"
          : null,
      });
    }
    setDayData(cloneDayData);
    setUserChose(0);
    onCancel();
  };

  console.log("🚀 ~ useEffect ~ lessonSelected:", lessonSelected);
  useEffect(() => {
    if (lessonSelected) {
      if (lessonSelected.vocab_name) {
        setUserChose(1);

        setFileAudioAndVideoList(
          lessonSelected.vocab_audio
            ? lessonSelected.vocab_audio?.split()?.map((url, index) => ({
                uid: -index,
                name: `Image ${index}`,
                status: "done",
                url: url,
              }))
            : []
        );
        setFileImageList(
          lessonSelected.vocab_image
            ? lessonSelected.vocab_image?.split()?.map((url, index) => ({
                uid: -index,
                name: `Image ${index}`,
                status: "done",
                url: url,
              }))
            : []
        );
        form.setFieldsValue({
          vocab_image: lessonSelected.vocab_image,
          vocab_audio: lessonSelected.vocab_audio,
          vocab_name: lessonSelected.vocab_name,
          vocab_kanji: lessonSelected.vocab_kanji,
          vocab_meaning: lessonSelected.vocab_meaning,
          vocab_example: lessonSelected.vocab_example,
          day_id: lessonSelected.day_id,
          type: "vocab",
        });
      }
      if (lessonSelected.kanji_name) {
        setUserChose(2);
        setFileImageList(
          lessonSelected.kanji_image
            ? lessonSelected.kanji_image?.split()?.map((url, index) => ({
                uid: -index,
                name: `Image ${index}`,
                status: "done",
                url: url,
              }))
            : []
        );
        form.setFieldsValue({
          kanji_name: lessonSelected.kanji_name,
          kanji_image: lessonSelected.kanji_image,
          day_id: lessonSelected.day_id,
          cv_spelling: lessonSelected.cv_spelling,
          kanji_kunyomi: lessonSelected.kanji_kunyomi,
          kanji_onyomi: lessonSelected.kanji_onyomi,
          kanji_words: lessonSelected.kanji_words,
          type: "kanji",
        });
      }
      if (lessonSelected.grammar_name) {
        setUserChose(3);
        setFileImageList(
          lessonSelected.grammar_image
            ? lessonSelected.grammar_image?.split()?.map((url, index) => ({
                uid: -index,
                name: `Image ${index}`,
                status: "done",
                url: url,
              }))
            : []
        );
        form.setFieldsValue({
          grammar_name: lessonSelected.grammar_name,
          day_id: lessonSelected.day_id,
          grammar_image: lessonSelected.grammar_image,
          grammar_structure: lessonSelected.grammar_structure,
          grammar_description: lessonSelected.grammar_description,
          grammar_examples: lessonSelected.grammar_examples,
          type: "grammar",
        });
      }
      if (lessonSelected.video_name) {
        setUserChose(4);
        setFileAudioAndVideoList(
          lessonSelected.video_link
            ? lessonSelected.video_link?.split()?.map((url, index) => ({
                uid: -index,
                name: `Image ${index}`,
                status: "done",
                url: url,
              }))
            : []
        );
        form.setFieldsValue({
          video_name: lessonSelected.video_name,
          video_link: lessonSelected.video_link,
          day_id: lessonSelected.day_id,
          questions: lessonSelected.questions,

          type: "video",
        });
      }
    } else {
      setUserChose(0);
      form.setFieldsValue({});
      setFileImageList([]);
      setFileAudioAndVideoList([]);
    }
  }, [lessonSelected]);
  return (
    <Modal
      title={
        mode === "view"
          ? "Lesson Detail"
          : id && lessonSelected
          ? "Update Lesson"
          : "Add New Lesson"
      }
      visible={visible}
      onCancel={() => {
        onCancel();
        setUserChose(0);
        form.setFieldsValue({});
        setFileImageList([]);
        setFileAudioAndVideoList([]);
      }}
      footer={null}
      destroyOnClose={true}
    >
      {userChose === 0 ? (
        <Form layout="vertical">
          <Form.Item
            name="lessonType"
            label="Select Lesson Type:"
            rules={[
              { required: true, message: "Please select the lesson type!" },
            ]}
          >
            <Radio.Group onChange={(e) => setUserSelected(e.target.value)}>
              <Space direction="vertical">
                <Radio value={1}>Vocab</Radio>
                <Radio value={2}>Kanji</Radio>
                <Radio value={3}>Grammar</Radio>
                <Radio value={4}>Video</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => setUserChose(userSelected)}>
              Next
            </Button>
          </Form.Item>
        </Form>
      ) : userChose === 1 ? (
        <>
          <Form layout="vertical" onFinish={onSubmit} form={form}>
            <Form.Item
              name="vocab_name"
              label="Vocabulary Name"
              rules={[{ required: true }]}
            >
              <Input readOnly={mode === "view"} />
            </Form.Item>
            <Form.Item
              name="day_id"
              label="Select Day"
              rules={[{ required: true, message: "Please select the day!" }]}
            >
              <Select disabled={mode === "view"} placeholder="Select a day">
                {dayData.map((day, index) => (
                  <Option
                    key={index}
                    value={id && lessonSelected ? day.day_id : index}
                  >
                    Day {index + 1}: {day.day_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="vocab_kanji" label="Kanji">
              <Input readOnly={mode === "view"} />
            </Form.Item>
            <Form.Item name="vocab_meaning" label="Meaning">
              <Input readOnly={mode === "view"} />
            </Form.Item>
            <Form.Item name="vocab_example" label="Example">
              <Input readOnly={mode === "view"} />
            </Form.Item>
            <Form.Item
              name="vocab_status_id"
              label="Example"
              style={{ display: "none" }}
            >
              <Input readOnly={mode === "view"} value={"1"} />
            </Form.Item>
            {/* <Form.Item name="vocab_image" label="Image URL">
              <Input readOnly={mode==="view"} />
            </Form.Item> */}
            <Form.Item label="Image" name="vocab_image">
              <ImgCrop rotationSlider>
                <Upload
                  disabled={mode === "view"}
                  customRequest={handleImageUpload}
                  listType="picture-card"
                  fileList={fileImageList}
                  onChange={onImageChange}
                  onPreview={onPreview}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  onRemove={() => setFileImageList([])}
                  showUploadList={{
                    showPreviewIcon: false,
                    showRemoveIcon: true,
                    showDownloadIcon: false,
                  }}
                >
                  {fileImageList.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Form.Item>
            {/* <Form.Item name="vocab_audio" label="Audio URL">
              <Input readOnly={mode==="view"} />
            </Form.Item> */}
            <Form.Item label="Audio" name="vocab_audio">
              <Upload
                disabled={mode === "view"}
                customRequest={handleAudioOrVideoUpload}
                listType="picture-card"
                fileList={fileAudioAndVideoList}
                onChange={onAudioOrVideoChange}
                onPreview={onPreview}
                accept="video/*,audio/*"
                beforeUpload={beforeUploadAudioAndVideo}
                maxCount={1}
                onRemove={() => setFileAudioAndVideoList([])}
                showUploadList={{
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                  showDownloadIcon: false,
                }}
              >
                {fileAudioAndVideoList.length < 5 && "+ Upload"}
              </Upload>
            </Form.Item>
            <Form.Item>
              {mode !== "view" && (
                <Flex
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    type="dashed"
                    onClick={() => {
                      setUserChose(0);
                    }}
                  >
                    Return
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit Vocabulary
                  </Button>
                </Flex>
              )}
            </Form.Item>
          </Form>
        </>
      ) : userChose === 2 ? (
        <>
          <Form layout="vertical" onFinish={onSubmit} form={form}>
            <Form.Item
              name="kanji_name"
              label="Kanji Name"
              rules={[
                { required: true, message: "Please enter the kanji name." },
              ]}
            >
              <Input readOnly={mode === "view"} />
            </Form.Item>
            <Form.Item
              name="day_id"
              label="Select Day"
              rules={[{ required: true, message: "Please select the day!" }]}
            >
              <Select disabled={mode === "view"} placeholder="Select a day">
                {dayData.map((day, index) => (
                  <Option
                    key={index}
                    value={id && lessonSelected ? day.day_id : index}
                  >
                    Day {index + 1}: {day.day_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="kanji_status_id"
              label="Example"
              style={{ display: "none" }}
            >
              <Input readOnly={mode === "view"} value={"1"} />
            </Form.Item>
            <Form.Item name="cv_spelling" label="CV Spelling">
              <Input readOnly={mode === "view"} />
            </Form.Item>
            <Form.Item name="kanji_kunyomi" label="Kunyomi">
              <Input readOnly={mode === "view"} />
            </Form.Item>
            <Form.Item name="kanji_onyomi" label="Onyomi">
              <Input readOnly={mode === "view"} />
            </Form.Item>
            {/* <Form.Item name="kanji_image" label="Image URL">
              <Input readOnly={mode==="view"} />
            </Form.Item> */}
            <Form.Item label="Image" name="kanji_image">
              <ImgCrop rotationSlider>
                <Upload
                  disabled={mode === "view"}
                  customRequest={handleImageUpload}
                  listType="picture-card"
                  fileList={fileImageList}
                  onChange={onImageChange}
                  onPreview={onPreview}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  onRemove={() => setFileImageList([])}
                  showUploadList={{
                    showPreviewIcon: false,
                    showRemoveIcon: true,
                    showDownloadIcon: false,
                  }}
                >
                  {fileImageList.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.List name="kanji_words">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "kanji_word"]}
                        rules={[
                          { required: true, message: "Missing Kanji word" },
                        ]}
                      >
                        <Input
                          readOnly={mode === "view"}
                          placeholder="Kanji Word"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "hiragana_character"]}
                      >
                        <Input
                          readOnly={mode === "view"}
                          placeholder="Hiragana Character"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "kanji_word_meaning"]}
                      >
                        <Input
                          readOnly={mode === "view"}
                          placeholder="Meaning"
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Kanji Word
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              {mode !== "view" && (
                <Flex
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    type="dashed"
                    onClick={() => {
                      setUserChose(0);
                    }}
                  >
                    Return
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit Kanji
                  </Button>
                </Flex>
              )}
            </Form.Item>
          </Form>
        </>
      ) : userChose === 3 ? (
        <>
          <Form
            name="grammar_form"
            autoComplete="off"
            onFinish={onSubmit}
            form={form}
          >
            <Form.Item
              name="grammar_name"
              label="Grammar Name"
              rules={[{ required: true }]}
            >
              <Input
                readOnly={mode === "view"}
                placeholder="Enter Grammar name"
              />
            </Form.Item>
            <Form.Item
              name="grammar_status_id"
              label="Example"
              style={{ display: "none" }}
            >
              <Input readOnly={mode === "view"} value={"1"} />
            </Form.Item>
            <Form.Item
              name="day_id"
              label="Select Day"
              rules={[{ required: true, message: "Please select the day!" }]}
            >
              <Select disabled={mode === "view"} placeholder="Select a day">
                {dayData.map((day, index) => (
                  <Option
                    key={index}
                    value={id && lessonSelected ? day.day_id : index}
                  >
                    Day {index + 1}: {day.day_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="grammar_structure" label="Grammar Structure">
              <Input
                readOnly={mode === "view"}
                placeholder="Enter Grammar structure"
              />
            </Form.Item>
            <Form.Item name="grammar_description" label="Grammar Description">
              <Input
                readOnly={mode === "view"}
                placeholder="Enter Grammar description"
              />
            </Form.Item>
            {/* <Form.Item name="grammar_image" label="Image URL">
              <Input readOnly={mode==="view"} placeholder="Enter image URL" />
            </Form.Item> */}
            <Form.Item label="Image" name="grammar_image">
              <ImgCrop rotationSlider>
                <Upload
                  disabled={mode === "view"}
                  customRequest={handleImageUpload}
                  listType="picture-card"
                  fileList={fileImageList}
                  onChange={onImageChange}
                  onPreview={onPreview}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  onRemove={() => setFileImageList([])}
                  showUploadList={{
                    showPreviewIcon: false,
                    showRemoveIcon: true,
                    showDownloadIcon: false,
                  }}
                >
                  {fileImageList.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Form.Item>

            <Form.List name="grammar_examples">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'grammar_example']}
                      rules={[{ required: true, message: 'Missing example' }]}
                    >
                      <Input
                        readOnly={mode === "view"}
                        placeholder="Grammar Example"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'grammar_example_meaning']}
                    >
                      <Input
                        readOnly={mode === "view"}
                        placeholder="Example Meaning"
                      />
                    </Form.Item>
                    {mode !== "view" && (
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                      />
                    )}
                  </Space>
                ))}
                {mode !== "view" && (
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Grammar Example
                    </Button>
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>

            <Form.Item>
              {mode !== "view" && (
                <Flex
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    type="dashed"
                    onClick={() => {
                      setUserChose(0);
                    }}
                  >
                    Return
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit Grammar
                  </Button>
                </Flex>
              )}
            </Form.Item>
          </Form>
        </>
      ) : userChose === 4 ? (
        <>
          <Form
            autoComplete="off"
            layout="vertical"
            onFinish={onSubmit}
            form={form}
          >
            <Form.Item
              name="video_name"
              label="Video Name"
              rules={[{ required: true }]}
            >
              <Input
                readOnly={mode === "view"}
                placeholder="Enter video name"
              />
            </Form.Item>
            <Form.Item
              name="video_status_id"
              label="Example"
              style={{ display: "none" }}
            >
              <Input readOnly={mode === "view"} value={"1"} />
            </Form.Item>
            {/* <Form.Item
              name="video_link"
              label="Video Link"
              rules={[{ required: true }]}
            >
              <Input readOnly={mode==="view"} placeholder="Enter video link" />
            </Form.Item> */}
            <Form.Item label="Video" name="video_link">
              <Upload
                disabled={mode === "view"}
                customRequest={handleAudioOrVideoUpload}
                listType="picture-card"
                fileList={fileAudioAndVideoList}
                onChange={onAudioOrVideoChange}
                onPreview={onPreview}
                accept="video/*,audio/*"
                beforeUpload={beforeUploadAudioAndVideo}
                maxCount={1}
                onRemove={() => setFileAudioAndVideoList([])}
                showUploadList={{
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                  showDownloadIcon: false,
                }}
              >
                {fileAudioAndVideoList.length < 5 && "+ Upload"}
              </Upload>
            </Form.Item>

            <Form.Item
              name="day_id"
              label="Select Day"
              rules={[{ required: true, message: "Please select the day!" }]}
            >
              <Select disabled={mode === "view"} placeholder="Select a day">
                {dayData.map((day, index) => (
                  <Option
                    key={index}
                    value={id && lessonSelected ? day.day_id : index}
                  >
                    Day {index + 1}: {day.day_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.List name="questions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: 8,
                      }}
                      align="start"
                    >
                      <Divider>Question {key + 1}</Divider>
                      <Form.Item
                        {...restField}
                        name={[name, "question_content"]}
                        label="Question Content"
                        rules={[
                          {
                            required: true,
                            message: "Missing question content",
                          },
                        ]}
                      >
                        <Input
                          readOnly={mode === "view"}
                          placeholder="Enter question content"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "question_answer"]}
                        label="Question Answer"
                      >
                        <Input
                          readOnly={mode === "view"}
                          placeholder="Enter correct answer"
                        />
                      </Form.Item>

                      <Form.List name={[name, "options"]}>
                        {(
                          optionFields,
                          { add: addOption, remove: removeOption }
                        ) => (
                          <>
                            {optionFields.map((option) => (
                              <Space key={option.key} align="baseline">
                                <Form.Item
                                  {...option}
                                  name={[option.name, "option_content"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing option content",
                                    },
                                  ]}
                                >
                                  <Input
                                    readOnly={mode === "view"}
                                    placeholder="Option content"
                                  />
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => removeOption(option.name)}
                                />
                              </Space>
                            ))}
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => addOption()}
                                icon={<PlusOutlined />}
                              >
                                Add Option
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>

                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Question
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              {mode !== "view" && (
                <Flex
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    type="dashed"
                    onClick={() => {
                      setUserChose(0);
                    }}
                  >
                    Return
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit Video
                  </Button>
                </Flex>
              )}
            </Form.Item>
          </Form>
        </>
      ) : null}
    </Modal>
  );
}

export default AddLessonModal;
