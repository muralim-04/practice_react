import { useState, type SubmitEvent } from 'react';
import UserCard from '../../components/UserCard';
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userServices } from '../../services/userServices';

export default function UserPage() {
  // queryClient for Mutations
  const queryClient = useQueryClient();
  // form to create user
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  // initial request to backend to fetch users
  const { data: users } = useSuspenseQuery({
    queryKey: ['getUsers'],
    queryFn: userServices.getUsers,
  });
  // updating the list after adding a new user
  const createUserMutation = useMutation({
    mutationFn: userServices.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
      setUserForm({ name: '', email: '', password: '' });
    },
  });


  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    createUserMutation.mutate(userForm);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Users</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem', maxWidth: '360px' }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Name</label>
          <input
            name="name" // Added name attributes to match the state keys
            value={userForm.name}
            onChange={handleChange}
            placeholder="Enter name"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Email</label>
          <input
            type="email"
            name="email"
            value={userForm.email}
            onChange={handleChange}
            placeholder="Enter email"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Password</label>
          <input
            type="password"
            name="password"
            value={userForm.password}
            onChange={handleChange}
            placeholder="Enter password"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <button type="submit" disabled={createUserMutation.isPending} className="btn-primary">
          {createUserMutation.isPending ? 'Saving...' : 'Create User'}
        </button>
      </form>

      {createUserMutation.isError && (
        <p style={{ color: 'red' }}>Failed to create user. Please try again.</p>
      )}

      <ul>
        {users.map((u) => (
          <li key={u.id} style={{ marginBottom: '1rem' }}>
            <UserCard user={u} />
          </li>
        ))}
      </ul>
    </div>
  );
}