import { gameState$, GameState } from '../game-state/game-state';

export type LettersRainType = {
    readonly type: string;
    startLettersRain: () => void;
};

export function LettersRain(): LettersRainType {
    const rainZone = document.querySelector('[data-rain-zone]') as HTMLElement;
    const { gameWidth, endThreshold } = gameState$.getState();

    function startLettersRain() {
        gameState$.subscribe((gameState: GameState) => {
            const { letters } = gameState;
            (rainZone.innerHTML = '<div></div>'),
                letters.forEach((l) => (rainZone.innerHTML += '&nbsp'.repeat(l.xpos) + l.letter + '<br/>')),
                (rainZone.innerHTML += '<br/>'.repeat(endThreshold - letters.length) + '-'.repeat(gameWidth));
        });
    }

    const state = {
        type: 'letters-rain',
        startLettersRain,
    };

    return Object.assign({}, state);
}
