import { ScrollView } from "react-native-gesture-handler";
import { layoutStyles } from "./profile-layout";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useEffect } from "react";
import { AuthContext } from "api/context/auth";
import { useGetUser } from "api/hooks/useGetUser";
import { useGetCompany } from "api/hooks/useGetCompany";
import { colors, font } from "@/utils/globals";

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const { role } = useContext(AuthContext);
  const { user, fetchUser } = useGetUser();
  const { company, fetchCompany } = useGetCompany();

  useEffect(() => {
    if (role === "USUARIO" && !user) {
      fetchUser();
    } else 
    if (role === "EMPRESA" && !company) {
      fetchCompany();
    }
  }, [role, user, company, fetchUser, fetchCompany]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerView}>
        <View id="header" style={styles.header}>
          {role === "USUARIO" && user && (
            <Text style={styles.headerText}>Olá {user.name} </Text>
          )}
          {role === "EMPRESA" && company && (
            <Text style={styles.headerText}>Olá, {company.name}</Text>
          )}
        </View>
        <View style={styles.content}>{children}</View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerView: {
    backgroundColor: colors.green200,
  },
  header: {
    width: '100%',
    padding: 20,
    alignItems: "center",
    marginVertical: 50,
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 40, // Borda curva na parte superior
    borderTopRightRadius: 40,
    padding: 20,
    gap: 20,
    height: '100%',
  },
  headerText: {
    color: colors.white,
    fontSize: font.size.xxlarge,
    fontFamily: font.family.medium,
  }
})