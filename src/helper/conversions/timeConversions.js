export const epochToLocalDateTime = (epochTime) => {
    if (epochTime.toString().length === 10) {
        epochTime *= 1000; // Convert seconds to milliseconds
    }
    const date = new Date(epochTime);
    return date.toLocaleString(); 
};

export const getCurrentTime = async () =>{
    const currentTime = Date.now();
    return Math.floor(currentTime/1000);
}