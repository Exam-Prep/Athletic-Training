/** @format */

import React from "react";

const Page = ({ children }) => {
	return (
		<React.Fragment>
			<main style={{ width: "100%", height: "100%" }}>{children}</main>
		</React.Fragment>
	);
};

export default Page;
