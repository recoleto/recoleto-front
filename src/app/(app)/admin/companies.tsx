import { MainLayout } from "@/components/main-layout";
import { globalsStyles } from "@/globals-styles";
import { useGetComapnies } from "api/hooks/useGetCompanies";
import { Text, TouchableOpacity, View } from "react-native";
import { adminStyles } from "./users";
import { Feather } from '@expo/vector-icons';

export default function AdminCompanies() {
    const { companies } = useGetComapnies();
    return (
        <MainLayout>
            <Text style={globalsStyles.title}>Gerenciar empresas:</Text>
            <Text style={globalsStyles.text}>Aqui você pode gerenciar as empresas cadastradas no Recoleto.</Text>
            {companies && companies.map(company => (
                <View style={adminStyles.cardWrapper} key={company.cnpj}>
                    <View style={adminStyles.userCard}>
                        <Text>Nome fantasia: {company.name}</Text>
                        <Text>Contato: {company.phone ? company.phone : 'Sem registro.'}</Text>
                        <Text>CNPJ: {company.cnpj}</Text>
                        <Text>E-mail: {company.email}</Text>
                    </View>
                    <TouchableOpacity>
                        <Feather name="trash" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ))}
        </MainLayout>
    )
}