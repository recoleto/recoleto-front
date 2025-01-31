import { colors, font } from "@/utils/globals";
import { AuthContext } from "api/context/auth";
import { useGetCompany } from "api/hooks/useGetCompany";
import { useGetUser } from "api/hooks/useGetUser";
import { useContext, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type MainLayoutProps = {
  children: React.ReactNode;
};

export function ProfileLayout({ children }: MainLayoutProps) {
  const { role } = useContext(AuthContext); 
  const { user, fetchUser } = useGetUser();
  const { company, fetchCompany } = useGetCompany();

  useEffect(() => {
    if (role === "USUARIO" && !user) {
      fetchUser();
    } else if (role === "EMPRESA" && !company) {
      fetchCompany();
    }
  }, [role, user, company, fetchUser, fetchCompany]);

  return (
    <ScrollView>
      <View style={layoutStyles.container}>
        <View id="header" style={layoutStyles.header}>
          <Text style={layoutStyles.headerText}>Foto de Perfil</Text>
          <Image source={require("../../assets/images/user-mock.png")} />
          {role === "USUARIO" && user && (
            <Text style={layoutStyles.headerText}>Olá {user.name} </Text>
          )}
          {role === "EMPRESA" && company && (
            <Text style={layoutStyles.headerText}>Bem-vindo, {company.name}</Text>
          )}
        </View>
        <View style={layoutStyles.content}>{children}</View>
      </View>
    </ScrollView>
  );
}

export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green200, // Fundo geral (verde escuro)
  },
  header: {
    flex: 1, // Proporção maior para o cabeçalho
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    color: colors.white,
    fontSize: font.size.large,
    fontFamily: font.family.semiBold,
  },
  title: {
    fontFamily: font.family.semiBold,
    textDecorationLine: "underline",
    fontSize: font.size.mediumX,
  },
  content: {
    flex: 3.5, // Proporção para o conteúdo
    backgroundColor: colors.white,
    borderTopLeftRadius: 40, // Borda curva na parte superior
    borderTopRightRadius: 40,
    padding: 20,
    gap: 20,
  },
});
