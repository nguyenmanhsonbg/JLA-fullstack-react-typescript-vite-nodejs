import { convertDateToString } from "@/helper";
import { Button, Modal, notification, Pagination, Popconfirm, Spin, Table, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import NotificationModifier from "./notification-modifier";

export interface Notification {
  noti_id: number
  title: string
  content: string
  is_read: boolean,
  action: string
  target_id: number
  source_id: number
  noti_date: Date 
  created_at: Date 
}

export type NotiType = 'all'|'read'|'unread'|'allWithUnsent'
export type PushNotiType = 'success' | 'info' | 'warning' | 'error';

export interface NofiFetchResponse {
  current_page: number
  total_pages: number
  data: Notification[]
}

export interface NotiFetchPayload {
  type: NotiType
  source_id?: number
  target_id?: number
  next_page?: number
  limit?: number
}

export const initNoti: Notification = {
  noti_id: 0,
  title: "",
  content: "",
  is_read: false,
  action: "",
  target_id: 0,
  source_id: 0,
  noti_date: new Date(),
  created_at: new Date(),
}

export default function NotiManagementPage() {

  const [loading, setLoading] = useState(false)
  const [openModifyNotiDialog, setOpenModifyNotiDialog] = useState(false)

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [tmpNotification, setTmpNotification] = useState<Notification>(initNoti)

  const [activePage, setActivePage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)

  const [toast, contextHolder] = notification.useNotification() // TODO: update this notification for global use later

  const PAGE_LIMIT = 5
  const columns = [
    {
      title: "Id",
      dataIndex: "noti_id",
      key: "noti_id",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Ngày thông báo",
      dataIndex: "noti_date",
      key: "noti_date",
      width: '8%',
      render: (date: Date) => <span>{convertDateToString(date)}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "noti_date",
      key: "noti_date",
      width: '6%',
      render: (date: Date) => <span>{(new Date(date) < new Date()) ? 'Đã gửi' : 'Chưa gửi'}</span>,
    },
    {
      title: "Hành động",
      key: "action",
      width: '12%',
      render: (_value: any, record: Notification) => {
        return (
          <section className={`${(new Date(record.noti_date) < new Date()) ? 'invisible' : 'visible'}`}>
            <Button color="warning" className="mr-4 font-medium" onClick={() => openUpdateNoti(record)}>Sửa</Button>
            <Popconfirm
               title={``}
              description={`Bạn có muốn xóa thông báo này ?`}
              onConfirm={() => deleteNoti(record.noti_id)}
              okText="Xóa"
              cancelText="Không xóa"
              okButtonProps={{danger: true}}
            >
              <Button danger className="font-medium">Xóa</Button>
            </Popconfirm>
          </section>
        );
      },
    },
  ];

  // ==== WATCHERS ====
  useEffect(() => {
    fetchNoti()
  }, [])

  // ==== ASYNC FUNCTIONS ==== 
  const fetchNoti = (type: NotiType = 'allWithUnsent', next_page: number = 1, limit: number = PAGE_LIMIT) => {
    setLoading(true)
    const fetchNotiPayload : NotiFetchPayload = {
      type,
      source_id: 1,
      next_page,
      limit
    }
    axios.post('/getNoti', fetchNotiPayload)
      .then(res => {
        const data : NofiFetchResponse = res.data.data.data
        setNotifications(data.data)
        setActivePage(data.current_page)
        setTotalPages(data.total_pages)
      }).catch(err => {
        pushScreenNoti('Can not get notifications', 'error')
        //console.error('Can not get notifications: ', err)
      }).finally(() => {
        setLoading(false)
      })
  }

  const createNoti = async () => {
    try {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }

      const createNotiPayload = {
        noti_id: tmpNotification.noti_id,
        title: tmpNotification.title, 
        content: tmpNotification.content, 
        action: '', 
        target_id: 0, 
        source_id: 1,
        noti_date: convertDateToString(tmpNotification.noti_date, true)
      }
      
      const request = await axios.post("/createNoti", createNotiPayload , {
        headers: {
          Authorization: token,
        },
      });
      const response = request.data;
      if ([201,200].includes(response.statusCode)) {
        pushScreenNoti(response.data.message, 'success')
        return true
      }

      return false
    } catch (error) {
      pushScreenNoti('Can not create new notification', 'error')
      console.error('Can not create new notification', error);
      return false
    }
  }
const updateNoti = async () => {
  try {
    let token = "";
    const userEncode = localStorage.getItem("user");
    if (userEncode) {
      const userDecode = JSON.parse(userEncode);
      token = userDecode?.token;
    }

    const createNotiPayload = {
      noti_id: tmpNotification.noti_id,
      title: tmpNotification.title,
      content: tmpNotification.content,
      noti_date: convertDateToString(tmpNotification.noti_date, true),
    };

    const request = await axios.put("/updateNoti", createNotiPayload, {
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
  const deleteNoti = async (id: number) => {
    try {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }
      
      const deleteNotiPayload = {
        ids: [id],
      }

      const request = await axios.post("/deleteNoti", deleteNotiPayload, {
        headers: {
          Authorization: token,
        },
      });
      const response = request.data;
      
      if (response.statusCode === 200 && response.data.data) {
        fetchNoti()

        pushScreenNoti(response.data.message, 'success')
        return true
      }

      return false
    } catch (error) {
      pushScreenNoti('Can not delete notification', 'error')
      console.error('Can not delete notification', error);
      return false
    }
  }

  // ==== LOGIC FUNCTIONS ====
  const handleSubmitCreateNoti = async () => {

    setLoading(true);

    // 
    const isOperationSuccessful = tmpNotification.noti_id
      ? await updateNoti()
      : await createNoti();

    if (isOperationSuccessful) {
      fetchNoti();
    }

    setLoading(false)
    setTmpNotification(initNoti)
    setOpenModifyNotiDialog(false);
  }

  const handleCancelCreateNoti = () => {
    setTmpNotification(initNoti);
    setOpenModifyNotiDialog(false);
  }

  const handleChangePageNoti = (page: number, pageSize: number) => {
    fetchNoti('allWithUnsent', page, pageSize)
  }

  const openUpdateNoti = (noti : Notification) => {
    setTmpNotification(noti)
    setOpenModifyNotiDialog(true);
  }

  // ==== UTILITY FUNCTIONS ====

  const pushScreenNoti = (message: string, type: PushNotiType = 'info') => {
    toast[type]({
      message,
    });
  };
 
  return (
    <div className="notification-page h-full">
      {contextHolder}
      <Spin fullscreen size="large" spinning={loading} />
      <Typography.Title level={2} className="text-center">
        Quản lý thông báo
      </Typography.Title>
      <section className="notification-content h-full">
        <Table
          className="notication-content__list"
          dataSource={notifications}
          columns={columns}
          pagination={false}
        />
        <Pagination
          className="mt-4"
          align="center"
          current={activePage}
          total={totalPages * PAGE_LIMIT}
          pageSize={PAGE_LIMIT}
          onChange={handleChangePageNoti}
        />
      </section>
      <Modal
        open={openModifyNotiDialog}
        onOk={handleSubmitCreateNoti}
        onCancel={handleCancelCreateNoti}
        title="Update notification"
        centered
        confirmLoading={loading}
        maskClosable={false}
        destroyOnClose={true}
        okText="Update"
      >
        <NotificationModifier
          loading={loading}
          notification={tmpNotification}
          handleChangeNoti={(newNoti) => setTmpNotification(newNoti)}
        />
      </Modal>
    </div>
  );
}
