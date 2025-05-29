export type FormCreateBonusProps = {
  onOpen?: () => void;
  onClose?: () => void;
};

export type BonusFormValues = {
  name: string;
  percentage: number;
  description: string;
};

export type Bonus = {
  id?: number;
  description: string;
  name: string;
  percentage: number;
  companyId?: number;
  type?:string
};

//para el contexto
export type BonusState={
  bonus:Bonus[],
  loading:boolean,
  addBonus:(newBonus:Bonus)=>void,
  removeBonus:(id:number)=>void
}