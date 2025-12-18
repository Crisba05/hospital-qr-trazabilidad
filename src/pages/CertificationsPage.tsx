import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Award, AlertTriangle, CheckCircle2, Search, Filter } from 'lucide-react';
import CertificationFormModal from '@/components/shared/CertificationFormModal';
import CertificateViewer from '@/components/shared/CertificateViewer';
import FilterDialog from '@/components/shared/FilterDialog';
import { toast } from 'sonner';

const CertificationsPage: React.FC = () => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showCertViewer, setShowCertViewer] = useState(false);
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCert, setSelectedCert] = useState<any>(null);
    const [activeFilters, setActiveFilters] = useState<any>({
        status: [],
    });

    const certifications = [
        {
            id: '1',
            equipment: 'Ventilador Mecánico VM-001',
            type: 'Calibración',
            issueDate: '2024-06-15',
            expirationDate: '2025-06-15',
            issuedBy: 'INDECOPI',
            certificateNumber: 'CERT-2024-VM-001',
            status: 'vigente',
            daysToExpire: 180,
        },
        {
            id: '2',
            equipment: 'Monitor de Signos Vitales MSV-045',
            type: 'Verificación Metrológica',
            issueDate: '2024-08-20',
            expirationDate: '2025-08-20',
            issuedBy: 'INACAL',
            certificateNumber: 'CERT-2024-MSV-045',
            status: 'vigente',
            daysToExpire: 245,
        },
        {
            id: '3',
            equipment: 'Electrocardiógrafo ECG-023',
            type: 'Calibración',
            issueDate: '2024-01-10',
            expirationDate: '2024-12-25',
            issuedBy: 'INDECOPI',
            certificateNumber: 'CERT-2024-ECG-023',
            status: 'por_vencer',
            daysToExpire: 7,
        },
        {
            id: '4',
            equipment: 'Desfibrilador DEF-015',
            type: 'Seguridad Eléctrica',
            issueDate: '2023-11-05',
            expirationDate: '2024-11-05',
            issuedBy: 'SGS',
            certificateNumber: 'CERT-2023-DEF-015',
            status: 'vencida',
            daysToExpire: -43,
        },
    ];

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { label: string; icon: any; color: string }> = {
            vigente: { label: 'Vigente', icon: CheckCircle2, color: 'bg-green-100 text-green-800 border-green-300' },
            por_vencer: { label: 'Por Vencer', icon: AlertTriangle, color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
            vencida: { label: 'Vencida', icon: AlertTriangle, color: 'bg-red-100 text-red-800 border-red-300' },
        };
        return variants[status];
    };

    const handleViewCertificate = (cert: any) => {
        setSelectedCert(cert);
        setShowCertViewer(true);
    };

    const handleApplyFilters = (filters: any) => {
        setActiveFilters(filters);
        toast.success('Filtros aplicados');
    };

    const filteredCertifications = certifications.filter((cert) => {
        const matchesSearch =
            cert.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.issuedBy.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = activeFilters.status?.length === 0 ||
            activeFilters.status?.includes(cert.status);

        return matchesSearch && matchesStatus;
    });

    const activeFilterCount = Object.values(activeFilters).reduce(
        (acc: number, curr: any) => acc + (curr?.length || 0),
        0
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Certificaciones</h1>
                    <p className="text-muted-foreground">
                        Control de certificaciones y calibraciones de equipos
                    </p>
                </div>
                <Button className="gap-2" onClick={() => setShowFormModal(true)}>
                    <Plus className="w-4 h-4" />
                    Registrar Certificación
                </Button>
            </div>

            {/* Modals */}
            <CertificationFormModal
                open={showFormModal}
                onOpenChange={setShowFormModal}
                onSuccess={() => toast.success('Certificación registrada exitosamente')}
            />

            <CertificateViewer
                open={showCertViewer}
                onOpenChange={setShowCertViewer}
                certificate={selectedCert}
            />

            <FilterDialog
                open={showFilterDialog}
                onOpenChange={setShowFilterDialog}
                filters={{
                    status: ['vigente', 'por_vencer', 'vencida'],
                }}
                onApplyFilters={handleApplyFilters}
            />

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-600">156</div>
                        <p className="text-xs text-muted-foreground">Total Certificaciones</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">132</div>
                        <p className="text-xs text-muted-foreground">Vigentes</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-yellow-600">12</div>
                        <p className="text-xs text-muted-foreground">Por Vencer (30 días)</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-red-600">12</div>
                        <p className="text-xs text-muted-foreground">Vencidas</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por equipo, certificado o emisor..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() => setShowFilterDialog(true)}
                        >
                            <Filter className="w-4 h-4" />
                            Filtros
                            {activeFilterCount > 0 && (
                                <Badge className="ml-2 bg-primary text-primary-foreground">
                                    {activeFilterCount}
                                </Badge>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Certifications List */}
            <Card>
                <CardHeader>
                    <CardTitle>Certificaciones Registradas ({filteredCertifications.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredCertifications.map((cert) => {
                            const statusBadge = getStatusBadge(cert.status);
                            const StatusIcon = statusBadge.icon;

                            return (
                                <div
                                    key={cert.id}
                                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50"
                                >
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className={`p-2 rounded-lg ${cert.status === 'vigente' ? 'bg-green-100' :
                                            cert.status === 'por_vencer' ? 'bg-yellow-100' :
                                                'bg-red-100'
                                            }`}>
                                            <Award className={`w-5 h-5 ${cert.status === 'vigente' ? 'text-green-600' :
                                                cert.status === 'por_vencer' ? 'text-yellow-600' :
                                                    'text-red-600'
                                                }`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold">{cert.equipment}</h3>
                                                <Badge className="bg-blue-100 text-blue-800 border-blue-300 border text-xs">
                                                    {cert.type}
                                                </Badge>
                                            </div>
                                            <div className="text-sm text-muted-foreground space-y-1">
                                                <p>Certificado: {cert.certificateNumber}</p>
                                                <p>Emitido por: {cert.issuedBy}</p>
                                                <p>
                                                    Vigencia: {cert.issueDate} - {cert.expirationDate}
                                                </p>
                                                {cert.status === 'por_vencer' && (
                                                    <p className="text-yellow-600 font-medium">
                                                        ⚠️ Vence en {cert.daysToExpire} días
                                                    </p>
                                                )}
                                                {cert.status === 'vencida' && (
                                                    <p className="text-red-600 font-medium">
                                                        ⚠️ Vencido hace {Math.abs(cert.daysToExpire)} días
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge className={statusBadge.color + ' border gap-1'}>
                                            <StatusIcon className="w-3 h-3" />
                                            {statusBadge.label}
                                        </Badge>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleViewCertificate(cert)}
                                        >
                                            Ver Certificado
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CertificationsPage;
