import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Calendar, FileText, Download, Building2, Hash, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface CertificateViewerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    certificate: {
        id: string;
        equipment: string;
        type: string;
        certificateNumber: string;
        issueDate: string;
        expirationDate: string;
        issuedBy: string;
        status: string;
    } | null;
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({
    open,
    onOpenChange,
    certificate,
}) => {
    if (!certificate) return null;

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { label: string; color: string; icon: any }> = {
            vigente: { label: 'Vigente', color: 'bg-green-100 text-green-800 border-green-300', icon: CheckCircle2 },
            por_vencer: { label: 'Por Vencer', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: AlertCircle },
            vencida: { label: 'Vencida', color: 'bg-red-100 text-red-800 border-red-300', icon: AlertCircle },
        };
        return variants[status] || variants.vigente;
    };

    const statusInfo = getStatusBadge(certificate.status);
    const StatusIcon = statusInfo.icon;

    const daysUntilExpiration = () => {
        const today = new Date();
        const expiration = new Date(certificate.expirationDate);
        const diffTime = expiration.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const days = daysUntilExpiration();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Award className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl">Certificado / Calibración</DialogTitle>
                                <p className="text-muted-foreground mt-1">{certificate.type}</p>
                            </div>
                        </div>
                        <Badge className={statusInfo.color + ' border px-3 py-1 flex items-center gap-1'}>
                            <StatusIcon className="w-4 h-4" />
                            {statusInfo.label}
                        </Badge>
                    </div>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Equipment Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            Equipo
                        </h3>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="font-semibold text-blue-900 text-lg">{certificate.equipment}</p>
                        </div>
                    </div>

                    <Separator />

                    {/* Certificate Details */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Hash className="w-5 h-5 text-primary" />
                            Información del Certificado
                        </h3>
                        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg border">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Hash className="w-4 h-4" />
                                    Número de Certificado
                                </p>
                                <p className="font-semibold text-lg">{certificate.certificateNumber}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    Emitido Por
                                </p>
                                <p className="font-semibold text-lg">{certificate.issuedBy}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Dates */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Vigencia
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-sm text-green-700 mb-1 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Fecha de Emisión
                                </p>
                                <p className="font-semibold text-green-900">{certificate.issueDate}</p>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                                <p className="text-sm text-orange-700 mb-1 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Fecha de Vencimiento
                                </p>
                                <p className="font-semibold text-orange-900">{certificate.expirationDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Expiration Alerts */}
                    {days > 0 && days <= 30 && (
                        <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-yellow-900 text-lg">
                                        Vence en {days} día{days !== 1 ? 's' : ''}
                                    </p>
                                    <p className="text-sm text-yellow-700 mt-1">
                                        Se recomienda renovar este certificado pronto para mantener el equipo en cumplimiento
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {days <= 0 && (
                        <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-red-900 text-lg">
                                        Certificado Vencido
                                    </p>
                                    <p className="text-sm text-red-700 mt-1">
                                        Este certificado venció hace {Math.abs(days)} día{Math.abs(days) !== 1 ? 's' : ''}.
                                        El equipo no debe ser utilizado hasta renovar la certificación.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {days > 30 && (
                        <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-green-900 text-lg">
                                        Certificado Vigente
                                    </p>
                                    <p className="text-sm text-green-700 mt-1">
                                        Este certificado está vigente y vence en {days} días
                                    </p>
                                </div>
                            </div>
                        </div>
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
                        <Button className="flex-1 gap-2">
                            <Download className="w-4 h-4" />
                            Descargar Certificado
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CertificateViewer;
