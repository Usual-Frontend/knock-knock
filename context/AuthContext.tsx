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
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { doc, collection, setDoc } from "firebase/firestore"

import { auth, db } from "../firebaseConfig"
import { KKUser } from "../model"

type SIGNUP_USER = {
  email: string
  password: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: KKUser
  login: (u: SIGNUP_USER) => void
  loginAnonymously: () => void
  signup: (u: SIGNUP_USER) => void
  logout: () => void
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  user: {},
  login: () => {},
  loginAnonymously: () => {},
  signup: () => {},
  logout: () => {},
})

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<KKUser>({})

  const login = () => {
    const provider = new GoogleAuthProvider()
    console.log("----login")
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

  const signup = ({ email, password }: SIGNUP_USER) => {
    console.log(email, password, "email, password11 ")

    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        setIsAuthenticated(true)
        const newUser = new KKUser({
          ...userCredential.user,
          at_leisure: true,
        })

        try {
          const usersRef = doc(collection(db, "users"))

          //TODO， 暂时必须用解构的方式，直接传入newUser会报错，除非[自定义Converter](https://firebase.google.com/docs/firestore/manage-data/add-data?hl=zh-cn)
          await setDoc(usersRef, { ...newUser })

          console.log("Document written with ID: ", usersRef.id)
        } catch (e) {
          console.error("Error adding document: ", e)
        }
        // setUser(user)
      })
      .catch((error) => {
        const errorMessage = error.message
        console.log(errorMessage, "---error")
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
    signup,
    logout,
  }
  useEffect(() => {
    console.log("isAuthenticated----8888", isAuthenticated)

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid
        const _user: KKUser = {
          uid: user.uid,
          displayName: user.displayName,
          isAnonymous: user.isAnonymous,
        }
        setUser(_user)
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
