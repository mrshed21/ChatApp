import { auth } from "./firebase";
function formatTimestamp (timestamp){
    if (!timestamp) return "";
    
    const data = timestamp.toDate();
    const formatedData = data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"  });
    return formatedData
}
export default function ChatMessages(props) {
  const { text, createdAt, uid, photoURL } = props.masseges;
  const currentUser = auth.currentUser.uid;
  const messageClass = uid === currentUser ? "sent" : "recived";




  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="photo" />
      <div className="message-wrapper">
        <p>{text}</p>
        <div className="message-meta">
            {createdAt && <span className="timestamp">{formatTimestamp(createdAt)}</span>}
        </div>

      </div>
    </div>
  );
}
