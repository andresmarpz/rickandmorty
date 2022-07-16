import React from "react";
import Box from "./Box";

const Layout = ({ children }: React.PropsWithChildren) => {
	return (
		<Box
			css={{
				maxWidth: "1024px",
				padding: "0px 10px",
				margin: "auto",
			}}>
			{children}
		</Box>
	);
};

export default Layout;
