// User roles
export type UserRole = 'admin' | 'tecnico' | 'supervisor' | 'asistencial' | 'auditor';

// User type
export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    active: boolean;
}

// Equipment status
export type EquipmentStatus = 'operativo' | 'mantenimiento' | 'fuera_servicio' | 'calibracion';

// Equipment criticality
export type EquipmentCriticality = 'alta' | 'media' | 'baja';

// Equipment type
export interface Equipment {
    id: string;
    code: string;
    patrimonialCode: string;
    name: string;
    brand: string;
    model: string;
    serial: string;
    type: string;
    criticality: EquipmentCriticality;
    status: EquipmentStatus;
    location: string;
    area: string;
    responsible: string;
    acquisitionDate: string;
    warranty?: string;
    accessories?: string[];
    manuals?: Document[];
    qrCode: string;
    lastMaintenance?: string;
    nextMaintenance?: string;
    createdAt: string;
    updatedAt: string;
}

// Maintenance type
export type MaintenanceType = 'preventivo' | 'correctivo';

export interface Maintenance {
    id: string;
    equipmentId: string;
    equipmentName: string;
    type: MaintenanceType;
    workOrder: string;
    startDate: string;
    endDate: string;
    technicianId: string;
    technicianName: string;
    description: string;
    actionsPerformed: string;
    partsUsed?: Part[];
    evidence?: Document[];
    supervisorId?: string;
    supervisorName?: string;
    supervisorSignature?: string;
    status: 'pendiente' | 'en_proceso' | 'completado' | 'aprobado';
    createdAt: string;
    updatedAt: string;
}

export interface Part {
    id: string;
    name: string;
    quantity: number;
    code?: string;
}

// Certification type
export interface Certification {
    id: string;
    equipmentId: string;
    equipmentName: string;
    type: string;
    issueDate: string;
    expirationDate: string;
    issuedBy: string;
    certificateNumber: string;
    document?: Document;
    status: 'vigente' | 'por_vencer' | 'vencido';
    alertDays: number;
    createdAt: string;
}

// Movement type
export type MovementType = 'check_in' | 'check_out' | 'transfer';

export interface Movement {
    id: string;
    equipmentId: string;
    equipmentName: string;
    type: MovementType;
    fromLocation?: string;
    toLocation: string;
    responsibleId: string;
    responsibleName: string;
    reason?: string;
    date: string;
    createdAt: string;
}

// Document type
export interface Document {
    id: string;
    name: string;
    type: string;
    url: string;
    size: number;
    uploadedAt: string;
    uploadedBy: string;
}

// Audit log type
export interface AuditLog {
    id: string;
    userId: string;
    userName: string;
    action: string;
    entity: string;
    entityId: string;
    details?: string;
    ipAddress?: string;
    timestamp: string;
}

// Report type
export interface Report {
    id: string;
    name: string;
    type: string;
    generatedBy: string;
    generatedAt: string;
    filters?: Record<string, any>;
    data: any;
}

// Dashboard stats
export interface DashboardStats {
    totalEquipment: number;
    operational: number;
    inMaintenance: number;
    outOfService: number;
    certificationExpiring: number;
    maintenanceDue: number;
}

// Notification type
export interface Notification {
    id: string;
    type: 'info' | 'warning' | 'error' | 'success';
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    link?: string;
}
