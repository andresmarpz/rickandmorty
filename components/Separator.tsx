import { styled } from '@/stitches.config';

const StyledSeparator = styled('hr', {
    border: 0,
    borderTop: '1px solid $gray5',
    margin: '48px auto'
});

interface Props {
    width?: string | number;
}

const Separator = ({ width = 80 }: Props) => {
    return (
        <StyledSeparator
            css={{
                maxWidth: `${width}%`
            }}></StyledSeparator>
    );
};

export default Separator;
