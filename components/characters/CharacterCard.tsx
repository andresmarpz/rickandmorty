import { Character } from 'rickmortyapi/dist/interfaces';
import BlurImage from '../BlurImage';
import Box from '../Box';

const CharacterCard = ({ character }: { character: Character }) => {
    return (
        <Box
            key={character.id}
            css={{
                borderRadius: 6,
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 'auto',
                aspectRatio: '8 / 7',
                boxShadow: `
					0 2px 2px hsl(0deg 0% 0% / 0.065),
					0 4px 4px hsl(0deg 0% 0% / 0.065),
					0 8px 8px hsl(0deg 0% 0% / 0.065),
					0 16px 16px hsl(0deg 0% 0% / 0.065)
				`
            }}>
            <BlurImage src={character.image} objectFit="cover" layout="fill" />
        </Box>
    );
};

export default CharacterCard;
