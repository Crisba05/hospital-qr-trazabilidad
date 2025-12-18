import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Equipment } from '@/types';
import {
    Calendar,
    MapPin,
    User,
    Wrench,
    QrCode,
    Package,
    Hash,
    Tag,
    Building2,
    UserCircle,
    Clock,
    TrendingUp
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface EquipmentDetailModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    equipment: Equipment | null;
    onShowQR?: () => void;
}

const EquipmentDetailModal: React.FC<EquipmentDetailModalProps> = ({
    open,
    onOpenChange,
    equipment,
    onShowQR,
}) => {
    if (!equipment) return null;

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { label: string; color: string }> = {
            operativo: { label: 'Operativo', color: 'bg-green-100 text-green-800 border-green-300' },
            mantenimiento: { label: 'Mantenimiento', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
            fuera_servicio: { label: 'Fuera de Servicio', color: 'bg-red-100 text-red-800 border-red-300' },
            calibracion: { label: 'Calibración', color: 'bg-blue-100 text-blue-800 border-blue-300' },
        };
        return variants[status] || variants.operativo;
    };

    const getCriticalityBadge = (criticality: string) => {
        const variants: Record<string, { label: string; color: string }> = {
            alta: { label: 'Alta', color: 'bg-red-100 text-red-800 border-red-300' },
            media: { label: 'Media', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
            baja: { label: 'Baja', color: 'bg-gray-100 text-gray-800 border-gray-300' },
        };
        return variants[criticality] || variants.media;
    };

    const statusInfo = getStatusBadge(equipment.status);
    const criticalityInfo = getCriticalityBadge(equipment.criticality);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Package className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl">{equipment.name}</DialogTitle>
                                <p className="text-muted-foreground mt-1">
                                    {equipment.brand} - {equipment.model}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Badge className={criticalityInfo.color + ' border px-3 py-1'}>
                                {criticalityInfo.label}
                            </Badge>
                            <Badge className={statusInfo.color + ' border px-3 py-1'}>
                                {statusInfo.label}
                            </Badge>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Identification Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Hash className="w-5 h-5 text-primary" />
                            Identificación
                        </h3>
                        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg border">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    Código
                                </p>
                                <p className="font-semibold text-lg">{equipment.code}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Hash className="w-4 h-4" />
                                    Código Patrimonial
                                </p>
                                <p className="font-semibold text-lg">{equipment.patrimonialCode}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Hash className="w-4 h-4" />
                                    Número de Serie
                                </p>
                                <p className="font-medium">{equipment.serial}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Package className="w-4 h-4" />
                                    Tipo de Equipo
                                </p>
                                <p className="font-medium">{equipment.type}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Location Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            Ubicación Actual
                        </h3>
                        <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="space-y-1">
                                <p className="text-sm text-blue-700 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    Ubicación
                                </p>
                                <p className="font-semibold text-blue-900">{equipment.location}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-blue-700 flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    Área
                                </p>
                                <p className="font-semibold text-blue-900">{equipment.area}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Responsible Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <UserCircle className="w-5 h-5 text-primary" />
                            Responsable
                        </h3>
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <p className="font-semibold text-purple-900 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {equipment.responsible}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Maintenance Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Wrench className="w-5 h-5 text-primary" />
                            Información de Mantenimiento
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-sm text-green-700 mb-1 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Último Mantenimiento
                                </p>
                                <p className="font-semibold text-green-900">
                                    {equipment.lastMaintenance || 'No registrado'}
                                </p>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                                <p className="text-sm text-orange-700 mb-1 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Próximo Mantenimiento
                                </p>
                                <p className="font-semibold text-orange-900">
                                    {equipment.nextMaintenance || 'No programado'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Dates Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Fechas Importantes
                        </h3>
                        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg border">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Fecha de Adquisición</p>
                                <p className="font-medium">{equipment.acquisitionDate}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Última Actualización</p>
                                <p className="font-medium">{equipment.updatedAt}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => onOpenChange(false)}
                        >
                            Cerrar
                        </Button>
                        {onShowQR && (
                            <Button
                                className="flex-1 gap-2"
                                onClick={() => {
                                    onShowQR();
                                    onOpenChange(false);
                                }}
                            >
                                <QrCode className="w-4 h-4" />
                                Ver Código QR
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EquipmentDetailModal;
