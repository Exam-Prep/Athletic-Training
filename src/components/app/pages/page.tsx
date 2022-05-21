/** @format */

import React from "react";

// a simple react fragment that creates an object taking up the entire screen and can hold content within it
const Page: React.FC = ({ children }) => {
	return (
		<React.Fragment>
			<main style={{ width: "100%", height: "100%" }}>{children}</main>
		</React.Fragment>
	);
};

export default Page;
