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
    TruckIcon,
    Package,
    MapPin,
    Calendar,
    User,
    CheckCircle2,
    Clock,
    FileText,
    Image as ImageIcon,
    ArrowRight
} from 'lucide-react';

interface MovementDetailModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    movement: {
        id: string;
        equipment: string;
        type: string;
        from: string;
        to: string;
        responsible: string;
        date: string;
        status: string;
        notes?: string;
        evidencePhoto?: string;
    } | null;
}

const MovementDetailModal: React.FC<MovementDetailModalProps> = ({
    open,
    onOpenChange,
    movement,
}) => {
    if (!movement) return null;

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

    const statusInfo = getStatusBadge(movement.status);
    const typeInfo = getTypeBadge(movement.type);
    const StatusIcon = statusInfo.icon;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <TruckIcon className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl">Detalle de Movimiento</DialogTitle>
                                <p className="text-muted-foreground mt-1">{movement.date}</p>
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
                            <p className="font-semibold text-blue-900 text-lg">{movement.equipment}</p>
                        </div>
                    </div>

                    <Separator />

                    {/* Movement Timeline */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            Ruta del Movimiento
                        </h3>
                        <div className="relative">
                            <div className="flex items-center gap-4">
                                {/* Origin */}
                                <div className="flex-1 p-4 bg-red-50 rounded-lg border-2 border-red-200">
                                    <p className="text-xs text-red-700 mb-1 font-medium">Origen</p>
                                    <p className="font-semibold text-red-900">{movement.from}</p>
                                </div>

                                {/* Arrow */}
                                <div className="flex-shrink-0">
                                    <ArrowRight className="w-8 h-8 text-primary" />
                                </div>

                                {/* Destination */}
                                <div className="flex-1 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                                    <p className="text-xs text-green-700 mb-1 font-medium">Destino</p>
                                    <p className="font-semibold text-green-900">{movement.to}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Responsible and Date */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            Información del Movimiento
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                <p className="text-sm text-purple-700 mb-1 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Responsable
                                </p>
                                <p className="font-semibold text-purple-900">{movement.responsible}</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm text-blue-700 mb-1 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Fecha y Hora
                                </p>
                                <p className="font-semibold text-blue-900">{movement.date}</p>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {movement.notes && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Notas</h3>
                                <div className="p-4 bg-muted/50 rounded-lg border">
                                    <p className="text-sm">{movement.notes}</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Evidence Photo */}
                    {movement.evidencePhoto && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5 text-primary" />
                                    Foto de Evidencia
                                </h3>
                                <div className="rounded-lg border overflow-hidden">
                                    <img
                                        src={movement.evidencePhoto}
                                        alt="Evidencia de movimiento"
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

export default MovementDetailModal;
