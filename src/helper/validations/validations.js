
export const emailValidator = (email) =>{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export const phoneNumberValidator = (number) =>{
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(number);
}

export const passwordValidator = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

export const isDateTimeLessThanOneHourFromNow = (dateTime) =>{
    const currentTime = Date.now();
    const oneHourLaterTime = Math.floor((currentTime + 1 * 60 * 60 * 1000)/1000);
    return dateTime < oneHourLaterTime;
}

export const isStartTimeLessOrEqualToEndTime = (startTime,endTime) =>{
    return startTime <= endTime;
}