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
    <nav className="navbar">
      <div className="navbar-brand">My App</div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/user" className="navbar-user">
              {user.userName}
            </Link>
            <button onClick={handleLogOut} className="btn-logout">
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/register" className="btn-register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}