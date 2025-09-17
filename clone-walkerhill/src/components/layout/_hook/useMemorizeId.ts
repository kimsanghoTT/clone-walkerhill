import { useEffect } from "react";

interface LoginState{
    id?: string;
    pw?: string;
    phone?: string;
    phoneAuth?: number;
}

interface Props{
    login: LoginState;
    setLogin: React.Dispatch<React.SetStateAction<LoginState>>;
    setCheckMemorize: React.Dispatch<React.SetStateAction<boolean>>;
}

const useMemorizeId = ({login, setLogin, setCheckMemorize}:Props) => {

    useEffect(() => {
        const memorizedId = localStorage.getItem("memorizeId");
        const memorizedCheck = localStorage.getItem("memorizeCheck");
        
        if(memorizedCheck === "true" && memorizedId){
            setLogin(prev => ({ ...prev, id:memorizedId}));
            setCheckMemorize(true);
        }
        
    },[])

    const handleIdMemorize = (e:React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setCheckMemorize(checked);
        localStorage.setItem("memorizeCheck", String(checked));
        console.log(checked);
        

        if (checked && login.id) localStorage.setItem("memorizeId", login.id);
        else {
            localStorage.removeItem("memorizeCheck");
            localStorage.removeItem("memorizeId");
        }
    }

    return {handleIdMemorize}
}
export default useMemorizeId;