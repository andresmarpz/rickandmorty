import { styled } from '@/stitches.config';
import Box from './Box';
import LeftArrow from './svgs/LeftArrow';
import RightArrow from './svgs/RightArrow';
import Spinner from './svgs/Spinner';

const Span = styled('span', {
    variants: {
        visible: {
            false: {
                visibility: 'hidden'
            },
            true: {
                visibility: 'visible'
            }
        }
    }
});

const Subtitle = styled('h2', {
    fontSize: '18px',
    fontWeight: 400,
    color: '$gray11',
    marginY: 4,
    lineHeight: 1.2
});

const Control = styled('button', {
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '$gray3',
    border: '1px solid $gray6',
    borderRadius: 4,
    padding: '5px 18px',
    cursor: 'pointer',

    transition: 'all .1s ease',
    '&:not(:disabled):hover': {
        backgroundColor: '$gray2'
    },
    '&:focus': {
        borderColor: '$gray5'
    },
    '&:disabled': {
        color: '$gray8',
        cursor: 'unset'
    }
});

interface Props {
    page: number;
    setPage: (page: number) => void;
    loading: boolean;
    max: number;
}

const Controls = ({ page, setPage, loading, max }: Props) => {
    return (
        <Box
            css={{
                paddingY: 12
            }}>
            <Subtitle>
                Page {page} / {max}
            </Subtitle>
            <Box
                css={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                <Box
                    css={{
                        marginTop: 6,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        marginBottom: 10
                    }}>
                    <Control
                        onClick={() => setPage(page > 1 ? page - 1 : page)}
                        disabled={page === 1}>
                        <LeftArrow />{' '}
                        <Span css={{ color: page === 1 ? '$gray8' : '$gray11', marginLeft: 8 }}>
                            prev
                        </Span>
                    </Control>
                    <Control
                        onClick={() => setPage(page < max ? page + 1 : page)}
                        disabled={page === max}>
                        <Span css={{ color: page === max ? '$gray8' : '$gray11', marginRight: 8 }}>
                            next
                        </Span>{' '}
                        <RightArrow />
                    </Control>
                    <Span visible={loading}>
                        <Spinner />
                    </Span>
                </Box>
                <Box></Box>
            </Box>
        </Box>
    );
};

export default Controls;
