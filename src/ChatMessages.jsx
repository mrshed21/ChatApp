import { auth , firestore} from "./firebase";
import { deleteDoc, doc } from "firebase/firestore";

function formatTimestamp(timestamp) {
  if (!timestamp) return "";

  const data = timestamp.toDate();
  const formatedData = data.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatedData;
}

const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(firestore, "message", id));
    console.log("تم حذف الرسالة بنجاح" , id);
  } catch (error) {
    console.error("خطأ في حذف الرسالة:", error);
  }
};

export default function ChatMessages(props) {
  const {id, text, createdAt, uid, photoURL } = props.masseges;
  const currentUser = auth.currentUser.uid;
  const messageClass = uid === currentUser ? "sent" : "recived";

  return (
    <div className={`message ${messageClass}`}>
        
      <img src={photoURL} alt="photo" />
      <div className="message-wrapper">
        <p>{text}</p>
        <div className="message-meta">
          {createdAt && (
            <span className="timestamp">{formatTimestamp(createdAt)} </span>
          )}
          {currentUser === uid && (
            <span
              onClick={() => handleDelete(id)}
              className="delete-msg"
              title="حذف الرسالة"
            >
              🗑️
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
