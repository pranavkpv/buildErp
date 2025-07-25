import { createContext } from "react";

interface materialData {
  material_id: string;
  quantity: number;
  unit_rate: number;
}

interface labourData {
  labour_id: string;
  numberoflabour: number;
  daily_wage: number;
}


interface AppContextType {
  spec_id: string;
  spec_name: string;
  spec_unit: string;
  description: string;
  materialDetails: materialData[];
  labourDetails: labourData[];
  profit_per: number;
  additionalExpense_per: number;
  setSpecId: React.Dispatch<React.SetStateAction<string>>;
  setSpecname: React.Dispatch<React.SetStateAction<string>>;
  setSpecUnit: React.Dispatch<React.SetStateAction<string>>;
  setSpecDescription: React.Dispatch<React.SetStateAction<string>>;
  setMaterialDetails: React.Dispatch<React.SetStateAction<materialData[]>>;
  setLabourDetails: React.Dispatch<React.SetStateAction<labourData[]>>;
  setProfit: React.Dispatch<React.SetStateAction<number>>;
  setAdditionalExpense: React.Dispatch<React.SetStateAction<number>>;
  AddEnable: boolean;
  setAddEnable: React.Dispatch<React.SetStateAction<boolean>>;
  AddMaterialEnable: boolean;
  setAddMaterialEnable: React.Dispatch<React.SetStateAction<boolean>>;
  AddAdditionalEnable: boolean;
  setAddAdditionalEnable: React.Dispatch<React.SetStateAction<boolean>>;
  AddLabourEnable: boolean,
  setAddLabourEnable: React.Dispatch<React.SetStateAction<boolean>>

  editId: string,
  setEditId: React.Dispatch<React.SetStateAction<string>>
  editSpec_id: string,
  seteditSpec_id: React.Dispatch<React.SetStateAction<string>>
  editSpec_name:string,
  setEditSpec_name:React.Dispatch<React.SetStateAction<string>>,
  editSpec_unit: string
  setEditSpecUnit: React.Dispatch<React.SetStateAction<string>>
  editDescription: string
  setEditDescription: React.Dispatch<React.SetStateAction<string>>
  editSpecEnable:boolean
  setEditSpecEnable:React.Dispatch<React.SetStateAction<boolean>>
  editMaterialEnable:boolean
  setEditMaterialEnable :React.Dispatch<React.SetStateAction<boolean>>
  edtLabourEnable:boolean
  setEditLabourEnable:React.Dispatch<React.SetStateAction<boolean>>
  editAdditionalEnable:boolean
  setEditAdditionalEnable:React.Dispatch<React.SetStateAction<boolean>>
  editMaterialDetails:materialData[]
  setEditMaterialDetails:React.Dispatch<React.SetStateAction<materialData[]>>
  editlabourDetails:labourData[],
  seteditlabourDetails:React.Dispatch<React.SetStateAction<labourData[]>>
  editadditionalExpense_per : number,
  seteditadditionalExpense_per:React.Dispatch<React.SetStateAction<number>>;
  editprofit_per:number
  seteditprofit_per:React.Dispatch<React.SetStateAction<number>>;



}

const AppContext = createContext<AppContextType>({
  spec_id: "",
  setSpecId: () => { },
  spec_name: "",
  setSpecname: () => { },
  spec_unit: "",
  setSpecUnit: () => { },
  description: "",
  setSpecDescription: () => { },
  materialDetails: [],
  setMaterialDetails: () => { },
  labourDetails: [],
  setLabourDetails: () => { },
  profit_per: 0,
  setProfit: () => { },
  additionalExpense_per: 0,
  setAdditionalExpense: () => { },
  AddEnable: false,
  setAddEnable: () => null,
  AddMaterialEnable: false,
  setAddMaterialEnable: () => null,
  AddAdditionalEnable: false,
  setAddAdditionalEnable: () => null,
  AddLabourEnable: false,
  setAddLabourEnable: () => null,

  editId: "",
  setEditId: () => { },
  editSpec_id: "",
  seteditSpec_id: () => { },
  editSpec_name:"",
  setEditSpec_name:()=>{},
  editSpec_unit: "",
  setEditSpecUnit: () => { },
  editDescription: "",
  setEditDescription: () => { },
  editSpecEnable:false,
  setEditSpecEnable:()=>{},
   editMaterialEnable:false,
  setEditMaterialEnable :()=>{},
  edtLabourEnable:false,
  setEditLabourEnable:()=>{},
  editAdditionalEnable:false,
  setEditAdditionalEnable:()=>{},
  editMaterialDetails:[],
  setEditMaterialDetails:()=>{},
  editlabourDetails:[],
  seteditlabourDetails:()=>{},
  editadditionalExpense_per : 0,
  seteditadditionalExpense_per:()=>{},
  editprofit_per:0,
  seteditprofit_per:()=>{}

});

export default AppContext;
