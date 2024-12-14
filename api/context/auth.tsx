import {HttpResponse} from "api/client/IHttpClient";
import {AuthService} from "api/services/AuthService";
import {createContext, ReactNode, useEffect, useState} from "react";
import {CompanyType, LoginType, UserType} from "@/utils/types";
import {router} from "expo-router";
import {getData, storeData} from "@/utils/store-data";

interface ContextType {
    registerCompany: (data: CompanyType) => Promise<HttpResponse<any>>;
    registerUser: (data: UserType) => Promise<HttpResponse<any>>;
    login: (data: LoginType) => Promise<HttpResponse<any>>;
    token: string | null;
    user: UserType | null;
    isAuthenticated: boolean;
}

const AuthContext = createContext<ContextType>({} as ContextType);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const authService = new AuthService();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserType | null>(null);
    const [expiresIn, setExpiresIn] = useState<number | null>(null);
    const isAuthenticated = !!token;

    useEffect(() => {
        const loadingSession = async () => {
            await checkAuth();
            const storageToken = await getData('@Auth:token');
            if (storageToken) {
                router.replace('/profile')
            } else {
                router.replace('/login')
            }
        };
        loadingSession();
    }, [])

    async function login({ email, password }: LoginType): Promise<HttpResponse<any>> {
        const response = await authService.loginUser({ email, password });
        if (response.statusCode === 200) {
            const { token, expiresIn, role } = response.body;
            setToken(token);
            setExpiresIn(expiresIn);
            await storeData({key: '@Auth:token', value: token});
            await storeData({key: '@Auth:expiresIn', value: expiresIn});
            await storeData({key: '@Auth:role', value: role});
        }
        return response;
    }

    async function checkAuth() {
        const token = await getData('@Auth:token');
        if (token) return setToken(token as string);
    }

    async function registerUser({ ...data }: UserType): Promise<HttpResponse<any>> {
        return await authService.registerUser({...data})
    }

    async function registerCompany({ ...data }: CompanyType): Promise<HttpResponse<any>> {
        return await authService.registerCompany({...data})
    }

    return (
        <AuthContext.Provider value={{ token, user, registerCompany, registerUser, login, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }