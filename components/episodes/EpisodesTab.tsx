import { useEffectOnce } from '@/hooks/useEffectOnce';
import { useEpisodes } from '@/hooks/useEpisodes';
import useStore from '@/management/store';
import React, { useCallback, useEffect, useState } from 'react';
import type { Episode } from 'rickmortyapi/dist/interfaces';
import Box from '../Box';
import Controls from '../Controls';
import EpisodeCard from './EpisodeCard';

interface Props {
    episodes: Episode[];
}

const EpisodesTab = ({ episodes: initialEpisodes }: Props & React.ComponentProps<'div'>) => {
    const [mounted, setMounted] = useState(false);
    useEffectOnce(() => setMounted(true));

    const page = useStore((state) => state.episodesPage);
    const [loading, setLoading] = useState<boolean>(false);

    const { episodes, fetchMore } = useEpisodes(page, initialEpisodes);

    const fetchNewPage = useCallback(async () => {
        setLoading(true);
        await fetchMore(page);
        setLoading(false);
    }, [page, fetchMore, setLoading]);

    useEffect(() => {
        if (!mounted) return;

        fetchNewPage();
    }, [page, mounted, fetchNewPage]);

    if (!episodes || !mounted) return <div>Loading..</div>;

    return (
        <Box>
            <Controls pageType="episodes" loading={loading} max={3} />
            {episodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
            ))}
        </Box>
    );
};

export default EpisodesTab;
