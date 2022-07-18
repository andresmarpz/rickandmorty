import { Character } from 'rickmortyapi/dist/interfaces';

import { css, keyframes, styled } from '@/stitches.config';
import { blue } from '@radix-ui/colors';
import * as Popover from '@radix-ui/react-popover';
import Link from 'next/link';
import { CSSProperties } from 'react';
import BlurImage from '../BlurImage';
import Box from '../Box';
import Cross2 from '../svgs/Cross2';

const slideUpAndFade = keyframes({
    '0%': { transform: 'translateY(10px)' },
    '100%': { transform: 'translateY(0)' }
});

const slideRightAndFade = keyframes({
    '0%': { transform: 'translateX(-10px)' },
    '100%': { transform: 'translateX(0)' }
});

const slideDownAndFade = keyframes({
    '0%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0)' }
});

const slideLeftAndFade = keyframes({
    '0%': { transform: 'translateX(10px)' },
    '100%': { transform: 'translateX(0)' }
});

const PopoverRoot = styled(Popover.Root, {});
const PopoverTrigger = styled(Popover.Trigger, {
    zIndex: 2,
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    cursor: 'pointer',
    '&:hover': { backgroundColor: blue.blue3 },
    '&:focus': { boxShadow: `0 0 0 2px black` }
});
// const PopoverAnchor = styled(Popover.Anchor, {});
const PopoverContent = styled(Popover.Content, {
    zIndex: 99,
    borderRadius: 4,
    padding: 20,
    width: 260,
    backgroundColor: 'white',
    boxShadow:
        'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    '@media (prefers-reduced-motion: no-preference)': {
        animationDuration: '200ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        animationFillMode: 'forwards',
        willChange: 'transform, opacity',
        '&[data-state="open"]': {
            '&[data-side="top"]': { animationName: slideDownAndFade },
            '&[data-side="right"]': { animationName: slideLeftAndFade },
            '&[data-side="bottom"]': { animationName: slideUpAndFade },
            '&[data-side="left"]': { animationName: slideRightAndFade }
        }
    },
    '&:focus': {
        boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px ${blue.blue7}`
    }
});
const PopoverClose = styled(Popover.Close, {
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '100%',
    height: 25,
    width: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: blue.blue11,
    position: 'absolute',
    top: 5,
    right: 5,

    '&:hover': { backgroundColor: blue.blue4 },
    '&:focus': { boxShadow: `0 0 0 2px ${blue.blue7}` }
});
const PopoverArrow = styled(Popover.Arrow, {
    fill: 'white'
});

const StyledLink = css({
    color: '$gray12',
    textUnderlineOffset: 1
});

interface PopoverProps {
    character: Character;
    children?: React.ReactNode;
    css?: CSSProperties;
}

const Row = styled('div', {
    display: 'grid',
    gridTemplateColumns: '0.35fr 0.65fr'
});

const Field = styled('span', {
    color: '$gray11',
    width: '100%'
});

const Value = styled('span', {
    color: '$gray12',
    width: '100%'
});

const PopoverComponent = ({ character, children, css }: PopoverProps) => {
    return (
        <PopoverRoot>
            <PopoverTrigger css={{ ...css }}>{children}</PopoverTrigger>
            <PopoverContent side="top" avoidCollisions={true} collisionTolerance={25}>
                <PopoverClose aria-label="Close">
                    <Cross2 />
                </PopoverClose>
                <PopoverArrow offset={10} />
                <Box
                    css={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4
                    }}>
                    <Row>
                        <Field>Name</Field>
                        <Value>{character.name}</Value>
                    </Row>
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
                        <Field>Gender</Field> <Value>{character.gender}</Value>
                    </Row>
                    <Row>
                        <Field>Origin</Field>
                        <Value>{character.origin.name}</Value>
                    </Row>
                    <Box
                        css={{
                            marginTop: 4
                        }}>
                        <Link href={`/character/${character.id}`}>
                            <a className={StyledLink()}>Visit character page</a>
                        </Link>
                    </Box>
                </Box>
            </PopoverContent>
        </PopoverRoot>
    );
};

const CharacterCard = ({ character }: { character: Character }) => {
    return (
        <>
            <PopoverComponent
                character={character}
                key={character.id}
                css={{
                    borderRadius: 6,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 'auto',
                    aspectRatio: '8 / 7',
                    boxShadow: `
					0 2px 2px hsl(0deg 0% 0% / 0.045),
					0 4px 4px hsl(0deg 0% 0% / 0.045),
					0 8px 8px hsl(0deg 0% 0% / 0.045),
					0 16px 16px hsl(0deg 0% 0% / 0.045)
				`
                }}>
                <BlurImage
                    alt={`Name ${character.name}, gender ${character.gender}, specie ${character.species}`}
                    src={character.image}
                    objectFit="cover"
                    layout="fill"
                />
            </PopoverComponent>
        </>
    );
};

export default CharacterCard;
