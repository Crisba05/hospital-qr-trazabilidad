import React, { useState, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';

interface AreaFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    area?: {
        id: string;
        name: string;
        description: string;
        active: boolean;
    } | null;
    onSuccess?: () => void;
}

const AreaFormModal: React.FC<AreaFormModalProps> = ({
    open,
    onOpenChange,
    area,
    onSuccess,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        if (area) {
            setFormData({
                name: area.name,
                description: area.description,
            });
        } else {
            setFormData({
                name: '',
                description: '',
            });
        }
    }, [area, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Area data:', { ...formData, id: area?.id });

        if (onSuccess) {
            onSuccess();
        }

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{area ? 'Editar Área' : 'Crear Nueva Área'}</DialogTitle>
                    <DialogDescription>
                        {area
                            ? 'Modifica la información del área hospitalaria'
                            : 'Complete la información del área hospitalaria'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre del Área *</Label>
                        <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Ej: Unidad de Cuidados Intensivos"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            placeholder="Descripción del área y sus características..."
                            rows={4}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit">
                            {area ? 'Guardar Cambios' : 'Crear Área'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AreaFormModal;
