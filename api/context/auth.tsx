import { HttpResponse, StatusCode } from "api/client/IHttpClient";
import { AuthService } from "api/services/AuthService";
import { createContext, ReactNode, useEffect, useState } from "react";
import { CompanyType, LoginType, UserType } from "@/utils/types";
import { router } from "expo-router";
import { getData, removeData, storeData } from "@/utils/store-data";
import { redirectRole } from "@/utils/utils";

interface ContextType {
  registerCompany: (data: CompanyType) => Promise<HttpResponse<any>>;
  registerUser: (data: UserType) => Promise<HttpResponse<any>>;
  login: (data: LoginType) => Promise<HttpResponse<any>>;
  logOut: () => void;
  role: string | null;
}

const AuthContext = createContext<ContextType>({} as ContextType);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authService = new AuthService();
  const [expiresIn, setExpiresIn] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const loadingSession = async () => {
      await checkAuth();
      const role = await getData('@Auth:role');
      const storageToken = await getData('@Auth:token');
      if (storageToken && role) {
        setUserRole(String(role));
        redirectRole(String(role));
      } else {
        router.replace('/')
      }
    };
    loadingSession();
  }, [])

  async function login({ email, password }: LoginType): Promise<HttpResponse<any>> {
    const response = await authService.loginUser({ email, password });
    if (response.statusCode === StatusCode.Ok) {
      const { token, expiresIn, role } = response.body;
      setExpiresIn(new Date().getTime() + expiresIn);
      await storeData({ key: '@Auth:token', value: token });
      await storeData({ key: '@Auth:expiresIn', value: String(expiresIn) });
      await storeData({ key: '@Auth:role', value: role });
      setUserRole(role);
    }
    return response;
  }

  async function logOut() {
    await removeData('@Auth:token');
    await removeData('@Auth:expiresIn');
    await removeData('@Auth:role');
    setExpiresIn(null);
    setUserRole(null);
    router.navigate('/');
  }

  async function checkAuth() {
    const token = await getData('@Auth:token');
    if (token) return true;
    if (expiresIn && expiresIn < new Date().getTime()) {
      await logOut();
      return false;
    }
  }

  async function registerUser({ ...data }: UserType): Promise<HttpResponse<any>> {
    return await authService.registerUser({ ...data })
  }

  async function registerCompany(data: CompanyType): Promise<HttpResponse<any>> {
    return await authService.registerCompany(data)
  }

  return (
    <AuthContext.Provider value={{ registerCompany, registerUser, login, logOut, role: userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }