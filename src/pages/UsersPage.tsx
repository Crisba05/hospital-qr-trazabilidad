import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Edit, Trash2, UserCheck, UserX, UserPlus, Shield } from 'lucide-react';
import UserFormModal from '@/components/shared/UserFormModal';
import UserEditModal from '@/components/shared/UserEditModal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import FilterDialog from '@/components/shared/FilterDialog';
import { toast } from 'sonner';

const UsersPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFormModal, setShowFormModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showToggleDialog, setShowToggleDialog] = useState(false);
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [activeFilters, setActiveFilters] = useState<any>({
        role: [],
        status: [],
    });

    const [users, setUsers] = useState([
        {
            id: '1',
            firstName: 'Administrador',
            lastName: 'del Sistema',
            phone: '+51 999 888 777',
            email: 'admin@hospitalgrau.pe',
            role: 'admin',
            active: true,
            lastLogin: '2024-12-18 10:30',
        },
        {
            id: '2',
            firstName: 'Juan',
            lastName: 'Pérez García',
            phone: '+51 987 654 321',
            email: 'jperez@hospitalgrau.pe',
            role: 'tecnico',
            active: true,
            lastLogin: '2024-12-18 09:15',
        },
        {
            id: '3',
            firstName: 'María',
            lastName: 'García López',
            phone: '+51 965 432 109',
            email: 'mgarcia@hospitalgrau.pe',
            role: 'supervisor',
            active: true,
            lastLogin: '2024-12-17 16:45',
        },
        {
            id: '4',
            firstName: 'Carlos',
            lastName: 'López Martínez',
            phone: '+51 912 345 678',
            email: 'clopez@hospitalgrau.pe',
            role: 'asistencial',
            active: true,
            lastLogin: '2024-12-18 08:00',
        },
        {
            id: '5',
            firstName: 'Ana',
            lastName: 'Rodríguez Silva',
            phone: '+51 998 765 432',
            email: 'arodriguez@hospitalgrau.pe',
            role: 'auditor',
            active: false,
            lastLogin: '2024-12-10 14:20',
        },
    ]);

    const roleLabels: Record<string, string> = {
        admin: 'Administrador',
        tecnico: 'Técnico Biomédico',
        supervisor: 'Supervisor',
        asistencial: 'Personal Asistencial',
        auditor: 'Auditor',
    };

    const getRoleBadge = (role: string) => {
        const variants: Record<string, string> = {
            admin: 'bg-red-100 text-red-800 border-red-300',
            tecnico: 'bg-blue-100 text-blue-800 border-blue-300',
            supervisor: 'bg-purple-100 text-purple-800 border-purple-300',
            asistencial: 'bg-green-100 text-green-800 border-green-300',
            auditor: 'bg-orange-100 text-orange-800 border-orange-300',
        };
        return variants[role] || 'bg-gray-100 text-gray-800 border-gray-300';
    };

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleDelete = (user: any) => {
        setSelectedUser(user);
        setShowDeleteDialog(true);
    };

    const handleToggleActive = (user: any) => {
        setSelectedUser(user);
        setShowToggleDialog(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter(u => u.id !== selectedUser?.id));
        toast.success(`Usuario ${selectedUser?.firstName} ${selectedUser?.lastName} eliminado`);
        setSelectedUser(null);
    };

    const confirmToggleActive = () => {
        setUsers(users.map(u =>
            u.id === selectedUser?.id
                ? { ...u, active: !u.active }
                : u
        ));
        toast.success(
            selectedUser?.active
                ? `Usuario ${selectedUser?.firstName} ${selectedUser?.lastName} desactivado`
                : `Usuario ${selectedUser?.firstName} ${selectedUser?.lastName} activado`
        );
        setSelectedUser(null);
    };

    const handleApplyFilters = (filters: any) => {
        setActiveFilters(filters);
        toast.success('Filtros aplicados');
    };

    const filteredUsers = users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const matchesSearch =
            fullName.includes(searchQuery.toLowerCase()) ||
            user.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRole = activeFilters.role?.length === 0 ||
            activeFilters.role?.includes(user.role);

        const matchesStatus = activeFilters.status?.length === 0 ||
            (activeFilters.status?.includes('activo') && user.active) ||
            (activeFilters.status?.includes('inactivo') && !user.active);

        return matchesSearch && matchesRole && matchesStatus;
    });

    const activeFilterCount = Object.values(activeFilters).reduce(
        (acc: number, curr: any) => acc + (curr?.length || 0),
        0
    );

    const activeCount = users.filter(u => u.active).length;
    const inactiveCount = users.filter(u => !u.active).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
                    <p className="text-muted-foreground">
                        Administración de usuarios y permisos del sistema
                    </p>
                </div>
                <Button className="gap-2" onClick={() => setShowFormModal(true)}>
                    <UserPlus className="w-4 h-4" />
                    Crear Usuario
                </Button>
            </div>

            {/* Modals */}
            <UserFormModal
                open={showFormModal}
                onOpenChange={setShowFormModal}
                onSuccess={() => toast.success('Usuario creado exitosamente')}
            />

            <UserEditModal
                open={showEditModal}
                onOpenChange={setShowEditModal}
                user={selectedUser}
                onSuccess={() => toast.success('Usuario actualizado exitosamente')}
            />

            <ConfirmDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                title="Eliminar Usuario"
                description={`¿Estás seguro de que deseas eliminar al usuario "${selectedUser?.firstName} ${selectedUser?.lastName}"? Esta acción no se puede deshacer.`}
                confirmText="Eliminar"
                variant="destructive"
                onConfirm={confirmDelete}
            />

            <ConfirmDialog
                open={showToggleDialog}
                onOpenChange={setShowToggleDialog}
                title={selectedUser?.active ? 'Desactivar Usuario' : 'Activar Usuario'}
                description={
                    selectedUser?.active
                        ? `¿Deseas desactivar al usuario "${selectedUser?.firstName} ${selectedUser?.lastName}"? No podrá acceder al sistema.`
                        : `¿Deseas activar al usuario "${selectedUser?.firstName} ${selectedUser?.lastName}"? Podrá acceder al sistema nuevamente.`
                }
                confirmText={selectedUser?.active ? 'Desactivar' : 'Activar'}
                variant={selectedUser?.active ? 'destructive' : 'default'}
                onConfirm={confirmToggleActive}
            />

            <FilterDialog
                open={showFilterDialog}
                onOpenChange={setShowFilterDialog}
                filters={{
                    status: ['activo', 'inactivo'],
                }}
                onApplyFilters={handleApplyFilters}
            />

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-600">{users.length}</div>
                        <p className="text-xs text-muted-foreground">Total Usuarios</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">{activeCount}</div>
                        <p className="text-xs text-muted-foreground">Activos</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-red-600">{inactiveCount}</div>
                        <p className="text-xs text-muted-foreground">Inactivos</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-purple-600">18</div>
                        <p className="text-xs text-muted-foreground">Conectados Hoy</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nombre, celular o email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() => setShowFilterDialog(true)}
                        >
                            <Filter className="w-4 h-4" />
                            Filtros
                            {activeFilterCount > 0 && (
                                <Badge className="ml-2 bg-primary text-primary-foreground">
                                    {activeFilterCount}
                                </Badge>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Usuarios ({filteredUsers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3 font-medium">Usuario</th>
                                    <th className="text-left p-3 font-medium">Celular</th>
                                    <th className="text-left p-3 font-medium">Email</th>
                                    <th className="text-left p-3 font-medium">Rol</th>
                                    <th className="text-left p-3 font-medium">Estado</th>
                                    <th className="text-left p-3 font-medium">Último Acceso</th>
                                    <th className="text-left p-3 font-medium">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-muted/50">
                                        <td className="p-3">
                                            <div>
                                                <div className="font-medium">
                                                    {user.firstName} {user.lastName}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 text-sm">{user.phone}</td>
                                        <td className="p-3 text-sm">{user.email}</td>
                                        <td className="p-3">
                                            <Badge className={getRoleBadge(user.role) + ' border'}>
                                                {roleLabels[user.role]}
                                            </Badge>
                                        </td>
                                        <td className="p-3">
                                            <Badge className={
                                                user.active
                                                    ? 'bg-green-100 text-green-800 border-green-300 border'
                                                    : 'bg-gray-100 text-gray-800 border-gray-300 border'
                                            }>
                                                {user.active ? 'Activo' : 'Inactivo'}
                                            </Badge>
                                        </td>
                                        <td className="p-3 text-sm">{user.lastLogin}</td>
                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => handleEdit(user)}
                                                    title="Editar"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => handleToggleActive(user)}
                                                    title={user.active ? 'Desactivar' : 'Activar'}
                                                >
                                                    {user.active ? (
                                                        <UserX className="w-4 h-4 text-orange-600" />
                                                    ) : (
                                                        <UserCheck className="w-4 h-4 text-green-600" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-destructive"
                                                    onClick={() => handleDelete(user)}
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Roles Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Roles y Permisos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold mb-2">Administrador</h3>
                            <p className="text-sm text-muted-foreground">
                                Acceso completo al sistema, gestión de usuarios y configuración
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold mb-2">Técnico Biomédico</h3>
                            <p className="text-sm text-muted-foreground">
                                Gestión de equipos, mantenimientos y generación de QR
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold mb-2">Supervisor</h3>
                            <p className="text-sm text-muted-foreground">
                                Aprobación de mantenimientos, visualización de reportes
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold mb-2">Personal Asistencial</h3>
                            <p className="text-sm text-muted-foreground">
                                Consulta de equipos, escaneo de QR, visualización de certificaciones
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold mb-2">Auditor</h3>
                            <p className="text-sm text-muted-foreground">
                                Acceso a auditoría, reportes y trazabilidad completa
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UsersPage;
