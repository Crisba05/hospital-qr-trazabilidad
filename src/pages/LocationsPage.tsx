import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, Edit, Trash2, Power, PowerOff, Search, Package, Filter } from 'lucide-react';
import LocationFormModal from '@/components/shared/LocationFormModal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import FilterDialog from '@/components/shared/FilterDialog';
import { toast } from 'sonner';

const LocationsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showToggleDialog, setShowToggleDialog] = useState(false);
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);
    const [activeFilters, setActiveFilters] = useState<any>({
        area: [],
    });

    // Mock areas data
    const areas = [
        { id: '1', name: 'UCI - Unidad de Cuidados Intensivos', active: true },
        { id: '2', name: 'Emergencia', active: true },
        { id: '3', name: 'Quirófano', active: true },
        { id: '4', name: 'Hospitalización', active: true },
        { id: '5', name: 'Consulta Externa', active: true },
        { id: '6', name: 'Laboratorio', active: true },
        { id: '7', name: 'Radiología', active: true },
        { id: '8', name: 'Farmacia', active: true },
        { id: '9', name: 'Almacén Central', active: true },
    ];

    const [locations, setLocations] = useState([
        { id: '1', name: 'UCI - Cama 1', areaId: '1', areaName: 'UCI - Unidad de Cuidados Intensivos', description: 'Cama de cuidados intensivos', active: true, equipmentCount: 6 },
        { id: '2', name: 'UCI - Cama 2', areaId: '1', areaName: 'UCI - Unidad de Cuidados Intensivos', description: 'Cama de cuidados intensivos', active: true, equipmentCount: 5 },
        { id: '3', name: 'Emergencia - Trauma Shock', areaId: '2', areaName: 'Emergencia', description: 'Sala de trauma shock', active: true, equipmentCount: 8 },
        { id: '4', name: 'Emergencia - Tópico 1', areaId: '2', areaName: 'Emergencia', description: 'Tópico de atención', active: true, equipmentCount: 4 },
        { id: '5', name: 'Quirófano 1', areaId: '3', areaName: 'Quirófano', description: 'Sala de operaciones principal', active: true, equipmentCount: 12 },
        { id: '6', name: 'Quirófano 2', areaId: '3', areaName: 'Quirófano', description: 'Sala de operaciones secundaria', active: true, equipmentCount: 11 },
        { id: '7', name: 'Hospitalización - Piso 3', areaId: '4', areaName: 'Hospitalización', description: 'Habitaciones de internamiento', active: true, equipmentCount: 15 },
        { id: '8', name: 'Consultorio 101', areaId: '5', areaName: 'Consulta Externa', description: 'Consultorio de medicina general', active: true, equipmentCount: 3 },
        { id: '9', name: 'Laboratorio - Hematología', areaId: '6', areaName: 'Laboratorio', description: 'Área de análisis hematológicos', active: true, equipmentCount: 8 },
        { id: '10', name: 'Radiología - Sala de Rayos X', areaId: '7', areaName: 'Radiología', description: 'Sala de radiografías', active: true, equipmentCount: 5 },
        { id: '11', name: 'Almacén - Equipos Médicos', areaId: '9', areaName: 'Almacén Central', description: 'Almacenamiento de equipos', active: true, equipmentCount: 45 },
        { id: '12', name: 'Farmacia - Dispensación', areaId: '8', areaName: 'Farmacia', description: 'Área de dispensación', active: false, equipmentCount: 2 },
    ]);

    const handleEdit = (location: any) => {
        setSelectedLocation(location);
        setShowFormModal(true);
    };

    const handleDelete = (location: any) => {
        setSelectedLocation(location);
        setShowDeleteDialog(true);
    };

    const handleToggleActive = (location: any) => {
        setSelectedLocation(location);
        setShowToggleDialog(true);
    };

    const confirmDelete = () => {
        setLocations(locations.filter(l => l.id !== selectedLocation?.id));
        toast.success(`Ubicación "${selectedLocation?.name}" eliminada`);
        setSelectedLocation(null);
    };

    const confirmToggleActive = () => {
        setLocations(locations.map(l =>
            l.id === selectedLocation?.id
                ? { ...l, active: !l.active }
                : l
        ));
        toast.success(
            selectedLocation?.active
                ? `Ubicación "${selectedLocation?.name}" desactivada`
                : `Ubicación "${selectedLocation?.name}" activada`
        );
        setSelectedLocation(null);
    };

    const handleApplyFilters = (filters: any) => {
        setActiveFilters(filters);
        toast.success('Filtros aplicados');
    };

    const filteredLocations = locations.filter(location => {
        const matchesSearch =
            location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.areaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesArea = activeFilters.area?.length === 0 ||
            activeFilters.area?.includes(location.areaId);

        return matchesSearch && matchesArea;
    });

    const activeFilterCount = Object.values(activeFilters).reduce(
        (acc: number, curr: any) => acc + (curr?.length || 0),
        0
    );

    const activeCount = locations.filter(l => l.active).length;
    const inactiveCount = locations.filter(l => !l.active).length;
    const totalEquipment = locations.reduce((acc, l) => acc + l.equipmentCount, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gestión de Ubicaciones</h1>
                    <p className="text-muted-foreground">
                        Administración de ubicaciones específicas dentro de las áreas
                    </p>
                </div>
                <Button className="gap-2" onClick={() => {
                    setSelectedLocation(null);
                    setShowFormModal(true);
                }}>
                    <Plus className="w-4 h-4" />
                    Crear Ubicación
                </Button>
            </div>

            {/* Modals */}
            <LocationFormModal
                open={showFormModal}
                onOpenChange={setShowFormModal}
                location={selectedLocation}
                areas={areas}
                onSuccess={() => toast.success(
                    selectedLocation ? 'Ubicación actualizada exitosamente' : 'Ubicación creada exitosamente'
                )}
            />

            <ConfirmDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                title="Eliminar Ubicación"
                description={`¿Estás seguro de que deseas eliminar la ubicación "${selectedLocation?.name}"? Esta acción no se puede deshacer.`}
                confirmText="Eliminar"
                variant="destructive"
                onConfirm={confirmDelete}
            />

            <ConfirmDialog
                open={showToggleDialog}
                onOpenChange={setShowToggleDialog}
                title={selectedLocation?.active ? 'Desactivar Ubicación' : 'Activar Ubicación'}
                description={
                    selectedLocation?.active
                        ? `¿Deseas desactivar la ubicación "${selectedLocation?.name}"?`
                        : `¿Deseas activar la ubicación "${selectedLocation?.name}"?`
                }
                confirmText={selectedLocation?.active ? 'Desactivar' : 'Activar'}
                variant={selectedLocation?.active ? 'destructive' : 'default'}
                onConfirm={confirmToggleActive}
            />

            <FilterDialog
                open={showFilterDialog}
                onOpenChange={setShowFilterDialog}
                filters={{
                    area: areas.map(a => a.id),
                }}
                onApplyFilters={handleApplyFilters}
            />

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-600">{locations.length}</div>
                        <p className="text-xs text-muted-foreground">Total Ubicaciones</p>
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

            {/* Search and Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nombre, área o descripción..."
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

            {/* Locations Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Ubicaciones ({filteredLocations.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3 font-medium">Ubicación</th>
                                    <th className="text-left p-3 font-medium">Área</th>
                                    <th className="text-left p-3 font-medium">Descripción</th>
                                    <th className="text-left p-3 font-medium">Equipos</th>
                                    <th className="text-left p-3 font-medium">Estado</th>
                                    <th className="text-left p-3 font-medium">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLocations.map((location) => (
                                    <tr key={location.id} className="border-b hover:bg-muted/50">
                                        <td className="p-3">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-primary" />
                                                <span className="font-medium">{location.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <Badge className="bg-blue-100 text-blue-800 border-blue-300 border">
                                                {location.areaName}
                                            </Badge>
                                        </td>
                                        <td className="p-3 text-sm text-muted-foreground">
                                            {location.description}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-1">
                                                <Package className="w-4 h-4 text-purple-600" />
                                                <span className="font-semibold text-purple-900">{location.equipmentCount}</span>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <Badge className={
                                                location.active
                                                    ? 'bg-green-100 text-green-800 border-green-300 border'
                                                    : 'bg-gray-100 text-gray-800 border-gray-300 border'
                                            }>
                                                {location.active ? 'Activa' : 'Inactiva'}
                                            </Badge>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => handleEdit(location)}
                                                    title="Editar"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => handleToggleActive(location)}
                                                    title={location.active ? 'Desactivar' : 'Activar'}
                                                >
                                                    {location.active ? (
                                                        <PowerOff className="w-4 h-4 text-orange-600" />
                                                    ) : (
                                                        <Power className="w-4 h-4 text-green-600" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-destructive"
                                                    onClick={() => handleDelete(location)}
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

            {filteredLocations.length === 0 && (
                <Card>
                    <CardContent className="py-12 text-center">
                        <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                            No se encontraron ubicaciones que coincidan con la búsqueda
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default LocationsPage;
