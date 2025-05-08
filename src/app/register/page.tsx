'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import axiosInstance from '@/lib/axiosInstance';

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [roleError, setRoleError] = useState<string | null>(null);

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setUsernameError(null);
        setPasswordError(null);
        setRoleError(null);
        setLoading(true);

        // Validation
        if (!username) setUsernameError('Please enter your username.');
        if (!password) setPasswordError('Please enter your password.');
        if (!role) setRoleError('Please select a role.');

        if (!username || !password || !role) {
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post('/auth/register', {
                username,
                password,
                role,
            });
            console.log('Registration success:', response.data);
            // Redirect or show success message
        } catch (err: any) {
            setError('Registration failed. Please try again.');
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
                    {/* Username */}
                    <div className="flex flex-col">
                        <Label htmlFor="username" className="pb-3">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {usernameError && <p className="text-red-600 text-sm mt-1">{usernameError}</p>}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <Label htmlFor="password" className="pb-3">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-10"
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                            >
                                {passwordVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                            </span>
                        </div>
                        {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
                    </div>

                    {/* Role Dropdown */}
                    <div className="flex flex-col">
                        <Label className="pb-3">Role</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between"
                                >
                                    {role || 'Select a role'}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                {['User', 'Admin'].map((r) => (
                                    <DropdownMenuItem key={r} onClick={() => setRole(r)}>
                                        {r}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {roleError && <p className="text-red-600 text-sm mt-1">{roleError}</p>}
                    </div>

                    {/* Submit */}
                    <div className="py-2">
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </div>
                    {error && <p className="text-red-600 text-center">{error}</p>}
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
