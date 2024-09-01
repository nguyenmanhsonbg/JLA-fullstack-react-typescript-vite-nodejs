import React, { useState, useEffect } from 'react';
import { Input, Button, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import styled from 'styled-components';
import axios from 'axios';
import MultiChoiceQuestionCreating from './MultiChoiceQuestionCreating';

interface Option {
  id: number;
  content: string;
}

interface SubQuestion {
  id: number;
  questionContent: string;
  options: Option[];
  correctOptionId: number | null;
  imageUrl: string | null;
}

interface ReadingQuestionProps {
  questionId: number;
  onDelete: (id: number) => void;
  onConfirm: (id: number, readingContent: string, subQuestions: SubQuestion[], imageUrl: string | null) => void;
  onEdit: (id: number) => void;
  onCancel: () => void;
  isEditing?: boolean;
  isConfirmed?: boolean;
  content?: string;
  subQuestions?: SubQuestion[];
  imageUrl?: string | null;
}


const ReadingQuestionCreating: React.FC<ReadingQuestionProps> = ({ questionId,
  onDelete,
  onConfirm,
  onEdit,
  onCancel,
  isEditing = true,
  isConfirmed = false,
  content = '',
  subQuestions = [],
  imageUrl = null }) => {
  
  const [readingContent, setReadingContent] = useState(content);
  const [questions, setQuestions] = useState<SubQuestion[]>(subQuestions);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(imageUrl);
  const [fileList, setFileList] = useState([]);

   useEffect(() => {
    if (!isEditing && !isConfirmed) {
      resetReadingState();
    } else {
      setReadingContent(content);
      setQuestions(subQuestions);
      setCurrentImageUrl(imageUrl);
    }
   }, [isEditing, isConfirmed, content, subQuestions, imageUrl]);
  
  const resetReadingState = () => {
    setReadingContent('');
    setQuestions([]);
    setCurrentImageUrl(null);
    setFileList([]);
  };


    const handleAddQuestion = () => {
    if (isEditing) {
      setQuestions([...questions, { id: Date.now(), questionContent: '', options: [], correctOptionId: null, imageUrl: null }]);
    }
  };

   const handleDeleteQuestion = (id: number) => {
    if (isEditing) {
      setQuestions(questions.filter(question => question.id !== id));
    }
  };

   const handleConfirmQuestion = (id: number, questionContent: string, options: Option[], correctOptionId: number | null, imageUrl: string | null) => {
    setQuestions(questions.map(question =>
      question.id === id ? { ...question, questionContent, options, correctOptionId, imageUrl, isEditing: false } : question
    ));
  };

  const handleImageUpload = async (info: any) => {
    if (info.file.status === 'done') {
      const newImageUrl = URL.createObjectURL(info.file.originFileObj);
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
      setCurrentImageUrl(filePath);
    } catch (error) {
      message.error('Upload failed.');
    }
  };

  const beforeUpload = (file: any) => {
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


   const handleConfirm = () => {
    if (readingContent.trim() === '' || questions.length === 0) {
      message.warning('Please ensure the reading content is filled, at least one question is added.');
      return;
    }
    onConfirm(questionId, readingContent, questions, currentImageUrl);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <ReadingContainer>
       <ReadingHeader>
        <ReadingActions>
          {!isEditing && (
            <AiOutlineEdit onClick={() => onEdit(questionId)} />
          )}
          <AiOutlineDelete onClick={() => onDelete(questionId)} />
        </ReadingActions>
      </ReadingHeader>
      <Input.TextArea
        placeholder="Nội dung bài đọc"
        value={readingContent}
        onChange={(e) => setReadingContent(e.target.value)}
        disabled={!isEditing}
      />
      {!isEditing && currentImageUrl !== null && <img src={currentImageUrl} width={50} height={50} alt="Uploaded" />}
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
              {fileList.length < 1 && '+ Tải lên'}
            </Upload>
          </ImgCrop>
        </>
      )}
      {questions.map((question) => (
        <MultiChoiceQuestionCreating
          key={question.id}
          questionId={question.id}
          onDelete={handleDeleteQuestion}
          onConfirm={handleConfirmQuestion}
          onEdit={() => isEditing && setQuestions(questions.map(q => q.id === question.id ? { ...q, isEditing: true } : q))}
          isConfirmed={!question.isEditing}
          isEditing={question.isEditing}
          content={question.questionContent}
          options={question.options}
          correctOptionId={question.correctOptionId}
          imageUrl={question.imageUrl}
        />
      ))}
      {isEditing && (
        <AddQuestionButton type="dashed" onClick={handleAddQuestion} icon={<AiOutlinePlus />}>
            Thêm câu hỏi
        </AddQuestionButton>
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