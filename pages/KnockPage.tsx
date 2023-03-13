import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, Image } from "react-native"
import Button from "../components/Button"
import * as ImagePicker from "expo-image-picker"

export default function KnockPage() {
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
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.imageContainer}>🚪</Text>
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Knock knock" onPress={pickImageAsync} />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
    fontSize: 300,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
})
