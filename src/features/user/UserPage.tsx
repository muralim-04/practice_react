import { useUserStore } from "../../stores/userStore";

export default function UserPage() {
  const user = useUserStore((state) => state.user);
  return <>{user?.email}</>
}