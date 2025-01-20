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
  latitude: string;
  longitude: string;
  companyName: string;
  companyUUID: string;
} & CollectPointType;

// {
//     "pointUUID": "21333cf6-681e-444d-8126-eade989dd264",
//     "name": "Ponto de Coleta 2 ",
//     "phone": "45554553322",
//     "cep": "85875000",
//     "street": "Avenida Primeiro de Maio",
//     "number": "77",
//     "latitude": "-25.4476056",
//     "longitude": "-54.3965521",
//     "urbanSolidWasteEnum": "RESIDUOS_CONTAMINANTES",
//     "companyName": "Jejdjdhd",
//     "companyUUID": "ed733f89-da1d-4c0a-95e6-f0f0eea3ef5b"
// }

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

export const addressWithUserSchema = userSchema.concat(addressBaseSchema);
export const addressWithCompanySchema = companySchema.concat(addressBaseSchema);

// Tipos
export type User = yup.InferType<typeof userSchema>;
export type Address = yup.InferType<typeof addressBaseSchema>;
export type Company = yup.InferType<typeof companySchema>;
export type CollectPoint = yup.InferType<typeof collectPointSchema>;

