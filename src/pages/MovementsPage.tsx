import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, TruckIcon, CheckCircle2, Clock, Search, Filter } from 'lucide-react';
import MovementFormModal from '@/components/shared/MovementFormModal';
import MovementDetailModal from '@/components/shared/MovementDetailModal';
import FilterDialog from '@/components/shared/FilterDialog';
import { toast } from 'sonner';

const MovementsPage: React.FC = () => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMovement, setSelectedMovement] = useState<any>(null);
    const [activeFilters, setActiveFilters] = useState<any>({
        status: [],
        type: [],
    });

    const movements = [
        {
            id: '1',
            equipment: 'Ventilador Mecánico VM-001',
            type: 'transfer',
            from: 'UCI - Cama 3',
            to: 'UCI - Cama 5',
            responsible: 'Dr. Juan Pérez',
            date: '2024-12-15 14:30',
            status: 'completado',
        },
        {
            id: '2',
            equipment: 'Monitor de Signos Vitales MSV-045',
            type: 'checkout',
            from: 'Almacén Central',
            to: 'Emergencia - Trauma Shock',
            responsible: 'Enf. María García',
            date: '2024-12-16 09:15',
            status: 'en_transito',
        },
        {
            id: '3',
            equipment: 'Bomba de Infusión BI-008',
            type: 'checkin',
            from: 'Hospitalización - Piso 3',
            to: 'Almacén Central',
            responsible: 'Téc. Carlos López',
            date: '2024-12-17 16:45',
            status: 'pendiente',
        },
    ];

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { label: string; icon: any; color: string }> = {
            completado: { label: 'Completado', icon: CheckCircle2, color: 'bg-green-100 text-green-800 border-green-300' },
            en_transito: { label: 'En Tránsito', icon: TruckIcon, color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
            pendiente: { label: 'Pendiente', icon: Clock, color: 'bg-gray-100 text-gray-800 border-gray-300' },
        };
        return variants[status];
    };

    const getTypeBadge = (type: string) => {
        const variants: Record<string, { label: string; color: string }> = {
            transfer: { label: 'Transferencia', color: 'bg-blue-100 text-blue-800 border-blue-300' },
            checkout: { label: 'Check-out', color: 'bg-purple-100 text-purple-800 border-purple-300' },
            checkin: { label: 'Check-in', color: 'bg-orange-100 text-orange-800 border-orange-300' },
        };
        return variants[type];
    };

    const handleApplyFilters = (filters: any) => {
        setActiveFilters(filters);
        toast.success('Filtros aplicados');
    };

    const filteredMovements = movements.filter((movement) => {
        const matchesSearch =
            movement.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movement.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movement.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movement.responsible.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = activeFilters.status?.length === 0 ||
            activeFilters.status?.includes(movement.status);

        const matchesType = activeFilters.type?.length === 0 ||
            activeFilters.type?.includes(movement.type);

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
                    <h1 className="text-3xl font-bold tracking-tight">Movimientos</h1>
                    <p className="text-muted-foreground">
                        Registro y seguimiento de movimientos de equipos
                    </p>
                </div>
                <Button className="gap-2" onClick={() => setShowFormModal(true)}>
                    <Plus className="w-4 h-4" />
                    Registrar Movimiento
                </Button>
            </div>

            {/* Modals */}
            <MovementFormModal
                open={showFormModal}
                onOpenChange={setShowFormModal}
                onSuccess={() => toast.success('Movimiento registrado exitosamente')}
            />

            <MovementDetailModal
                open={showDetailModal}
                onOpenChange={setShowDetailModal}
                movement={selectedMovement}
            />

            <FilterDialog
                open={showFilterDialog}
                onOpenChange={setShowFilterDialog}
                filters={{
                    status: ['completado', 'en_transito', 'pendiente'],
                    type: ['transfer', 'checkout', 'checkin'],
                }}
                onApplyFilters={handleApplyFilters}
            />

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-600">156</div>
                        <p className="text-xs text-muted-foreground">Total Movimientos</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-purple-600">45</div>
                        <p className="text-xs text-muted-foreground">Este Mes</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-yellow-600">8</div>
                        <p className="text-xs text-muted-foreground">En Tránsito</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">37</div>
                        <p className="text-xs text-muted-foreground">Completados Hoy</p>
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
                                placeholder="Buscar por equipo, ubicación o responsable..."
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

            {/* Movements List */}
            <Card>
                <CardHeader>
                    <CardTitle>Historial de Movimientos ({filteredMovements.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredMovements.map((movement) => {
                            const statusBadge = getStatusBadge(movement.status);
                            const typeBadge = getTypeBadge(movement.type);
                            const StatusIcon = statusBadge.icon;

                            return (
                                <div
                                    key={movement.id}
                                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50"
                                >
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className={`p-2 rounded-lg ${movement.status === 'completado' ? 'bg-green-100' :
                                            movement.status === 'en_transito' ? 'bg-yellow-100' :
                                                'bg-gray-100'
                                            }`}>
                                            <StatusIcon className={`w-5 h-5 ${movement.status === 'completado' ? 'text-green-600' :
                                                movement.status === 'en_transito' ? 'text-yellow-600' :
                                                    'text-gray-600'
                                                }`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold">{movement.equipment}</h3>
                                                <Badge className={typeBadge.color + ' border'}>
                                                    {typeBadge.label}
                                                </Badge>
                                            </div>
                                            <div className="text-sm text-muted-foreground space-y-1">
                                                <p>Desde: {movement.from}</p>
                                                <p>Hacia: {movement.to}</p>
                                                <p>Responsable: {movement.responsible}</p>
                                                <p>Fecha: {movement.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge className={statusBadge.color + ' border gap-1'}>
                                            <StatusIcon className="w-3 h-3" />
                                            {statusBadge.label}
                                        </Badge>
                                        <Button variant="outline" size="sm" onClick={() => {
                                            setSelectedMovement(movement);
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

export default MovementsPage;
