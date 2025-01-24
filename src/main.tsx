import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme/Theme.ts";
import { AuthProviderr } from "./Context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <AuthProviderr>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProviderr>
  </ThemeProvider>
);
