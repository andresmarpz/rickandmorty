import { styled } from "@/stitches.config";

const Grid = styled("div", {
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	gridGap: "12px",
	margin: "auto",
	"@sm": {
		gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
	},
	"@lg": {
		gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
	},
});

export default Grid;
