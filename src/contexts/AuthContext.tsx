import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string, role?: UserRole) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, { password: string; user: User }> = {
    admin: {
        password: 'admin123',
        user: {
            id: '1',
            username: 'admin',
            email: 'admin@hospitalgrau.pe',
            name: 'Administrador del Sistema',
            role: 'admin',
            active: true,
        },
    },
    tecnico: {
        password: 'tecnico123',
        user: {
            id: '2',
            username: 'tecnico',
            email: 'tecnico@hospitalgrau.pe',
            name: 'Juan Pérez',
            role: 'tecnico',
            active: true,
        },
    },
    supervisor: {
        password: 'supervisor123',
        user: {
            id: '3',
            username: 'supervisor',
            email: 'supervisor@hospitalgrau.pe',
            name: 'María García',
            role: 'supervisor',
            active: true,
        },
    },
    asistencial: {
        password: 'asistencial123',
        user: {
            id: '4',
            username: 'asistencial',
            email: 'asistencial@hospitalgrau.pe',
            name: 'Carlos López',
            role: 'asistencial',
            active: true,
        },
    },
    auditor: {
        password: 'auditor123',
        user: {
            id: '5',
            username: 'auditor',
            email: 'auditor@hospitalgrau.pe',
            name: 'Ana Rodríguez',
            role: 'auditor',
            active: true,
        },
    },
};

// Role-based permissions
const rolePermissions: Record<UserRole, string[]> = {
    admin: ['*'], // All permissions
    tecnico: [
        'equipment.view',
        'equipment.create',
        'equipment.edit',
        'maintenance.view',
        'maintenance.create',
        'qr.scan',
        'qr.generate',
    ],
    supervisor: [
        'equipment.view',
        'maintenance.view',
        'maintenance.approve',
        'certifications.view',
        'reports.view',
        'qr.scan',
    ],
    asistencial: ['equipment.view', 'qr.scan', 'certifications.view'],
    auditor: [
        'equipment.view',
        'maintenance.view',
        'certifications.view',
        'movements.view',
        'audit.view',
        'reports.view',
    ],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check for stored user session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (
        username: string,
        password: string,
        role?: UserRole
    ): Promise<boolean> => {
        // Mock authentication
        const mockUser = mockUsers[username.toLowerCase()];

        if (mockUser && mockUser.password === password) {
            const userToLogin = role
                ? { ...mockUser.user, role }
                : mockUser.user;

            setUser(userToLogin);
            localStorage.setItem('user', JSON.stringify(userToLogin));
            return true;
        }

        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const hasPermission = (permission: string): boolean => {
        if (!user) return false;

        const permissions = rolePermissions[user.role];
        return permissions.includes('*') || permissions.includes(permission);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user,
                hasPermission,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
