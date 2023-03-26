import { collection, query, where, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebaseConfig";

export const useActiveUsers = ()=>{
    const [activeUsers, setActveUsers] = useState<Array<any>>([])
    const { user } = useContext(AuthContext)

    const q = query(collection(db, "users"), where("email", "!=", user.email || ""))

    async function getUsers(){
      const querySnapshot = await getDocs(q)

      let list:Array<any> = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          return {
            id: doc.id,
            ...doc.data()
          }
        });
  
      setActveUsers(list)
    }
    
    useEffect(()=>{
      getUsers()
    }, [])

    return activeUsers
}