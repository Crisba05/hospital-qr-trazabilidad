import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Wrench, CheckCircle2, Clock, Search, Filter } from 'lucide-react';
import MaintenanceFormModal from '@/components/shared/MaintenanceFormModal';
import MaintenanceDetailModal from '@/components/shared/MaintenanceDetailModal';
import FilterDialog from '@/components/shared/FilterDialog';
import { toast } from 'sonner';

const MaintenancePage: React.FC = () => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMaintenance, setSelectedMaintenance] = useState<any>(null);
    const [activeFilters, setActiveFilters] = useState<any>({
        status: [],
        type: [],
    });

    const maintenanceRecords = [
        {
            id: '1',
            equipment: 'Ventilador Mecánico VM-001',
            type: 'preventivo',
            workOrder: 'OT-2024-156',
            date: '2024-12-10',
            technician: 'Ing. Juan Pérez',
            status: 'completado',
            description: 'Mantenimiento preventivo programado según cronograma anual. Se detectó desgaste en filtros y válvulas.',
            actionsPerformed: '1. Limpieza general del equipo\n2. Reemplazo de filtros HEPA\n3. Calibración de sensores de presión\n4. Verificación de alarmas\n5. Pruebas de funcionamiento',
            partsUsed: '- Filtro HEPA x2\n- Válvula de presión\n- Kit de sellos',
            observations: 'Equipo en óptimas condiciones. Próximo mantenimiento programado para marzo 2025.',
            cost: 450.00,
            duration: 3.5,
            evidencePhoto: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800',
        },
        {
            id: '2',
            equipment: 'Monitor de Signos Vitales MSV-045',
            type: 'correctivo',
            workOrder: 'OT-2024-157',
            date: '2024-12-12',
            technician: 'Ing. María García',
            status: 'en_proceso',
            description: 'Falla en la pantalla LCD. El monitor presenta líneas verticales y no muestra correctamente los valores de SpO2.',
            actionsPerformed: '1. Diagnóstico inicial - pantalla defectuosa\n2. Solicitud de repuesto al proveedor\n3. Pendiente: instalación de nueva pantalla',
            partsUsed: '- Pantalla LCD 12" (en tránsito)',
            observations: 'Esperando llegada de repuesto. Tiempo estimado: 3-5 días hábiles.',
            cost: 1200.00,
            duration: 1.5,
        },
        {
            id: '3',
            equipment: 'Bomba de Infusión BI-008',
            type: 'preventivo',
            workOrder: 'OT-2024-158',
            date: '2024-12-15',
            technician: 'Ing. Carlos López',
            status: 'pendiente',
            description: 'Mantenimiento preventivo trimestral programado.',
            actionsPerformed: '',
            partsUsed: '',
            observations: 'Programado para mañana 15/12/2024 a las 10:00 AM',
            cost: 0,
            duration: 0,
        },
    ];

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { label: string; icon: any; color: string }> = {
            completado: { label: 'Completado', icon: CheckCircle2, color: 'bg-green-100 text-green-800 border-green-300' },
            en_proceso: { label: 'En Proceso', icon: Wrench, color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
            pendiente: { label: 'Pendiente', icon: Clock, color: 'bg-purple-100 text-purple-800 border-purple-300' },
        };
        return variants[status];
    };

    const getTypeBadge = (type: string) => {
        return type === 'preventivo'
            ? { label: 'Preventivo', color: 'bg-blue-100 text-blue-800 border-blue-300' }
            : { label: 'Correctivo', color: 'bg-orange-100 text-orange-800 border-orange-300' };
    };

    const handleApplyFilters = (filters: any) => {
        setActiveFilters(filters);
        toast.success('Filtros aplicados');
    };

    const filteredRecords = maintenanceRecords.filter((record) => {
        const matchesSearch =
            record.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.workOrder.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.technician.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = activeFilters.status?.length === 0 ||
            activeFilters.status?.includes(record.status);

        const matchesType = activeFilters.type?.length === 0 ||
            activeFilters.type?.includes(record.type);

        return matchesSearch && matchesStatus && matchesType;
    });

    const activeFilterCount = Object.values(activeFilters).reduce(
        (acc: number, curr: any) => acc + (curr?.length || 0),
        0
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Mantenimiento</h1>
                    <p className="text-muted-foreground">
                        Gestión de mantenimientos preventivos y correctivos
                    </p>
                </div>
                <Button className="gap-2" onClick={() => setShowFormModal(true)}>
                    <Plus className="w-4 h-4" />
                    Registrar Mantenimiento
                </Button>
            </div>

            {/* Modals */}
            <MaintenanceFormModal
                open={showFormModal}
                onOpenChange={setShowFormModal}
                onSuccess={() => toast.success('Mantenimiento registrado exitosamente')}
            />

            <MaintenanceDetailModal
                open={showDetailModal}
                onOpenChange={setShowDetailModal}
                maintenance={selectedMaintenance}
            />

            <FilterDialog
                open={showFilterDialog}
                onOpenChange={setShowFilterDialog}
                filters={{
                    status: ['completado', 'en_proceso', 'pendiente'],
                    type: ['preventivo', 'correctivo'],
                }}
                onApplyFilters={handleApplyFilters}
            />

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-600">45</div>
                        <p className="text-xs text-muted-foreground">Total este mes</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">32</div>
                        <p className="text-xs text-muted-foreground">Completados</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-yellow-600">8</div>
                        <p className="text-xs text-muted-foreground">En Proceso</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-purple-600">5</div>
                        <p className="text-xs text-muted-foreground">Pendientes</p>
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
                                placeholder="Buscar por equipo, orden de trabajo o técnico..."
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

            {/* Maintenance Records */}
            <Card>
                <CardHeader>
                    <CardTitle>Registros de Mantenimiento ({filteredRecords.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredRecords.map((record) => {
                            const statusBadge = getStatusBadge(record.status);
                            const typeBadge = getTypeBadge(record.type);
                            const StatusIcon = statusBadge.icon;

                            return (
                                <div
                                    key={record.id}
                                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50"
                                >
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className={`p-2 rounded-lg ${record.status === 'completado' ? 'bg-green-100' :
                                            record.status === 'en_proceso' ? 'bg-yellow-100' :
                                                'bg-purple-100'
                                            }`}>
                                            <StatusIcon className={`w-5 h-5 ${record.status === 'completado' ? 'text-green-600' :
                                                record.status === 'en_proceso' ? 'text-yellow-600' :
                                                    'text-purple-600'
                                                }`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold">{record.equipment}</h3>
                                                <Badge className={typeBadge.color + ' border'}>
                                                    {typeBadge.label}
                                                </Badge>
                                            </div>
                                            <div className="text-sm text-muted-foreground space-y-1">
                                                <p>Orden de Trabajo: {record.workOrder}</p>
                                                <p>Técnico: {record.technician}</p>
                                                <p>Fecha: {record.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge className={statusBadge.color + ' border gap-1'}>
                                            <StatusIcon className="w-3 h-3" />
                                            {statusBadge.label}
                                        </Badge>
                                        <Button variant="outline" size="sm" onClick={() => {
                                            setSelectedMaintenance(record);
                                            setShowDetailModal(true);
                                        }}>
                                            Ver Detalles
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MaintenancePage;
