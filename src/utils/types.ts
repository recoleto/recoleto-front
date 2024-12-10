import { InferType, number, object, ref, string } from "yup";

export type CompanyType = {
    name: string;
    cnpj: string;
    // street: string;
    // number: number;
    telNumber: string;
    email: string;
    password: string;
}

export const companySchema = object({
    name: string().required('Nome Fantasia é obrigatório.'),
    cnpj: string().required('CNPJ é obrigatório.').matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido.'),
    // street: string().required('Logradouro é obrigatório.'),
    // number: number().positive('Número deve ser positivo').required('Número é obrigatório.'),
    telNumber: string().required('Telefone é obrigatório.'),
    email: string().email().required('Email é obrigatório.').matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Email inválido.'),
    password: string().required('Senha é obrigatória.').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Senha deve conter no mínimo 8 caracteres, uma letra e um número.'),
    confirmPassword: string().required('Confirmação de senha é obrigatória.').oneOf([ref('password')], 'Senhas não conferem.')
})

export type Company = InferType<typeof companySchema>

export type UserType = {
    name: string;
    cpf: string;
    street: string;
    number: string;
    email: string;
    password: string;
}


export type LoginType = {
    email: string
    password: string
}
