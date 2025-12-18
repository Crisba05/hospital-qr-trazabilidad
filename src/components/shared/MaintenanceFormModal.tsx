import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import FileUpload from '@/components/shared/FileUpload';
import { CheckCircle, Search, AlertCircle, Package, MapPin, Wrench, FileText, Image as ImageIcon } from 'lucide-react';

interface MaintenanceFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

// Mock equipment data
const mockEquipment: Record<string, any> = {
    'VM-001': {
        code: 'VM-001',
        name: 'Ventilador Mecánico',
        brand: 'Philips',
        model: 'V60',
        area: 'UCI',
        location: 'UCI - Cama 3',
        lastMaintenance: '2024-11-15',
    },
    'MON-002': {
        code: 'MON-002',
        name: 'Monitor de Signos Vitales',
        brand: 'GE Healthcare',
        model: 'B650',
        area: 'Emergencia',
        location: 'Emergencia - Tópico 1',
        lastMaintenance: '2024-10-20',
    },
    'DEF-003': {
        code: 'DEF-003',
        name: 'Desfibrilador',
        brand: 'Zoll',
        model: 'X Series',
        area: 'Quirófano',
        location: 'Quirófano 1',
        lastMaintenance: '2024-12-01',
    },
};

const MaintenanceFormModal: React.FC<MaintenanceFormModalProps> = ({
    open,
    onOpenChange,
    onSuccess,
}) => {
    const [step, setStep] = useState(1);
    const [equipmentCode, setEquipmentCode] = useState('');
    const [equipmentData, setEquipmentData] = useState<any>(null);
    const [codeError, setCodeError] = useState('');

    const [formData, setFormData] = useState({
        type: 'preventivo',
        date: '',
        technician: '',
        description: '',
        actionsPerformed: '',
        partsUsed: '',
        observations: '',
        cost: '',
        duration: '',
    });

    const [evidenceFile, setEvidenceFile] = useState<File | null>(null);

    const handleValidateCode = () => {
        const equipment = mockEquipment[equipmentCode.toUpperCase()];
        if (equipment) {
            setEquipmentData(equipment);
            setCodeError('');
        } else {
            setEquipmentData(null);
            setCodeError('Código no encontrado. Intente con: VM-001, MON-002, DEF-003');
        }
    };

    const handleNextStep = () => {
        if (step === 1 && !equipmentData) {
            setCodeError('Debe validar un código de equipo antes de continuar');
            return;
        }
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Maintenance data:', {
            equipment: equipmentData,
            ...formData,
            evidenceFile,
        });

        if (onSuccess) {
            onSuccess();
        }

        // Reset
        setStep(1);
        setEquipmentCode('');
        setEquipmentData(null);
        setCodeError('');
        setFormData({
            type: 'preventivo',
            date: '',
            technician: '',
            description: '',
            actionsPerformed: '',
            partsUsed: '',
            observations: '',
            cost: '',
            duration: '',
        });
        setEvidenceFile(null);
        onOpenChange(false);
    };

    const steps = [
        { number: 1, title: 'Buscar Equipo', icon: Search },
        { number: 2, title: 'Información', icon: FileText },
        { number: 3, title: 'Detalles Finales', icon: CheckCircle },
    ];

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, index) => {
                const StepIcon = s.icon;
                const isActive = s.number === step;
                const isCompleted = s.number < step;

                return (
                    <div key={s.number} className="flex items-center">
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${isActive
                                    ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-110'
                                    : isCompleted
                                        ? 'bg-green-500 text-white border-green-500'
                                        : 'bg-muted text-muted-foreground border-muted-foreground/30'
                                    }`}
                            >
                                {isCompleted ? (
                                    <CheckCircle className="w-6 h-6" />
                                ) : (
                                    <StepIcon className="w-6 h-6" />
                                )}
                            </div>
                            <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                                {s.title}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`w-16 h-1 mx-2 mb-6 rounded transition-all ${isCompleted ? 'bg-green-500' : 'bg-muted'
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Registrar Mantenimiento</DialogTitle>
                    <DialogDescription>
                        {step === 1 && 'Paso 1: Buscar y validar equipo'}
                        {step === 2 && 'Paso 2: Información del mantenimiento'}
                        {step === 3 && 'Paso 3: Detalles finales y confirmación'}
                    </DialogDescription>
                </DialogHeader>

                {renderStepIndicator()}

                <div className="space-y-6">
                    {/* STEP 1: Equipment Search */}
                    {step === 1 && (
                        <div className="space-y-4">
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
                                        Validar
                                    </Button>
                                </div>
                                {codeError && (
                                    <p className="text-sm text-red-600 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {codeError}
                                    </p>
                                )}
                            </div>

                            {equipmentData && (
                                <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg space-y-3">
                                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                                        <CheckCircle className="w-5 h-5" />
                                        Equipo Encontrado
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 bg-white rounded border">
                                            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                                <Package className="w-3 h-3" />
                                                Equipo
                                            </p>
                                            <p className="font-semibold">{equipmentData.name}</p>
                                        </div>
                                        <div className="p-3 bg-white rounded border">
                                            <p className="text-xs text-muted-foreground mb-1">Marca/Modelo</p>
                                            <p className="font-semibold">{equipmentData.brand} {equipmentData.model}</p>
                                        </div>
                                        <div className="p-3 bg-white rounded border">
                                            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                Ubicación
                                            </p>
                                            <p className="font-semibold">{equipmentData.location}</p>
                                        </div>
                                        <div className="p-3 bg-white rounded border">
                                            <p className="text-xs text-muted-foreground mb-1">Último Mantenimiento</p>
                                            <p className="font-semibold">{equipmentData.lastMaintenance}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 2: Maintenance Info */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Tipo de Mantenimiento *</Label>
                                    <select
                                        id="type"
                                        value={formData.type}
                                        onChange={(e) =>
                                            setFormData({ ...formData, type: e.target.value })
                                        }
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="preventivo">Preventivo</option>
                                        <option value="correctivo">Correctivo</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date">Fecha *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) =>
                                            setFormData({ ...formData, date: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="technician">Técnico Responsable *</Label>
                                <Input
                                    id="technician"
                                    value={formData.technician}
                                    onChange={(e) =>
                                        setFormData({ ...formData, technician: e.target.value })
                                    }
                                    placeholder="Ej: Ing. Carlos López"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción del Problema *</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    placeholder="Describa el problema encontrado..."
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="actionsPerformed">Acciones Realizadas *</Label>
                                <Textarea
                                    id="actionsPerformed"
                                    value={formData.actionsPerformed}
                                    onChange={(e) =>
                                        setFormData({ ...formData, actionsPerformed: e.target.value })
                                    }
                                    placeholder="Describa las acciones realizadas..."
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="partsUsed">Repuestos Utilizados</Label>
                                <Textarea
                                    id="partsUsed"
                                    value={formData.partsUsed}
                                    onChange={(e) =>
                                        setFormData({ ...formData, partsUsed: e.target.value })
                                    }
                                    placeholder="Liste los repuestos utilizados..."
                                    rows={2}
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Final Details */}
                    {step === 3 && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cost">Costo (S/)</Label>
                                    <Input
                                        id="cost"
                                        type="number"
                                        step="0.01"
                                        value={formData.cost}
                                        onChange={(e) =>
                                            setFormData({ ...formData, cost: e.target.value })
                                        }
                                        placeholder="0.00"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duración (horas)</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        step="0.5"
                                        value={formData.duration}
                                        onChange={(e) =>
                                            setFormData({ ...formData, duration: e.target.value })
                                        }
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="observations">Observaciones</Label>
                                <Textarea
                                    id="observations"
                                    value={formData.observations}
                                    onChange={(e) =>
                                        setFormData({ ...formData, observations: e.target.value })
                                    }
                                    placeholder="Observaciones adicionales..."
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    Foto de Evidencia (opcional)
                                </Label>
                                <FileUpload
                                    label="Subir Foto de Evidencia"
                                    accept="image/*"
                                    maxSize={5}
                                    onFileSelect={setEvidenceFile}
                                />
                            </div>

                            {/* Summary */}
                            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                    <Wrench className="w-5 h-5" />
                                    Resumen del Mantenimiento
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Equipo:</strong> {equipmentData?.name} ({equipmentData?.code})</p>
                                    <p><strong>Tipo:</strong> {formData.type === 'preventivo' ? 'Preventivo' : 'Correctivo'}</p>
                                    <p><strong>Técnico:</strong> {formData.technician}</p>
                                    <p><strong>Fecha:</strong> {formData.date}</p>
                                    {formData.cost && <p><strong>Costo:</strong> S/ {formData.cost}</p>}
                                    {formData.duration && <p><strong>Duración:</strong> {formData.duration} horas</p>}
                                    {evidenceFile && <p><strong>Evidencia:</strong> {evidenceFile.name}</p>}
                                </div>
                            </div>

                            <DialogFooter className="gap-2">
                                <Button type="button" variant="outline" onClick={handlePrevStep}>
                                    Anterior
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit">Registrar Mantenimiento</Button>
                            </DialogFooter>
                        </form>
                    )}

                    {/* Footer for steps 1 and 2 */}
                    {step < 3 && (
                        <DialogFooter className="gap-2">
                            {step > 1 && (
                                <Button type="button" variant="outline" onClick={handlePrevStep}>
                                    Anterior
                                </Button>
                            )}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancelar
                            </Button>
                            <Button type="button" onClick={handleNextStep}>
                                Siguiente
                            </Button>
                        </DialogFooter>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MaintenanceFormModal;
