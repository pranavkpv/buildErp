import { useState } from "react";
import RequirementContext from "./RequirementContext";

interface materialData {
   material_name: string
   brand_name:string
}



const RequirementProvider = ({ children }: { children: React.ReactNode }) => {
   const [spec_id, setSpecId] = useState<string[]>([]);
   const [materialDetails, setMaterialDetails] = useState<materialData[]>([]);

   return (
      <RequirementContext.Provider
         value={{
            spec_id,
            setSpecId,
            materialDetails,
            setMaterialDetails
         }}
      >
         {children}
      </RequirementContext.Provider>
   );
};

export default RequirementProvider;
