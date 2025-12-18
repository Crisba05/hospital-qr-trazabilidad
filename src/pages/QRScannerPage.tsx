import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, ScanLine, Info, Keyboard, CheckCircle, XCircle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import EquipmentInfoModal from '@/components/shared/EquipmentInfoModal';

// Mock data
const mockEquipmentData: Record<string, any> = {
    'VM-001': {
        code: 'VM-001',
        name: 'Ventilador Mecánico',
        brand: 'Philips',
        model: 'V60',
        serialNumber: 'VM2024001',
        status: 'Operativo',
        criticality: 'Alta',
        area: 'UCI',
        location: 'UCI - Cama 3',
        acquisitionDate: '2023-01-15',
        lastMaintenance: '2024-11-15',
        nextMaintenance: '2025-02-15',
        certificationStatus: 'Vigente',
        certificationExpiry: '2025-06-30',
    },
    'MSV-045': {
        code: 'MSV-045',
        name: 'Monitor de Signos Vitales',
        brand: 'GE Healthcare',
        model: 'B650',
        serialNumber: 'MSV2024045',
        status: 'Operativo',
        criticality: 'Media',
        area: 'Emergencia',
        location: 'Emergencia - Tópico 1',
        acquisitionDate: '2023-06-20',
        lastMaintenance: '2024-10-20',
        nextMaintenance: '2025-01-20',
        certificationStatus: 'Vigente',
        certificationExpiry: '2025-04-15',
    },
    'DEF-012': {
        code: 'DEF-012',
        name: 'Desfibrilador',
        brand: 'Zoll',
        model: 'X Series',
        serialNumber: 'DEF2024012',
        status: 'Mantenimiento',
        criticality: 'Alta',
        area: 'Quirófano',
        location: 'Quirófano 1',
        acquisitionDate: '2022-11-10',
        lastMaintenance: '2024-12-01',
        nextMaintenance: '2025-03-01',
        certificationStatus: 'Por Vencer',
        certificationExpiry: '2025-01-10',
    },
};

const mockMovements = [
    {
        id: '1',
        type: 'Transferencia',
        from: 'UCI - Cama 2',
        to: 'UCI - Cama 3',
        date: '2024-12-15 14:30',
        responsible: 'Ing. Carlos López',
    },
    {
        id: '2',
        type: 'Salida Temporal',
        from: 'UCI - Cama 3',
        to: 'Mantenimiento Externo',
        date: '2024-11-20 09:00',
        responsible: 'Ing. María Torres',
    },
    {
        id: '3',
        type: 'Retorno',
        from: 'Mantenimiento Externo',
        to: 'UCI - Cama 3',
        date: '2024-11-25 16:00',
        responsible: 'Ing. Carlos López',
    },
];

const mockMaintenances = [
    {
        id: '1',
        type: 'Preventivo',
        date: '2024-11-15',
        technician: 'Ing. Carlos López',
        description: 'Revisión general del sistema de ventilación y calibración de sensores',
        cost: '350.00',
        duration: '2.5',
    },
    {
        id: '2',
        type: 'Correctivo',
        date: '2024-09-10',
        technician: 'Ing. María Torres',
        description: 'Reemplazo de filtro HEPA y ajuste de presión',
        cost: '580.00',
        duration: '3.0',
    },
];

const mockCertifications = [
    {
        id: '1',
        type: 'Calibración',
        issueDate: '2024-06-15',
        expirationDate: '2025-06-30',
        issuedBy: 'INDECOPI',
        status: 'Vigente',
    },
    {
        id: '2',
        type: 'Certificación Biomédica',
        issueDate: '2024-01-10',
        expirationDate: '2025-01-10',
        issuedBy: 'Ministerio de Salud',
        status: 'Vigente',
    },
];

const QRScannerPage: React.FC = () => {
    const [scanning, setScanning] = useState(false);
    const [showManualInput, setShowManualInput] = useState(false);
    const [manualCode, setManualCode] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
    const [showEquipmentInfo, setShowEquipmentInfo] = useState(false);
    const [searchError, setSearchError] = useState('');

    const handleEquipmentFound = (code: string) => {
        const equipment = mockEquipmentData[code.toUpperCase()];
        if (equipment) {
            setSelectedEquipment(equipment);
            setShowEquipmentInfo(true);
            setSearchError('');
            toast.success(`Equipo encontrado: ${equipment.name}`);
        } else {
            setSearchError('Equipo no encontrado');
            toast.error(`No se encontró el equipo con código: ${code}`);
        }
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (manualCode.trim()) {
            handleEquipmentFound(manualCode.trim());
            setManualCode('');
            setShowManualInput(false);
        }
    };

    const handleRecentScanClick = (code: string) => {
        handleEquipmentFound(code);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Escanear QR</h1>
                <p className="text-muted-foreground">
                    Escanea el código QR de un equipo para ver su información completa
                </p>
            </div>

            {/* Equipment Info Modal */}
            <EquipmentInfoModal
                open={showEquipmentInfo}
                onOpenChange={setShowEquipmentInfo}
                equipment={selectedEquipment}
                movements={mockMovements}
                maintenances={mockMaintenances}
                certifications={mockCertifications}
            />

            {/* Manual Input Dialog */}
            <Dialog open={showManualInput} onOpenChange={setShowManualInput}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Keyboard className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <DialogTitle>Ingresar Código Manualmente</DialogTitle>
                                <DialogDescription>
                                    Ingresa el código del equipo
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <form onSubmit={handleManualSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="manualCode">Código del Equipo *</Label>
                            <Input
                                id="manualCode"
                                required
                                value={manualCode}
                                onChange={(e) => {
                                    setManualCode(e.target.value);
                                    setSearchError('');
                                }}
                                placeholder="Ej: VM-001, MSV-045, DEF-012"
                                autoFocus
                            />
                            {searchError && (
                                <p className="text-sm text-red-600 flex items-center gap-2">
                                    <XCircle className="w-4 h-4" />
                                    {searchError}
                                </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                                Ingresa el código que aparece en la etiqueta del equipo
                            </p>
                        </div>

                        {/* Códigos de ejemplo */}
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-xs font-semibold text-blue-900 mb-2">Códigos de prueba:</p>
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(mockEquipmentData).map((code) => (
                                    <button
                                        key={code}
                                        type="button"
                                        onClick={() => setManualCode(code)}
                                        className="px-2 py-1 bg-white border border-blue-300 rounded text-xs text-blue-700 hover:bg-blue-100 transition-colors"
                                    >
                                        {code}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setShowManualInput(false);
                                    setManualCode('');
                                    setSearchError('');
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit">Buscar Equipo</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Scanner Card */}
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ScanLine className="w-5 h-5" />
                            Escáner de Códigos QR
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Scanner Area */}
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                            {!scanning ? (
                                <div className="text-center space-y-4 p-8">
                                    <Camera className="w-16 h-16 mx-auto text-muted-foreground" />
                                    <div>
                                        <h3 className="font-semibold mb-2">Listo para escanear</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Haz clic en el botón para activar la cámara
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center space-y-4 p-8">
                                    <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-sm text-muted-foreground">
                                        Apunta la cámara al código QR...
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button
                                onClick={() => setScanning(!scanning)}
                                className="w-full"
                                size="lg"
                            >
                                <Camera className="w-4 h-4 mr-2" />
                                {scanning ? 'Detener Escaneo' : 'Iniciar Escaneo'}
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => setShowManualInput(true)}
                                className="w-full"
                                size="lg"
                            >
                                <Keyboard className="w-4 h-4 mr-2" />
                                Ingresar Código Manualmente
                            </Button>
                        </div>

                        {/* Info */}
                        <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="pt-6">
                                <div className="flex gap-3">
                                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                    <div className="text-sm space-y-2">
                                        <p className="font-medium text-blue-900">Instrucciones:</p>
                                        <ul className="list-disc list-inside space-y-1 text-blue-700">
                                            <li>Asegúrate de tener buena iluminación</li>
                                            <li>Mantén el código QR dentro del marco</li>
                                            <li>Espera a que se detecte automáticamente</li>
                                            <li>El sistema te mostrará toda la información del equipo</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Scans */}
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Escaneos Recientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { code: 'VM-001', name: 'Ventilador Mecánico', time: 'Hace 5 min', status: 'Operativo' },
                                { code: 'MSV-045', name: 'Monitor de Signos Vitales', time: 'Hace 15 min', status: 'Operativo' },
                                { code: 'DEF-012', name: 'Desfibrilador', time: 'Hace 1 hora', status: 'Mantenimiento' },
                            ].map((scan, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleRecentScanClick(scan.code)}
                                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                            <ScanLine className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{scan.code}</p>
                                            <p className="text-sm text-muted-foreground">{scan.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            {scan.status === 'Operativo' ? (
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <Info className="w-4 h-4 text-yellow-600" />
                                            )}
                                            <span className="text-xs text-muted-foreground">{scan.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default QRScannerPage;
