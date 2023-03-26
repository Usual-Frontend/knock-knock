import { collection, query, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { KKChat, KKUser } from "../model";

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
            const _kkChat = new KKChat({
                senderId: user.uid,
                recipientId: recipient.uid,
                timestamp: serverTimestamp(),
                isOnlyKnock: true
            })
            const chatsRef=  doc(collection(db, 'chats'))
            const chatId = await setDoc(chatsRef, {
                ..._kkChat,
            });
            return chatId
        } catch(error) {
            console.error('Error writing new message to Firebase Database', error);
        }
    }
  }