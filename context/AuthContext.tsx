import React, {
  ReactElement,
  ReactHTMLElement,
  useEffect,
  useState,
} from "react"
import {
  signInAnonymously,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { doc, collection, setDoc } from "firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const login: (u: SIGNUP_USER) => void = ({ email, password }) => {
    console.log("----login")
    signInWithEmailAndPassword(auth, email, password).then(() => {
      // Signed in
      setIsAuthenticated(true)
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
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        const _user: KKUser = {
          uid: user.uid,
          displayName: user.displayName,
          isAnonymous: user.isAnonymous,
        }
        setUser(_user)
        await AsyncStorage.setItem('user', JSON.stringify(user)); // 保存用户信息
        console.log('Login Success', _user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    })
  }, [auth, isAuthenticated])

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user) {
        setUser(JSON.parse(user));
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
