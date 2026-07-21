import type { UserRes } from "../types/UserTypes";
import Button from "./Button";
import { userServices } from "../services/userServices";

interface UserCardProps {
  user: UserRes;
}

export default function UserCard ({user}: UserCardProps) {
    async function handleDelete() {
        await userServices.deleteUser(user.id);
    }
    return (
        <div>
            <h2>{user.id}</h2>
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
            <Button name="Delete" handleClick={handleDelete}></Button>
        </div>
    )
}