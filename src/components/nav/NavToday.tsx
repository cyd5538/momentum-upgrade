import { useEffect, useState } from 'react';

const getTimeString = () => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']; 
  const date = new Date();
  const dayOfWeek = daysOfWeek[date.getDay()]; 
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${dayOfWeek}요일 ${hours}:${minutes}:${seconds}`;
};

const NavToday = () => {
  const [timer, setTimer] = useState(getTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(getTimeString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <div className='text-2xl font-bold text-purple-500'>{timer}</div>
    </div>
  );
};

export default NavToday;
