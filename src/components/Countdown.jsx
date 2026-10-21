import { useEffect, useState } from "react";

const getRemaining = (date) => {
  const targetTime = new Date(`${date}T00:00:00`).getTime();
  const difference = targetTime - Date.now();

  if (difference <= 0) return { passed: true, days: 0, hours: 0, minutes: 0, seconds: 0 };

  const totalSeconds = Math.floor(difference / 1000);
  return {
    passed: false,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
};

const Countdown = ({ date }) => {
  const [remaining, setRemaining] = useState(() => getRemaining(date));

  useEffect(() => {
    setRemaining(getRemaining(date));
    const intervalId = setInterval(() => setRemaining(getRemaining(date)), 1000);
    return () => clearInterval(intervalId);
  }, [date]);

  if (remaining.passed) return <p><strong>Đếm ngược:</strong> Sự kiện đã diễn ra.</p>;

  return (
    <p>
      <strong>Đếm ngược:</strong> Còn {remaining.days} ngày {remaining.hours} giờ {remaining.minutes} phút {remaining.seconds} giây
    </p>
  );
};

export default Countdown;