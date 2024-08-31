import {Buffer} from "buffer";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import {ToastContainer} from "react-toastify";
import {WagmiProvider} from "wagmi";

import App from "./App.tsx";
import {config} from "./wagmi.ts";

import "./index.css";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-center" autoClose={3000} />
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
