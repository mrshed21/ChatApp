import { GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";




export default function SignIn () {
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            alert("error")
            console.error(err)
        }

    }


    return <button onClick={signInWithGoogle} className="sign-in">Sign in with Google</button>

}