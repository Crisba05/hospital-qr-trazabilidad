import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EquipmentFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

// Mock data - en producción vendría de la API
const mockAreas = [
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

const mockLocations = [
    { id: '1', name: 'UCI - Cama 1', areaId: '1', active: true },
    { id: '2', name: 'UCI - Cama 2', areaId: '1', active: true },
    { id: '3', name: 'Emergencia - Trauma Shock', areaId: '2', active: true },
    { id: '4', name: 'Emergencia - Tópico 1', areaId: '2', active: true },
    { id: '5', name: 'Quirófano 1', areaId: '3', active: true },
    { id: '6', name: 'Quirófano 2', areaId: '3', active: true },
    { id: '7', name: 'Hospitalización - Piso 3', areaId: '4', active: true },
    { id: '8', name: 'Consultorio 101', areaId: '5', active: true },
    { id: '9', name: 'Laboratorio - Hematología', areaId: '6', active: true },
    { id: '10', name: 'Radiología - Sala de Rayos X', areaId: '7', active: true },
    { id: '11', name: 'Almacén - Equipos Médicos', areaId: '9', active: true },
    { id: '12', name: 'Farmacia - Dispensación', areaId: '8', active: true },
];

const EquipmentFormModal: React.FC<EquipmentFormModalProps> = ({
    open,
    onOpenChange,
    onSuccess,
}) => {
    const [formData, setFormData] = useState({
        code: '',
        patrimonialCode: '',
        name: '',
        brand: '',
        model: '',
        serial: '',
        type: '',
        areaId: '',
        locationId: '',
        responsible: '',
    });

    const [availableLocations, setAvailableLocations] = useState(mockLocations);

    // Filter locations when area changes
    useEffect(() => {
        if (formData.areaId) {
            const filtered = mockLocations.filter(
                loc => loc.areaId === formData.areaId && loc.active
            );
            setAvailableLocations(filtered);

            // Reset location if it doesn't belong to selected area
            if (formData.locationId) {
                const locationExists = filtered.find(loc => loc.id === formData.locationId);
                if (!locationExists) {
                    setFormData(prev => ({ ...prev, locationId: '' }));
                }
            }
        } else {
            setAvailableLocations(mockLocations.filter(loc => loc.active));
        }
    }, [formData.areaId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Equipment data:', formData);

        // Call success callback
        if (onSuccess) {
            onSuccess();
        }

        // Close modal
        onOpenChange(false);

        // Reset form
        setFormData({
            code: '',
            patrimonialCode: '',
            name: '',
            brand: '',
            model: '',
            serial: '',
            type: '',
            areaId: '',
            locationId: '',
            responsible: '',
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Registrar Nuevo Equipo</DialogTitle>
                    <DialogDescription>
                        Complete la información del equipo médico a registrar
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Código */}
                        <div className="space-y-2">
                            <Label htmlFor="code">Código *</Label>
                            <Input
                                id="code"
                                required
                                value={formData.code}
                                onChange={(e) =>
                                    setFormData({ ...formData, code: e.target.value })
                                }
                                placeholder="Ej: VM-001"
                            />
                        </div>

                        {/* Código Patrimonial */}
                        <div className="space-y-2">
                            <Label htmlFor="patrimonialCode">Código Patrimonial *</Label>
                            <Input
                                id="patrimonialCode"
                                required
                                value={formData.patrimonialCode}
                                onChange={(e) =>
                                    setFormData({ ...formData, patrimonialCode: e.target.value })
                                }
                                placeholder="Ej: PAT-2024-001"
                            />
                        </div>

                        {/* Nombre */}
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="name">Nombre del Equipo *</Label>
                            <Input
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                placeholder="Ej: Ventilador Mecánico"
                            />
                        </div>

                        {/* Marca */}
                        <div className="space-y-2">
                            <Label htmlFor="brand">Marca *</Label>
                            <Input
                                id="brand"
                                required
                                value={formData.brand}
                                onChange={(e) =>
                                    setFormData({ ...formData, brand: e.target.value })
                                }
                                placeholder="Ej: Philips"
                            />
                        </div>

                        {/* Modelo */}
                        <div className="space-y-2">
                            <Label htmlFor="model">Modelo *</Label>
                            <Input
                                id="model"
                                required
                                value={formData.model}
                                onChange={(e) =>
                                    setFormData({ ...formData, model: e.target.value })
                                }
                                placeholder="Ej: V60"
                            />
                        </div>

                        {/* Serie */}
                        <div className="space-y-2">
                            <Label htmlFor="serial">Número de Serie *</Label>
                            <Input
                                id="serial"
                                required
                                value={formData.serial}
                                onChange={(e) =>
                                    setFormData({ ...formData, serial: e.target.value })
                                }
                                placeholder="Ej: SN123456789"
                            />
                        </div>

                        {/* Tipo */}
                        <div className="space-y-2">
                            <Label htmlFor="type">Tipo de Equipo *</Label>
                            <select
                                id="type"
                                required
                                value={formData.type}
                                onChange={(e) =>
                                    setFormData({ ...formData, type: e.target.value })
                                }
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="">Seleccione tipo</option>
                                <option value="ventilador">Ventilador</option>
                                <option value="monitor">Monitor</option>
                                <option value="bomba">Bomba de Infusión</option>
                                <option value="desfibrilador">Desfibrilador</option>
                                <option value="electrocardiografo">Electrocardiógrafo</option>
                                <option value="rayos-x">Equipo de Rayos X</option>
                                <option value="ultrasonido">Ultrasonido</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>

                        {/* Área */}
                        <div className="space-y-2">
                            <Label htmlFor="areaId">Área *</Label>
                            <select
                                id="areaId"
                                required
                                value={formData.areaId}
                                onChange={(e) =>
                                    setFormData({ ...formData, areaId: e.target.value })
                                }
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="">Seleccione área</option>
                                {mockAreas.filter(a => a.active).map((area) => (
                                    <option key={area.id} value={area.id}>
                                        {area.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Ubicación */}
                        <div className="space-y-2">
                            <Label htmlFor="locationId">Ubicación *</Label>
                            <select
                                id="locationId"
                                required
                                value={formData.locationId}
                                onChange={(e) =>
                                    setFormData({ ...formData, locationId: e.target.value })
                                }
                                disabled={!formData.areaId}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">
                                    {formData.areaId ? 'Seleccione ubicación' : 'Primero seleccione un área'}
                                </option>
                                {availableLocations.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Responsable */}
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="responsible">Responsable *</Label>
                            <Input
                                id="responsible"
                                required
                                value={formData.responsible}
                                onChange={(e) =>
                                    setFormData({ ...formData, responsible: e.target.value })
                                }
                                placeholder="Ej: Dr. Juan Pérez"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit">Registrar Equipo</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EquipmentFormModal;
