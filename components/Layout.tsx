import React from "react";
import Box from "./Box";

const Layout = ({ children }: React.PropsWithChildren) => {
	return (
		<Box
			css={{
				maxWidth: "1024px",
				margin: "auto",
			}}>
			{children}
		</Box>
	);
};

export default Layout;
