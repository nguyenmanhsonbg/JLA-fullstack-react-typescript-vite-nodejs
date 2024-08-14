import React, { useState, useEffect } from 'react';
import { Input, Button, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import styled from 'styled-components';
import axios from 'axios';
import MultiChoiceQuestion from './MultiChoiceQuestionCreating';

interface ReadingQuestionProps {
  questionId: number;
  onDelete: (id: number) => void;
  onConfirm: (id: number, readingContent: string, questions: any[], imageUrl: string | null) => void;
  onEdit: (id: number) => void;
  onCancel: () => void;
  isEditing?: boolean;
  isConfirmed?: boolean;
  
}

const ReadingQuestionCreating: React.FC<ReadingQuestionProps> = ({ questionId, onDelete, onConfirm, onEdit, onCancel, isEditing = true, isConfirmed = false }) => {
  const [readingContent, setReadingContent] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (!isEditing && !isConfirmed) {
      setReadingContent('');
      setQuestions([]);
      setImageUrl(null);
      setFileList([]);
    }
  }, [isEditing, isConfirmed]);

  const handleAddQuestion = () => {
    if (isEditing) {
      setQuestions([...questions, { id: Date.now(), isEditing: true }]);
    }
  };

  const handleDeleteQuestion = (id: number) => {
    if (isEditing) {
      setQuestions(questions.filter(question => question.id !== id));
    }
  };

  const handleConfirmQuestion = (id: number, questionContent: string, options: any[], correctOptionId: number, imageUrl: string | null) => {
    setQuestions(questions.map(question =>
      question.id === id ? { ...question, questionContent, options, correctOptionId, imageUrl, isEditing: false } : question
    ));
  };

  const handleImageUpload = async (info: any) => {
    if (info.file.status === 'done') {
      const newImageUrl = URL.createObjectURL(info.file.originFileObj);
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

  const handleUpload = async (options: any) => {
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

  const beforeUpload = (file: any) => {
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

  const handleConfirm = () => {
    if (readingContent.trim() === '' || questions.length === 0) {
      message.warning('Please ensure the reading content is filled, at least one question is added, and an image is uploaded.');
      return;
    }
    onConfirm(questionId, readingContent, questions, imageUrl);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <ReadingContainer>
      <ReadingHeader>
        <h3>Reading Question {questionId}:</h3>
        <ReadingActions>
          {isConfirmed && <AiOutlineEdit onClick={() => onEdit(questionId)} />}
          <AiOutlineDelete onClick={() => onDelete(questionId)} />
        </ReadingActions>
      </ReadingHeader>
      <Input.TextArea
        placeholder="Reading Content"
        value={readingContent}
        onChange={(e) => setReadingContent(e.target.value)}
        disabled={!isEditing}
      />
    {!isEditing && imageUrl !== null && <img src={imageUrl} width={50} height={50} alt="Uploaded"/>}
      {isEditing && (
        <>
          <ImgCrop rotationSlider>
            <Upload
              className='mt-3'
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
      {questions.map((question) => (
        <MultiChoiceQuestion
          key={question.id}
          questionId={question.id}
          onDelete={handleDeleteQuestion}
          onConfirm={handleConfirmQuestion}
          onEdit={() => isEditing && setQuestions(questions.map(q => q.id === question.id ? { ...q, isEditing: true } : q))}
          isConfirmed={!question.isEditing}
          isEditing={question.isEditing}
          isParentEditing={isEditing}
        />
      ))}
      {isEditing && (
        <AddQuestionButton type="dashed" onClick={handleAddQuestion} icon={<AiOutlinePlus />}>
          Add Question
        </AddQuestionButton>
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
    </ReadingContainer>
  );
};

export default ReadingQuestionCreating;

const ReadingContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
`;

const ReadingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ReadingActions = styled.div`
  display: flex;
  gap: 10px;
  svg {
    cursor: pointer;
  }
`;

const AddQuestionButton = styled(Button)`
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