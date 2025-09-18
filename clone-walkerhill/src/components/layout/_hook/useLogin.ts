import { useState } from "react";
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

    const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    };

    const requestAuthCode = () => {
        const phoneNumber = login.phone?.trim();

        if (!phoneNumber) {
            setError(errMsg.REQUIRE_PHONE);
            return;
        }

        if (!/^\d+$/.test(phoneNumber)) {
            setError(errMsg.NOT_NUMBER);
            setLogin(prev => ({...prev, phone: ""}));
            return;
        }

        const authCode = Math.floor(1000 + Math.random() * 9000);

        setError("");
        if(!firstPhoneAuth) setOpenPhoneAuthModal(true);
    }

    const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {
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
        } 
        
    }

    return {login, error, setError, setLogin, handleLogin, handleLoginInput, requestAuthCode, openPhoneAuthModal}
}
export default useLogin;