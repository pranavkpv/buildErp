import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import RequirementContext from "./RequirementContext";
const RequirementProvider = ({ children }) => {
    const [spec_id, setSpecId] = useState([]);
    const [materialDetails, setMaterialDetails] = useState([]);
    return (_jsx(RequirementContext.Provider, { value: {
            spec_id,
            setSpecId,
            materialDetails,
            setMaterialDetails
        }, children: children }));
};
export default RequirementProvider;
