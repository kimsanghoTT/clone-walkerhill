import { RefObject, useState } from "react";
import { errMsg } from "../data/constant";

interface Props{
    errMsgRef: RefObject<HTMLParagraphElement | null>;
    checkMemorize: boolean;
}

interface LoginState{
    id?: string;
    pw?: string;
    phone?: string;
    phoneAuth?: number;
}

const useLogin = ({errMsgRef, checkMemorize}: Props) => {
    const [login, setLogin] = useState<LoginState>({});
    const [openPhoneAuthModal, setOpenPhoneAuthModal] = useState<boolean>(false);

    const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if(name === "phone" && value.length > 11) return;
        if(name === "phoneAuth" && value.length > 6) return;

        setLogin(prev => ({ ...prev, [name]: name === "phoneAuth" ? Number(value) : value }));

        if(name === "id" && checkMemorize) localStorage.setItem("memorizeId", value);

        if(errMsgRef.current) {
            if(name === "id" && value.length === 0) errMsgRef.current.textContent = errMsg.REQUIRE_ID;
            else if(name === "pw" && value.length === 0) errMsgRef.current.textContent = errMsg.REQUIRE_PW;
            else errMsgRef.current.textContent = "";
        }
    };

    const requestAuthCode = () => {
        const phoneNumber = login.phone?.trim();

        if(phoneNumber?.length === 0 && errMsgRef.current) {
            errMsgRef.current.textContent = errMsg.REQUIRE_PHONE;
            return;
        }

        if (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
            if (errMsgRef.current) {
                errMsgRef.current.textContent = !phoneNumber ? errMsg.REQUIRE_PHONE : errMsg.NOT_NUMBER;
            }
            return;
        }

        if (errMsgRef.current) errMsgRef.current.textContent = "";
        setOpenPhoneAuthModal(true);
    }

    const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(errMsgRef.current) errMsgRef.current.textContent = errMsg.NOT_AUTH;
    }

    return {login, setLogin, handleLogin, handleLoginInput, requestAuthCode, openPhoneAuthModal}
}
export default useLogin;