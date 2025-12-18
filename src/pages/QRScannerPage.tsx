import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, ScanLine, Info, Keyboard } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const QRScannerPage: React.FC = () => {
    const [scanning, setScanning] = useState(false);
    const [showManualInput, setShowManualInput] = useState(false);
    const [manualCode, setManualCode] = useState('');

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (manualCode.trim()) {
            toast.success(`Buscando equipo: ${manualCode}`);
            console.log('Manual code entered:', manualCode);
            setManualCode('');
            setShowManualInput(false);
            // Aquí iría la lógica para buscar el equipo
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Escanear QR</h1>
                <p className="text-muted-foreground">
                    Escanea el código QR de un equipo para ver su información
                </p>
            </div>

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
                                onChange={(e) => setManualCode(e.target.value)}
                                placeholder="Ej: VM-001, QR-VM-001"
                                autoFocus
                            />
                            <p className="text-xs text-muted-foreground">
                                Ingresa el código que aparece en la etiqueta del equipo
                            </p>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setShowManualInput(false);
                                    setManualCode('');
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
                                            <li>El sistema te mostrará la información del equipo</li>
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
                                { code: 'VM-001', name: 'Ventilador Mecánico', time: 'Hace 5 min' },
                                { code: 'MSV-045', name: 'Monitor de Signos Vitales', time: 'Hace 15 min' },
                                { code: 'DEF-012', name: 'Desfibrilador', time: 'Hace 1 hora' },
                            ].map((scan, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                                >
                                    <div>
                                        <p className="font-medium">{scan.code}</p>
                                        <p className="text-sm text-muted-foreground">{scan.name}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{scan.time}</span>
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
