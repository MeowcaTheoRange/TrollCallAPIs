import { createContext } from "react";

const AuthContext = createContext({
    TROLLCALL_NAME: "",
    TROLLCALL_CODE: ""
});

export default AuthContext;
