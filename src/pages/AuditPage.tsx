import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Shield, User, FileText, Database } from 'lucide-react';

const AuditPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const auditLogs = [
        {
            id: '1',
            action: 'CREATE',
            entity: 'Equipment',
            entityId: 'VM-001',
            user: 'admin',
            userName: 'Administrador del Sistema',
            description: 'Creó equipo Ventilador Mecánico VM-001',
            timestamp: '2024-12-18 10:30:15',
            ip: '192.168.1.100',
        },
        {
            id: '2',
            action: 'UPDATE',
            entity: 'Maintenance',
            entityId: 'OT-2024-156',
            user: 'tecnico',
            userName: 'Juan Pérez',
            description: 'Actualizó mantenimiento preventivo OT-2024-156',
            timestamp: '2024-12-18 09:15:42',
            ip: '192.168.1.105',
        },
        {
            id: '3',
            action: 'DELETE',
            entity: 'Certification',
            entityId: 'CERT-2024-OLD-001',
            user: 'supervisor',
            userName: 'María García',
            description: 'Eliminó certificación vencida CERT-2024-OLD-001',
            timestamp: '2024-12-17 16:45:30',
            ip: '192.168.1.110',
        },
        {
            id: '4',
            action: 'LOGIN',
            entity: 'User',
            entityId: 'admin',
            user: 'admin',
            userName: 'Administrador del Sistema',
            description: 'Inició sesión en el sistema',
            timestamp: '2024-12-18 08:00:00',
            ip: '192.168.1.100',
        },
        {
            id: '5',
            action: 'EXPORT',
            entity: 'Report',
            entityId: 'RPT-EQUIPMENT-2024-12',
            user: 'auditor',
            userName: 'Ana Rodríguez',
            description: 'Exportó reporte de equipos del mes',
            timestamp: '2024-12-17 14:20:18',
            ip: '192.168.1.115',
        },
    ];

    const getActionBadge = (action: string) => {
        const actions: Record<string, { variant: any; icon: any }> = {
            CREATE: { variant: 'default', icon: FileText },
            UPDATE: { variant: 'secondary', icon: FileText },
            DELETE: { variant: 'destructive', icon: FileText },
            LOGIN: { variant: 'secondary', icon: User },
            EXPORT: { variant: 'secondary', icon: Download },
        };
        return actions[action] || { variant: 'secondary', icon: FileText };
    };

    const getEntityIcon = (entity: string) => {
        const icons: Record<string, any> = {
            Equipment: Database,
            Maintenance: FileText,
            Certification: Shield,
            User: User,
            Report: FileText,
        };
        return icons[entity] || Database;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Auditoría</h1>
                    <p className="text-muted-foreground">
                        Registro de auditoría y trazabilidad de acciones
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filtros
                    </Button>
                    <Button className="gap-2">
                        <Download className="w-4 h-4" />
                        Exportar Log
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">1,245</div>
                        <p className="text-xs text-muted-foreground">Total Eventos</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-600">156</div>
                        <p className="text-xs text-muted-foreground">Este Mes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">45</div>
                        <p className="text-xs text-muted-foreground">Hoy</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-purple-600">12</div>
                        <p className="text-xs text-muted-foreground">Usuarios Activos</p>
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
                                placeholder="Buscar por usuario, acción o entidad..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <select className="px-3 py-2 border rounded-md text-sm">
                            <option value="">Todas las acciones</option>
                            <option value="CREATE">Crear</option>
                            <option value="UPDATE">Actualizar</option>
                            <option value="DELETE">Eliminar</option>
                            <option value="LOGIN">Login</option>
                            <option value="EXPORT">Exportar</option>
                        </select>
                        <select className="px-3 py-2 border rounded-md text-sm">
                            <option value="">Todas las entidades</option>
                            <option value="Equipment">Equipos</option>
                            <option value="Maintenance">Mantenimientos</option>
                            <option value="Certification">Certificaciones</option>
                            <option value="User">Usuarios</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Audit Log */}
            <Card>
                <CardHeader>
                    <CardTitle>Registro de Auditoría</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {auditLogs.map((log) => {
                            const actionInfo = getActionBadge(log.action);
                            const EntityIcon = getEntityIcon(log.entity);
                            const ActionIcon = actionInfo.icon;

                            return (
                                <div
                                    key={log.id}
                                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50"
                                >
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <EntityIcon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge variant={actionInfo.variant} className="gap-1">
                                                <ActionIcon className="w-3 h-3" />
                                                {log.action}
                                            </Badge>
                                            <span className="text-sm font-medium">{log.entity}</span>
                                            <span className="text-sm text-muted-foreground">
                                                #{log.entityId}
                                            </span>
                                        </div>
                                        <p className="text-sm mb-2">{log.description}</p>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {log.userName} (@{log.user})
                                            </span>
                                            <span>{log.timestamp}</span>
                                            <span>IP: {log.ip}</span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        Ver Detalles
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                    <div className="flex gap-3">
                        <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div className="text-sm">
                            <p className="font-medium text-blue-900 mb-1">
                                Información de Auditoría
                            </p>
                            <p className="text-blue-700">
                                Todos los eventos del sistema son registrados automáticamente para
                                garantizar la trazabilidad completa. Los registros se mantienen por 5
                                años según normativa vigente.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuditPage;
