import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Package,
    QrCode,
    Wrench,
    Award,
    MoveHorizontal,
    FileText,
    Users,
    Shield,
    Activity,
    MapPin,
    Building,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
    permission?: string;
}

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Equipos',
        href: '/equipment',
        icon: Package,
        permission: 'equipment.view',
    },
    {
        title: 'Escanear QR',
        href: '/scanner',
        icon: QrCode,
        permission: 'qr.scan',
    },
    {
        title: 'Mantenimiento',
        href: '/maintenance',
        icon: Wrench,
        permission: 'maintenance.view',
    },
    {
        title: 'Certificaciones',
        href: '/certifications',
        icon: Award,
        permission: 'certifications.view',
    },
    {
        title: 'Movimientos',
        href: '/movements',
        icon: MoveHorizontal,
        permission: 'movements.view',
    },
    {
        title: 'Áreas',
        href: '/areas',
        icon: Building,
        permission: 'areas.view',
    },
    {
        title: 'Ubicaciones',
        href: '/locations',
        icon: MapPin,
        permission: 'locations.view',
    },
    {
        title: 'Reportes',
        href: '/reports',
        icon: FileText,
        permission: 'reports.view',
    },
    {
        title: 'Usuarios',
        href: '/users',
        icon: Users,
        permission: '*',
    },
    {
        title: 'Auditoría',
        href: '/audit',
        icon: Shield,
        permission: 'audit.view',
    },
];

const Sidebar: React.FC = () => {
    const location = useLocation();
    const { user } = useAuth();
    const { isOpen, isCollapsed, toggleCollapse, closeSidebar } = useSidebar();

    const hasPermission = (permission?: string) => {
        if (!permission) return true;
        if (permission === '*') return user?.role === 'admin';
        return true;
    };

    const filteredNavItems = navItems.filter((item) => hasPermission(item.permission));

    return (
        <>
            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed top-0 left-0 h-full border-r border-border transition-all duration-300 z-50',
                    // Background with medical theme gradient
                    'bg-gradient-to-b from-[hsl(195,85%,45%)] to-[hsl(195,85%,35%)]',
                    // Desktop
                    'hidden lg:block',
                    isCollapsed ? 'lg:w-20' : 'lg:w-64',
                    // Mobile
                    'lg:translate-x-0',
                    isOpen ? 'translate-x-0 block w-64' : '-translate-x-full'
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                        {!isCollapsed && (
                            <Link to="/dashboard" className="flex items-center gap-2" onClick={closeSidebar}>
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm text-white">Hospital Grau</span>
                                    <span className="text-xs text-white/80">Trazabilidad QR</span>
                                </div>
                            </Link>
                        )}
                        {isCollapsed && (
                            <Link to="/dashboard" className="mx-auto">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-primary" />
                                </div>
                            </Link>
                        )}

                        {/* Collapse Toggle - Desktop Only */}
                        <button
                            onClick={toggleCollapse}
                            className="hidden lg:flex p-1.5 hover:bg-white/10 rounded-md transition-colors text-white"
                        >
                            {isCollapsed ? (
                                <ChevronRight className="w-4 h-4" />
                            ) : (
                                <ChevronLeft className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4 px-2">
                        <div className="space-y-1">
                            {filteredNavItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        onClick={closeSidebar}
                                        className={cn(
                                            'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all',
                                            'hover:bg-white/10',
                                            isActive && 'bg-white/20 text-white font-medium shadow-sm',
                                            !isActive && 'text-white/90',
                                            isCollapsed && 'justify-center'
                                        )}
                                        title={isCollapsed ? item.title : undefined}
                                    >
                                        <Icon className={cn('shrink-0', isCollapsed ? 'w-5 h-5' : 'w-4 h-4')} />
                                        {!isCollapsed && (
                                            <span className="text-sm">{item.title}</span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>

                    {/* Footer */}
                    {!isCollapsed && (
                        <div className="p-4 border-t border-white/10">
                            <div className="flex items-center gap-3 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-xs font-semibold text-primary">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate text-white">{user?.name}</p>
                                    <p className="text-xs text-white/70 truncate">{user?.role}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
