// Import react into the bundle
import React from "react";
import ReactDOM from "react-dom/client"; // Importa desde 'react-dom/client'
import "../styles/footer.css";
import { StreamChat } from 'stream-chat';
import { ChatProvider } from 'stream-chat-react';

// Import your own components
import Layout from "./layout";

// Crea la raíz de React
const root = ReactDOM.createRoot(document.querySelector("#app"));

// Renderiza tu aplicación
root.render(
    <React.StrictMode>
        <Layout />
    </React.StrictMode>
);
