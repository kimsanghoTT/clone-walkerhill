import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { errMsg } from "../data/constant";

interface Props{
    checkMemorize: boolean;
    loginMethod: string;
}

interface LoginState{
    name?: string;
    id?: string;
    pw?: string;
    phone?: string;
    authCode?: number;
}

const useLogin = ({checkMemorize, loginMethod}: Props) => {
    const [login, setLogin] = useState<LoginState>({});
    const [error, setError] = useState<string>("");
    const [firstPhoneAuth, setFirstPhoneAuth] = useState<boolean>(false);
    const [openPhoneAuthModal, setOpenPhoneAuthModal] = useState<boolean>(false);
    const [authCode, setAuthCode] = useState<number | null>(null);

    const handleLoginInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if(name === "phone" && value.length > 11) return;
        if(name === "authCode" && value.length > 4) return;

        setLogin(prev => { 
            const loginInput = {...prev, [name]: name === "authCode" ? Number(value) : value};
            
            if(loginInput.id && !loginInput.pw) setError(errMsg.REQUIRE_PW);
            else if(!loginInput.id && loginInput.pw) setError(errMsg.REQUIRE_ID);
            else setError("");
            
            return loginInput;
        });

        if(name === "id" && checkMemorize) localStorage.setItem("memorizeId", value);

    },[checkMemorize]);

    const requestAuthCode = useCallback((setModalError?:Dispatch<SetStateAction<string>>): boolean => {
        const phoneNumber = login.phone?.trim();

        console.log(openPhoneAuthModal);
        

        if(openPhoneAuthModal && !login.name){
            if(setModalError) setModalError(errMsg.REQUIRED);
            return false;
        }   

        if (!phoneNumber) {
            if(setModalError) setModalError(errMsg.REQUIRE_PHONE);
            setError(errMsg.REQUIRE_PHONE);
            return false;
        }

        if (!/^\d+$/.test(phoneNumber)) {
            if(setModalError) setModalError(errMsg.NOT_NUMBER);
            setError(errMsg.NOT_NUMBER);
            setLogin(prev => ({ ...prev, phone: "" }));
            return false;
        }

        const generateAuthCode = Math.floor(1000 + Math.random() * 9000);
        setAuthCode(generateAuthCode);
        console.log("인증번호 : " + generateAuthCode);

        if(setModalError) setModalError("");
        setError("");

        return true;
    }, [login.name, login.phone]);

    const handleLogin = useCallback((e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(loginMethod === "email") {
            if(!login.id) {
                setError(errMsg.REQUIRE_ID);
                return;
            } 
            if(!login.pw) {
                setError(errMsg.REQUIRE_PW);
                return;
            } 
        }
        else if(loginMethod === "phone") {
            if(!login.phone){
                setError(errMsg.REQUIRE_PHONE);
                return;
            }
            if (!/^\d+$/.test(login.phone)) {
                setError(errMsg.NOT_NUMBER);
                setLogin(prev => ({...prev, phone: ""}));
                return;
            }
            if(login.authCode !== authCode){

            }
        } 
        
    },[authCode, loginMethod, login]);

    return {
        login,
        setLogin,
        error,
        setError,
        openPhoneAuthModal,
        setOpenPhoneAuthModal,
        firstPhoneAuth,
        setAuthCode,
        handleLogin,
        handleLoginInput,
        requestAuthCode,
    };
}
export default useLogin;