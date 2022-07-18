import { styled } from '@/stitches.config';
import { CSS } from '@stitches/react';

const StyledSeparator = styled('hr', {
    border: 0,
    borderTop: '1px solid $gray5',
    margin: '48px auto'
});

interface Props {
    width?: string | number;
    css?: CSS;
}

const Separator = ({ width = 100, css }: Props) => {
    return (
        <StyledSeparator
            css={{
                maxWidth: `${width}%`,
                ...css
            }}></StyledSeparator>
    );
};

export default Separator;
