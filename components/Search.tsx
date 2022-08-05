import { styled } from '@/stitches.config';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import Box from './Box';
import MagnifyingGlass from './svgs/MagnifyingGlass';
import Spinner from './svgs/Spinner';

const StyledForm = styled('form', {
    position: 'relative',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    padding: '20px 12px',
    border: '1px solid $gray4',
    borderRadius: 6,

    variants: {
        focus: {
            true: {
                boxShadow: 'hsl(0, 0%, 0%) 0px 0px 0px 1.5px'
            },
            false: {
                outline: 'none'
            }
        },
        disabled: {
            true: {
                backgroundColor: '$gray2'
            },
            false: {
                backgroundColor: '#fff'
            }
        }
    }
});

const StyledSearch = styled('input', {
    fontSize: 16,
    padding: 8,
    border: 'none',
    marginLeft: 4,
    '&:focus': {
        outline: 'none'
    },
    '&:disabled': {
        backgroundColor: '$gray2'
    }
});

const Search = () => {
    const [focus, setFocus] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        if (!search.length) return;

        router.push(`/search?text=${search}`).then(() => setLoading(false));
    };

    return (
        <StyledForm onSubmit={(e) => handleSearch(e)} focus={focus} disabled={loading}>
            <MagnifyingGlass />
            <StyledSearch
                placeholder="Search.."
                disabled={loading}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            {loading && (
                <Box
                    css={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%'
                    }}>
                    <Spinner />
                </Box>
            )}
        </StyledForm>
    );
};

export default Search;
