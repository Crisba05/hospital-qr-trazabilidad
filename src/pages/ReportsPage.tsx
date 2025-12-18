import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Filter, BarChart3, FileSpreadsheet, Calendar } from 'lucide-react';

const ReportsPage: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    const reportTypes = [
        {
            id: '1',
            title: 'Reporte de Equipos',
            description: 'Estado general de todos los equipos médicos',
            icon: BarChart3,
            color: 'bg-blue-100 text-blue-600',
            lastGenerated: '2024-12-18 10:00',
        },
        {
            id: '2',
            title: 'Reporte de Mantenimientos',
            description: 'Mantenimientos realizados y pendientes',
            icon: FileText,
            color: 'bg-green-100 text-green-600',
            lastGenerated: '2024-12-17 15:30',
        },
        {
            id: '3',
            title: 'Reporte de Certificaciones',
            description: 'Certificaciones vigentes y por vencer',
            icon: FileSpreadsheet,
            color: 'bg-purple-100 text-purple-600',
            lastGenerated: '2024-12-16 09:00',
        },
        {
            id: '4',
            title: 'Reporte de Movimientos',
            description: 'Historial de transferencias y ubicaciones',
            icon: Calendar,
            color: 'bg-orange-100 text-orange-600',
            lastGenerated: '2024-12-18 08:00',
        },
    ];

    const quickStats = [
        { label: 'Reportes Generados', value: '245', trend: '+12%' },
        { label: 'Este Mes', value: '18', trend: '+5%' },
        { label: 'Exportaciones', value: '89', trend: '+8%' },
        { label: 'Programados', value: '6', trend: '0%' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
                    <p className="text-muted-foreground">
                        Generación y exportación de reportes del sistema
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filtros
                    </Button>
                    <Button className="gap-2">
                        <Download className="w-4 h-4" />
                        Exportar Todo
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                {quickStats.map((stat, index) => (
                    <Card key={index}>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                    {stat.trend}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Period Selector */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">Período:</span>
                        <div className="flex gap-2">
                            {['week', 'month', 'quarter', 'year'].map((period) => (
                                <Button
                                    key={period}
                                    variant={selectedPeriod === period ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedPeriod(period)}
                                >
                                    {period === 'week' && 'Semana'}
                                    {period === 'month' && 'Mes'}
                                    {period === 'quarter' && 'Trimestre'}
                                    {period === 'year' && 'Año'}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Report Types */}
            <div className="grid gap-4 md:grid-cols-2">
                {reportTypes.map((report) => {
                    const Icon = report.icon;
                    return (
                        <Card key={report.id} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-lg ${report.color}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{report.title}</CardTitle>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {report.description}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Última generación: {report.lastGenerated}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2">
                                    <Button className="flex-1 gap-2">
                                        <FileText className="w-4 h-4" />
                                        Generar
                                    </Button>
                                    <Button variant="outline" className="gap-2">
                                        <Download className="w-4 h-4" />
                                        Descargar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Export Formats */}
            <Card>
                <CardHeader>
                    <CardTitle>Formatos de Exportación</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <Button variant="outline" className="gap-2">
                            <FileSpreadsheet className="w-4 h-4" />
                            Excel (.xlsx)
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <FileText className="w-4 h-4" />
                            PDF
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <FileText className="w-4 h-4" />
                            CSV
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReportsPage;
