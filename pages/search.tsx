import Box from '@/components/Box';
import Search from '@/components/Search';
import { css, styled } from '@/stitches.config';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getCharacters, getEpisodes, getLocations } from 'rickmortyapi';
import { Character, Episode, Location } from 'rickmortyapi/dist/interfaces';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { text } = context.query;
    if (!text) return { props: {} };

    const { data: character } = await getCharacters({
        name: text.toString()
    });

    const { data: location } = await getLocations({
        name: text.toString()
    });

    const { data: episode } = await getEpisodes({
        name: text.toString()
    });

    const results = [character.results, location.results, episode.results].filter(
        (data) => data && data.length
    );

    if (results.length === 1) {
        const first = results.pop();
        if (!first) return { props: {} };
        const url = new URL(first[0].url);

        return {
            redirect: {
                destination: `/${url.pathname.split('/')[2]}/${first[0].id}`,
                permanent: false
            }
        };
    } else {
        return {
            props: {
                character: character.results || null,
                location: location.results || null,
                episode: episode.results || null
            }
        };
    }
};

interface Props {
    character: Character[];
    location: Location[];
    episode: Episode[];
}

const H2 = styled('h2', {
    lineHeight: 1.3,
    margin: 0
});

const StyledAnchor = css('a', {
    color: '$gray12',
    marginLeft: 16
});

const Result = ({
    type,
    id,
    children
}: {
    type: 'character' | 'episode' | 'location';
    id: number;
    children?: React.ReactNode;
}) => {
    return (
        <Box
            css={{
                marginY: 4
            }}>
            <Link href={`/${type}/${id}`}>
                <a className={StyledAnchor()}>{children}</a>
            </Link>
        </Box>
    );
};

const Header = () => {
    return (
        <Box
            css={{
                paddingY: 32
            }}>
            <Link href="/">
                <a className={StyledAnchor()} style={{ marginLeft: 0 }}>
                    Home
                </a>
            </Link>
        </Box>
    );
};

const SearchPage = ({ character, location, episode }: Props) => {
    const data = [character, location, episode].filter(
        (data) => data !== null && data !== undefined
    );

    if (!data.length)
        return (
            <Box>
                <Header />
                <Search />
                <h1>No results found.</h1>
            </Box>
        );

    return (
        <Box>
            <Header />
            <Search />
            <h1>Results: </h1>
            {character && (
                <>
                    <H2>Characters:</H2>
                    {character.map((character) => (
                        <Result key={'c' + character.id} type="character" id={character.id}>
                            {character.name}
                        </Result>
                    ))}
                </>
            )}
            {location && (
                <>
                    <H2>Locations: </H2>
                    {location.map((location) => (
                        <Result key={'l' + location.id} type="location" id={location.id}>
                            {location.name}
                        </Result>
                    ))}
                </>
            )}
            {episode && (
                <>
                    <H2>Episodes:</H2>
                    {episode.map((episode) => (
                        <Result key={'e' + episode.id} type="episode" id={episode.id}>
                            {episode.name}
                        </Result>
                    ))}
                </>
            )}
        </Box>
    );
};

export default SearchPage;
