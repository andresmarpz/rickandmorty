import Box from '@/components/Box';
import { css, styled } from '@/stitches.config';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getCharacter, getLocation } from 'rickmortyapi';
import type { Character, Location } from 'rickmortyapi/dist/interfaces';

export const getStaticPaths: GetStaticPaths = () => {
    // create an array containing numbers from 1 to 842
    const ids = Array.from({ length: 126 }, (_, i) => i + 1);
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
    const { data: location } = await getLocation(Number.parseInt('' + params.id));

    // for some reason the type is wrong and 'residents' is a string[] not a Character[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const residentsIds: number[] = (location as unknown as any).residents.map((character: any) => {
        const url = new URL(character);
        return Number.parseInt(url.pathname.split('/')[3]);
    });

    const { data: characters } = await getCharacter(residentsIds);

    return { props: { location, characters } };
};

interface Props {
    location: Location;
    characters: Character[];
}

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

const StyledLink = css('a', {
    color: '$gray12'
});

const CharacterLink = ({ character }: { character: Character }) => {
    return (
        <Box
            css={{
                marginY: 4
            }}>
            <Link href={`/character/${character.id}`}>
                <a className={StyledLink()}>{character.name}</a>
            </Link>
        </Box>
    );
};

const LocationPage = ({ location, characters }: Props) => {
    return (
        <>
            <Head>
                <title>{location.name}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Header />
                <h1>{location.name}</h1>
                <h2>Type: Location</h2>
                <Box css={{ marginTop: 32 }}>
                    <Row>
                        <Field>Type</Field>
                        <Value>{location.type}</Value>
                    </Row>
                    <Row>
                        <Field>Dimension</Field>
                        <Value>{location.dimension}</Value>
                    </Row>
                    <Row>
                        <Field>Residents</Field>
                        <Value css={{ marginY: 4 }}>
                            {characters.length ? (
                                characters.map((character) => (
                                    <CharacterLink key={'c' + character.id} character={character} />
                                ))
                            ) : (
                                <CharacterLink character={characters as unknown as Character} />
                            )}
                        </Value>
                    </Row>
                </Box>
            </main>
        </>
    );
};

export default LocationPage;
