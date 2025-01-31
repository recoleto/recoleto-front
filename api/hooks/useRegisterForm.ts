import { UserRegisterContext } from "@/contexts/user-register-context";
import { useContext } from "react";

export function useRegisterForm() {
    const context = useContext(UserRegisterContext);

    return context;
}