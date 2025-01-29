import { ScrollView } from "react-native-gesture-handler";
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
            <View style={styles.headerView}>
              <Text style={styles.headerText}>Olá, {user.name} </Text>
              <Text style={styles.text}>Você possui:</Text>
              <View style={styles.pointsView}>
                <Text style={styles.points}>{user.points}</Text>
                <Text style={styles.text}>{Number(user.points) === 1 ? "ponto" : "pontos"}</Text>
              </View>
            </View>
          )}
          {role === "EMPRESA" && company && (
            <Text style={styles.headerText}>Olá, {company.name}</Text>
          )}
          {role === "ADMIN" && (
            <Text style={styles.headerText}>Olá, Administrador</Text>
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
  },
  pointsView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize: font.size.mediumX,
    fontFamily: font.family.regular,
  },
  points: {
    color: colors.white,
    fontSize: font.size.xxlarge,
    fontFamily: font.family.medium,
  },
  headerView: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    alignItems: 'center',
  }
})