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
import FileUpload from '@/components/shared/FileUpload';
import { AlertCircle, Search, CheckCircle, Package } from 'lucide-react';

interface MovementFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

// Mock equipment data
const mockEquipment: Record<string, any> = {
    'VM-001': { code: 'VM-001', name: 'Ventilador Mecánico', area: 'UCI', location: 'UCI - Cama 3' },
    'MON-002': { code: 'MON-002', name: 'Monitor de Signos Vitales', area: 'Emergencia', location: 'Emergencia - Tópico 1' },
    'DEF-003': { code: 'DEF-003', name: 'Desfibrilador', area: 'Quirófano', location: 'Quirófano 1' },
};

// Mock data
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

const MovementFormModal: React.FC<MovementFormModalProps> = ({
    open,
    onOpenChange,
    onSuccess,
}) => {
    const [equipmentCode, setEquipmentCode] = useState('');
    const [equipmentData, setEquipmentData] = useState<any>(null);
    const [codeError, setCodeError] = useState('');

    const [formData, setFormData] = useState({
        equipment: '',
        type: 'transferencia',
        // For transfers
        originAreaId: '',
        originLocationId: '',
        destinationAreaId: '',
        destinationLocationId: '',
        // For other types
        originExternal: '',
        destinationExternal: '',
        responsible: '',
        notes: '',
        status: 'pendiente',
    });

    const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
    const [originLocations, setOriginLocations] = useState(mockLocations);
    const [destinationLocations, setDestinationLocations] = useState(mockLocations);

    // Filter origin locations when origin area changes
    useEffect(() => {
        if (formData.originAreaId) {
            const filtered = mockLocations.filter(
                loc => loc.areaId === formData.originAreaId && loc.active
            );
            setOriginLocations(filtered);

            if (formData.originLocationId) {
                const locationExists = filtered.find(loc => loc.id === formData.originLocationId);
                if (!locationExists) {
                    setFormData(prev => ({ ...prev, originLocationId: '' }));
                }
            }
        } else {
            setOriginLocations(mockLocations.filter(loc => loc.active));
        }
    }, [formData.originAreaId]);

    // Filter destination locations when destination area changes
    useEffect(() => {
        if (formData.destinationAreaId) {
            const filtered = mockLocations.filter(
                loc => loc.areaId === formData.destinationAreaId && loc.active
            );
            setDestinationLocations(filtered);

            if (formData.destinationLocationId) {
                const locationExists = filtered.find(loc => loc.id === formData.destinationLocationId);
                if (!locationExists) {
                    setFormData(prev => ({ ...prev, destinationLocationId: '' }));
                }
            }
        } else {
            setDestinationLocations(mockLocations.filter(loc => loc.active));
        }
    }, [formData.destinationAreaId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Movement data:', { ...formData, status: 'pendiente' });
        console.log('Evidence file:', evidenceFile);

        if (onSuccess) {
            onSuccess();
        }

        onOpenChange(false);

        setFormData({
            equipment: '',
            type: 'transferencia',
            originAreaId: '',
            originLocationId: '',
            destinationAreaId: '',
            destinationLocationId: '',
            originExternal: '',
            destinationExternal: '',
            responsible: '',
            notes: '',
            status: 'pendiente',
        });
        setEvidenceFile(null);
    };

    const handleValidateCode = () => {
        const equipment = mockEquipment[equipmentCode.toUpperCase()];
        if (equipment) {
            setEquipmentData(equipment);
            setFormData({ ...formData, equipment: `${equipment.name} (${equipment.code})` });
            setCodeError('');
        } else {
            setEquipmentData(null);
            setCodeError('Código no encontrado. Intente con: VM-001, MON-002, DEF-003');
        }
    };

    const getTypeDescription = (type: string) => {
        const descriptions: Record<string, string> = {
            transferencia: 'Mover equipo de una ubicación a otra dentro del hospital',
            salida_temporal: 'Equipo sale temporalmente del hospital (mantenimiento externo, préstamo, etc.)',
            retorno: 'Equipo regresa al hospital después de una salida temporal',
        };
        return descriptions[type] || '';
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Registrar Movimiento de Equipo</DialogTitle>
                    <DialogDescription>
                        Complete la información del movimiento del equipo. El estado inicial será "Pendiente"
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Equipment Search */}
                    <div className="space-y-2">
                        <Label htmlFor="equipmentCode">Código del Equipo *</Label>
                        <div className="flex gap-2">
                            <Input
                                id="equipmentCode"
                                value={equipmentCode}
                                onChange={(e) => {
                                    setEquipmentCode(e.target.value);
                                    setCodeError('');
                                }}
                                placeholder="Ej: VM-001"
                                className="flex-1"
                            />
                            <Button
                                type="button"
                                onClick={handleValidateCode}
                                className="gap-2"
                            >
                                <Search className="w-4 h-4" />
                                Buscar
                            </Button>
                        </div>
                        {codeError && (
                            <p className="text-sm text-red-600 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {codeError}
                            </p>
                        )}
                        {equipmentData && (
                            <div className="p-3 bg-green-50 border-2 border-green-300 rounded-lg">
                                <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                                    <CheckCircle className="w-5 h-5" />
                                    Equipo Encontrado
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Package className="w-4 h-4 text-green-600" />
                                        <span><strong>Nombre:</strong> {equipmentData.name}</span>
                                    </div>
                                    <div>
                                        <strong>Ubicación:</strong> {equipmentData.location}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Tipo de Movimiento *</Label>
                        <select
                            id="type"
                            required
                            value={formData.type}
                            onChange={(e) =>
                                setFormData({ ...formData, type: e.target.value })
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <option value="transferencia">Transferencia entre ubicaciones</option>
                            <option value="salida_temporal">Salida temporal</option>
                            <option value="retorno">Retorno</option>
                        </select>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-xs text-blue-700 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                {getTypeDescription(formData.type)}
                            </p>
                        </div>
                    </div>

                    {/* TRANSFERENCIA: Area/Location Selects */}
                    {formData.type === 'transferencia' && (
                        <div className="space-y-4">
                            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                <h4 className="font-semibold text-sm text-purple-900 mb-3">Origen</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="originAreaId">Área Origen *</Label>
                                        <select
                                            id="originAreaId"
                                            required
                                            value={formData.originAreaId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, originAreaId: e.target.value })
                                            }
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        >
                                            <option value="">Seleccione área</option>
                                            {mockAreas.filter(a => a.active).map((area) => (
                                                <option key={area.id} value={area.id}>
                                                    {area.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="originLocationId">Ubicación Origen</Label>
                                        <select
                                            id="originLocationId"
                                            value={formData.originLocationId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, originLocationId: e.target.value })
                                            }
                                            disabled={!formData.originAreaId}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="">
                                                {formData.originAreaId ? 'Solo área (sin ubicación específica)' : 'Primero seleccione área'}
                                            </option>
                                            {originLocations.map((location) => (
                                                <option key={location.id} value={location.id}>
                                                    {location.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <h4 className="font-semibold text-sm text-green-900 mb-3">Destino</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="destinationAreaId">Área Destino *</Label>
                                        <select
                                            id="destinationAreaId"
                                            required
                                            value={formData.destinationAreaId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, destinationAreaId: e.target.value })
                                            }
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        >
                                            <option value="">Seleccione área</option>
                                            {mockAreas.filter(a => a.active).map((area) => (
                                                <option key={area.id} value={area.id}>
                                                    {area.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="destinationLocationId">Ubicación Destino</Label>
                                        <select
                                            id="destinationLocationId"
                                            value={formData.destinationLocationId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, destinationLocationId: e.target.value })
                                            }
                                            disabled={!formData.destinationAreaId}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="">
                                                {formData.destinationAreaId ? 'Solo área (sin ubicación específica)' : 'Primero seleccione área'}
                                            </option>
                                            {destinationLocations.map((location) => (
                                                <option key={location.id} value={location.id}>
                                                    {location.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SALIDA TEMPORAL: External destination */}
                    {formData.type === 'salida_temporal' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="originLocation">Ubicación Origen *</Label>
                                <Input
                                    id="originLocation"
                                    required
                                    value={formData.originExternal}
                                    onChange={(e) =>
                                        setFormData({ ...formData, originExternal: e.target.value })
                                    }
                                    placeholder="Ej: UCI - Cama 3"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="destinationExternal">Destino Externo *</Label>
                                <Input
                                    id="destinationExternal"
                                    required
                                    value={formData.destinationExternal}
                                    onChange={(e) =>
                                        setFormData({ ...formData, destinationExternal: e.target.value })
                                    }
                                    placeholder="Ej: Taller de Mantenimiento XYZ"
                                />
                            </div>
                        </div>
                    )}

                    {/* RETORNO: External origin */}
                    {formData.type === 'retorno' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="originExternal">Ubicación Externa *</Label>
                                <Input
                                    id="originExternal"
                                    required
                                    value={formData.originExternal}
                                    onChange={(e) =>
                                        setFormData({ ...formData, originExternal: e.target.value })
                                    }
                                    placeholder="Ej: Taller de Mantenimiento XYZ"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="destinationLocation">Ubicación Destino *</Label>
                                <Input
                                    id="destinationLocation"
                                    required
                                    value={formData.destinationExternal}
                                    onChange={(e) =>
                                        setFormData({ ...formData, destinationExternal: e.target.value })
                                    }
                                    placeholder="Ej: Almacén Central"
                                />
                            </div>
                        </div>
                    )}

                    {/* Status Info */}
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-semibold text-sm text-yellow-900 mb-2">Estados del Movimiento</h4>
                        <ul className="text-xs text-yellow-700 space-y-1">
                            <li>• <strong>Pendiente:</strong> Movimiento programado (estado inicial)</li>
                            <li>• <strong>En Tránsito:</strong> Equipo en proceso de traslado</li>
                            <li>• <strong>Completado:</strong> Equipo en nueva ubicación</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
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

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notas</Label>
                        <textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) =>
                                setFormData({ ...formData, notes: e.target.value })
                            }
                            placeholder="Observaciones adicionales..."
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Foto de Evidencia</Label>
                        <FileUpload
                            label="Subir Foto de Evidencia"
                            accept="image/*"
                            maxSize={5}
                            onFileSelect={setEvidenceFile}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit">Registrar Movimiento</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default MovementFormModal;
