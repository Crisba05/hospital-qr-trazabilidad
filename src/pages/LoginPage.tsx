import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Activity } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Extract username and role from email
            const emailPrefix = email.split('@')[0].toLowerCase();

            // Map email prefix to role
            let detectedRole: 'admin' | 'tecnico' | 'supervisor' | 'asistencial' | 'auditor' = 'tecnico';

            if (emailPrefix.includes('admin')) {
                detectedRole = 'admin';
            } else if (emailPrefix.includes('supervisor')) {
                detectedRole = 'supervisor';
            } else if (emailPrefix.includes('asistencial')) {
                detectedRole = 'asistencial';
            } else if (emailPrefix.includes('auditor')) {
                detectedRole = 'auditor';
            } else if (emailPrefix.includes('tecnico')) {
                detectedRole = 'tecnico';
            }

            const username = emailPrefix;
            const success = await login(username, password, detectedRole);

            if (success) {
                navigate('/dashboard');
            } else {
                setError('Credenciales inválidas. Intente nuevamente.');
            }
        } catch (err) {
            setError('Error al iniciar sesión. Intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Hospital Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <img
                    src="/hospital-essalud.png"
                    alt="Hospital EsSalud"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center justify-center p-12">
                    <div className="text-center text-white space-y-6 max-w-lg">
                        <h2 className="text-4xl font-bold">
                            Hospital III de Emergencias Grau
                        </h2>
                        <p className="text-xl text-white/90">
                            Sistema de Trazabilidad de Equipos Médicos
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                                <p className="text-3xl font-bold">99%</p>
                                <p className="text-sm">Disponibilidad</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                                <p className="text-3xl font-bold">&lt;1min</p>
                                <p className="text-sm">Consulta QR</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                                <p className="text-3xl font-bold">100%</p>
                                <p className="text-sm">Trazabilidad</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                                <p className="text-3xl font-bold">24/7</p>
                                <p className="text-sm">Acceso</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo and Title */}
                    <div className="text-center space-y-2">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                <Activity className="w-10 h-10 text-primary-foreground" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Bienvenido
                        </h1>
                        <p className="text-muted-foreground">
                            Ingrese sus credenciales para acceder
                        </p>
                    </div>

                    {/* Login Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Iniciar Sesión</CardTitle>
                            <CardDescription>
                                Acceda al sistema de trazabilidad
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Correo Electrónico
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="ejemplo@essalud.gob.pe"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium">
                                        Contraseña
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Ingrese su contraseña"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                                        {error}
                                    </div>
                                )}

                                {/* Demo Credentials Info */}
                                <div className="p-3 text-xs bg-muted rounded-md space-y-1">
                                    <p className="font-semibold">Credenciales de prueba:</p>
                                    <p>Email: admin@essalud.gob.pe</p>
                                    <p>Contraseña: admin123</p>
                                    <p className="text-muted-foreground mt-2">
                                        También: tecnico@, supervisor@, asistencial@, auditor@
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                                </Button>

                                {/* Forgot Password Link */}
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        ¿Olvidó su contraseña?
                                    </button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <p className="text-center text-sm text-muted-foreground">
                        © 2025 EsSalud - Hospital III de Emergencias Grau
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
