import { MainLayout } from "@/components/main-layout";
import { colors } from "@/utils/globals";
import { UserType } from "@/utils/types";
import { useGetUsers } from "api/hooks/useGetUsers";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useState } from "react";
import { BaseDialog } from "@/components/dialog";
import { globalsStyles } from "@/globals-styles";

export default function AdminUsers() {
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => setIsOpen(!isOpen);

  const { users } = useGetUsers();

  function handleDisableUserAccount() {

  }

  return (
    <MainLayout>
      <Text style={globalsStyles.title}>Gerenciar os usuários: </Text>
      <Text style={globalsStyles.text}>Aqui você pode habilitar e desabilitar as contas dos usuários do Recoleto.</Text>
      {users && users.map((user: UserType) => (
        <View key={user.cpf} style={styles.cardWrapepr}>
          <View style={styles.userCard}>
            <Text>Nome: {user.name}</Text>
            <Text>Sobrenome: {user.lastName}</Text>
            <Text>CPF: {user.cpf}</Text>
            <Text>E-mail: {user.email}</Text>
          </View>
          <TouchableOpacity>
            <Feather name="trash" size={24} color="black" />
          </TouchableOpacity>
          <BaseDialog
            title="Você tem certeza que deseja desativar essa conta?"
            message={`Você está prestes a desativar a conta de ${user.name} ${user.lastName}. Deseja continuar?`}
            isOpen={isOpen}
            onPressAction={handleDisableUserAccount}
            setIsOpen={handleModal} />
        </View>
      ))}
    </MainLayout>
  )
}

const styles = StyleSheet.create({
  cardWrapepr: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userCard: {
    padding: 12,
    shadowColor: '#171717',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.grey200,
    borderRadius: 5,
    flex: 4
  },
})