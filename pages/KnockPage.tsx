import { StatusBar } from "expo-status-bar"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native"
import Button from "../components/Button"
import * as ImagePicker from "expo-image-picker"
import { useActiveUsers, useSendKnockMessage } from "../hooks"
import { KKChat, KKUser } from "../model"

export default function KnockPage() {
  const activeUsers = useActiveUsers()
  const sendKnockMessage = useSendKnockMessage()

  const { width, height } = Dimensions.get("window")
  const cellSize = width * 0.25 // 25% of screen width
  const marginSize = cellSize * 0.2 // 20% of cell size

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: true,
    })

    if (!result.canceled) {
      console.log(result)
    } else {
      alert("you didn't select any image.")
    }
  }

  const handleKnock = async (item: KKUser) => {
    const chatId = await sendKnockMessage(item)
    console.log(chatId, "---chatId")
  }

  // useEffect(() => {
  //   console.log(activeUsers, "===activeUsers")
  // }, [activeUsers])

  return (
    <View style={styles.container}>
      <FlatList
        data={activeUsers}
        numColumns={3}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleKnock(item)}>
            <View style={styles.boxContainer}>
              <Text>🚪</Text>
              <Text>{item.email}</Text>
            </View>
          </Pressable>
        )}
      />

      {/* <View style={styles.footerContainer}>
        <Button theme="primary" label="Knock knock" onPress={pickImageAsync} />
      </View> */}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "red",
    alignItems: "center",
  },
  boxContainer: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    color: "blue",
    display: "flex",
    alignItems: "center",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
})
