import { useEffectOnce } from '@/hooks/useEffectOnce';
import { useLocations } from '@/hooks/useLocations';
import useStore from '@/management/store';
import React, { useCallback, useEffect, useState } from 'react';
import { Location } from 'rickmortyapi/dist/interfaces';
import Box from '../Box';
import Controls from '../Controls';
import LocationCard from './LocationCard';

interface Props {
    locations: Location[];
}

const LocationsTab = ({ locations: initialLocations }: Props & React.ComponentProps<'div'>) => {
    const [mounted, setMounted] = useState(false);
    useEffectOnce(() => setMounted(true));

    const page = useStore((state) => state.locationsPage);
    const [loading, setLoading] = useState<boolean>(false);

    const { locations, fetchMore } = useLocations(page, initialLocations);

    const fetchNewPage = useCallback(async () => {
        setLoading(true);
        await fetchMore(page);
        setLoading(false);
    }, [page, fetchMore, setLoading]);

    useEffect(() => {
        if (!mounted) return;

        fetchNewPage();
    }, [page, mounted, fetchNewPage]);

    if (!locations || !mounted) return <div>Loading..</div>;

    return (
        <Box>
            <Controls pageType="locations" loading={loading} max={7} />
            <Box>
                {locations.map((location) => (
                    <LocationCard key={location.id} location={location} />
                ))}
            </Box>
        </Box>
    );
};

export default LocationsTab;
