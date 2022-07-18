import Box from '@/components/Box';
import { css, styled } from '@/stitches.config';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { getCharacter, getEpisode } from 'rickmortyapi';
import { Character, Episode } from 'rickmortyapi/dist/interfaces';

export const getStaticPaths: GetStaticPaths = () => {
    // create an array containing numbers from 1 to 842
    const ids = Array.from({ length: 51 }, (_, i) => i + 1);
    const paths = ids.map((id) => ({
        params: {
            id: '' + id
        }
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params || !params.id) return { props: {} };

    // yeah I know it's a little ugly but it works ok
    const { data: episode } = await getEpisode(Number.parseInt('' + params.id));

    // for some reason the type is wrong and the corrent field
    // is characterS instead of character
    const characterIds: number[] = (episode as unknown as any).characters.map((character: any) => {
        const url = new URL(character);
        return Number.parseInt(url.pathname.split('/')[3]);
    });
    const { data: characters } = await getCharacter(characterIds);

    return { props: { episode, characters } };
};

interface Props {
    episode: Episode;
    characters: Character[];
}

const StyledLink = css('a', {
    textDecoration: 'none',

    color: '$gray12'
});

const Row = styled('div', {
    display: 'grid',
    gridTemplateColumns: '0.35fr 0.65fr',
    marginY: 6
});

const Field = styled('span', {
    color: '$gray11',
    width: '100%'
});

const Value = styled('span', {
    color: '$gray12',
    width: '100%'
});

const Header = () => {
    return (
        <Box
            css={{
                paddingY: 32
            }}>
            <Link href="/">
                <a className={StyledLink()}>Home</a>
            </Link>
        </Box>
    );
};

const EpisodePage = ({ episode, characters }: Props) => {
    return (
        <>
            <Header />
            <h1>{episode.name}</h1>
            <Box css={{ marginTop: 32 }}>
                <Row>
                    <Field>Code</Field>
                    <Value>{episode.episode}</Value>
                </Row>
                <Row>
                    <Field>Air date</Field>
                    <Value>{episode.air_date}</Value>
                </Row>
                <Row>
                    <Field>Characters</Field>
                    <Value>
                        {characters.map((character) => (
                            <Box
                                key={'c' + character.id}
                                css={{
                                    marginY: 4
                                }}>
                                <Link href={`/character/${character.id}`}>
                                    <a
                                        className={StyledLink()}
                                        style={{
                                            textDecoration: 'underline'
                                        }}>
                                        {character.name}
                                    </a>
                                </Link>
                            </Box>
                        ))}
                    </Value>
                </Row>
            </Box>
        </>
    );
};

export default EpisodePage;
