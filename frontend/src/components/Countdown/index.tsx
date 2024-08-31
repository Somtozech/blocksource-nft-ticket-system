import React, {useEffect, useRef, useState, MutableRefObject} from "react";
import styles from "./countdown.module.css";
import {TimeBox} from "../TimeBox";

interface CountdownProps {}

const Countdown: React.FC<CountdownProps> = () => {
  const dayRef = useRef<HTMLHeadingElement>(null);
  const hourRef = useRef<HTMLHeadingElement>(null);
  const minuteRef = useRef<HTMLHeadingElement>(null);
  const secondRef = useRef<HTMLHeadingElement>(null);
  const [hasExpired, setHasExpired] = useState<boolean>(false);
  const venueTimeOffset = 3600;
  const timezoneOffset = new Date().getTimezoneOffset() * 60 + venueTimeOffset;
  const now = new Date().getTime() + timezoneOffset;

  console.log({});

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const eventTime = new Date(2024, 7, 31, 10, 30);
    if (eventTime.getTime() < now) setHasExpired(true);
    if (eventTime.getTime() >= now) {
      const setTimeLeft = () => {
        const eventTime = new Date(2024, 7, 31, 10, 30);
        const now = new Date().getTime();
        if (eventTime.getTime() < now) setHasExpired(true);
        let difference = Math.abs(eventTime.getTime() - now) / 1000;

        const days = Math.floor(difference / 86400);
        difference -= days * 86400;

        const hours = Math.floor(difference / 3600) % 24;
        difference -= hours * 3600;

        let minutes = Math.floor(difference / 60) % 60;
        difference -= minutes * 60;

        let seconds = Math.round(difference % 60);

        const timeDetails: {[key: string]: string | number} = {days, hours, minutes, seconds};

        for (const key in timeDetails) {
          if (timeDetails[key].toString().length < 2) timeDetails[key] = `0${timeDetails[key]}`;
        }
        if (seconds === 60) minutes = parseInt(minuteRef.current?.innerText || "0");
        if (timeDetails["seconds"] === "60") timeDetails["seconds"] = "00";

        if (dayRef.current && hourRef.current && minuteRef.current && secondRef.current) {
          dayRef.current.innerText = timeDetails.days.toString();
          hourRef.current.innerText = timeDetails.hours.toString();
          minuteRef.current.innerText = timeDetails.minutes.toString();
          secondRef.current.innerText = timeDetails.seconds.toString();
        }
        return timeDetails;
      };
      interval = setInterval(() => {
        setTimeLeft();
      }, 1000);
    }
    return () => {
      if (hasExpired) {
        clearInterval(interval);
      }
    };
  }, [hasExpired, now]);

  return (
    <div className={`flex gap-x-2 md:gap-x-4 lg:gap-x-4 xl:gap-x-10 mb-14 lg:my-8 ${styles.container}`}>
      <TimeBox type="day" ref={dayRef} />
      <TimeBox type="hour" ref={hourRef} />
      <TimeBox type="minute" ref={minuteRef} />
      <TimeBox ref={secondRef} />
    </div>
  );
};

export {Countdown};
