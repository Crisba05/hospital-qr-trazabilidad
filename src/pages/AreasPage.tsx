import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, Edit, Trash2, Power, PowerOff, Search, Package } from 'lucide-react';
import AreaFormModal from '@/components/shared/AreaFormModal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { toast } from 'sonner';

const AreasPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showToggleDialog, setShowToggleDialog] = useState(false);
    const [selectedArea, setSelectedArea] = useState<any>(null);

    const [areas, setAreas] = useState([
        {
            id: '1',
            name: 'UCI - Unidad de Cuidados Intensivos',
            description: 'Área de cuidados intensivos para pacientes críticos',
            active: true,
            locationCount: 8,
            equipmentCount: 45,
        },
        {
            id: '2',
            name: 'Emergencia',
            description: 'Área de atención de emergencias y urgencias',
            active: true,
            locationCount: 12,
            equipmentCount: 38,
        },
        {
            id: '3',
            name: 'Quirófano',
            description: 'Salas de operaciones y procedimientos quirúrgicos',
            active: true,
            locationCount: 6,
            equipmentCount: 52,
        },
        {
            id: '4',
            name: 'Hospitalización',
            description: 'Área de internamiento de pacientes',
            active: true,
            locationCount: 15,
            equipmentCount: 67,
        },
        {
            id: '5',
            name: 'Consulta Externa',
            description: 'Consultorios para atención ambulatoria',
            active: true,
            locationCount: 20,
            equipmentCount: 28,
        },
        {
            id: '6',
            name: 'Laboratorio',
            description: 'Laboratorio clínico y análisis',
            active: true,
            locationCount: 4,
            equipmentCount: 35,
        },
        {
            id: '7',
            name: 'Radiología',
            description: 'Área de diagnóstico por imágenes',
            active: true,
            locationCount: 5,
            equipmentCount: 18,
        },
        {
            id: '8',
            name: 'Farmacia',
            description: 'Almacén y dispensación de medicamentos',
            active: true,
            locationCount: 3,
            equipmentCount: 12,
        },
        {
            id: '9',
            name: 'Almacén Central',
            description: 'Almacenamiento de equipos y suministros',
            active: true,
            locationCount: 6,
            equipmentCount: 89,
        },
        {
            id: '10',
            name: 'Rehabilitación',
            description: 'Área de terapia física y rehabilitación',
            active: false,
            locationCount: 4,
            equipmentCount: 15,
        },
    ]);

    const handleEdit = (area: any) => {
        setSelectedArea(area);
        setShowFormModal(true);
    };

    const handleDelete = (area: any) => {
        setSelectedArea(area);
        setShowDeleteDialog(true);
    };

    const handleToggleActive = (area: any) => {
        setSelectedArea(area);
        setShowToggleDialog(true);
    };

    const confirmDelete = () => {
        setAreas(areas.filter(a => a.id !== selectedArea?.id));
        toast.success(`Área "${selectedArea?.name}" eliminada`);
        setSelectedArea(null);
    };

    const confirmToggleActive = () => {
        setAreas(areas.map(a =>
            a.id === selectedArea?.id
                ? { ...a, active: !a.active }
                : a
        ));
        toast.success(
            selectedArea?.active
                ? `Área "${selectedArea?.name}" desactivada`
                : `Área "${selectedArea?.name}" activada`
        );
        setSelectedArea(null);
    };

    const filteredAreas = areas.filter(area =>
        area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        area.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeCount = areas.filter(a => a.active).length;
    const inactiveCount = areas.filter(a => !a.active).length;
    const totalEquipment = areas.reduce((acc, a) => acc + a.equipmentCount, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gestión de Áreas</h1>
                    <p className="text-muted-foreground">
                        Administración de áreas hospitalarias y ubicaciones
                    </p>
                </div>
                <Button className="gap-2" onClick={() => {
                    setSelectedArea(null);
                    setShowFormModal(true);
                }}>
                    <Plus className="w-4 h-4" />
                    Crear Área
                </Button>
            </div>

            {/* Modals */}
            <AreaFormModal
                open={showFormModal}
                onOpenChange={setShowFormModal}
                area={selectedArea}
                onSuccess={() => toast.success(
                    selectedArea ? 'Área actualizada exitosamente' : 'Área creada exitosamente'
                )}
            />

            <ConfirmDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                title="Eliminar Área"
                description={`¿Estás seguro de que deseas eliminar el área "${selectedArea?.name}"? Esta acción no se puede deshacer y afectará a todas las ubicaciones asociadas.`}
                confirmText="Eliminar"
                variant="destructive"
                onConfirm={confirmDelete}
            />

            <ConfirmDialog
                open={showToggleDialog}
                onOpenChange={setShowToggleDialog}
                title={selectedArea?.active ? 'Desactivar Área' : 'Activar Área'}
                description={
                    selectedArea?.active
                        ? `¿Deseas desactivar el área "${selectedArea?.name}"? Las ubicaciones asociadas también se desactivarán.`
                        : `¿Deseas activar el área "${selectedArea?.name}"?`
                }
                confirmText={selectedArea?.active ? 'Desactivar' : 'Activar'}
                variant={selectedArea?.active ? 'destructive' : 'default'}
                onConfirm={confirmToggleActive}
            />

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-600">{areas.length}</div>
                        <p className="text-xs text-muted-foreground">Total Áreas</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">{activeCount}</div>
                        <p className="text-xs text-muted-foreground">Activas</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-red-600">{inactiveCount}</div>
                        <p className="text-xs text-muted-foreground">Inactivas</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-purple-600">{totalEquipment}</div>
                        <p className="text-xs text-muted-foreground">Equipos Asignados</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nombre o descripción..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Areas Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Áreas ({filteredAreas.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3 font-medium">Área</th>
                                    <th className="text-left p-3 font-medium">Descripción</th>
                                    <th className="text-left p-3 font-medium">Ubicaciones</th>
                                    <th className="text-left p-3 font-medium">Equipos</th>
                                    <th className="text-left p-3 font-medium">Estado</th>
                                    <th className="text-left p-3 font-medium">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAreas.map((area) => (
                                    <tr key={area.id} className="border-b hover:bg-muted/50">
                                        <td className="p-3">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-primary" />
                                                <span className="font-medium">{area.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-sm text-muted-foreground">
                                            {area.description}
                                        </td>
                                        <td className="p-3">
                                            <Badge className="bg-purple-100 text-purple-800 border-purple-300 border">
                                                {area.locationCount} ubicaciones
                                            </Badge>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-1">
                                                <Package className="w-4 h-4 text-blue-600" />
                                                <span className="font-semibold text-blue-900">{area.equipmentCount}</span>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <Badge className={
                                                area.active
                                                    ? 'bg-green-100 text-green-800 border-green-300 border'
                                                    : 'bg-gray-100 text-gray-800 border-gray-300 border'
                                            }>
                                                {area.active ? 'Activa' : 'Inactiva'}
                                            </Badge>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => handleEdit(area)}
                                                    title="Editar"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => handleToggleActive(area)}
                                                    title={area.active ? 'Desactivar' : 'Activar'}
                                                >
                                                    {area.active ? (
                                                        <PowerOff className="w-4 h-4 text-orange-600" />
                                                    ) : (
                                                        <Power className="w-4 h-4 text-green-600" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-destructive"
                                                    onClick={() => handleDelete(area)}
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

            {filteredAreas.length === 0 && (
                <Card>
                    <CardContent className="py-12 text-center">
                        <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                            No se encontraron áreas que coincidan con la búsqueda
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default AreasPage;
