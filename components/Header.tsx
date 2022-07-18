import RickAndMortyLogo from '@/public/assets/images/header.png';
import Image from 'next/image';
import Box from './Box';

const Header = () => {
    return (
        <Box
            css={{
                display: 'flex',
                justifyContent: 'center',
                padding: 16,
                width: '70%',
                margin: 'auto'
            }}>
            <Image alt="Rick and Morty text logo" src={RickAndMortyLogo} />
        </Box>
    );
};

export default Header;
