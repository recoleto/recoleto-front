import { object, ref, string } from "yup";
import * as yup from "yup";

export type CompanyType = {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  password: string;
}
export type UserType = {
  name: string;
  lastName: string;
  phone: string;
  cpf: string;
  email: string;
  password: string;
}

export type LoginType = {
  email: string;
  password: string;
}

export type CollectPointType = {
  pointUUID: string;
  name: string;
  phone: string;
  street: string;
  number: number;
  cep: string;
  urbanSolidWasteEnum: UrbanSolidWasteCategory;
}

export type CollectPointMapType = {
  latitude: number;
  longitude: number;
  companyName: string;
  companyUUID: string;
} & CollectPointType;

export type UrbanSolidWasteType = {
  id: string; 
  name: string;
  points: number;
  type: UrbanSolidWasteCategory;
}

export enum UrbanSolidWasteCategory {
  OLEO_DE_COZINHA = 'OLEO_DE_COZINHA',
  LIXO_ELETRONICO = 'LIXO_ELETRONICO',
  RESIDUOS_CONTAMINANTES = 'RESIDUOS_CONTAMINANTES',
  RESIDUOS_CORTANTES = 'RESIDUOS_CORTANTES',
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
  phone: string().required('Telefone é obrigatório.'),
  cpf: string()
    .required('CPF é obrigatório.')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido.'),
});

// Schema para Empresas
export const companySchema = userBaseSchema.shape({
  name: string().required('Nome Fantasia é obrigatório.').min(3, 'Nome Fantasia deve conter no mínimo 3 caracteres.'),
  phone: string().required('Telefone é obrigatório.'),
  cnpj: string()
    .required('CNPJ é obrigatório.')
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido.'),
});

export const collectPointSchema = object({
  name: string().required('Nome é obrigatório.'),
  phone: string().required('Contato é obrigatório.'),
  street: string().required('Logradouro é obrigatório.'),
  number: yup.number().required('Número é obrigatório.'),
  cep: string()
    .required('CEP é obrigatório.')
    .matches(/^\d{8}$/, 'CEP inválido.'),
  urbanSolidWaste: string().required('Tipo de resíduo é obrigatório.'),
})

export const urbanSolidWasteSchema = object({
  name: string().required('Nome é obrigatório.'),
  points: yup.number().required('Pontos é obrigatório.').min(1, 'Pontos deve ser maior que 0.'),
  type: string().required('Categoria é obrigatória.').equals(Object.values(UrbanSolidWasteCategory), 'Categoria inválida.')
})

export const addressWithUserSchema = userSchema.concat(addressBaseSchema);
export const addressWithCompanySchema = companySchema.concat(addressBaseSchema);

// Tipos
export type User = yup.InferType<typeof userSchema>;
export type Address = yup.InferType<typeof addressBaseSchema>;
export type Company = yup.InferType<typeof companySchema>;
export type CollectPoint = yup.InferType<typeof collectPointSchema>;
export type UrbanSolidWaste = yup.InferType<typeof urbanSolidWasteSchema>;

