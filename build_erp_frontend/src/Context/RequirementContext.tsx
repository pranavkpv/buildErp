import { createContext } from "react";

interface materialType {
   material_name: string
   brand_name: string
}
interface requirementContextType {
   spec_id: string[]
   setSpecId: React.Dispatch<React.SetStateAction<string[]>>
   materialDetails: materialType[]
   setMaterialDetails: React.Dispatch<React.SetStateAction<materialType[]>>
}

const RequirementContext = createContext<requirementContextType>({
   materialDetails: [],
   setMaterialDetails: () => { },
   spec_id: [],
   setSpecId: () => { }
})

export default RequirementContext