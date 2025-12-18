import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
    ChevronLeft,
    ChevronRight,
    Activity,
    MapPin,
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
        icon: MapPin,
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
        permission: '*', // Admin only
    },
    {
        title: 'Auditoría',
        href: '/audit',
        icon: Shield,
        permission: 'audit.view',
    },
];

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
    const location = useLocation();
    const { hasPermission, user } = useAuth();

    const filteredNavItems = navItems.filter((item) => {
        if (!item.permission) return true;
        if (item.permission === '*') return user?.role === 'admin';
        return hasPermission(item.permission);
    });

    return (
        <aside
            style={{ backgroundColor: 'hsl(195, 85%, 45%)' }}
            className={cn(
                'fixed left-0 top-0 z-40 h-screen border-r transition-all duration-300',
                collapsed ? 'w-16' : 'w-64'
            )}
        >
            {/* Logo Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <Activity className="w-5 h-5" style={{ color: 'hsl(195, 85%, 45%)' }} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm text-white">Hospital Grau</span>
                            <span className="text-xs text-white/70">Equipos QR</span>
                        </div>
                    </div>
                )}
                {collapsed && (
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto">
                        <Activity className="w-5 h-5" style={{ color: 'hsl(195, 85%, 45%)' }} />
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-2">
                    {filteredNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;

                        return (
                            <li key={item.href}>
                                <Link
                                    to={item.href}
                                    style={isActive ? { backgroundColor: 'white', color: 'hsl(195, 85%, 45%)' } : {}}
                                    className={cn(
                                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                        isActive
                                            ? 'shadow-sm'
                                            : 'text-white/80 hover:bg-white/10 hover:text-white',
                                        collapsed && 'justify-center'
                                    )}
                                    title={collapsed ? item.title : undefined}
                                >
                                    <Icon className="w-5 h-5 shrink-0" />
                                    {!collapsed && <span>{item.title}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Toggle Button */}
            <div className="absolute -right-3 top-20 z-50">
                <button
                    onClick={onToggle}
                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-white/90 transition-colors"
                    style={{ color: 'hsl(195, 85%, 45%)' }}
                >
                    {collapsed ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <ChevronLeft className="w-4 h-4" />
                    )}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
