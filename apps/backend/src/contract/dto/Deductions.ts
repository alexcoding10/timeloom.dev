export type Deduction = {
    name: string;
    percentage: number; 
    description?: string;
    companyId?: number;
    type: 'ALL' | 'FIXED' | 'TEMPORARY';
  };
  