import { styled } from '@/stitches.config';
import Box from './Box';
import Separator from './Separator';

const StyledLink = styled('a', {
    textDecoration: 'none',
    color: '$gray11',
    fontWeight: 500,

    transition: 'color .1s ease',
    '&:hover': {
        color: '$blue11'
    }
});

const Footer = () => {
    return (
        <>
            <Separator />
            <Box
                css={{
                    marginTop: 16,
                    padding: '0 12px 48px',
                    color: '$gray10'
                }}>
                <Box>
                    <StyledLink
                        href="https://github.com/andresmarpz/rickandmorty/"
                        rel="noopener noreferrer"
                        target="_blank"
                        css={{ marginRight: 12 }}>
                        Github
                    </StyledLink>
                </Box>
                <Box
                    css={{
                        marginY: 8
                    }}>
                    <StyledLink
                        href="https://rickandmortyapi.com/"
                        rel="noopener noreferrer"
                        target="_blank">
                        rickandmortyapi
                    </StyledLink>
                </Box>
                <Box>
                    Made with{' '}
                    <StyledLink
                        href="https://nextjs.org/"
                        rel="noopener noreferrer"
                        target="_blank">
                        Next.js
                    </StyledLink>
                    ,{' '}
                    <StyledLink
                        href="https://stitches.dev/"
                        rel="noopener noreferrer"
                        target="_blank">
                        Stitches
                    </StyledLink>
                    ,{' '}
                    <StyledLink
                        href="https://radix-ui.com/"
                        rel="noopener noreferrer"
                        target="_blank">
                        Radix
                    </StyledLink>{' '}
                    and{' '}
                    <StyledLink
                        href="https://vercel.com/"
                        rel="noopener noreferrer"
                        target="_blank">
                        ▲Vercel
                    </StyledLink>
                </Box>
            </Box>
        </>
    );
};

export default Footer;
