'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import axiosInstance from '@/lib/axiosInstance';

export default function LoginPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setUsernameError(null);
        setPasswordError(null);

        // Validate
        if (!username) {
            setUsernameError('Please enter your username.');
        }
        if (!password) {
            setPasswordError('Please enter your username.');
        }

        if (!username || !password) {
            setLoading(false);
            return;
        }

        // API request if validation passes
        try {
            const response = await axiosInstance.post('/auth/login', {
                username,
                password,
            });
            console.log('Login success:', response.data);

        } catch (err: any) {
            setError('Login failed. Please check your credentials.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-center mb-6">
                    <Image
                        src="/icons/logoipsum.png"
                        alt="Company Logo"
                        width={134}
                        height={24}
                        className="object-contain"
                    />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <Label htmlFor="username" className="pb-3">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Input username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                        {/* username error */}
                        {usernameError && <p className="text-red-600 text-sm mt-1">{usernameError}</p>}
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="password" className="pb-3">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Input password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 pr-10"
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                            >
                                {passwordVisible ? (
                                    <Eye className="h-5 w-5" />
                                ) : (
                                    <EyeOff className="h-5 w-5" />
                                )}
                            </span>
                        </div>
                        {/* password error */}
                        {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
                    </div>
                    <div className="py-2">
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </div>
                    {error && <p className="text-red-600 text-center">{error}</p>} {/* general error */}
                    <p className="text-center text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
