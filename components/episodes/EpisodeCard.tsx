import { Episode } from 'rickmortyapi/dist/interfaces';
import Box from '../Box';

interface Props {
    episode: Episode;
}

const EpisodesCard = ({ episode }: Props) => {
    return (
        <Box
            css={{
                padding: '10px 12px',
                borderBottom: '1px solid $gray5',
                display: 'flex',
                lineHeight: '1.35',

                '&:last-child': {
                    borderBottom: 'none'
                }
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
            <Box>
                <Box>{episode.name}</Box>
                <Box>{episode.episode}</Box>
                <Box>{episode.air_date}</Box>
            </Box>
        </Box>
    );
};

export default EpisodesCard;
