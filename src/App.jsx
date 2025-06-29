import "./App.css";
import SignOutBtn from "./SignOutBtn";
import ChatRoom from "./ChatRoom";
import SignIn from "./SignIn";



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
    <div className="App">
      <header>
        <h1>Chat App</h1>
        {user && <SignOutBtn /> }
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}

      </section>
    </div>
  );
}

export default App;
