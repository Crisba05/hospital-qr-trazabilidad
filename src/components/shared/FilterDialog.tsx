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
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';

interface FilterDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    filters: {
        status?: string[];
        criticality?: string[];
        area?: string[];
        type?: string[];
    };
    onApplyFilters: (filters: any) => void;
}

const FilterDialog: React.FC<FilterDialogProps> = ({
    open,
    onOpenChange,
    filters,
    onApplyFilters,
}) => {
    const [selectedFilters, setSelectedFilters] = useState<any>({
        status: [],
        criticality: [],
        area: [],
        type: [],
    });

    const filterOptions = {
        status: [
            { value: 'operativo', label: 'Operativo', color: 'bg-green-100 text-green-800' },
            { value: 'mantenimiento', label: 'Mantenimiento', color: 'bg-yellow-100 text-yellow-800' },
            { value: 'fuera_servicio', label: 'Fuera de Servicio', color: 'bg-red-100 text-red-800' },
            { value: 'calibracion', label: 'Calibración', color: 'bg-blue-100 text-blue-800' },
        ],
        criticality: [
            { value: 'alta', label: 'Alta', color: 'bg-red-100 text-red-800' },
            { value: 'media', label: 'Media', color: 'bg-yellow-100 text-yellow-800' },
            { value: 'baja', label: 'Baja', color: 'bg-gray-100 text-gray-800' },
        ],
        area: [
            { value: 'uci', label: 'UCI' },
            { value: 'emergencia', label: 'Emergencia' },
            { value: 'quirofano', label: 'Quirófano' },
            { value: 'hospitalizacion', label: 'Hospitalización' },
        ],
        type: [
            { value: 'ventilacion', label: 'Ventilación' },
            { value: 'monitoreo', label: 'Monitoreo' },
            { value: 'diagnostico', label: 'Diagnóstico' },
            { value: 'emergencia', label: 'Emergencia' },
        ],
    };

    const toggleFilter = (category: string, value: string) => {
        setSelectedFilters((prev: any) => {
            const current = prev[category] || [];
            const newValues = current.includes(value)
                ? current.filter((v: string) => v !== value)
                : [...current, value];
            return { ...prev, [category]: newValues };
        });
    };

    const handleApply = () => {
        onApplyFilters(selectedFilters);
        onOpenChange(false);
    };

    const handleClear = () => {
        setSelectedFilters({
            status: [],
            criticality: [],
            area: [],
            type: [],
        });
    };

    const activeFilterCount = Object.values(selectedFilters).reduce(
        (acc: number, curr: any) => acc + (curr?.length || 0),
        0
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Filter className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <DialogTitle>Filtros</DialogTitle>
                                <DialogDescription>
                                    Filtra los resultados según tus criterios
                                </DialogDescription>
                            </div>
                        </div>
                        {activeFilterCount > 0 && (
                            <Badge variant="secondary">{activeFilterCount} activos</Badge>
                        )}
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Status Filter */}
                    {filters.status && (
                        <div className="space-y-3">
                            <Label>Estado</Label>
                            <div className="flex flex-wrap gap-2">
                                {filterOptions.status.map((option) => (
                                    <Badge
                                        key={option.value}
                                        className={`cursor-pointer border transition-all ${selectedFilters.status?.includes(option.value)
                                                ? option.color + ' border-current'
                                                : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                                            }`}
                                        onClick={() => toggleFilter('status', option.value)}
                                    >
                                        {option.label}
                                        {selectedFilters.status?.includes(option.value) && (
                                            <X className="w-3 h-3 ml-1" />
                                        )}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Criticality Filter */}
                    {filters.criticality && (
                        <div className="space-y-3">
                            <Label>Criticidad</Label>
                            <div className="flex flex-wrap gap-2">
                                {filterOptions.criticality.map((option) => (
                                    <Badge
                                        key={option.value}
                                        className={`cursor-pointer border transition-all ${selectedFilters.criticality?.includes(option.value)
                                                ? option.color + ' border-current'
                                                : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                                            }`}
                                        onClick={() => toggleFilter('criticality', option.value)}
                                    >
                                        {option.label}
                                        {selectedFilters.criticality?.includes(option.value) && (
                                            <X className="w-3 h-3 ml-1" />
                                        )}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Area Filter */}
                    {filters.area && (
                        <div className="space-y-3">
                            <Label>Área</Label>
                            <div className="flex flex-wrap gap-2">
                                {filterOptions.area.map((option) => (
                                    <Badge
                                        key={option.value}
                                        className={`cursor-pointer border transition-all ${selectedFilters.area?.includes(option.value)
                                                ? 'bg-primary text-primary-foreground border-primary'
                                                : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                                            }`}
                                        onClick={() => toggleFilter('area', option.value)}
                                    >
                                        {option.label}
                                        {selectedFilters.area?.includes(option.value) && (
                                            <X className="w-3 h-3 ml-1" />
                                        )}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Type Filter */}
                    {filters.type && (
                        <div className="space-y-3">
                            <Label>Tipo</Label>
                            <div className="flex flex-wrap gap-2">
                                {filterOptions.type.map((option) => (
                                    <Badge
                                        key={option.value}
                                        className={`cursor-pointer border transition-all ${selectedFilters.type?.includes(option.value)
                                                ? 'bg-primary text-primary-foreground border-primary'
                                                : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                                            }`}
                                        onClick={() => toggleFilter('type', option.value)}
                                    >
                                        {option.label}
                                        {selectedFilters.type?.includes(option.value) && (
                                            <X className="w-3 h-3 ml-1" />
                                        )}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={handleClear}>
                        Limpiar Filtros
                    </Button>
                    <Button onClick={handleApply}>
                        Aplicar Filtros
                        {activeFilterCount > 0 && ` (${activeFilterCount})`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default FilterDialog;
