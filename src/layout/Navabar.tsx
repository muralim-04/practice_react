import { Link, useNavigate } from "react-router-dom" 
import { useUserStore } from "../stores/userStore";


export default function Navbar () {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    }

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
            <button onClick={handleLogout} className="btn-logout">
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