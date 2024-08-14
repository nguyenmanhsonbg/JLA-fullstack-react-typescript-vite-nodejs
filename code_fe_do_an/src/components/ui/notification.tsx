import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  let bgColor;
  if (type === 'success') {
    bgColor = 'bg-green-500';
  } else if (type === 'error') {
    bgColor = 'bg-red-500';
  } else {
    bgColor = 'bg-blue-500';
  }

  return (
    <div className={`fixed top-4 right-4 p-4 rounded shadow-md text-white ${bgColor}`}>
      {message}
    </div>
  );
};

export default Notification;
