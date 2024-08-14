function isEmptyObj(obj: {}) {
  return Object.keys(obj).length === 0;
}

function convertDateToString(date: Date, isInputDateValue?: boolean) {
  // Define options for formatting the date
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  };

  // Convert the date to a string using locale-specific settings and options
  const localeStringWithOptions = dateObj.toLocaleString("vi-VN", options);

  // Log the locale-specific string with options to the console

  if (isInputDateValue) {
    return localeStringWithOptions.split("/").reverse().join("-");
  }
  return localeStringWithOptions;
}

export { isEmptyObj, convertDateToString };
