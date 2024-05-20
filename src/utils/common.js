export const getLocalStorage = (name) => {
  if (!localStorage.getItem(name) || localStorage.getItem(name) === "undefined")
    return null;
  return JSON.parse(localStorage.getItem(name));
};

export const setLocalStorage = (name, value) => {
  return localStorage.setItem(name, JSON.stringify(value));
};

export const removeLocalStorage = (name) => {
  return localStorage.removeItem(name);
};

export const handleTransformStringToDate = (startTime, endTime) => {
  const currentTime = new Date();
  const currentMilliseconds =
    currentTime.getHours() * 3600000 +
    currentTime.getMinutes() * 60000 +
    currentTime.getSeconds() * 1000;

  // Lấy thời gian bắt đầu và kết thúc từ dữ liệu của bạn (đơn vị thời gian là milliseconds)
  const startTimeMilliseconds = startTime * 1000; // startTime = 28800 seconds = 28800 * 1000 milliseconds
  const endTimeMilliseconds = endTime * 1000; // endTime = 90000 seconds = 90000 * 1000 milliseconds

  // Kiểm tra xem thời điểm hiện tại có nằm trong khoảng mở cửa hay không
  if (
    currentMilliseconds >= startTimeMilliseconds &&
    currentMilliseconds <= endTimeMilliseconds
  ) {
    return true;
  } else {
    return false;
  }
};
export const handleCalculateDateFromNow = (date) => {
  const temp1 = new Date();
  const dayTemp1 = `0${temp1.getDate()}`.slice(-2);
  const monthTemp1 = `0${temp1.getMonth() + 1}`.slice(-2);
  const yearTemp1 = `0${temp1.getFullYear()}`.slice(-4);
  const str = `${monthTemp1}/${dayTemp1}/${yearTemp1}`;

  const temp2 = date;
  const dayTemp2 = `0${temp2.split("/")[0]}`.slice(-2);
  const monthTemp2 = `0${temp2.split("/")[1]}`.slice(-2);
  const yearTemp2 = `0${temp2.split("/")[2]}`.slice(-4);

  const tempDate = `${dayTemp2}/${monthTemp2}/${yearTemp2}`;
  const date1 = new Date(tempDate);
  const date2 = new Date(str);

  const Difference_In_Time = date2.getTime() - date1.getTime();

  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Difference_In_Days > 0
    ? `từ ${Difference_In_Days} ngày trước`
    : "trong hôm nay";
};

export function timeToNumber(timeString) {
  if (!timeString) return;

  const [hours, minutes] = timeString.split(":").map(Number);

  return hours * 3600 + minutes * 60;
}
export function convertToTimeString(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes;
}
