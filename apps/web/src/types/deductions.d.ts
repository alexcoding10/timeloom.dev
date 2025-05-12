export type Deduction = {
  id?: number;
  description: string;
  name: string;
  percentage: number;
  type: string;
  companyId?: number;
};

export type DeductionFormValues = {
  name: string;
  percentage: number;
  description: string;
  type: "ALL" | "FIXED" | "TEMPORARY";
};
export type FormCreateDeductionProps = {
  onClose?: () => void; // La propiedad onClose ahora es opcional
};

export type  DeductionState ={
  deductions:Deduction[],
  loading:boolean,
  addDeduction:(newDeduction: Deduction) => void,
  removeDeduction:(id:number)=>void
}
