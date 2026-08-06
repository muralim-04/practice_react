import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { userServices } from '../../services/userServices';
import { useDefaultStore } from '../../stores/userStore';

export default function Register() {
    const setUser = useDefaultStore((state) => state.setUser);

    const [userForm, setUserForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const registrationMutation = useMutation({
        mutationFn: (formData: typeof userForm) => userServices.registerUser(formData),
        onSuccess: (data) => {
            console.log('Registered successfully!');
            
            // 1. Save user to Zustand!
            setUser(data); 

            // 2. Redirect user (e.g., using react-router useNavigate)
            //navigate('/dashboard');
        },
        onError: (error) => {
            console.error('Registration failed:', error);
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registrationMutation.mutate(userForm);
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Register</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem', maxWidth: '360px' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.25rem' }}>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={userForm.username}
                        onChange={handleChange}
                        placeholder="Enter username"
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

                <button type="submit" disabled={registrationMutation.isPending} className="btn-primary">
                    {registrationMutation.isPending ? 'Registering...' : 'Register'}
                </button>
            </form>

            {registrationMutation.isError && (
                <p style={{ color: 'red' }}>
                    {registrationMutation.error?.message || 'Registration failed. Please try again.'}
                </p>
            )}
        </div>
    );
}