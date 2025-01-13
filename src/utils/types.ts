import { object, ref, string } from "yup";
import * as yup from "yup";

export type CompanyType = {
    name: string;
    cnpj: string;
    // street: string;
    // number: number;
    telNumber: string;
    email: string;
    password: string;
}
export type UserType = {
    name: string;
    lastName: string;
    telNumber: string;
    cpf: string;
    // street: string;
    // number: string;
    email: string;
    password: string;
}

// Schemas Base
export const userBaseSchema = object({
    name: string().required('Nome é obrigatório.'),
    email: string()
        .email('E-mail inválido.')
        .required('E-mail é obrigatório.'),
    password: string()
        .min(8, 'Senha deve conter no mínimo 8 caracteres.')
        .required('Senha é obrigatória.')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Senha deve conter no mínimo 8 caracteres, uma letra e um número.'),
});

export const addressBaseSchema = object({
    street: string().required('Logradouro é obrigatório.'),
    number: string().required('Número é obrigatório.'),
    cep: string()
        .required('CEP é obrigatório.')
        .matches(/^\d{8}$/, 'CEP inválido.'),
});

// Schema para Usuário Final
export const userSchema = userBaseSchema.shape({
    lastName: string().required('Sobrenome é obrigatório.'),
    telNumber: string().required('Telefone é obrigatório.'),
    cpf: string()
        .required('CPF é obrigatório.')
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido.'),
});

// Schema para Empresas
export const companySchema = userBaseSchema.shape({
    name: string().required('Nome Fantasia é obrigatório.'),
    telNumber: string().required('Telefone é obrigatório.'),
    cnpj: string()
        .required('CNPJ é obrigatório.')
        .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido.'),
});

export const addressWithUserSchema = userSchema.concat(addressBaseSchema);
export const addressWithCompanySchema = companySchema.concat(addressBaseSchema);

// Tipos
export type User = yup.InferType<typeof userSchema>;
export type Address = yup.InferType<typeof addressBaseSchema>;
export type Company = yup.InferType<typeof companySchema>;


