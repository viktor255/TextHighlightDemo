import cardsData from './cardsList.json';

interface Card {
    id: string;
    sCardId: string | null;
    sourceId: string | null;
    front: string;
    pronunciation: string | null;
    back: string;
    hint: string;
    flipped: boolean;
    loopedAt: string;
    knownAt: string | null;
    knownUntil: string | null;
    knownCount: number;
    failCount: number;
    source: any | null;
    svg: {
        flatId: string;
        url: string;
        id: string;
    } | null;
}

const cards = (cardsData as { cards: Card[] }).cards;

// Write a function decorateHint that takes a Card object and returns JSX, in which it does the following:
// Returns a modified hint
// 1. If it finds a word from "front" in the "hint" text, it decorates it with <b>
// 2. It decorates the word even if it originally had "the" (for nouns) or "to" (for verbs) at the beginning, which is no longer present in the text
// 3. It also decorates words that only start with the front, e.g. front: "bad" => hint: "hurt <b>badly</b>"

// Edge case list
// what if there are multiple matches in one hint -- decorate the first one
// we assume "the" "to" words which we want to ignore are only on first position

function getNormalizedFront(front: string): string {
    let normalizedFront = front.toLowerCase();
    const frontWords = normalizedFront.split(/\s+/);

    if (frontWords[0] === 'the' || frontWords[0] === 'to') {
        normalizedFront = normalizedFront.replace(/the |to /g, '');
    }

    return normalizedFront;
}

type DecorateMatch = {
    startIndex: number;
    endIndex: number;
};

function getMatch(hint: string, front: string): DecorateMatch | null {
    const normalizedHint = hint.toLowerCase();
    const normalizedFront = getNormalizedFront(front);

    const matchRegex = new RegExp(normalizedFront, 'g');
    const numberOfPotentialMatches = (normalizedHint.match(matchRegex) || []).length;

    let currentPotentialMatchSearchIndex = 0;

    for (let i = 0; i < numberOfPotentialMatches; i++) {
        const potentialMatchIndex = normalizedHint.indexOf(
            normalizedFront,
            currentPotentialMatchSearchIndex,
        );
        currentPotentialMatchSearchIndex = potentialMatchIndex + 1;

        const isThePotentialMatchAtStartOfWord =
            potentialMatchIndex === 0 || // at the beginning of the string
            !/[a-z0-9]/.test(normalizedHint[potentialMatchIndex - 1]); // or preceded by non-alphanumeric

        const isMatchFoundAndValid = potentialMatchIndex !== -1 && isThePotentialMatchAtStartOfWord;

        if (isMatchFoundAndValid) {
            // End index needs to end on the hint word end
            let endIndex = potentialMatchIndex + normalizedFront.length;
            while (endIndex < normalizedHint.length && /[a-z0-9]/.test(normalizedHint[endIndex])) {
                endIndex++;
            }

            return {
                startIndex: potentialMatchIndex,
                endIndex: endIndex,
            };
        }
    }

    return null;
}

type DecorateHintProps = {
    hint: string;
    front: string;
};

function decorateHint({ hint, front }: DecorateHintProps) {
    const match = getMatch(hint, front);
    const shouldDecorate = match !== null;

    if (shouldDecorate) {
        const start = hint.slice(0, match.startIndex);
        const matchedString = hint.slice(match.startIndex, match.endIndex);
        const end = hint.slice(match.endIndex);

        const decoratedHint = `<p>${start}<b>${matchedString}</b>${end}</p>`;

        console.log('Decorated one:');
        console.log('front:', front);
        console.log('original hint:', hint);
        console.log('decorated hint:', decoratedHint);

        return decoratedHint;
    } else {
        console.log('No match');
        console.log('front:', front);
        console.log('hint:', hint);

        return `<p>${hint}</p>`;
    }
}

cards.forEach(decorateHint);
