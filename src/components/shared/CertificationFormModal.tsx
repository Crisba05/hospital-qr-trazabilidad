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
import FileUpload from '@/components/shared/FileUpload';

interface CertificationFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

const CertificationFormModal: React.FC<CertificationFormModalProps> = ({
    open,
    onOpenChange,
    onSuccess,
}) => {
    const [formData, setFormData] = useState({
        equipment: '',
        type: '',
        certificateNumber: '',
        issueDate: '',
        expirationDate: '',
        issuedBy: '',
        alertDays: '30',
    });

    const [certificateFile, setCertificateFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Certification data:', formData, 'File:', certificateFile);

        if (onSuccess) {
            onSuccess();
        }

        onOpenChange(false);

        setFormData({
            equipment: '',
            type: '',
            certificateNumber: '',
            issueDate: '',
            expirationDate: '',
            issuedBy: '',
            alertDays: '30',
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Registrar Certificación</DialogTitle>
                    <DialogDescription>
                        Complete la información de la certificación o calibración
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="equipment">Equipo *</Label>
                        <Input
                            id="equipment"
                            required
                            value={formData.equipment}
                            onChange={(e) =>
                                setFormData({ ...formData, equipment: e.target.value })
                            }
                            placeholder="Ej: Ventilador Mecánico VM-001"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Tipo de Certificación *</Label>
                        <select
                            id="type"
                            required
                            value={formData.type}
                            onChange={(e) =>
                                setFormData({ ...formData, type: e.target.value })
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <option value="">Seleccione...</option>
                            <option value="Calibración">Calibración</option>
                            <option value="Verificación Metrológica">Verificación Metrológica</option>
                            <option value="Seguridad Eléctrica">Seguridad Eléctrica</option>
                            <option value="Certificación de Calidad">Certificación de Calidad</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="certificateNumber">Número de Certificado *</Label>
                        <Input
                            id="certificateNumber"
                            required
                            value={formData.certificateNumber}
                            onChange={(e) =>
                                setFormData({ ...formData, certificateNumber: e.target.value })
                            }
                            placeholder="Ej: CERT-2024-VM-001"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="issueDate">Fecha de Emisión *</Label>
                            <Input
                                id="issueDate"
                                type="date"
                                required
                                value={formData.issueDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, issueDate: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expirationDate">Fecha de Vencimiento *</Label>
                            <Input
                                id="expirationDate"
                                type="date"
                                required
                                value={formData.expirationDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, expirationDate: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="issuedBy">Emitido Por *</Label>
                        <Input
                            id="issuedBy"
                            required
                            value={formData.issuedBy}
                            onChange={(e) =>
                                setFormData({ ...formData, issuedBy: e.target.value })
                            }
                            placeholder="Ej: INDECOPI, INACAL, SGS"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="alertDays">Días de Alerta Previo al Vencimiento</Label>
                        <Input
                            id="alertDays"
                            type="number"
                            value={formData.alertDays}
                            onChange={(e) =>
                                setFormData({ ...formData, alertDays: e.target.value })
                            }
                            placeholder="30"
                        />
                        <p className="text-xs text-muted-foreground">
                            El sistema generará alertas cuando falten estos días para el vencimiento
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Archivo del Certificado (opcional)</Label>
                        <FileUpload
                            onFileSelect={setCertificateFile}
                            accept=".pdf,.jpg,.jpeg,.png"
                            maxSize={10}
                        />
                        <p className="text-xs text-muted-foreground">
                            Formatos aceptados: PDF, JPG, PNG (máx. 10MB)
                        </p>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit">Registrar Certificación</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CertificationFormModal;
