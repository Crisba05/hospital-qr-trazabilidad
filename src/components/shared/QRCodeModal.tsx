import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface QRCodeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    equipment: {
        code: string;
        name: string;
        qrCode: string;
    } | null;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
    open,
    onOpenChange,
    equipment,
}) => {
    const handleDownload = () => {
        if (!equipment) return;

        const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `QR-${equipment.code}.png`;
            link.href = url;
            link.click();
        }
    };

    if (!equipment) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Código QR - {equipment.code}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="text-center">
                        <h3 className="font-semibold text-lg mb-2">{equipment.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Código: {equipment.code}
                        </p>
                    </div>

                    <div className="flex justify-center p-6 bg-white rounded-lg border">
                        <QRCodeSVG
                            id="qr-code-canvas"
                            value={equipment.qrCode}
                            size={256}
                            level="H"
                            includeMargin
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => onOpenChange(false)}
                        >
                            Cerrar
                        </Button>
                        <Button
                            className="flex-1 gap-2"
                            onClick={handleDownload}
                        >
                            <Download className="w-4 h-4" />
                            Descargar QR
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QRCodeModal;
