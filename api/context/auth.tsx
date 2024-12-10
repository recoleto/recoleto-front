import { HttpResponse } from "api/client/IHttpClient";
import { AuthService } from "api/services/AuthService";
import { createContext, ReactNode, useEffect, useState } from "react";
import { CompanyType, UserType } from "@/utils/types";

interface ContextType {
    signedIn: boolean;
    registerCompany: (data: CompanyType) => Promise<HttpResponse<any>>;
    token: string | null;
    user: UserType | null;
}

const AuthContext = createContext<ContextType>({} as ContextType);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const authService = new AuthService();
    console.log(!!!authService)
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const loadingSession = async () => {
            checkAuth();
        }
    })

    async function checkAuth() {
        const token = localStorage.getItem('token');

    }

    async function registerCompany({ ...data }: CompanyType): Promise<HttpResponse<any>> {
        const response = await authService.registerCompany({ ...data });
        return response
    }

    return (
        <AuthContext.Provider value={{ signedIn, token, user, registerCompany }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }