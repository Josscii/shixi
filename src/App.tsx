import { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./Routes/Main/Main";
import Login from "./Routes/Login/Login";
import RequireAuth from "./Auth/RequireAuth";
import { AuthProvider } from "./Auth/AuthProvider";
import { theme } from "./Theme/theme";
import MemoPeriod from "./Common/MemoPeriod";

export default function App() {
  const [period, setPeriod] = useState(MemoPeriod.defaultPeriod);
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <MemoPeriod.context.Provider value={period}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Main />
                  </RequireAuth>
                }
              />
            </Routes>
          </BrowserRouter>
        </MemoPeriod.context.Provider>
      </AuthProvider>
    </ChakraProvider>
  );
}
