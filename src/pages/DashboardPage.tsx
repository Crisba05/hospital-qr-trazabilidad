import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
    Package,
    CheckCircle2,
    Wrench,
    AlertTriangle,
    Award,
    TrendingUp,
    Info,
} from 'lucide-react';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    const roleLabels: Record<string, string> = {
        admin: 'Administrador',
        tecnico: 'Técnico Biomédico',
        supervisor: 'Supervisor',
        asistencial: 'Personal Asistencial',
        auditor: 'Auditor',
    };

    // Mock data
    const stats = [
        {
            title: 'Total Equipos',
            value: '248',
            icon: Package,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            title: 'Operativos',
            value: '215',
            icon: CheckCircle2,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
            percentage: '86.7%',
        },
        {
            title: 'En Mantenimiento',
            value: '18',
            icon: Wrench,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
        },
        {
            title: 'Fuera de Servicio',
            value: '15',
            icon: AlertTriangle,
            color: 'text-red-600',
            bgColor: 'bg-red-100',
        },
        {
            title: 'Certificaciones por Vencer',
            value: '12',
            icon: Award,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
        },
        {
            title: 'Mantenimientos Pendientes',
            value: '8',
            icon: TrendingUp,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
    ];

    const recentActivity = [
        {
            id: 1,
            action: 'Mantenimiento preventivo completado',
            equipment: 'Ventilador Mecánico VM-001',
            user: 'Juan Pérez',
            time: 'Hace 15 minutos',
        },
        {
            id: 2,
            action: 'Nuevo equipo registrado',
            equipment: 'Monitor de Signos Vitales MSV-045',
            user: 'María García',
            time: 'Hace 1 hora',
        },
        {
            id: 3,
            action: 'Certificación actualizada',
            equipment: 'Desfibrilador DEF-012',
            user: 'Carlos López',
            time: 'Hace 2 horas',
        },
    ];

    const alerts = [
        {
            id: 1,
            type: 'warning',
            message: 'Certificación del equipo ECG-023 vence en 5 días',
        },
        {
            id: 2,
            type: 'error',
            message: 'Mantenimiento preventivo vencido para Bomba de Infusión BI-008',
        },
        {
            id: 3,
            type: 'info',
            message: 'Nuevo manual disponible para Ventilador VM-015',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Resumen general del sistema de equipos médicos
                </p>
            </div>

            {/* Welcome Card */}
            <Card className="bg-linear-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Info className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-1">
                                ¡Bienvenido, {user?.name}!
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                                Has iniciado sesión como{' '}
                                <Badge variant="secondary" className="ml-1">
                                    {user?.role && roleLabels[user.role]}
                                </Badge>
                            </p>
                            <p className="text-sm text-muted-foreground">
                                💡 <strong>Tip:</strong> Para cerrar sesión, haz clic en tu perfil en la esquina superior derecha y selecciona &quot;Cerrar Sesión&quot;.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                                    <Icon className={`w-4 h-4 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                {stat.percentage && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {stat.percentage} del total
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Alerts */}
            <Card>
                <CardHeader>
                    <CardTitle>Alertas Importantes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                className={`p-3 rounded-md border ${alert.type === 'error'
                                        ? 'bg-red-50 border-red-200'
                                        : alert.type === 'warning'
                                            ? 'bg-yellow-50 border-yellow-200'
                                            : 'bg-blue-50 border-blue-200'
                                    }`}
                            >
                                <p className="text-sm">{alert.message}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start justify-between border-b pb-3 last:border-0"
                            >
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">{activity.action}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {activity.equipment}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Por {activity.user}
                                    </p>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {activity.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardPage;
