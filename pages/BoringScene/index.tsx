import { useContext } from "react"
import { View,Text } from "react-native"
import { AuthContext } from "../../context/AuthContext"
import BoringGuy from "./BoringGuy"

export default function BoringScene() {
  
  return (
    <View>
      <BoringGuy />
    </View>
  )
}
