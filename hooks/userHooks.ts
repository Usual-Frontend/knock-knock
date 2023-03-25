import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

export const useActiveUsers = ()=>{
    const [activeUsers, setActveUsers] = useState<Array<any>>([])
    const q = query(collection(db, "users"))

    async function getUsers(){
      const querySnapshot = await getDocs(q)

      let list:Array<any> = []
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          list.push(doc.data())
        });
  
      setActveUsers(list)
      console.log(list.length, "-list.length")
    }
    
    useEffect(()=>{
      getUsers()
    }, [])

    return activeUsers
}