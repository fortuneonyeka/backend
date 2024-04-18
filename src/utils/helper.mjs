export const toInt = (value) => {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? null : parsedValue;
  };


  export const capitalizeFirstLetter = (string) => {
    // Parse the input to a string
    const inputString = String(string);

    // Check if the input is a string
    if (typeof inputString !== 'string') {
        throw new Error('Input must be a string');
    }

    // Capitalize the first letter of the string
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};
