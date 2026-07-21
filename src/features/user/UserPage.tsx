import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { AxiosError } from 'axios';
import { userServices } from '../../services/userServices';
import type { UserReq, UserRes } from '../../types/UserTypes';
import type { ProblemDetails } from '../../types/ProblemDetails';
import UserCard from '../../components/UserCard';

export default function UserPage() {
  const [users, setUsers] = useState<UserRes[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<UserReq>({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await userServices.getUsers();
        setUsers(response);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const newUser = await userServices.createUser(formData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      const error = err as AxiosError<ProblemDetails>;
      const problem = error.response?.data;
      setFormError(problem?.detail || problem?.title || 'Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Users</h2>

      <ul style={{ paddingLeft: '1rem' }}>
        {users.map(u => (
            <UserCard user={u}/>
        ))}
      </ul>

      <form onSubmit={handleCreateUser} style={{ marginTop: '1.5rem', display: 'grid', gap: '0.75rem', maxWidth: '320px' }}>
        <h3>Add user</h3>
        {formError && <p style={{ color: 'red', margin: 0 }}>{formError}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
}