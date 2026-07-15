import { userServices } from "../../services/userServices"
import { useState, useEffect } from "react";
import type { Response, UserRes } from "../../types/UserTypes";
import UserCard from "../../components/UserCard";

export default function UserPage () {
    // 1. Initialize state as an array of UserRes
    const [users, setUsers] = useState<UserRes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchUsers() {
        try {
            const response: Response<UserRes[]> = await userServices.getUsers();
            
            setUsers(response.data); 

        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
        }

        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            {users.map(u => (
                <UserCard key={u.id} user={u} />
            ))}
        </>
    )
}