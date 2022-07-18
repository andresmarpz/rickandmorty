import { styled } from "@/stitches.config";
import Box from "./Box";
import LeftArrow from "./svgs/LeftArrow";
import RightArrow from "./svgs/RightArrow";
import Spinner from "./svgs/Spinner";

const Span = styled("span", {
	variants: {
		visible: {
			false: {
				visibility: "hidden",
			},
			true: {
				visibility: "visible",
			},
		},
	},
});

const Subtitle = styled("h2", {
	fontSize: "18px",
	fontWeight: 400,
	marginY: 4,
	lineHeight: 1.2,
});

const Control = styled("button", {
	background: "$gray3",
	border: "1px solid $gray6",
	borderRadius: 4,
	padding: "4px 8px",
	cursor: "pointer",

	transition: "all .1s ease",
	"&:hover": {
		backgroundColor: "$gray2",
	},
	"&:focus": {
		borderColor: "$gray5",
	},
});

interface Props {
	page: number;
	setPage: (page: number) => void;
	loading: boolean;
	max: number;
}

const Controls = ({ page, setPage, loading, max }: Props) => {
	return (
		<Box>
			<Subtitle>Page {page}</Subtitle>
			<Box
				css={{
					display: "flex",
					alignItems: "center",
					gap: 6,
					marginBottom: 10,
				}}>
				<Control onClick={() => setPage(page > 1 ? page - 1 : page)} disabled={page === 1}>
					<LeftArrow />
				</Control>
				<Control onClick={() => setPage(page < max ? page + 1 : page)} disabled={page === max}>
					<RightArrow />
				</Control>
				<Span visible={loading}>
					<Spinner />
				</Span>
			</Box>
		</Box>
	);
};

export default Controls;
