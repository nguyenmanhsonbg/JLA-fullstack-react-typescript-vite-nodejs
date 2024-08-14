import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import MultiChoiceQuestionCreating from "@/components/exam/MultiChoiceQuestionCreating";
import ReadingQuestionCreating from '@/components/exam/ReadingQuestionCreating';
import ListeningQuestionCreating from '@/components/exam/ListeningQuestionCreating';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface MultiChoiceOption {
  id: number;
  content: string;
}

interface SubQuestion {
  id: number;
  questionContent: string;
  options: MultiChoiceOption[];
  correctOptionId: number | null;
  imageUrl: string | null;
}

interface MultiChoiceQuestionType {
  id: number;
  type: 'Multi-choice';
  content: string;
  options: MultiChoiceOption[];
  correctOptionId: number | null;
  imageUrl: string | null;
  confirmed: boolean;
}

interface ReadingQuestionType {
  id: number;
  type: 'Reading';
  content: string;
  subQuestions: SubQuestion[];
  imageUrl: string | null;
  confirmed: boolean;
}

interface ListeningQuestionType {
  id: number;
  type: 'Listening';
  subQuestions: SubQuestion[];
  audioUrl: string | null;
  confirmed: boolean;
}

type Question = MultiChoiceQuestionType | ReadingQuestionType | ListeningQuestionType;

const generateRandomId = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const defaultMultiChoiceQuestion: MultiChoiceQuestionType = {
  id: 0,
  type: 'Multi-choice',
  content: '',
  options: [],
  correctOptionId: null,
  imageUrl: null,
  confirmed: false,
};

const defaultReadingQuestion: ReadingQuestionType = {
  id: 0,
  type: 'Reading',
  content: '',
  subQuestions: [],
  imageUrl: null,
  confirmed: false,
};

const defaultListeningQuestion: ListeningQuestionType = {
  id: 0,
  type: 'Listening',
  subQuestions: [],
  audioUrl: null,
  confirmed: false,
};


const CourseExamCreate: React.FC = () => {
  const [examName, setExamName] = useState('');
  const [multiChoiceQuestions, setMultiChoiceQuestions] = useState([]);
  const [readingQuestions, setReadingQuestions] = useState([]);
  const [listeningQuestions, setListeningQuestions] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [reload, setReload] = useState(false);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload]);

  const handleAddQuestion = () => {
    if (isEditingQuestion) {
      message.warning('Please confirm the current question before adding a new one.');
      return;
    }

    let newQuestion;

    if (selectedType === 'Multi-choice') {
      newQuestion = { ...defaultMultiChoiceQuestion, id: generateRandomId() };
      setMultiChoiceQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    } else if (selectedType === 'Reading') {
      newQuestion = { ...defaultReadingQuestion, id: generateRandomId() };
      setReadingQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    } else if (selectedType === 'Listening') {
      newQuestion = { ...defaultListeningQuestion, id: generateRandomId() };
      setListeningQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    } else {
      message.warning('Please select a question type before adding a question.');
      return;
    }

    setEditingQuestionId(newQuestion.id);
    setIsEditingQuestion(true);
  };

  const handleDeleteQuestion = (type: string, id: number) => {
    if (isEditingQuestion) {
      message.warning('Please confirm the current question before deleting.');
      return;
    }

    if (type === 'Multi-choice') {
      setMultiChoiceQuestions(multiChoiceQuestions.filter((question) => question.id !== id));
    } else if (type === 'Reading') {
      setReadingQuestions(readingQuestions.filter((question) => question.id !== id));
    } else if (type === 'Listening') {
      setListeningQuestions(listeningQuestions.filter((question) => question.id !== id));
    }
    setIsEditingQuestion(false);
  };

  const handleSaveExam = async () => {
    try {
      let token = "";
      let accountId;
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
        accountId = userEncode ? JSON.parse(userEncode)?.account_id : null;
      }

      const examData = {
        exam_name: examName,
        account_id: accountId,
        questions: {
          multiChoiceQuestions: multiChoiceQuestions.map(({ confirmed, ...rest }) => rest),
          readingQuestions: readingQuestions.map(({ confirmed, ...rest }) => rest),
          listeningQuestions: listeningQuestions.map(({ confirmed, ...rest }) => rest),
        },
      };

      const request = await axios.post(`/exams`, { account_id: accountId, exam_data: examData }, {
        headers: {
          Authorization: token,
        },
      });

      if (request.status === 201) {
        message.success('Exam saved successfully!');
        setReload(true);
      }
    } catch (error) {
      message.error('Failed to save exam.');
      navigate('/error', { state: { message: error.message } });
    }
  };

  const handleDragEnd = (result: DropResult, questions, setQuestions) => {
    if (!result.destination) return;
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQuestions(items);
  };

  const handleConfirmQuestion = (type: string, id: number, questionContent: string, options: any[], correctOptionId: number | null, imageUrl: string | null, subQuestions?: any[], audioUrl?: string | null) => {
    if (type === 'Multi-choice') {
      updateOrCreateMultiChoiceQuestion(id, questionContent, options, correctOptionId, imageUrl);
    } else if (type === 'Reading') {
      updateOrCreateReadingQuestion(id, questionContent, subQuestions || [], imageUrl);
    } else if (type === 'Listening') {
      updateOrCreateListeningQuestion(id, subQuestions || [], audioUrl || null);
    }
    setEditingQuestionId(null);
    setIsEditingQuestion(false);
  };

  const updateOrCreateMultiChoiceQuestion = (id: number, questionContent: string, options: any[], correctOptionId: number | null, imageUrl: string | null) => {
    const questionExists = multiChoiceQuestions.some((q) => q.id === id);
    if (questionExists) {
      setMultiChoiceQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q.id === id ? { ...q, content: questionContent, options, correctOptionId, imageUrl, confirmed: true } : q))
      );
    } else {
      const newQuestion = {
        ...defaultMultiChoiceQuestion,
        id,
        content: questionContent,
        options,
        correctOptionId,
        imageUrl,
        confirmed: true,
      };
      setMultiChoiceQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
  };

  const updateOrCreateReadingQuestion = (id: number, content: string, subQuestions: any[], imageUrl: string | null) => {
    const questionExists = readingQuestions.some((q) => q.id === id);
    if (questionExists) {
      setReadingQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q.id === id ? { ...q, content, subQuestions, imageUrl, confirmed: true } : q))
      );
    } else {
      const newQuestion = {
        ...defaultReadingQuestion,
        id,
        content,
        subQuestions,
        imageUrl,
        confirmed: true,
      };
      setReadingQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
  };

  const updateOrCreateListeningQuestion = (id: number, subQuestions: any[], audioUrl: string | null) => {
    const questionExists = listeningQuestions.some((q) => q.id === id);
    if (questionExists) {
      setListeningQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q.id === id ? { ...q, subQuestions, audioUrl, confirmed: true } : q))
      );
    } else {
      const newQuestion = {
        ...defaultListeningQuestion,
        id,
        subQuestions,
        audioUrl,
        confirmed: true,
      };
      setListeningQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
  };

  const handleEditQuestion = (type: string, id: number) => {
    if (type === 'Multi-choice') {
      const question = multiChoiceQuestions.find(q => q.id === id);
      if (question) {
        setEditingQuestionId(id);
        setIsEditingQuestion(true);
      }
    } else if (type === 'Reading') {
      const question = readingQuestions.find(q => q.id === id);
      if (question) {
        setEditingQuestionId(id);
        setIsEditingQuestion(true);
      }
    } else if (type === 'Listening') {
      const question = listeningQuestions.find(q => q.id === id);
      if (question) {
        setEditingQuestionId(id);
        setIsEditingQuestion(true);
      }
    }
  };

  const handleCancelQuestion = () => {
    if (selectedType === 'Multi-choice') {
      setMultiChoiceQuestions(multiChoiceQuestions.filter((q) => q.id !== editingQuestionId));
    } else if (selectedType === 'Reading') {
      setReadingQuestions(readingQuestions.filter((q) => q.id !== editingQuestionId));
    } else if (selectedType === 'Listening') {
      setListeningQuestions(listeningQuestions.filter((q) => q.id !== editingQuestionId));
    }
    setEditingQuestionId(null);
    setIsEditingQuestion(false);
  };

  const renderQuestionsByType = (type: string, questions, setQuestions) => (
    <Droppable droppableId={type} key={type}>
      {(provided) => (
        <QuestionSection ref={provided.innerRef} {...provided.droppableProps}>
          <h3>{type} Questions</h3>
          {questions.map((question, index) => (
            <Draggable key={question.id} draggableId={String(question.id)} index={index} isDragDisabled={!question.confirmed}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...(question.confirmed ? provided.dragHandleProps : {})}>
                  {type === 'Multi-choice' ? (
                    <MultiChoiceQuestionCreating
                      questionId={question.id}
                      onDelete={() => handleDeleteQuestion(question.type, question.id)}
                      onConfirm={(id, content, options, correctOptionId, imageUrl) =>
                        handleConfirmQuestion(question.type, id, content, options, correctOptionId, imageUrl)
                      }
                      onEdit={() => handleEditQuestion(question.type, question.id)}
                      onCancel={handleCancelQuestion}
                      isConfirmed={question.confirmed}
                      isEditing={editingQuestionId === question.id}
                    />
                  ) : type === 'Reading' ? (
                    <ReadingQuestionCreating
                      questionId={question.id}
                      onDelete={() => handleDeleteQuestion(question.type, question.id)}
                      onConfirm={(id, content, subQuestions, imageUrl) =>
                        handleConfirmQuestion(question.type, id, content, [], null, imageUrl, subQuestions)
                      }
                      onEdit={() => handleEditQuestion(question.type, question.id)}
                      onCancel={handleCancelQuestion}
                      isConfirmed={question.confirmed}
                      isEditing={editingQuestionId === question.id}
                    />
                  ) : type === 'Listening' ? (
                    <ListeningQuestionCreating
                      questionId={question.id}
                      onDelete={() => handleDeleteQuestion(question.type, question.id)}
                      onConfirm={(id, subQuestions, audioUrl) =>
                        handleConfirmQuestion(question.type, id, '', [], null, null, subQuestions, audioUrl)
                      }
                      onEdit={() => handleEditQuestion(question.type, question.id)}
                      onCancel={handleCancelQuestion}
                      isConfirmed={question.confirmed}
                      isEditing={editingQuestionId === question.id}
                    />
                  ) : null}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </QuestionSection>
      )}
    </Droppable>
  );

  return (
    <ExamCreatePage>
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input value={examName} onChange={(e) => setExamName(e.target.value)} />
        </Form.Item>
      </Form>
      <DragDropContext
        onDragEnd={(result) => {
          if (selectedType === 'Multi-choice') {
            handleDragEnd(result, multiChoiceQuestions, setMultiChoiceQuestions);
          } else if (selectedType === 'Reading') {
            handleDragEnd(result, readingQuestions, setReadingQuestions);
          } else if (selectedType === 'Listening') {
            handleDragEnd(result, listeningQuestions, setListeningQuestions);
          }
        }}
      >
        {renderQuestionsByType('Multi-choice', multiChoiceQuestions, setMultiChoiceQuestions)}
        {renderQuestionsByType('Reading', readingQuestions, setReadingQuestions)}
        {renderQuestionsByType('Listening', listeningQuestions, setListeningQuestions)}
      </DragDropContext>
      <StyledButton type="dashed" onClick={handleAddQuestion} icon={<AiOutlinePlus />} disabled={isEditingQuestion}>
        Add Question
      </StyledButton>
      <Sidebar>
  <StyledButton 
    onClick={() => setSelectedType('Multi-choice')} 
    disabled={isEditingQuestion}
    selected={selectedType === 'Multi-choice'}
  >
    Multi-choice
  </StyledButton>
  <StyledButton 
    onClick={() => setSelectedType('Reading')} 
    disabled={isEditingQuestion}
    selected={selectedType === 'Reading'}
  >
    Reading
  </StyledButton>
  <StyledButton 
    onClick={() => setSelectedType('Listening')} 
    disabled={isEditingQuestion}
    selected={selectedType === 'Listening'}
  >
    Listening
  </StyledButton>
</Sidebar>

      <StyledButton type="primary" onClick={handleSaveExam}>
        Complete
      </StyledButton>
    </ExamCreatePage>
  );
};

export default CourseExamCreate;

const ExamCreatePage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Sidebar = styled.div`
  margin-top: 20px;
  button {
    display: block;
    margin-bottom: 10px;
  }
`;

const StyledButton = styled(Button)<{ selected: boolean }>`
  display: block;
  margin-bottom: 10px;
  background-color: ${({ selected }) => (selected ? '#6495ed' : '#f0f0f0')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  border-color: ${({ selected }) => (selected ? '#6495ed' : '#d9d9d9')};

  &:hover {
    background-color: ${({ selected }) => (selected ? '#4169e1' : '#e6e6e6')};
    color: ${({ selected }) => (selected ? '#fff' : '#000')};
    border-color: ${({ selected }) => (selected ? '#4169e1' : '#d9d9d9')};
  }
`;

const QuestionSection = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;

  &:nth-child(1) {
    border-color: #ffa07a; /* Light Salmon for Multi-choice */
  }

  &:nth-child(2) {
    border-color: #8fbc8f; /* Dark Sea Green for Reading */
  }

  &:nth-child(3) {
    border-color: #6495ed; /* Cornflower Blue for Listening */
  }

  h3 {
    margin-bottom: 10px;
  }
`;

