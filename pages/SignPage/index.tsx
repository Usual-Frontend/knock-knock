import { useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native"
import { AuthContext } from "../../context/AuthContext"
import Button from "../../components/Button"

export default function BoringScene() {
  const { isAuthenticated, login, loginAnonymously, logout } =
    useContext(AuthContext)

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={login}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Text>{isAuthenticated.toString()}1111</Text>
          </View>
          <View style={styles.loginContainer}>
            {/* <Button label="Anonymous" onPress={loginAnonymously} /> */}
            <Button label="LoginWithGoogleAccount" onPress={login} />
            <Button label="SignOut" onPress={logout} />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 48,
  },
  imageContainer: {
    flex: 1,
  },
  loginContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
})
