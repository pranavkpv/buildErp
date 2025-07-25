// src/Context/AppProvider.tsx
import { useState } from "react";
import AppContext from "./AppContext";

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


const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [spec_id, setSpecId] = useState("");
  const [spec_name, setSpecname] = useState("");
  const [spec_unit, setSpecUnit] = useState("");
  const [description, setSpecDescription] = useState("");
  const [materialDetails, setMaterialDetails] = useState<materialData[]>([]);
  const [labourDetails, setLabourDetails] = useState<labourData[]>([]);
  const [profit_per, setProfit] = useState(0);
  const [additionalExpense_per, setAdditionalExpense] = useState(0);
  const [AddEnable, setAddEnable] = useState(false);
  const [AddMaterialEnable, setAddMaterialEnable] = useState(false)
  const [AddAdditionalEnable, setAddAdditionalEnable] = useState(false)
  const [AddLabourEnable, setAddLabourEnable] = useState(false)

  const [editId, setEditId] = useState("")
  const [editSpec_id, seteditSpec_id] = useState("")
  const [editSpec_unit, setEditSpecUnit] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editSpec_name, setEditSpec_name] = useState("")
  const [editSpecEnable, setEditSpecEnable] = useState(false)
  const [editMaterialEnable, setEditMaterialEnable] = useState(false)
  const [edtLabourEnable, setEditLabourEnable] = useState(false)
  const [editAdditionalEnable, setEditAdditionalEnable] = useState(false)
  const [editMaterialDetails,setEditMaterialDetails] =  useState<materialData[]>([]);
  const [editlabourDetails,seteditlabourDetails] = useState<labourData[]>([])
  const [editadditionalExpense_per,seteditadditionalExpense_per] = useState(0)
  const [editprofit_per,seteditprofit_per] = useState(0)

  return (
    <AppContext.Provider
      value={{
        spec_id,
        setSpecId,
        spec_name,
        setSpecname,
        spec_unit,
        setSpecUnit,
        description,
        setSpecDescription,
        materialDetails,
        setMaterialDetails,
        labourDetails,
        setLabourDetails,
        profit_per,
        setProfit,
        additionalExpense_per,
        setAdditionalExpense,
        AddEnable,
        setAddEnable,
        AddMaterialEnable,
        setAddMaterialEnable,
        AddAdditionalEnable,
        setAddAdditionalEnable,
        AddLabourEnable,
        setAddLabourEnable,

        editId,
        setEditId,
        editSpec_id,
        seteditSpec_id,
        editSpec_name,
        setEditSpec_name,
        editSpec_unit,
        setEditSpecUnit,
        editDescription,
        setEditDescription,
        editSpecEnable,
        setEditSpecEnable,
        editMaterialEnable,
        setEditMaterialEnable,
        edtLabourEnable,
        setEditLabourEnable,
        editAdditionalEnable,
        setEditAdditionalEnable,
        editMaterialDetails,
        setEditMaterialDetails,
        editlabourDetails,
        seteditlabourDetails,
        editadditionalExpense_per,
        seteditadditionalExpense_per,
        editprofit_per,
        seteditprofit_per

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
