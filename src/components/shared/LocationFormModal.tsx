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

interface LocationFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    location?: {
        id: string;
        name: string;
        areaId: string;
        description: string;
        active: boolean;
    } | null;
    areas: Array<{ id: string; name: string; active: boolean }>;
    onSuccess?: () => void;
}

const LocationFormModal: React.FC<LocationFormModalProps> = ({
    open,
    onOpenChange,
    location,
    areas,
    onSuccess,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        areaId: '',
        description: '',
    });

    useEffect(() => {
        if (location) {
            setFormData({
                name: location.name,
                areaId: location.areaId,
                description: location.description,
            });
        } else {
            setFormData({
                name: '',
                areaId: areas.find(a => a.active)?.id || '',
                description: '',
            });
        }
    }, [location, areas, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Location data:', { ...formData, id: location?.id });

        if (onSuccess) {
            onSuccess();
        }

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{location ? 'Editar Ubicación' : 'Crear Nueva Ubicación'}</DialogTitle>
                    <DialogDescription>
                        {location
                            ? 'Modifica la información de la ubicación'
                            : 'Complete la información de la nueva ubicación'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre de la Ubicación *</Label>
                        <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Ej: UCI - Cama 3"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="areaId">Área *</Label>
                        <select
                            id="areaId"
                            required
                            value={formData.areaId}
                            onChange={(e) =>
                                setFormData({ ...formData, areaId: e.target.value })
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <option value="">Seleccione un área</option>
                            {areas.filter(a => a.active).map((area) => (
                                <option key={area.id} value={area.id}>
                                    {area.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            placeholder="Descripción de la ubicación..."
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
                            {location ? 'Guardar Cambios' : 'Crear Ubicación'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default LocationFormModal;
