import { Button, notification, Spin, Typography } from "antd";
import NotificationModifier from "./notification-modifier";
import { useState } from "react";
import {
  initNoti,
  Notification,
  PushNotiType,
} from "./notification-management";
import { convertDateToString } from "@/helper";
import axios from "axios";

export default function NotificationCreator() {
  // ==== STATES ====
  const [loading, setLoading] = useState(false);
  const [newNotification, setNewNotification] =
    useState<Notification>(initNoti);
  const [toast, contextHolder] = notification.useNotification(); // TODO: update this notification for global use later

  // ==== ASYNC FUNCTIONS ====
  const createNoti = async () => {
    try {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }

      const createNotiPayload = {
        noti_id: newNotification.noti_id,
        title: newNotification.title,
        content: newNotification.content,
        action: "",
        target_id: 0,
        source_id: 1,
        noti_date: convertDateToString(newNotification.noti_date, true),
      };

      const request = await axios.post("/createNoti", createNotiPayload, {
        headers: {
          Authorization: token,
        },
      });
      const response = request.data;
      if ([201, 200].includes(response.statusCode)) {
        pushScreenNoti(response.data.message, "success");
        return true;
      }

      return false;
    } catch (error) {
      pushScreenNoti("Can not create new notification", "error");
      //console.error("Can not create new notification", error);
      return false;
    }
  };
  const updateNoti = async () => {
    try {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }

      const updateNotiPayload = {
        noti_id: newNotification.noti_id,
        title: newNotification.title,
        content: newNotification.content,
        noti_date: convertDateToString(newNotification.noti_date, true),
      };

      const request = await axios.put("/updateNoti", updateNotiPayload, {
        headers: {
          Authorization: token,
        },
      });
      const response = request.data;
      if ([201, 200].includes(response.statusCode)) {
        pushScreenNoti(response.data.message, "success");
        return true;
      }

      return false;
    } catch (error) {
      pushScreenNoti("Can not update notification", "error");
      console.error("Can not update notification", error);
      return false;
    }
  };
  // ==== STATES ====
  // const handleSubmitCreateNoti = async () => {
  //   setLoading(true);
  //   setNewNotification(initNoti)
  //   await createNoti()
  //   setLoading(false)
  // }
  const handleSubmitCreateNoti = async () => {
    setLoading(true);
    const success = newNotification.noti_id
      ? await updateNoti()
      : await createNoti();
    if (success) {
      setNewNotification(initNoti);
    }
    setLoading(false);
  };

  // ==== UTILITIES FUNCTIONS ====
  const pushScreenNoti = (message: string, type: PushNotiType = "info") => {
    toast[type]({
      message,
    });
  };

  return (
    <div className="notification-creator h-full">
      {contextHolder}
      <Typography.Title level={3} className="text-center">
        Tạo thông báo
      </Typography.Title>
      <NotificationModifier
        loading={loading}
        notification={newNotification}
        handleChangeNoti={(newNoti) => setNewNotification(newNoti)}
      />
      <Button
        type="primary"
        className="w-full"
        onClick={handleSubmitCreateNoti}
      >
        Tạo
      </Button>
      <Spin fullscreen size="large" spinning={loading} />
    </div>
  );
}
