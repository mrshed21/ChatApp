import { firestore } from "./firebase";
import { useState ,useEffect , useRef } from "react";
import { collection , query ,orderBy , limit } from "firebase/firestore"; 
import { useCollection } from 'react-firebase-hooks/firestore';




export default function ChatRoom (){
const messagesRef = collection(firestore , "message");
const q = query(messagesRef , orderBy("createdAt" ,"desc") , limit(50));
const [messagesSnapShot, loading, error] = useCollection(q)

    const messages = messagesSnapShot?.docs.map(doc => ({
        id:doc.id,
        ...doc.data()
    }))
    const sortedMessages = messages ? [...messages].reverse() :  []

    const [formValue, setFormValue] = useState()






    return (

        <form>
        <input value={formValue} onChange={(e)=> setFormValue(e.taget.value)} placeholder="Say something..."/>
        <button type="submit"> Send </button>
        </form>

    )
};

