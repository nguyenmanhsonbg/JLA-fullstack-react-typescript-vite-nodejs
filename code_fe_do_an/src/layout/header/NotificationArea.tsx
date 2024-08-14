import { convertDateToString } from "@/helper";
import { NofiFetchResponse, NotiFetchPayload, Notification, NotiType } from "@/pages/admin/notification/notification-management";
import { Button, Popover, Spin } from "antd";
import axios from "axios";
import { useState } from "react";
import { FaBell } from "react-icons/fa";

type Props = {
  userId: number
}

type NotiTargetType = 'user'|'system'

export function NotificationArea ({userId} : Props) {

  // ==== STATES ====
  const [loading, setLoading] = useState(false)
  const [userNotifications, setUserNotifications] = useState<Notification[]>([])
  const [systemNotifications, setSystemNotifications] = useState<Notification[]>([])

  const [userActivePage, setUserActivePage] = useState<number>(1)
  const [userTotalPages, setUserTotalPages] = useState<number>(0)
  const [systemActivePage, setSystemActivePage] = useState<number>(1)
  const [systemTotalPages, setSystemTotalPages] = useState<number>(0)
  const [currentNotiTargetType, setCurrentNotiTargetType] = useState<NotiTargetType>('system')
  const PAGE_LIMIT = 5

  // ==== WATCHERS ====

  // ==== ASYNC FUNCTIONS ====
  const fetchNoti = async (notiTarget: NotiTargetType = 'system', notiType: NotiType = 'all', next_page: number = 1, limit: number = PAGE_LIMIT) => {
    const noti_fetch_id = notiTarget === 'user' ? {target_id: userId} : {source_id: 1} 
    const fetchNotiPayload : NotiFetchPayload = {
      type: notiType,
      ...noti_fetch_id,
      next_page,
      limit,
    }
    return await axios.post('/noti/findById', fetchNotiPayload)
      .then(res => {
        const data : NofiFetchResponse = res.data.data.data
        switch (currentNotiTargetType) {
          case 'system':
            setSystemActivePage(data.current_page)
            setSystemTotalPages(data.total_pages)
            break
          case 'user':
            setUserActivePage(data.current_page)
            setUserTotalPages(data.total_pages)
            break
          default:
            break
        }
        return data.data
      }).catch(err => {
        console.error('Can not get notifications: ', err)
        return [] as Notification[]
      })
  }

  const getUserNoti = async (next_page: number = 1, type: NotiType = 'all', limit: number = PAGE_LIMIT) => {
    setLoading(true)
    const newFetchedNotis = await fetchNoti('user', type, next_page, limit)

    // unique noti by id TODO: update this function for performance optimization
    const newNotiSet = newFetchedNotis.reduce((curList, noti) => {
      const isExisted = curList.some(n => n.noti_id === noti.noti_id)
      if (!isExisted) curList.push(noti)
      return curList
    }, userNotifications)

    setUserNotifications(newNotiSet)
    setLoading(false)
  }
  
  const getSystemNoti = async (next_page: number = 1, type: NotiType = 'allWithUnsent', limit: number = PAGE_LIMIT) => {
    setLoading(true)
    const newFetchedNotis = await fetchNoti('system', type, next_page, limit)

    // unique noti by id TODO: update this function for performance optimization
    const newNotiSet = newFetchedNotis.reduce((curList, noti) => {
      const isExisted = curList.some(n => n.noti_id === noti.noti_id)
      if (!isExisted) curList.push(noti)
      return curList
    }, systemNotifications)

    setSystemNotifications(newNotiSet)
    setLoading(false)
  }

  // ==== LOGIC FUNCTIONS ====

  const handleGetMoreNotifications = () => {
    let nextPage = 1
    switch(currentNotiTargetType) {
      case 'system':
        nextPage = systemActivePage + 1
        setSystemActivePage(nextPage)
        getSystemNoti(nextPage)
        break
      case 'user':
        nextPage = userActivePage + 1
        setUserActivePage(nextPage)
        getUserNoti(nextPage)
        break
      default:
        break
      
    }
  }

  // ==== UTILITIES FUNCTIONS ====

  const isGetMoreBtnDisabled = () => {
    switch(currentNotiTargetType) {
      case 'user':
        return userActivePage >= userTotalPages
      case 'system':
        return systemActivePage >= systemTotalPages
      default:
        return false
    }
  }

  const renderedNotiList = () => {
    const renderedNotis = currentNotiTargetType === 'system' ? systemNotifications : userNotifications
    return ((renderedNotis.length === 0) && !loading ? 
      (<span className="">Chưa có thông báo</span>) :
      renderedNotis.map(noti => (
        <section
          key={`noti-${currentNotiTargetType}-${noti.noti_id}`}
          className={`select-none mb-1 p-1 border-solid border rounded hover:border-slate-400 ${!!noti.is_read ? '' : 'bg-green-100 hover:bg-green-200'}`}
        >
          <div className="">
            {noti.title}
          </div>
          <span className="inline-block text-slate-400">{convertDateToString(noti.noti_date)}</span>
        </section>
      ))
    )
  }

  const notificationList = (
    <div className="w-[250px]" id="">
      <section className="flex flex-col">
        <div className="border-b mb-2 pb-2">
          <Button
            type='text'
            className={`w-[50%] ${currentNotiTargetType === 'system' ? 'border-b border-emerald-700 border-2' : ''}`}
            onClick={() => {
              setCurrentNotiTargetType('system')
              getSystemNoti(systemActivePage)
            }}
          >
            Hệ thống
          </Button>
          <Button
            type='text'
            className={`w-[50%] ${currentNotiTargetType === 'user' ? 'border-b border-emerald-700 border-2' : ''}`}
            onClick={() => {
              setCurrentNotiTargetType('user')
              getUserNoti(userActivePage)
            }}
          >
            Học tập
          </Button>
        </div>
        <section className="flex flex-col max-h-[500px] overflow-y-auto">
          <section className="flex-1">
            {renderedNotiList()}
          </section>
          <Spin
            spinning={loading}
            className="my-2"
          />
          <div className="flex justify-center w-full">
            <Button
              className='w-full'
              disabled={isGetMoreBtnDisabled()}
              loading={loading}
              onClick={handleGetMoreNotifications}
            >
              Get more notification
            </Button>
          </div>
        </section>
      </section>
    </div>
  )

  return (
    <div className="flex gap-5">
      <Popover
        content={notificationList}
        title="Thông báo"
        trigger="click"
        placement="bottomRight"
      >
        <FaBell className="size-9 text-[#7db660] cursor-pointer" onClick={() => getSystemNoti()}/>
      </Popover>
    </div>
  );
}
