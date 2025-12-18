import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Wrench,
    Package,
    FileText,
    Calendar,
    User,
    CheckCircle2,
    Clock,
    Image as ImageIcon,
    DollarSign,
    Timer,
    Wrench as WrenchIcon,
    AlertCircle
} from 'lucide-react';

interface MaintenanceDetailModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    maintenance: {
        id: string;
        equipment: string;
        type: string;
        workOrder: string;
        date: string;
        technician: string;
        status: string;
        description?: string;
        actionsPerformed?: string;
        partsUsed?: string;
        observations?: string;
        cost?: number;
        duration?: number; // en horas
        evidencePhoto?: string;
    } | null;
}

const MaintenanceDetailModal: React.FC<MaintenanceDetailModalProps> = ({
    open,
    onOpenChange,
    maintenance,
}) => {
    if (!maintenance) return null;

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

    const statusInfo = getStatusBadge(maintenance.status);
    const typeInfo = getTypeBadge(maintenance.type);
    const StatusIcon = statusInfo.icon;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Wrench className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl">Detalle de Mantenimiento</DialogTitle>
                                <p className="text-muted-foreground mt-1">{maintenance.workOrder}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Badge className={typeInfo.color + ' border px-3 py-1'}>
                                {typeInfo.label}
                            </Badge>
                            <Badge className={statusInfo.color + ' border px-3 py-1 flex items-center gap-1'}>
                                <StatusIcon className="w-3 h-3" />
                                {statusInfo.label}
                            </Badge>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Equipment Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Package className="w-5 h-5 text-primary" />
                            Equipo
                        </h3>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="font-semibold text-blue-900 text-lg">{maintenance.equipment}</p>
                        </div>
                    </div>

                    <Separator />

                    {/* Work Order Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            Información del Trabajo
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-muted/50 rounded-lg border">
                                <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                                    <FileText className="w-4 h-4" />
                                    Orden de Trabajo
                                </p>
                                <p className="font-semibold text-lg">{maintenance.workOrder}</p>
                            </div>
                            <div className="p-4 bg-muted/50 rounded-lg border">
                                <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                                    <Calendar className="w-4 h-4" />
                                    Fecha
                                </p>
                                <p className="font-semibold text-lg">{maintenance.date}</p>
                            </div>
                            {maintenance.duration && (
                                <div className="p-4 bg-muted/50 rounded-lg border">
                                    <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                                        <Timer className="w-4 h-4" />
                                        Duración
                                    </p>
                                    <p className="font-semibold text-lg">{maintenance.duration} horas</p>
                                </div>
                            )}
                            {maintenance.cost && (
                                <div className="p-4 bg-muted/50 rounded-lg border">
                                    <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                                        <DollarSign className="w-4 h-4" />
                                        Costo
                                    </p>
                                    <p className="font-semibold text-lg">S/ {maintenance.cost.toFixed(2)}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Technician */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            Técnico Responsable
                        </h3>
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <p className="font-semibold text-purple-900">{maintenance.technician}</p>
                        </div>
                    </div>

                    {/* Description */}
                    {maintenance.description && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-primary" />
                                    Descripción del Problema
                                </h3>
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                    <p className="text-sm text-red-900">{maintenance.description}</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Actions Performed */}
                    {maintenance.actionsPerformed && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <WrenchIcon className="w-5 h-5 text-primary" />
                                    Acciones Realizadas
                                </h3>
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-sm text-green-900 whitespace-pre-line">{maintenance.actionsPerformed}</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Parts Used */}
                    {maintenance.partsUsed && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-primary" />
                                    Repuestos Utilizados
                                </h3>
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-sm text-blue-900 whitespace-pre-line">{maintenance.partsUsed}</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Observations */}
                    {maintenance.observations && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Observaciones</h3>
                                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <p className="text-sm text-yellow-900 whitespace-pre-line">{maintenance.observations}</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Evidence Photo */}
                    {maintenance.evidencePhoto && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5 text-primary" />
                                    Foto de Evidencia
                                </h3>
                                <div className="rounded-lg border overflow-hidden">
                                    <img
                                        src={maintenance.evidencePhoto}
                                        alt="Evidencia de mantenimiento"
                                        className="w-full h-auto max-h-96 object-contain bg-muted"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => onOpenChange(false)}
                        >
                            Cerrar
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MaintenanceDetailModal;
