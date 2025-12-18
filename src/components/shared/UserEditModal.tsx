import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

interface UserEditModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        role: string;
        active: boolean;
    } | null;
    onSuccess?: () => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
    open,
    onOpenChange,
    user,
    onSuccess,
}) => {
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || '',
        email: user?.email || '',
        role: user?.role || 'asistencial',
        password: '',
        confirmPassword: '',
    });

    const [passwordError, setPasswordError] = useState('');

    React.useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                role: user.role,
                password: '',
                confirmPassword: '',
            });
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate password match only if password is being changed
        if (formData.password && formData.password !== formData.confirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            return;
        }

        setPasswordError('');
        console.log('Updated user data:', { ...formData, id: user?.id });

        if (onSuccess) {
            onSuccess();
        }

        onOpenChange(false);
    };

    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Editar Usuario</DialogTitle>
                    <DialogDescription>
                        Modifica la información del usuario
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* First Name */}
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Nombre *</Label>
                            <Input
                                id="firstName"
                                required
                                value={formData.firstName}
                                onChange={(e) =>
                                    setFormData({ ...formData, firstName: e.target.value })
                                }
                                placeholder="Ej: Juan"
                            />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Apellido *</Label>
                            <Input
                                id="lastName"
                                required
                                value={formData.lastName}
                                onChange={(e) =>
                                    setFormData({ ...formData, lastName: e.target.value })
                                }
                                placeholder="Ej: Pérez García"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Celular *</Label>
                            <Input
                                id="phone"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                placeholder="Ej: +51 999 999 999"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email de Contacto *</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                placeholder="Ej: jperez@hospital.pe"
                            />
                        </div>

                        {/* Role */}
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="role">Rol *</Label>
                            <select
                                id="role"
                                required
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData({ ...formData, role: e.target.value })
                                }
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="admin">Administrador</option>
                                <option value="tecnico">Técnico Biomédico</option>
                                <option value="supervisor">Supervisor</option>
                                <option value="asistencial">Personal Asistencial</option>
                                <option value="auditor">Auditor</option>
                            </select>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Nueva Contraseña (opcional)</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData({ ...formData, password: e.target.value });
                                    setPasswordError('');
                                }}
                                placeholder="Dejar en blanco para mantener actual"
                                minLength={8}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => {
                                    setFormData({ ...formData, confirmPassword: e.target.value });
                                    setPasswordError('');
                                }}
                                placeholder="Repita la nueva contraseña"
                                minLength={8}
                            />
                        </div>

                        {/* Password Info */}
                        <div className="col-span-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-xs text-blue-700 flex items-center gap-2">
                                <AlertCircle className="w-3 h-3" />
                                Solo completa los campos de contraseña si deseas cambiarla
                            </p>
                        </div>

                        {/* Password Error */}
                        {passwordError && (
                            <div className="col-span-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {passwordError}
                                </p>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit">Guardar Cambios</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserEditModal;
