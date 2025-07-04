import { firestore } from "./firebase";
import { useState, useEffect, useRef } from "react";
import ChatMessages from "./ChatMessages";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export default function ChatRoom({ user }) {
  const messagesRef = collection(firestore, "message");
  const q = query(messagesRef, orderBy("createdAt", "desc"), limit(50));
  const [messagesSnapShot, loading, error] = useCollection(q);

  const scrollMessages = useRef();

  const messages = messagesSnapShot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const [formValue, setFormValue] = useState("");
  const sortedMessages = messages ? [...messages].reverse() : [];

  useEffect(() => {
    if (scrollMessages.current) {
      scrollMessages.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sortedMessages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (formValue.trim() === "") return;
    const { uid, photoURL , displayName} = user;
    try {
      await addDoc(messagesRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
        displayName,
      });
      setFormValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(firestore, "message", id));
          toast.success("✅ تم حذف الرسالة بنجاح" ,  {
        autoClose: 1000,
        position: "bottom-right",
      } )

  } catch (err) {
    console.error(err)
          toast.error("❌  خطأ في حذف الرسالة" , {
        autoClose: 1000,
        position: "bottom-right",
      })

  }
};

  return (
    <>
      <main>
        {loading && <span>Loading messages...</span>}
        {error && <span>an error has ben ... {error.message} </span>}
        {sortedMessages &&
          sortedMessages.map((msg) => (
            <ChatMessages 
            handleDelete={handleDelete} 
            masseges={{...msg , id:msg.id}} 
            key={msg.id} />
          ))}

        <span style={{ marginBottom: "20px" }} ref={scrollMessages}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Say something..."
        />
        <button disabled={!formValue} type="submit">
          {" "}
          Send{" "}
        </button>
      </form>
    </>
  );
}
