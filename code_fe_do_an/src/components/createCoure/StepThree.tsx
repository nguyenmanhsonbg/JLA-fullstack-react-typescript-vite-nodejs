import { Typography, Flex, Button, Space } from "antd";
import { FcIdea } from "react-icons/fc";
import { useEffect } from "react";

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
            ? `Hoàn tất việc cập nhật. Bằng cách nhấp vào "Hoàn tất" bên dưới, bạn có thể cập nhật khóa học. Quá trình này có thể mất một vài phút. Vui lòng đợi cho đến khi nó hoàn tất.`
            : `Hoàn tất việc thiết lập. Bằng cách nhấp vào "Hoàn tất" bên dưới, bạn có thể tạo một khóa học mới. Quá trình này có thể mất một vài phút. Vui lòng đợi cho đến khi nó hoàn tất.`}
        </Typography.Title>
      </Space>
      <Flex
        style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}
      >
       {/* <Button
          style={{ width: "25%" }}
          type="default"
          onClick={() => {
            handlePreviousStep();
          }}
        >
          Quay lại
        </Button>  */}
        <div style={{ width: "20px" }}></div>
        <Button
          style={{ width: "25%" }}
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          loading={waitingCreate}
        >
          Hoàn tất
        </Button>
      </Flex>
    </>
  );
}

export default StepThree;

