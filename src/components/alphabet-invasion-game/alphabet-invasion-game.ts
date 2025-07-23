import template from './alphabet-invasion-game.hbs';
import { LettersRain } from './letters-rain/letters-rain';

type AlphabetInvasionGame = {
    readonly type: string;
    startGame: () => void;
};

export function AlphabetInvasionGame(appRootNode: HTMLElement): AlphabetInvasionGame {
    const alphabetInvasionGameTemplate = template();
    appRootNode.innerHTML = alphabetInvasionGameTemplate;

    const lettersRain = LettersRain();

    const state = {
        type: 'alphabet-invasion-game',
        startGame: () => {
            lettersRain.startLettersRain();
        },
    };

    return Object.assign({}, state);
}
