import "./App.css";
import SignOutBtn from "./SignOutBtn";
import ChatRoom from "./ChatRoom";
import SignIn from "./SignIn";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function loadingSpinner() {
  return <div className="loading-spinner"> Loading..</div>;
}

function App() {
  const [user, loading] = useAuthState(auth);
  {
    loading && <loadingSpinner />;
  }

  return (
    <>
      <div className="App">
        <header>
          <h1>Chat App</h1>
          {user && <SignOutBtn />}
        </header>
        <section>{user ? <ChatRoom user={user} /> : <SignIn />}</section>
      </div>
      <ToastContainer position="bottom-left" autoClose={3000} />
    </>
  );
}

export default App;
