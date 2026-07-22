import type { UserRes } from "../types/UserTypes";
import Button from "./Button";
import { userServices } from "../services/userServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserCardProps {
  user: UserRes;
}

export default function UserCard ({user}: UserCardProps) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: number) => userServices.deleteUser(id),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getUsers'] });
        },
    });

  function handleDelete() {
    deleteMutation.mutate(user.id);
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