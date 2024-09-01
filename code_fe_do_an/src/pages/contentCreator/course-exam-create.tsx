import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import MultiChoiceQuestionCreating from '@/components/exam/MultiChoiceQuestionCreating';
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

const generateRandomId = () => Math.floor(100000 + Math.random() * 900000);

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
  const [multiChoiceQuestions, setMultiChoiceQuestions] = useState<MultiChoiceQuestionType[]>([]);
  const [readingQuestions, setReadingQuestions] = useState<ReadingQuestionType[]>([]);
  const [listeningQuestions, setListeningQuestions] = useState<ListeningQuestionType[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [reload, setReload] = useState(false);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { exam_id } = params;

  useEffect(() => {
    if (reload) setReload(false);
  }, [reload]);

 const transformFetchedData = (data: any) => ({
    examTitle: data.exam_name,
    readingQuestions: data.questions.readingQuestions.map((question: any) => ({
      id: question.id,
      type: question.type,
      content: question.content,
      imageUrl: question.imageUrl,
      subQuestions: question.subQuestions.map((subQuestion: any) => ({
        id: subQuestion.id,
        questionContent: subQuestion.questionContent,
        options: subQuestion.options,
        imageUrl: subQuestion.imageUrl,
        correctOptionId: subQuestion.correctOptionId,
      })),
    })),
    listeningQuestions: data.questions.listeningQuestions.map((question: any) => ({
      id: question.id,
      type: question.type,
      audioUrl: question.audioUrl,
      subQuestions: question.subQuestions.map((subQuestion: any) => ({
        id: subQuestion.id,
        questionContent: subQuestion.questionContent,
        options: subQuestion.options,
        imageUrl: subQuestion.imageUrl,
        correctOptionId: subQuestion.correctOptionId,
      })),
    })),
    multiChoiceQuestions: data.questions.multiChoiceQuestions.map((question: any) => ({
      id: question.id,
      type: question.type,
      content: question.content,
      options: question.options,
      imageUrl: question.imageUrl,
      correctOptionId: question.correctOptionId,
    })),
  });


    useEffect(() => {
    const fetchExamDetails = async (exam_id: string) => {
      try {
        let token = "";
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
        }

        const url = `/get-exam-with-answers/${exam_id}`;
        const request = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });

        if (request.status === 200) {
          const fetchedData = request.data.data.data;
          const transformedData = transformFetchedData(fetchedData);

          setExamName(transformedData.examTitle);
          setReadingQuestions(transformedData.readingQuestions);
          setListeningQuestions(transformedData.listeningQuestions);
          setMultiChoiceQuestions(transformedData.multiChoiceQuestions);
        } else {
          message.error('Failed to fetch exam details.');
        }
      } catch (error) {
        message.error('An error occurred while fetching exam details.');
        navigate('/error', { state: { message: error.message } });
      }
    };

    if (exam_id) fetchExamDetails(exam_id);
  }, [exam_id]);

  const handleAddQuestion = (questionType: string) => {
    setSelectedType(questionType);
    if (isEditingQuestion) {
      message.warning('Please confirm the current question before adding a new one.');
      return;
    }

    let newQuestion;

    if (questionType === 'Multi-choice') {
      newQuestion = { ...defaultMultiChoiceQuestion, id: generateRandomId() };
      setMultiChoiceQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    } else if (questionType === 'Reading') {
      newQuestion = { ...defaultReadingQuestion, id: generateRandomId() };
      setReadingQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    } else if (questionType === 'Listening') {
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
            accountId = userDecode?.account_id;
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
          console.log(JSON.stringify(examData));
        let request;
        if (exam_id) {
            // Update the existing exam
            request = await axios.put(`/exams/${exam_id}`, { account_id: accountId, exam_data: examData }, {
                headers: {
                    Authorization: token,
                },
            });
        } else {
            // Create a new exam
            request = await axios.post(`/exams`, { account_id: accountId, exam_data: examData }, {
                headers: {
                    Authorization: token,
                },
            });
        }
      console.log(JSON.stringify(examData));
        if (request.status === 201 || request.status === 200) {
            message.success(`Exam ${exam_id ? 'updated' : 'saved'} successfully!`);
            setReload(true);
        }
    } catch (error) {
        message.error(`Failed to ${exam_id ? 'update' : 'save'} exam.`);
        navigate('/error', { state: { message: error.message } });
    }
};

  const handleDragEnd = (result: DropResult, questions: Question[], setQuestions: React.Dispatch<React.SetStateAction<Question[]>>) => {
    if (!result.destination) return;
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQuestions(items);
  };

  const handleConfirmQuestion = (
    type: string,
    id: number,
    questionContent: string,
    options: MultiChoiceOption[],
    correctOptionId: number | null,
    imageUrl: string | null,
    subQuestions?: SubQuestion[],
    audioUrl?: string | null
  ) => {
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

  const updateOrCreateMultiChoiceQuestion = (
    id: number,
    questionContent: string,
    options: MultiChoiceOption[],
    correctOptionId: number | null,
    imageUrl: string | null
  ) => {
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

  const updateOrCreateReadingQuestion = (id: number, content: string, subQuestions: SubQuestion[], imageUrl: string | null) => {
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

  const updateOrCreateListeningQuestion = (id: number, subQuestions: SubQuestion[], audioUrl: string | null) => {
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

   const getTypeName = (type: string) => { 
    switch (type) {
      case "Multi-choice":
        return "Câu hỏi nhiều lựa chọn";
      case "Reading":
        return "Câu hỏi bài đọc";
      case "Listening":
        return "Câu hỏi bài nghe";
      default:
        return "Câu hỏi";
    }
}

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

  const renderQuestionsByType = (
  type: string,
  questions: Question[],
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
) => (
  <Droppable droppableId={type} key={type}>
    {(provided) => (
      <QuestionSection ref={provided.innerRef} {...provided.droppableProps}>
        <h3>{getTypeName(type)}</h3>
        {questions.map((question, index) => (
          <Draggable key={question.id} draggableId={String(question.id)} index={index} isDragDisabled={!question.confirmed}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.draggableProps} {...(question.confirmed ? provided.dragHandleProps : {})}>
                <p>{`Câu hỏi ${index + 1}`}</p> {/* Display the question index */}
                {type === 'Multi-choice' ? (
                  <MultiChoiceQuestionCreating
                    questionId={question.id}
                    content={question.content}
                    options={question.options}
                    correctOptionId={question.correctOptionId}
                    imageUrl={question.imageUrl}
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
                    content={question.content}
                    subQuestions={question.subQuestions}
                    imageUrl={question.imageUrl}
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
                    subQuestions={question.subQuestions}
                    audioUrl={question.audioUrl}
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
        <StyledButton
          type="dashed"
          onClick={() => handleAddQuestion(type)}
          icon={<AiOutlinePlus />}
          disabled={isEditingQuestion}
        >
          Thêm câu hỏi
        </StyledButton>
      </QuestionSection>
    )}
  </Droppable>
);


  return (
    <ExamCreatePage>
      <Form layout="vertical">
        <Form.Item label="Tên bài kiểm tra">
          <Input value={examName} onChange={(e) => setExamName(e.target.value)} />
        </Form.Item>
      </Form>
      <DragDropContext
        onDragEnd={(result) => {
          if (result.destination) {
            if (result.source.droppableId === 'Multi-choice') {
              handleDragEnd(result, multiChoiceQuestions, setMultiChoiceQuestions);
            } else if (result.source.droppableId === 'Reading') {
              handleDragEnd(result, readingQuestions, setReadingQuestions);
            } else if (result.source.droppableId === 'Listening') {
              handleDragEnd(result, listeningQuestions, setListeningQuestions);
            }
          }
        }}
      >
        {renderQuestionsByType('Multi-choice', multiChoiceQuestions, setMultiChoiceQuestions)}
        {renderQuestionsByType('Reading', readingQuestions, setReadingQuestions)}
        {renderQuestionsByType('Listening', listeningQuestions, setListeningQuestions)}
      </DragDropContext>
      <StyledButton type="primary" onClick={handleSaveExam}>
        Lưu bài kiểm tra
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
`;

const StyledButton = styled(Button)<{ selected?: boolean }>`
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
    border-color: #ffa07a;
  }

  &:nth-child(2) {
    border-color: #8fbc8f;
  }

  &:nth-child(3) {
    border-color: #6495ed;
  }

  h3 {
    margin-bottom: 10px;
  }
`;