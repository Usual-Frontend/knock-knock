import React, {
  ReactElement,
  ReactHTMLElement,
  useEffect,
  useState,
} from "react"
import {
  signInAnonymously,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"

import * as fa from "firebase/auth"
import { auth } from "../firebaseConfig"
import { IUSER } from "../types"
interface AuthContextType {
  isAuthenticated: boolean
  user: IUSER
  login: () => void
  loginAnonymously: () => void
  logout: () => void
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  user: {},
  login: () => {},
  loginAnonymously: () => {},
  logout: () => {},
})

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<IUSER>({})

  const login = () => {
    const provider = new GoogleAuthProvider()
    console.log(fa, "----signInWithPopup")
    return
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        // The signed-in user info.
        const user = result.user
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setIsAuthenticated(true)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }

  const loginAnonymously = () => {
    console.log("---clicked loginAnonymously")
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
        setIsAuthenticated(true)
        console.log(" 1111 signInAnonymously")
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log("loginAnonymously error 222", error)
        // ...
      })
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  const authContextValue = {
    isAuthenticated,
    user,
    login,
    loginAnonymously,
    logout,
  }
  useEffect(() => {
    console.log("isAuthenticated----8888", isAuthenticated)

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid
        const _user: IUSER = {
          uid: user.uid,
          displayName: user.displayName,
          isAnonymous: user.isAnonymous,
        }
        setUser(_user)
        // setIsAuthenticated(true)
        // console.log(user, "---user3333")
        // ...
      } else {
        // User is signed out
        // ...
      }
    })
  }, [auth, isAuthenticated])

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
