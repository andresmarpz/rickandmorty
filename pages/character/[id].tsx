import Box from '@/components/Box';
import { css, styled } from '@/stitches.config';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getCharacter, getEpisode } from 'rickmortyapi';
import { Character, Episode } from 'rickmortyapi/dist/interfaces';

export const getStaticPaths = () => {
    // create an array containing numbers from 1 to 842
    const ids = Array.from({ length: 826 }, (_, i) => i + 1);
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
    const { data: character } = await getCharacter(Number.parseInt('' + params.id));

    const episodeIds = character.episode.map((episode) => {
        const url = new URL(episode);
        return Number.parseInt(url.pathname.split('/')[3]);
    });

    const { data: episodes } = await getEpisode(episodeIds);

    return {
        props: {
            character,
            episodes
        }
    };
};

interface Props {
    character: Character;
    episodes: Episode[];
}

const StyledLink = css('a', {
    textDecoration: 'none',

    color: '$gray12'
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

const EpisodeLink = ({ episode }: { episode: Episode }) => {
    return (
        <Box
            css={{
                marginY: 4
            }}>
            <Link href={`/episode/${episode.id}`}>
                <a
                    className={StyledLink()}
                    style={{
                        textDecoration: 'underline'
                    }}>
                    {episode.name}
                </a>
            </Link>
        </Box>
    );
};

const CharacterPage = ({ character, episodes }: Props) => {
    return (
        <>
            <Header />
            <h1>{character.name}</h1>
            <h2>Type: Character</h2>
            <Box
                css={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                <Box
                    css={{
                        margin: 0,
                        borderRadius: 6,
                        overflow: 'hidden',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        maxWidth: 300,
                        aspectRatio: '8 / 7',
                        boxShadow: `
							0 2px 2px hsl(0deg 0% 0% / 0.045),
							0 4px 4px hsl(0deg 0% 0% / 0.045),
							0 8px 8px hsl(0deg 0% 0% / 0.045),
							0 16px 16px hsl(0deg 0% 0% / 0.045)
						`
                    }}>
                    <Image
                        alt={`Name ${character.name}, gender ${character.gender}, specie ${character.species}`}
                        src={character.image}
                        objectFit="cover"
                        layout="fill"
                    />
                </Box>
            </Box>
            <Box css={{ marginTop: 32 }}>
                <Row>
                    <Field>Status</Field>
                    <Value>{character.status}</Value>
                </Row>
                <Row>
                    <Field>Specie</Field>
                    <Value>{character.species}</Value>
                </Row>
                <Row>
                    <Field>Type</Field>
                    <Value>{character.type === '' ? 'unknown' : character.type}</Value>
                </Row>
                <Row>
                    <Field>Gender</Field>
                    <Value>{character.gender}</Value>
                </Row>
                <Row>
                    <Field>Origin</Field>
                    <Value>{character.origin.name}</Value>
                </Row>
                <Row>
                    <Field>Episodes</Field>
                    <Value>
                        {/* ugly hacky way of checking if it's a single episode or an array */}
                        {episodes.length ? (
                            episodes.map((episode) => (
                                <EpisodeLink key={episode.id} episode={episode} />
                            ))
                        ) : (
                            <EpisodeLink episode={episodes as unknown as Episode} />
                        )}
                    </Value>
                </Row>
            </Box>
        </>
    );
};

export default CharacterPage;
