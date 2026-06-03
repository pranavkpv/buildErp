import { createContext } from "react";
const RequirementContext = createContext({
    materialDetails: [],
    setMaterialDetails: () => { },
    spec_id: [],
    setSpecId: () => { }
});
export default RequirementContext;
