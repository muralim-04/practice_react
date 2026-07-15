import { Link } from "react-router-dom" 


 export default function Navbar () {
    return (
    <nav className="navbar">
      <div className="navbar-brand">My App</div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/user">User</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
    )
}