import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, User, LogOut, Settings, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const TopNavbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/equipment?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const roleLabels: Record<string, string> = {
        admin: 'Administrador',
        tecnico: 'Técnico Biomédico',
        supervisor: 'Supervisor',
        asistencial: 'Personal Asistencial',
        auditor: 'Auditor',
    };

    // Mock notifications
    const notifications = [
        {
            id: '1',
            type: 'warning',
            title: 'Certificación por vencer',
            message: 'El certificado de calibración del Ventilador VM-001 vence en 5 días',
            time: 'Hace 2 horas',
            unread: true,
        },
        {
            id: '2',
            type: 'success',
            title: 'Mantenimiento completado',
            message: 'Se completó el mantenimiento preventivo del Monitor MSV-045',
            time: 'Hace 5 horas',
            unread: true,
        },
        {
            id: '3',
            type: 'info',
            title: 'Movimiento registrado',
            message: 'Desfibrilador DEF-003 transferido a Quirófano 2',
            time: 'Hace 1 día',
            unread: false,
        },
        {
            id: '4',
            type: 'warning',
            title: 'Mantenimiento pendiente',
            message: 'Bomba de Infusión BI-008 requiere mantenimiento programado',
            time: 'Hace 2 días',
            unread: false,
        },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'warning':
                return <AlertCircle className="w-5 h-5 text-orange-500" />;
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'info':
                return <Clock className="w-5 h-5 text-blue-500" />;
            default:
                return <Bell className="w-5 h-5" />;
        }
    };

    return (
        <header style={{ backgroundColor: 'hsl(195, 85%, 45%)' }} className="h-16 border-b border-white/10 flex items-center justify-between px-6">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                    <Input
                        type="search"
                        placeholder="Buscar equipos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
                        className="pl-10 placeholder:text-white/50"
                    />
                </form>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 hover:bg-white/10 rounded-md transition-colors"
                    >
                        <Bell className="w-5 h-5 text-white" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-semibold">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setShowNotifications(false)}
                            ></div>
                            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                                <div className="p-4 border-b border-gray-200 bg-gray-50">
                                    <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                                    {unreadCount > 0 && (
                                        <p className="text-xs text-gray-600 mt-1">
                                            {unreadCount} {unreadCount === 1 ? 'nueva' : 'nuevas'}
                                        </p>
                                    )}
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${notification.unread ? 'bg-blue-50/50' : ''
                                                }`}
                                        >
                                            <div className="flex gap-3">
                                                <div className="shrink-0 mt-0.5">
                                                    {getNotificationIcon(notification.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p className="font-medium text-sm text-gray-900">
                                                            {notification.title}
                                                        </p>
                                                        {notification.unread && (
                                                            <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-1"></span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-2">
                                                        {notification.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 bg-gray-50 border-t border-gray-200">
                                    <button className="text-sm text-primary hover:underline w-full text-center">
                                        Ver todas las notificaciones
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md transition-colors"
                    >
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <User className="w-5 h-5" style={{ color: 'hsl(195, 85%, 45%)' }} />
                        </div>
                        <div className="text-left hidden md:block">
                            <p className="text-sm font-medium text-white">{user?.name}</p>
                            <p className="text-xs text-white/70">
                                {user?.role && roleLabels[user.role]}
                            </p>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {showUserMenu && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setShowUserMenu(false)}
                            ></div>
                            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                                <div className="p-3 border-b border-gray-200 bg-gray-50">
                                    <p className="font-medium text-gray-900">{user?.name}</p>
                                    <p className="text-sm text-gray-600">{user?.email}</p>
                                    <Badge variant="secondary" className="mt-2">
                                        {user?.role && roleLabels[user.role]}
                                    </Badge>
                                </div>
                                <div className="py-2">
                                    <button
                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            // Navigate to settings
                                        }}
                                    >
                                        <Settings className="w-4 h-4" />
                                        Configuración
                                    </button>
                                    <button
                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
