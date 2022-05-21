/** @format */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app";

const container = document.getElementById("root");
const root = createRoot(container!);
// render the app
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
