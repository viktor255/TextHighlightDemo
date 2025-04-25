// Import the cards data from cardsList.json
import cardsData from './cardsList.json';

// Define an interface for the Card structure
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


function shouldDecorate(hint: string, front: string): { shouldDecorate: boolean, wordToDecorate?: string, index?: number } {
    const normalizedHint = hint.toLowerCase();
    const normalizedFront = front.toLowerCase();

    // We want to decorate one of words of Hint contain word from Front
    // we are okay with prefix match all the time
    // we are only okay with suffix match if remaining prefix is "the" or "to"

    // Split hint into words
    const hintWords = normalizedHint.split(/\s+/);
    const originalHintWords = hint.split(/\s+/);

    for (let i = 0; i < hintWords.length; i++) {
        const word = hintWords[i];

        // Check for prefix match (word starts with front)
        if (word.startsWith(normalizedFront)) {
            return {
                shouldDecorate: true,
                wordToDecorate: originalHintWords[i],
                index: i
            };
        }

        // Check for suffix match (word ends with front)
        if (word.endsWith(normalizedFront)) {
            // For suffix match, check if the remaining prefix is "the" or "to"
            const prefix = word.substring(0, word.length - normalizedFront.length);
            if (prefix === "the" || prefix === "to") {
                return {
                    shouldDecorate: true,
                    wordToDecorate: originalHintWords[i],
                    index: i
                };
            }
        }

        // Check if the word contains the front text and is an exact match
        if (word === normalizedFront) {
            return {
                shouldDecorate: true,
                wordToDecorate: originalHintWords[i],
                index: i
            };
        }
    }

    return { shouldDecorate: false };
}

function decorateHint({hint, front}: Card) {
    const result = shouldDecorate(hint, front);
    if (result.shouldDecorate && result.wordToDecorate && result.index !== undefined) {
        // Split the hint into words
        const hintWords = hint.split(/\s+/);

        // Decorate the matching word by wrapping it with asterisks
        hintWords[result.index] = `**${result.wordToDecorate}**`;

        // Join the words back together
        const decoratedHint = hintWords.join(' ');

        console.log('Decorated one:');
        console.log('front:', front);
        console.log('original hint:', hint);
        console.log('decorated hint:', decoratedHint);
        console.log('decorated word:', result.wordToDecorate);
        console.log('match type:',
            result.wordToDecorate.toLowerCase().startsWith(front.toLowerCase()) ? 'prefix match' :
            (result.wordToDecorate.toLowerCase().endsWith(front.toLowerCase()) ? 'suffix match' : 'exact match'));
    }
}

cards.forEach(decorateHint);
