import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { userServices } from '../../services/userServices';
import { useDefaultStore } from '../../stores/userStore';

export default function LogIn() {
    const setUser = useDefaultStore((state) => state.setUser);

    const [userForm, setUserForm] = useState({
        email: '',
        password: ''
    });

    const loginMutation = useMutation({
        mutationFn: (formData: typeof userForm) => userServices.loginUser(formData),
        onSuccess: (data) => {
            console.log('Logged in successfully!');
            
            // 1. Save user to Zustand!
            setUser(data); 

            // 2. Redirect user (e.g., using react-router useNavigate)
            //navigate('/dashboard');
        },
        onError: (error) => {
            console.error('Login failed:', error);
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginMutation.mutate(userForm);
    };

    return (
        <div className="auth-container">
            <h2>Log In</h2>

            <form onSubmit={handleSubmit} className="auth-form">
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

                <button type="submit" disabled={loginMutation.isPending} className="btn-primary">
                    {loginMutation.isPending ? 'Logging in...' : 'Log In'}
                </button>
            </form>

            {loginMutation.isError && (
                <p style={{ color: 'red' }}>
                    {loginMutation.error?.message || 'Login failed. Please try again.'}
                </p>
            )}
        </div>
    );
}