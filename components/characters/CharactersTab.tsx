import { useCharacters } from '@/hooks/useCharacters';
import { useEffectOnce } from '@/hooks/useEffectOnce';
import useStore from '@/management/store';
import React, { useCallback, useEffect, useState } from 'react';
import { Character } from 'rickmortyapi/dist/interfaces';
import Box from '../Box';
import Controls from '../Controls';
import Grid from '../Grid';
import CharacterCard from './CharacterCard';

interface Props {
    characters: Character[];
}

const CharactersTab = ({ characters: initalCharacters }: Props & React.ComponentProps<'div'>) => {
    const [mounted, setMounted] = useState(false);
    useEffectOnce(() => setMounted(true));

    const page = useStore((state) => state.charactersPage);
    const [loading, setLoading] = useState<boolean>(false);

    const { characters, fetchMore, isError } = useCharacters(page, initalCharacters);

    const fetchNewPage = useCallback(async () => {
        setLoading(true);
        await fetchMore(page);
        setLoading(false);
    }, [page, setLoading, fetchMore]);

    useEffect(() => {
        if (!mounted) return;

        fetchNewPage();
    }, [page, mounted, fetchNewPage]);

    if (isError) return <div>Error loading characters.</div>;
    if (!characters) return <div>Loading...</div>;

    return (
        <Box>
            <Controls pageType={'characters'} loading={loading} max={42} />
            <Grid>
                {characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </Grid>
        </Box>
    );
};

export default CharactersTab;
