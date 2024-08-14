import { Typography, Flex, Button, Space } from "antd";
import { FcIdea } from "react-icons/fc";

function StepThree({ handlePreviousStep, handleSubmit, waitingCreate, id }) {
  return (
    <>
      <Space>
        <FcIdea style={{ fontSize: "100px" }} />

        <Typography.Title
          level={5}
          style={{ marginTop: "3%", maxWidth: "600px" }}
        >
          {id
            ? `Congratulations! You've completed the setup. By clicking "Yes" below,
          you can update course information. This process may take a few minutes.
          Please wait until it is finished.`
            : `Congratulations! You've completed the setup. By clicking "Yes" below,
          you can create a new course. This process may take a few minutes.
          Please wait until it is finished.`}
        </Typography.Title>
      </Space>
      <Flex
        style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}
      >
        <Button
          style={{ width: "25%" }}
          type="default"
          onClick={handlePreviousStep}
        >
          Return
        </Button>
        <div style={{ width: "20px" }}></div>
        <Button
          style={{ width: "25%" }}
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          loading={waitingCreate}
        >
          Yes
        </Button>
      </Flex>
    </>
  );
}

export default StepThree;
