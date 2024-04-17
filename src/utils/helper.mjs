export const toInt = (value) => {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? null : parsedValue;
  };