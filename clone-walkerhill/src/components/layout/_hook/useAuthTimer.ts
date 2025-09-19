import { useCallback, useEffect, useState } from "react";

const useAuthTimer = () => {
    const [timer, setTimer] = useState<number>(180);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const [resendEnabled, setResendEnabled] = useState<boolean>(false);
    const [timerExpired, setTimerExpired] = useState<boolean>(false);

    const startTimer = useCallback(() => {
        setTimer(180);
        setIsTimerActive(true);
        setResendEnabled(false);
        setTimerExpired(false);
    },[]);

    useEffect(() => {
        if(!isTimerActive) return;

        const authTimer = setInterval(() => {
            setTimer(prev => {
                if(prev < 1){
                    clearInterval(authTimer);
                    setIsTimerActive(false);
                    setResendEnabled(true);
                    setTimerExpired(true);
                    return 0;
                }   
                return prev - 1;
            })
        }, 1000)
    },[isTimerActive, resendEnabled])

    const min = Math.floor(timer / 60).toString().padStart(1, "0");
    const sec = (timer % 60).toString().padStart(2, "0");

    return { min, sec, isTimerActive, resendEnabled, startTimer, timerExpired}

}
export default useAuthTimer;