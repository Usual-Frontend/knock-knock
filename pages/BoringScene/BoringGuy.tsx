import { PlaceholderSittingImage } from "../../assets/images"
import { StyleSheet, Text, View, Image } from "react-native"

export default function BoringGuy() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Is there a friend missing me ?</Text>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderSittingImage} style={styles.image} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
  },
  txt: {
    fontSize: 14,
    marginTop: 28,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
    fontSize: 300,
  },
  image: {
    height: 440,
    borderRadius: 18,
  },
})
