import { css } from '@/stitches.config';
import Link from 'next/link';
import { Episode } from 'rickmortyapi/dist/interfaces';
import Box from '../Box';

interface Props {
    episode: Episode;
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

const EpisodesCard = ({ episode }: Props) => {
    return (
        <Link href={`/episode/${episode.id}`}>
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
                        <Box>Number: </Box>
                        <Box>Air date: </Box>
                    </Box>
                    <Box
                        css={{
                            color: '$gray12'
                        }}>
                        <Box>{episode.name}</Box>
                        <Box>{episode.episode}</Box>
                        <Box>{episode.air_date}</Box>
                    </Box>
                </Box>
            </a>
        </Link>
    );
};

export default EpisodesCard;
