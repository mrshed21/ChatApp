import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const handleLogout = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      toast.success("✅ تم تسجيل الخروج بنجاح" , {
        autoClose: 5000,
        position: "bottom-right",
      });
    })
    .catch(() => {
      toast.error("❌ حدث خطأ أثناء تسجيل الخروج", {
        autoClose: 5000,
        position: "bottom-right",
      });
    });
};

export default function SignOutBtn() {
  return (
    <button onClick={handleLogout} className="sign-out">
      Sing Out
    </button>
  );
}
