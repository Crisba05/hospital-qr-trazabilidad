import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Download, QrCode, Eye } from 'lucide-react';
import { Equipment, EquipmentStatus } from '@/types';
import EquipmentFormModal from '@/components/shared/EquipmentFormModal';
import QRCodeModal from '@/components/shared/QRCodeModal';
import EquipmentDetailModal from '@/components/shared/EquipmentDetailModal';
import FilterDialog from '@/components/shared/FilterDialog';
import { toast } from 'sonner';

const EquipmentPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFormModal, setShowFormModal] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
    const [activeFilters, setActiveFilters] = useState<any>({
        status: [],
        criticality: [],
        area: [],
        type: [],
    });

    // Mock data
    const mockEquipment: Equipment[] = [
        {
            id: '1',
            code: 'VM-001',
            patrimonialCode: 'PAT-2024-001',
            name: 'Ventilador Mecánico',
            brand: 'Dräger',
            model: 'Evita V300',
            serial: 'DRG-VM-2024-001',
            type: 'Ventilación',
            criticality: 'alta',
            status: 'operativo',
            location: 'UCI - Cama 3',
            area: 'Cuidados Intensivos',
            responsible: 'Dr. Juan Pérez',
            acquisitionDate: '2024-01-15',
            qrCode: 'QR-VM-001',
            lastMaintenance: '2024-11-20',
            nextMaintenance: '2025-02-20',
            createdAt: '2024-01-15',
            updatedAt: '2024-11-20',
        },
        {
            id: '2',
            code: 'MSV-045',
            patrimonialCode: 'PAT-2024-045',
            name: 'Monitor de Signos Vitales',
            brand: 'Philips',
            model: 'IntelliVue MP70',
            serial: 'PHL-MSV-2024-045',
            type: 'Monitoreo',
            criticality: 'alta',
            status: 'operativo',
            location: 'UCI - Cama 5',
            area: 'Cuidados Intensivos',
            responsible: 'Enf. María García',
            acquisitionDate: '2024-02-10',
            qrCode: 'QR-MSV-045',
            lastMaintenance: '2024-12-01',
            nextMaintenance: '2025-03-01',
            createdAt: '2024-02-10',
            updatedAt: '2024-12-01',
        },
        {
            id: '3',
            code: 'BI-008',
            patrimonialCode: 'PAT-2023-128',
            name: 'Bomba de Infusión',
            brand: 'B. Braun',
            model: 'Infusomat Space',
            serial: 'BBR-BI-2023-128',
            type: 'Infusión',
            criticality: 'media',
            status: 'mantenimiento',
            location: 'Taller Biomédico',
            area: 'Mantenimiento',
            responsible: 'Téc. Carlos López',
            acquisitionDate: '2023-06-20',
            qrCode: 'QR-BI-008',
            lastMaintenance: '2024-12-10',
            createdAt: '2023-06-20',
            updatedAt: '2024-12-10',
        },
        {
            id: '4',
            code: 'DEF-012',
            patrimonialCode: 'PAT-2024-012',
            name: 'Desfibrilador',
            brand: 'Zoll',
            model: 'X Series',
            serial: 'ZOL-DEF-2024-012',
            type: 'Emergencia',
            criticality: 'alta',
            status: 'operativo',
            location: 'Emergencia - Trauma Shock',
            area: 'Emergencia',
            responsible: 'Dr. Ana Rodríguez',
            acquisitionDate: '2024-03-05',
            qrCode: 'QR-DEF-012',
            lastMaintenance: '2024-11-15',
            nextMaintenance: '2025-02-15',
            createdAt: '2024-03-05',
            updatedAt: '2024-11-15',
        },
        {
            id: '5',
            code: 'ECG-023',
            patrimonialCode: 'PAT-2023-089',
            name: 'Electrocardiógrafo',
            brand: 'GE Healthcare',
            model: 'MAC 2000',
            serial: 'GEH-ECG-2023-089',
            type: 'Diagnóstico',
            criticality: 'media',
            status: 'fuera_servicio',
            location: 'Almacén',
            area: 'Almacén',
            responsible: 'Téc. Luis Martínez',
            acquisitionDate: '2023-04-12',
            qrCode: 'QR-ECG-023',
            lastMaintenance: '2024-10-05',
            createdAt: '2023-04-12',
            updatedAt: '2024-10-05',
        },
    ];

    const getStatusBadge = (status: EquipmentStatus) => {
        const variants: Record<EquipmentStatus, { label: string; color: string }> = {
            operativo: { label: 'Operativo', color: 'bg-green-100 text-green-800 border-green-300' },
            mantenimiento: { label: 'Mantenimiento', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
            fuera_servicio: { label: 'Fuera de Servicio', color: 'bg-red-100 text-red-800 border-red-300' },
            calibracion: { label: 'Calibración', color: 'bg-blue-100 text-blue-800 border-blue-300' },
        };
        return variants[status];
    };

    const getCriticalityBadge = (criticality: string) => {
        const variants: Record<string, { label: string; color: string }> = {
            alta: { label: 'Alta', color: 'bg-red-100 text-red-800 border-red-300' },
            media: { label: 'Media', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
            baja: { label: 'Baja', color: 'bg-gray-100 text-gray-800 border-gray-300' },
        };
        return variants[criticality];
    };

    const handleShowQR = (equipment: Equipment) => {
        setSelectedEquipment(equipment);
        setShowQRModal(true);
    };

    const handleShowDetail = (equipment: Equipment) => {
        setSelectedEquipment(equipment);
        setShowDetailModal(true);
    };

    const handleExport = () => {
        toast.success('Exportando datos...');
    };

    const handleApplyFilters = (filters: any) => {
        setActiveFilters(filters);
        toast.success('Filtros aplicados');
    };

    const filteredEquipment = mockEquipment.filter((eq) => {
        // Search filter
        const matchesSearch =
            eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            eq.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            eq.location.toLowerCase().includes(searchQuery.toLowerCase());

        // Status filter
        const matchesStatus = activeFilters.status.length === 0 ||
            activeFilters.status.includes(eq.status);

        // Criticality filter
        const matchesCriticality = activeFilters.criticality.length === 0 ||
            activeFilters.criticality.includes(eq.criticality);

        return matchesSearch && matchesStatus && matchesCriticality;
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
                    <h1 className="text-3xl font-bold tracking-tight">Equipos Médicos</h1>
                    <p className="text-muted-foreground">
                        Gestión y control de equipos médicos del hospital
                    </p>
                </div>
                <Button className="gap-2" onClick={() => setShowFormModal(true)}>
                    <Plus className="w-4 h-4" />
                    Registrar Equipo
                </Button>
            </div>

            {/* Modals */}
            <EquipmentFormModal
                open={showFormModal}
                onOpenChange={setShowFormModal}
                onSuccess={() => toast.success('Equipo registrado exitosamente')}
            />

            <QRCodeModal
                open={showQRModal}
                onOpenChange={setShowQRModal}
                equipment={selectedEquipment}
            />

            <EquipmentDetailModal
                open={showDetailModal}
                onOpenChange={setShowDetailModal}
                equipment={selectedEquipment}
                onShowQR={() => {
                    setShowQRModal(true);
                }}
            />

            <FilterDialog
                open={showFilterDialog}
                onOpenChange={setShowFilterDialog}
                filters={{
                    status: ['operativo', 'mantenimiento', 'fuera_servicio', 'calibracion'],
                    criticality: ['alta', 'media', 'baja'],
                }}
                onApplyFilters={handleApplyFilters}
            />

            {/* Stats Cards with Colors */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-600">248</div>
                        <p className="text-xs text-muted-foreground">Total Equipos</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">215</div>
                        <p className="text-xs text-muted-foreground">Operativos</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-yellow-600">18</div>
                        <p className="text-xs text-muted-foreground">En Mantenimiento</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-red-600">15</div>
                        <p className="text-xs text-muted-foreground">Fuera de Servicio</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nombre, código o ubicación..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="gap-2 relative"
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
                        <Button variant="outline" className="gap-2" onClick={handleExport}>
                            <Download className="w-4 h-4" />
                            Exportar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Equipment Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Equipos ({filteredEquipment.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3 font-medium">Código</th>
                                    <th className="text-left p-3 font-medium">Equipo</th>
                                    <th className="text-left p-3 font-medium">Ubicación</th>
                                    <th className="text-left p-3 font-medium">Estado</th>
                                    <th className="text-left p-3 font-medium">Criticidad</th>
                                    <th className="text-left p-3 font-medium">Último Mant.</th>
                                    <th className="text-left p-3 font-medium">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEquipment.map((equipment) => {
                                    const statusBadge = getStatusBadge(equipment.status);
                                    const criticalityBadge = getCriticalityBadge(equipment.criticality);

                                    return (
                                        <tr key={equipment.id} className="border-b hover:bg-muted/50">
                                            <td className="p-3">
                                                <div className="font-medium">{equipment.code}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {equipment.patrimonialCode}
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div className="font-medium">{equipment.name}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {equipment.brand} - {equipment.model}
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div>{equipment.location}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {equipment.area}
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <Badge className={statusBadge.color + ' border'}>
                                                    {statusBadge.label}
                                                </Badge>
                                            </td>
                                            <td className="p-3">
                                                <Badge className={criticalityBadge.color + ' border'}>
                                                    {criticalityBadge.label}
                                                </Badge>
                                            </td>
                                            <td className="p-3 text-sm">
                                                {equipment.lastMaintenance || 'N/A'}
                                            </td>
                                            <td className="p-3">
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                        onClick={() => handleShowQR(equipment)}
                                                        title="Ver QR"
                                                    >
                                                        <QrCode className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        title="Ver detalles"
                                                        onClick={() => handleShowDetail(equipment)}
                                                    >
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        Ver
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EquipmentPage;
