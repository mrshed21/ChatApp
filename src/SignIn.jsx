import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";

export default function SignIn() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("✅ تم تسجيل الدخول بنجاح");
    } catch (err) {
      toast.error("❌ حدث خطأ أثناء تسجيل الدخول");

      console.error(err);
    }
  };

  return (
    <button onClick={signInWithGoogle} className="sign-in">
      Sign in with Google
    </button>
  );
}
