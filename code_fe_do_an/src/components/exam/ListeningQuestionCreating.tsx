import React, { useState, useEffect } from 'react';
import { Input, Button, Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { RcFile } from 'antd/es/upload/interface';
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

interface ListeningQuestionProps {
  questionId: number;
  onDelete: (id: number) => void;
  onConfirm: (id: number, subQuestions: SubQuestion[], audioUrl: string | null) => void;
  onEdit: (id: number) => void;
  onCancel: () => void;
  isEditing?: boolean;
  isConfirmed?: boolean;
  subQuestions?: SubQuestion[];
  audioUrl?: string | null;
}


const ListeningQuestionCreating: React.FC<ListeningQuestionProps> = ({
  questionId,
  onDelete,
  onConfirm,
  onEdit,
  onCancel,
  isEditing = true,
  isConfirmed = false,
  subQuestions = [],
  audioUrl = null
}) => {
  const [questions, setQuestions] = useState<SubQuestion[]>(subQuestions);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(audioUrl);
  const [fileList, setFileList] = useState([]);

    useEffect(() => {
    if (!isEditing && !isConfirmed) {
      resetListeningState();
    } else {
      setQuestions(subQuestions);
      setCurrentAudioUrl(audioUrl);
    }
  }, [isEditing, isConfirmed, subQuestions, audioUrl]);

  const resetListeningState = () => {
    setQuestions([]);
    setCurrentAudioUrl(null);
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

  const handleAudioUpload = async (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      const newAudioUrl = URL.createObjectURL(info.file.originFileObj as RcFile);
      setCurrentAudioUrl(newAudioUrl);
      setFileList([{
        uid: info.file.uid,
        name: info.file.name,
        status: 'done',
        url: newAudioUrl,
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
      setCurrentAudioUrl(filePath);
    } catch (error) {
      message.error('Upload failed.');
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isMp3 = file.type === 'audio/mp3' || file.name.endsWith('.mp3');
    if (!isMp3) {
      message.error('You can only upload MP3 files.');
      return false;
    }

    if (fileList.length >= 1) {
      message.error('You can only upload one audio file.');
      return false;
    }

    return true;
  };

  const handleRemoveAudio = () => {
    setCurrentAudioUrl(null);
    setFileList([]);
  };

    const handleConfirm = () => {
    if (questions.length === 0 || currentAudioUrl === null) {
      message.warning('Please ensure at least one question is added and an audio file is uploaded.');
      return;
    }
    onConfirm(questionId, questions, currentAudioUrl);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <ListeningContainer>
        <ListeningHeader>
        <ListeningActions>
          {!isEditing && (
            <AiOutlineEdit onClick={() => onEdit(questionId)} />
          )}
          <AiOutlineDelete onClick={() => onDelete(questionId)} />
        </ListeningActions>
      </ListeningHeader>
      {isEditing && (
        <>
          <Upload
            className='mt-3'
            customRequest={handleUpload}
            listType="picture-card"
            fileList={fileList}
            onChange={handleAudioUpload}
            beforeUpload={beforeUpload}
            maxCount={1}
            onRemove={handleRemoveAudio}
            showUploadList={{
              showPreviewIcon: false,
              showRemoveIcon: true,
              showDownloadIcon: false,
            }}
          >
            {fileList.length < 1 && '+ Tải lên file nghe'}
          </Upload>
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
    </ListeningContainer>
  );
};

export default ListeningQuestionCreating;

const ListeningContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
`;

const ListeningHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ListeningActions = styled.div`
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
