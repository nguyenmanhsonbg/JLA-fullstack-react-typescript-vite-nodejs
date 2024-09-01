import React, { useState, useEffect } from 'react';
import { Input, Button, Radio, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { AiOutlineDelete, AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai';
import { FaRegCheckCircle } from 'react-icons/fa';
import { GrDrag } from 'react-icons/gr';
import styled from 'styled-components';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import axios from "axios";

interface Option {
  id: number;
  content: string;
}

interface MultiChoiceQuestionProps {
  questionId: number;
  onDelete: (id: number) => void;
  onConfirm: (id: number, questionContent: string, options: Option[], correctOptionId: number | null, imageUrl: string | null) => void;
  onEdit: (id: number) => void;
  isConfirmed?: boolean;
  onCancel: () => void;
  isEditing?: boolean;
  content?: string;
  options?: Option[];
  correctOptionId?: number | null;
  imageUrl?: string | null;
}

const MultiChoiceQuestionCreating: React.FC<MultiChoiceQuestionProps> = ({  questionId,
  onDelete,
  onConfirm,
  onEdit,
  onCancel,
  isConfirmed = false,
  isEditing = true,
  content = '',
  options = [],
  correctOptionId = null,
  imageUrl = null }) => {
  const [questionContent, setQuestionContent] = useState(content);
  const [questionOptions, setQuestionOptions] = useState<Option[]>(options);
  const [selectedCorrectOptionId, setSelectedCorrectOptionId] = useState<number | null>(correctOptionId);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(imageUrl);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (!isEditing && !isConfirmed) {
      resetQuestionState();
    } else {
      setQuestionContent(content);
      setQuestionOptions(options);
      setSelectedCorrectOptionId(correctOptionId);
      setCurrentImageUrl(imageUrl);
    }
  }, [isEditing, isConfirmed, content, options, correctOptionId, imageUrl]);

    const resetQuestionState = () => {
    setQuestionContent('');
    setQuestionOptions([]);
    setSelectedCorrectOptionId(null);
    setCurrentImageUrl(null);
    setFileList([]);
  };


 const handleAddOption = () => {
    if (questionOptions.length < 4) {
      setQuestionOptions([...questionOptions, { id: Date.now(), content: '' }]);
    }
  };

 const handleDeleteOption = (id: number) => {
    setQuestionOptions(questionOptions.filter(option => option.id !== id));
    if (selectedCorrectOptionId === id) {
      setSelectedCorrectOptionId(null);
    }
  };


 const handleConfirm = () => {
    if (
      questionContent.trim() === '' ||
      questionOptions.length !== 4 ||
      selectedCorrectOptionId === null ||
      questionOptions.some(option => option.content.trim() === '')
    ) {
      message.warning('Please ensure the question is filled, exactly 4 options are provided, and one correct option is selected.');
      return;
    }
    onConfirm(questionId, questionContent, questionOptions, selectedCorrectOptionId, currentImageUrl);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleEdit = () => {
    onEdit(questionId);
  };

const handleImageUpload = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      const newImageUrl = URL.createObjectURL(info.file.originFileObj as RcFile);
      setCurrentImageUrl(newImageUrl);
      setFileList([{
        uid: info.file.uid,
        name: info.file.name,
        status: 'done',
        url: newImageUrl,
      }]);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleUpload = async (options) => {
    const { file } = options;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:5000/upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { filePath } = response.data;
      setFileList([{
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: filePath,
      }]);
      setCurrentImageUrl(filePath);
    } catch (error) {
      message.error('Upload failed.');
    }
  };

  const beforeUpload = (file) => {
    if (fileList.length >= 1) {
      message.warning('You can only upload one image.');
      return false;
    }
    return true;
  };

  const handleRemoveImage = () => {
    setCurrentImageUrl(null);
    setFileList([]);
  };

  return (
      <QuestionContainer>
      <QuestionHeader>
        <QuestionActions>
          {isEditing ? (
            <AiOutlineEdit onClick={handleEdit} />
          ) : (
            <>
              <GrDrag />
              <FaRegCheckCircle />
            </>
          )}
          {!isEditing && (
            <AiOutlineEdit onClick={handleEdit} />
          )}
          <AiOutlineDelete onClick={() => onDelete(questionId)} />
        </QuestionActions>
      </QuestionHeader>
      <Input
        placeholder="Câu hỏi"
        value={questionContent}
        onChange={(e) => setQuestionContent(e.target.value)}
        disabled={!isEditing}
      />
      {questionOptions.map((option) => (
        <OptionContainer key={option.id}>
          <Input
            placeholder="Đáp án ..."
            value={option.content}
            onChange={(e) => {
              const updatedOptions = questionOptions.map(o =>
                o.id === option.id ? { ...o, content: e.target.value } : o
              );
              setQuestionOptions(updatedOptions);
            }}
            disabled={!isEditing}
          />
          <OptionActions>
            <Radio
              checked={selectedCorrectOptionId === option.id}
              onChange={() => setSelectedCorrectOptionId(option.id)}
              disabled={!isEditing}
            />
            {isEditing && <AiOutlineDelete onClick={() => handleDeleteOption(option.id)} />}
          </OptionActions>
        </OptionContainer>
      ))}
      {isEditing && questionOptions.length < 4 && (
        <AddOptionButton type="dashed" onClick={handleAddOption} icon={<AiOutlinePlus />}>
          Thêm lựa chọn
        </AddOptionButton>
      )}
      {isEditing && (
        <>
          <ImgCrop rotationSlider>
            <Upload
              customRequest={handleUpload}
              listType="picture-card"
              fileList={fileList}
              onChange={handleImageUpload}
              beforeUpload={beforeUpload}
              maxCount={1}
              onRemove={handleRemoveImage}
              showUploadList={{
                showPreviewIcon: false,
                showRemoveIcon: true,
                showDownloadIcon: false,
              }}
            >
              {fileList.length < 1 && '+ Tải lên'}
            </Upload>
          </ImgCrop>
        </>
      )}
      {isEditing && (
        <ButtonContainer>
          <ConfirmButton type="primary" onClick={handleConfirm}>
            Xong
          </ConfirmButton>
          <CancelButton type="default" onClick={handleCancel}>
            Hủy
          </CancelButton>
        </ButtonContainer>
      )}
      {!isEditing && currentImageUrl && <img src={currentImageUrl} width={50} height={50} alt="Uploaded" />}
    </QuestionContainer>
  );
};

export default MultiChoiceQuestionCreating;

const QuestionContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const QuestionActions = styled.div`
  display: flex;
  gap: 10px;
  svg {
    cursor: pointer;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const OptionActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 10px;
`;

const AddOptionButton = styled(Button)`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;


const ConfirmButton = styled(Button)`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CancelButton = styled(Button)`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

