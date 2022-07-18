import { css } from '@/stitches.config';
import Link from 'next/link';
import { Location } from 'rickmortyapi/dist/interfaces';
import Box from '../Box';

interface Props {
    location: Location;
}

const StyledAnchor = css({
    textDecoration: 'none',
    padding: '10px 12px',
    borderBottom: '1px solid $gray5',
    display: 'flex',
    lineHeight: '1.35',

    '&:last-child': {
        borderBottom: 'none'
    },

    transition: 'background-color .15s ease',
    '&:hover': {
        backgroundColor: '$gray2'
    }
});

const LocationCard = ({ location }: Props) => {
    return (
        <Link href={`/location/${location.id}`}>
            <a className={StyledAnchor()}>
                <Box
                    css={{
                        display: 'flex'
                    }}>
                    <Box
                        css={{
                            paddingRight: 12,
                            color: '$gray11'
                        }}>
                        <Box>Name: </Box>
                        <Box>Type: </Box>
                        <Box>Dimension: </Box>
                    </Box>
                    <Box
                        css={{
                            color: '$gray12'
                        }}>
                        <Box>{location.name}</Box>
                        <Box>{location.type}</Box>
                        <Box>{location.dimension}</Box>
                    </Box>
                </Box>
            </a>
        </Link>
    );
};

export default LocationCard;
