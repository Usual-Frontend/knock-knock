import { collection, query, setDoc, doc, serverTimestamp, limit, orderBy,onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { KnockMessage, KKUser } from "../model";

// Saves a new message to Cloud Firestore.
export async function useSaveMessage() {
    const { user } = useContext(AuthContext)
  }


// Saves a new message to Cloud Firestore.
export function useSendKnockMessage() {
    const { user } = useContext(AuthContext)

    return async (recipient: KKUser) => {
        // Add a new message entry to the Firebase database.
        try {
            const _knockMessage = new KnockMessage({
                senderId: user.uid,
                recipientId: recipient.uid,
                timestamp: serverTimestamp(),
                isOnlyKnock: true
            })
            const messagesRef=  doc(collection(db, 'messages'))
            const messageId = await setDoc(messagesRef, {
                ..._knockMessage,
            });
            return messageId
        } catch(error) {
            console.error('Error writing new message to Firebase Database', error);
        }
    }
  }


export function useObserveMessages(){
    const recentMessagesQuery = query(collection(db, "messages"),orderBy('timestamp', 'desc'), limit(12))
    const [count, setCount] = useState(0)
    const [messages, setMessages] = useState([])
    const { user } = useContext(AuthContext)


    useEffect(()=>{
        onSnapshot(recentMessagesQuery, function(snapshot) {
            let _m:any = []
            snapshot.docChanges().forEach(function(change) {
                if (change.type === 'removed') {
                //   deleteMessage(change.doc.id);
                } else {
                  var message = change.doc.data();
                  if(message.recipientId === user.uid) {
                    setCount(count + 1)
                    _m.push(message)
                  }
                }
                setMessages(_m)
            });
        })
    }, [])

    return {count, messages}

}