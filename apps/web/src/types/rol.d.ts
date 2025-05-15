
export type Rol = {
    id?: number;
    name: string;
    percentage: number;
    description?: string;
    companyId: number;
}

export type RolName ='admin'|'supervisor'|'employee'|'hr'|'teamLeader'|'teamWorker'