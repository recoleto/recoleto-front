import { Address, Company, CompanyType, User, UserType } from "@/utils/types"
import { createContext, useState } from "react"

type RegisterType = 'user' | 'company' | undefined;

type UserRegisterContextType = {
    registerFormData: Partial<User & Address & Company>;
    updateFormData: (data: Partial<User & Address & Company>) => void;
};

const UserRegisterContext = createContext<UserRegisterContextType>(
    {} as UserRegisterContextType
);

type UserRegisterContextProviderType = {
    children: React.ReactNode;
};

function RegisterProvider({ children }: UserRegisterContextProviderType) {
    const [registerFormData, setRegisterFormData] = useState<Partial<User & Address & Company>>({});

    function updateFormData(data: Partial<User & Address & Company>) {
        setRegisterFormData((prevState) => ({ ...prevState, ...data }));
    }

    return (
        <UserRegisterContext.Provider value={{ registerFormData, updateFormData }}>
            {children}
        </UserRegisterContext.Provider>
    );
}


export { UserRegisterContext, RegisterProvider }