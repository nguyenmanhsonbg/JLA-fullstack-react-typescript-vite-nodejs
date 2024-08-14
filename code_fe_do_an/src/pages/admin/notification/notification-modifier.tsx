import { convertDateToString } from "@/helper";
import { DatePicker, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Notification } from "./notification-management";

type Props = {
  loading: boolean
  notification: Notification
  handleChangeNoti: (updatedNoti: Notification) => void
}

export default function NotificationModifier ({loading, notification, handleChangeNoti} : Props) {

  // ==== STATES ====
  const [tmpNotification, setTmpNotification] = useState<Notification>(notification)

  // ==== WATCHERS ====
  useEffect(() => {
    handleChangeNoti(tmpNotification)
  }, [tmpNotification])

  useEffect(() => {
    setTmpNotification(notification)
  }, [notification])

  // ==== LOGIC FUNCTIONS ====
  const handleChangeNewNoti = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setTmpNotification({ ...tmpNotification, [name]: value });
  };

  const handleChangeNotiDate = (dateString: string) => {
    const notiDate = new Date(dateString)
    setTmpNotification({ ...tmpNotification, noti_date: notiDate})
  }

  return (
    <Form layout="vertical" autoComplete="off">
      <Form.Item label="Title">
        <Input
          value={tmpNotification.title}
          disabled={loading}
          onChange={handleChangeNewNoti}
          maxLength={255}
          name="title"
        />
      </Form.Item>

      <Form.Item label="Content">
        <Input.TextArea
          value={tmpNotification.content}
          disabled={loading}
          onChange={handleChangeNewNoti}
          name="content"
          autoSize={{ minRows: 5, maxRows: 10 }}
        />
      </Form.Item>

      <Form.Item label="Notify date" className="">
        <DatePicker
          showNow
          disabled={loading}
          placeholder={`${tmpNotification.noti_date ? convertDateToString(tmpNotification.noti_date, true) : 'Select notify date'}`}
          onChange={(date: any, dateString: string) => handleChangeNotiDate(dateString)}
          className="block"
        />
      </Form.Item>
    </Form>
  )
}