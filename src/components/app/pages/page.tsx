/** @format */

import React from "react";

const Page = ({ children }) => {
	return (
		<React.Fragment>
			<main>
				<div>{children}</div>
			</main>
		</React.Fragment>
	);
};

export default Page;
