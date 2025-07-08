import template from './alphabet-invasion-game.hbs';

type AlphabetInvasionGame = {
    readonly type: string;
    run: () => void;
};

export function AlphabetInvasionGame(node: HTMLElement): AlphabetInvasionGame {
    const alphabetInvasionGameTemplate = template();
    node.innerHTML = alphabetInvasionGameTemplate;

    const state = {
        type: 'alphabet-invasion-game',
        run: () => {},
    };

    return Object.assign({}, state);
}
