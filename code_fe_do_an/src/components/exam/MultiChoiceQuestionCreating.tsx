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
  onConfirm: (id: number, questionContent: string, options: Option[], correctOptionId: number, imageUrl: string | null) => void;
  onEdit: (id: number) => void;
  isConfirmed?: boolean;
  onCancel: () => void;
  isEditing?: boolean;
}

const MultiChoiceQuestionCreating: React.FC<MultiChoiceQuestionProps> = ({ questionId, onDelete, onConfirm, onEdit, onCancel, isConfirmed = false,  isEditing = true }) => {
  const [questionContent, setQuestionContent] = useState('');
  const [options, setOptions] = useState<Option[]>([]);
  const [correctOptionId, setCorrectOptionId] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (!isEditing && !isConfirmed) {
      setQuestionContent('');
      setOptions([]);
      setCorrectOptionId(null);
      setImageUrl(null);
      setFileList([]);
    }
  }, [isEditing, isConfirmed]);

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, { id: Date.now(), content: '' }]);
    }
  };

  const handleDeleteOption = (id: number) => {
    setOptions(options.filter(option => option.id !== id));
  };

  const handleConfirm = () => {
    if (questionContent.trim() === '' || options.length !== 4 || correctOptionId === null || options.some(option => option.content.trim() === '')) {
      message.warning('Please ensure the question is filled, exactly 4 options are provided, one correct option is selected, and an image is added.');
      return;
    }
    onConfirm(questionId, questionContent, options, correctOptionId, imageUrl);
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
      setImageUrl(newImageUrl);
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
      setImageUrl(filePath);
    } catch (error) {
      message.error('Upload failed.');
    }
  };

  const beforeUpload = (file) => {
    if (fileList.length >= 1) {
      alert('You can only upload one image.');
      return false;
    }
    return true;
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    setFileList([]);
  };

  return (
    <QuestionContainer>
      <QuestionHeader>
        <h3>Question {questionId}:</h3>
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
        placeholder="Question"
        value={questionContent}
        onChange={(e) => setQuestionContent(e.target.value)}
        disabled={!isEditing}
      />
      {options.map((option) => (
        <OptionContainer key={option.id}>
          <Input
            placeholder="Option"
            value={option.content}
            onChange={(e) => {
              const updatedOptions = options.map(o =>
                o.id === option.id ? { ...o, content: e.target.value } : o
              );
              setOptions(updatedOptions);
            }}
            disabled={!isEditing}
          />
          <OptionActions>
            <Radio
              checked={correctOptionId === option.id}
              onChange={() => setCorrectOptionId(option.id)}
              disabled={!isEditing}
            />
            {isEditing && <AiOutlineDelete onClick={() => handleDeleteOption(option.id)} />}
          </OptionActions>
        </OptionContainer>
      ))}
      {isEditing && options.length < 4 && (
        <AddOptionButton type="dashed" onClick={handleAddOption} icon={<AiOutlinePlus />}>
          Add Option
        </AddOptionButton>
      )}
      {isEditing && (
        <>
          <ImgCrop rotationSlider>
            <Upload className='mt-3'
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
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          </ImgCrop>
        </>
      )}
      {isEditing && (
         <ButtonContainer>
          <ConfirmButton type="primary" onClick={handleConfirm}>
            Confirm
          </ConfirmButton>
          <CancelButton type="default" onClick={handleCancel}>
            Cancel
          </CancelButton>
        </ButtonContainer>
      )}
      {!isEditing && imageUrl !== null && <img src={imageUrl} width={50} height={50} alt="Uploaded"/>}
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

