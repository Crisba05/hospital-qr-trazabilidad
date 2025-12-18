import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Package,
    MapPin,
    Calendar,
    Wrench,
    FileCheck,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    Clock,
    DollarSign,
    User,
    Building,
    Activity,
} from 'lucide-react';

interface Equipment {
    code: string;
    name: string;
    brand: string;
    model: string;
    serialNumber: string;
    status: string;
    criticality: string;
    area: string;
    location: string;
    acquisitionDate: string;
    lastMaintenance: string;
    nextMaintenance: string;
    certificationStatus: string;
    certificationExpiry: string;
}

interface Movement {
    id: string;
    type: string;
    from: string;
    to: string;
    date: string;
    responsible: string;
}

interface Maintenance {
    id: string;
    type: string;
    date: string;
    technician: string;
    description: string;
    cost: string;
    duration: string;
}

interface Certification {
    id: string;
    type: string;
    issueDate: string;
    expirationDate: string;
    issuedBy: string;
    status: string;
}

interface EquipmentInfoModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    equipment: Equipment | null;
    movements?: Movement[];
    maintenances?: Maintenance[];
    certifications?: Certification[];
}

const EquipmentInfoModal: React.FC<EquipmentInfoModalProps> = ({
    open,
    onOpenChange,
    equipment,
    movements = [],
    maintenances = [],
    certifications = [],
}) => {
    if (!equipment) return null;

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'operativo':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'mantenimiento':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'fuera_servicio':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getCriticalityColor = (criticality: string) => {
        switch (criticality.toLowerCase()) {
            case 'alta':
                return 'bg-red-100 text-red-800';
            case 'media':
                return 'bg-yellow-100 text-yellow-800';
            case 'baja':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Package className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl">{equipment.name}</DialogTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Código: {equipment.code}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                            <Badge className={getStatusColor(equipment.status) + ' border'}>
                                {equipment.status}
                            </Badge>
                            <Badge className={getCriticalityColor(equipment.criticality)}>
                                Criticidad: {equipment.criticality}
                            </Badge>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Información General */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-primary" />
                            Información General
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-3">
                                        <Package className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Marca/Modelo</p>
                                            <p className="font-semibold">{equipment.brand} {equipment.model}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-3">
                                        <FileCheck className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Número de Serie</p>
                                            <p className="font-semibold">{equipment.serialNumber}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-3">
                                        <Building className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Área</p>
                                            <p className="font-semibold">{equipment.area}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Ubicación Actual</p>
                                            <p className="font-semibold">{equipment.location}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Fecha de Adquisición</p>
                                            <p className="font-semibold">{equipment.acquisitionDate}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Separator />

                    {/* Mantenimiento */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Wrench className="w-5 h-5 text-primary" />
                            Mantenimiento
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <Card className="border-l-4 border-l-blue-500">
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Último Mantenimiento</p>
                                            <p className="font-semibold text-blue-900">{equipment.lastMaintenance}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-orange-500">
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Próximo Mantenimiento</p>
                                            <p className="font-semibold text-orange-900">{equipment.nextMaintenance}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {maintenances.length > 0 && (
                            <div className="space-y-3">
                                <p className="text-sm font-medium text-muted-foreground">Historial Reciente</p>
                                {maintenances.slice(0, 3).map((maintenance) => (
                                    <Card key={maintenance.id} className="hover:bg-muted/50 transition-colors">
                                        <CardContent className="pt-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-start gap-3 flex-1">
                                                    <Wrench className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                                                    <div className="space-y-1 flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="outline">{maintenance.type}</Badge>
                                                            <span className="text-sm text-muted-foreground">{maintenance.date}</span>
                                                        </div>
                                                        <p className="text-sm">{maintenance.description}</p>
                                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                            <span className="flex items-center gap-1">
                                                                <User className="w-3 h-3" />
                                                                {maintenance.technician}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <DollarSign className="w-3 h-3" />
                                                                S/ {maintenance.cost}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {maintenance.duration}h
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Certificaciones */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <FileCheck className="w-5 h-5 text-primary" />
                            Certificaciones
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <Card className={`border-l-4 ${equipment.certificationStatus === 'Vigente' ? 'border-l-green-500' : 'border-l-red-500'}`}>
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-3">
                                        {equipment.certificationStatus === 'Vigente' ? (
                                            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                        )}
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Estado de Certificación</p>
                                            <p className={`font-semibold ${equipment.certificationStatus === 'Vigente' ? 'text-green-900' : 'text-red-900'}`}>
                                                {equipment.certificationStatus}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-purple-500">
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Vencimiento</p>
                                            <p className="font-semibold text-purple-900">{equipment.certificationExpiry}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {certifications.length > 0 && (
                            <div className="space-y-3">
                                <p className="text-sm font-medium text-muted-foreground">Certificados Activos</p>
                                {certifications.slice(0, 3).map((cert) => (
                                    <Card key={cert.id} className="hover:bg-muted/50 transition-colors">
                                        <CardContent className="pt-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-start gap-3 flex-1">
                                                    <FileCheck className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                                                    <div className="space-y-1 flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-medium">{cert.type}</p>
                                                            <Badge variant={cert.status === 'Vigente' ? 'default' : 'destructive'}>
                                                                {cert.status}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                            <span>Emitido: {cert.issueDate}</span>
                                                            <span>Vence: {cert.expirationDate}</span>
                                                            <span>Por: {cert.issuedBy}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Movimientos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Historial de Movimientos
                        </h3>
                        {movements.length > 0 ? (
                            <div className="space-y-3">
                                {movements.slice(0, 5).map((movement, index) => (
                                    <Card key={movement.id} className="hover:bg-muted/50 transition-colors">
                                        <CardContent className="pt-4">
                                            <div className="flex items-start gap-3">
                                                <div className="relative">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <MapPin className="w-4 h-4 text-primary" />
                                                    </div>
                                                    {index < movements.length - 1 && (
                                                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-border"></div>
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <Badge variant="outline">{movement.type}</Badge>
                                                        <span className="text-xs text-muted-foreground">{movement.date}</span>
                                                    </div>
                                                    <div className="text-sm">
                                                        <p><span className="text-muted-foreground">De:</span> <span className="font-medium">{movement.from}</span></p>
                                                        <p><span className="text-muted-foreground">A:</span> <span className="font-medium">{movement.to}</span></p>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <User className="w-3 h-3" />
                                                        {movement.responsible}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-center text-muted-foreground">No hay movimientos registrados</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EquipmentInfoModal;
