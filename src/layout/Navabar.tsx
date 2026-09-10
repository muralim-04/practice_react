import { Link, } from "react-router-dom" 
import { useUserStore } from "../stores/userStore";
import { userServices } from "../services/userServices";


export default function Navbar () {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const handleLogOut = async () => {
    try {
      const response = await userServices.logOutUser();
      if (response === true) {
        logout();
      }
    } catch (error) {
      console.error("Failed to log out:", error);
      logout();
    }
  };

  return (
    <nav className="flex items-center justify-between bg-[#1e293b] px-8 py-4 text-white shadow-md">
      <div className="text-2xl font-bold">My App</div>

      <div className="flex items-center gap-5">
        <Link to="/" className="font-medium text-[#cbd5e1] transition-colors hover:text-white">Home</Link>
        {user ? (
          <>
            <Link to="/user" className="font-medium text-[#cbd5e1] transition-colors hover:text-white">
              {user.userName}
            </Link>
            <button onClick={handleLogOut} className="rounded-full border-0 bg-[#ff4e13] px-3 py-1 text-[#111010]">
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="font-medium text-[#cbd5e1] transition-colors hover:text-white">Log In</Link>
            <Link to="/register" className="font-medium text-[#cbd5e1] transition-colors hover:text-white">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}