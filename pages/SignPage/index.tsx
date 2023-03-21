import { useContext, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TextInput } from "react-native"
import { AuthContext } from "../../context/AuthContext"
import Button from "../../components/Button"

export default function SignPage() {
  const { isAuthenticated, login, loginAnonymously, signup, logout } =
    useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    const response = await signup({ email, password })
    console.log(response)
  }

  const handleSignIn = async () => {
    const response = await login({ email, password })
    console.log(response)
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.signContainer}>
          <View style={styles.inputerWrapper}>
            <Text style={styles.title}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputerWrapper}>
            <Text style={styles.title}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <View style={styles.loginContainer}>
          {/* <Button label="Anonymous" onPress={loginAnonymously} /> */}
          {/* <Button style={{ width: 100 }} label="SignIn" onPress={login} /> */}
          <Button
            style={{ width: 100 }}
            label="SignUp"
            onPress={handleSignup}
          />
        </View>
        <Button label="SignOut" onPress={logout} />
      </View>
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
  signContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  loginContainer: {
    flex: 1 / 3,
    alignItems: "center",
    flexDirection: "row",
  },
  inputerWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
    paddingRight: 10,
    flex: 2,
  },
  input: {
    flex: 3,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingStart: 10,
    marginRight: 10,
  },
})
