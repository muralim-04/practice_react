import { useSuspenseQuery } from '@tanstack/react-query';
import { userServices } from "../../services/userServices";

export default function UserPage() {

  const { data: user} = useSuspenseQuery({
    queryKey: ['userProfile'],
    queryFn: userServices.getUserProfile,
  });

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="Profile" className="avatar" />
          ) : (
            <div className="avatar-placeholder">No Photo</div>
          )}
          <div className="user-details">
            <h2>{user.userName}</h2>
            <p className="email">{user.email}</p>
          </div>
        </div>

        <div className="profile-section">
          <label>Bio</label>
          <p>{user.bio || "You don't have a bio yet."}</p>
        </div>
      </div>
    </div>
  );
}