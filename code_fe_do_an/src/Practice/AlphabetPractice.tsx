import { useAuth } from "@/hook/AuthContext";
import { SmileOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Input, Typography, notification } from "antd";
import { useEffect, useState } from "react";
import React from 'react';
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const getRandomQuestion = (data) => {
  const correctAnswerIndex = getRandomInt(data.length);
  const correctAnswer = data[correctAnswerIndex];

  const answers = new Set();
  answers.add(correctAnswer.romaji);

  while (answers.size < 3) {
    const randomAnswer = data[getRandomInt(data.length)].romaji;
    answers.add(randomAnswer);
  }

  const answersArray = Array.from(answers);
  const shuffledAnswers = answersArray.sort(() => Math.random() - 0.5);

  return {
    question: `${correctAnswer.character}`,
    answers: shuffledAnswers,
    correctAnswer: correctAnswer.romaji,
  };
};

const generateQuiz = (numQuestions, data) => {
  const quiz = [];
  for (let i = 0; i < numQuestions; i++) {
    quiz.push(getRandomQuestion(data));
  }
  return quiz;
};

const AlphabetPracticeComponent = ({ type = 1 }) => {
  const { handleFetch } = useAuth();
  const [numQuestions, setNumQuestions] = useState(0);
  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState([]);

  const openNotification = (message, description, status) => {
    api.open({
      message: message,
      description: description,
      icon: status ? (
        <SmileOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ) : null,
    });
  };

  const startQuiz = () => {
    const newQuiz = generateQuiz(numQuestions, data);
    setQuiz(newQuiz);
    setCurrentQuestionIndex(0);
    setMessage("");
  };

  const handleAnswerClick = (answer) => {
    if (answer === quiz[currentQuestionIndex].correctAnswer) {
      if (currentQuestionIndex < quiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        openNotification(
          "Congratulations!",
          "Congratulations! You have completed the quiz.",
          true
        );
        setQuiz([]);
      }
    } else {
      openNotification("Incorrect!", "Incorrect. Try again!", false);
    }
  };

  useEffect(() => {
    const handleFetchData = async () => {
      const response = await handleFetch({
        url:
          type === 8
            ? "/hiragana_alphabet"
            : type === 9
            ? "/katakana_alphabet"
            : `/alphabet?type_id=${type}`,
        method: "get",
      });
      if (response.statusCode === 200) {
        setData(
          response.data
            .filter((item) => item.japanese_character && item.romaji_character)
            .map((item) => ({
              character: item?.japanese_character,
              romaji: item?.romaji_character,
            }))
        );
      }
    };
    handleFetchData();
  }, []);

  return (
    <Card className="rounded-md shadow-md">
      <div className="w-full h-full">
        {contextHolder}
        {quiz.length === 0 ? (
          <div>
            <label>
              <Typography.Title level={4}>
                Chọn số câu hỏi:
              </Typography.Title>
              <Input className="hover:border-[#7db660]"
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                min={0}
              />
              {/* ;
              <input
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
              /> */}
            </label>
            <Button className="bg-[#7db660]"
              onClick={startQuiz}
              type="primary"
              style={{ marginTop: "1%" }}
            
            >
              Bắt đầu
            </Button>
          </div>
        ) : (
          <div>
            <Flex justify="center">
              <Button className="w-1/6 text-3xl h-4/5"
                style={{
                  textAlign: "center",
                  borderRadius: "10px",
                  margin: "2%",
                }}
              >
                Câu {currentQuestionIndex + 1}/{quiz.length}
              </Button>
            </Flex>
            <Typography.Title level={2} style={{ textAlign: "center" }}>
              Chọn đáp án đúng
            </Typography.Title>
            <Typography.Title
              level={1}
              style={{
                textAlign: "center",
                color: "red",
                margin: "3% 0",
                fontSize: "50px",
              }}
            >
              {quiz[currentQuestionIndex].question}
            </Typography.Title>
            <Flex align="center" justify="center">
              {quiz[currentQuestionIndex].answers.map((answer, index) => (
                <Button
                  type="dashed"
                  key={index}
                  onClick={() => handleAnswerClick(answer)}
                  style={{
                    fontSize: "24px",
                    borderRadius: "50%",
                    border: "1px solid",
                    width: "80px",
                    height: "80px",
                    textAlign: "center",
                    margin: "0 2%",
                    cursor: "pointer",
                  }}
                >
                  {answer}
                </Button>
              ))}
            </Flex>
            <p>{message}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AlphabetPracticeComponent;
