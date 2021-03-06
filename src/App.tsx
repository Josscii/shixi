import { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./Routes/Main/Main";
import Login from "./Routes/Login/Login";
import RequireAuth from "./Auth/RequireAuth";
import { AuthProvider } from "./Auth/AuthProvider";
import { theme } from "./Theme/theme";
import Setting from "./Routes/Setting/Setting";
import LocalSearch from "./Routes/Search/LocalSearch";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
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
            <Route
              path="/setting"
              element={
                <RequireAuth>
                  <Setting />
                </RequireAuth>
              }
            />
            <Route
              path="/search"
              element={
                <RequireAuth>
                  <LocalSearch />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}
