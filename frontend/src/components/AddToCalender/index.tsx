import {Button} from "../Button";

interface EventProps {
  title: string;
  startDate: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
}

interface AddToCalendarProps {
  event: EventProps;
}

// Utility function to format date and time
const formatDateTime = (date: string, time: string) => `${date}T${time}Z`;

const AddToCalendar: React.FC<AddToCalendarProps> = ({event}) => {
  const {title, startDate, startTime, endTime, description, location} = event;

  // Generate calendar URLs
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatDateTime(startDate, startTime)}/${formatDateTime(startDate, endTime)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  const handleOpenCalendar = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Button type="outline" text="+ Add to Calendar" icon={true} onClick={() => handleOpenCalendar(googleCalendarUrl)} />
  );
};

export {AddToCalendar};
