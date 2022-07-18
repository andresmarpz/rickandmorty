import { styled } from '@/stitches.config';
import { CSSProperties } from 'react';

const StyledSeparator = styled('hr', {
    border: 0,
    borderTop: '1px solid $gray5',
    margin: '48px auto'
});

interface Props {
    width?: string | number;
    css?: CSSProperties;
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
