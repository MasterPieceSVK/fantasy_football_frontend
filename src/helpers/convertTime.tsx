export default function convertTime(utc_date: string) {
  const timestamp = utc_date;
  const formattedDate = new Date(timestamp).toISOString().substring(5, 10);
  const [month, day] = formattedDate.split("-");
  const formattedDateString = `${day}.${month}`;

  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedDateString} ${formattedTime}`;
}
