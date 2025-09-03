import { gameState$, GameState } from '../game-state/game-state';

import { Subscription } from 'rxjs';

export type LettersRainType = {
    readonly type: string;
    startLettersRain: () => void;
    stopLettersRain: () => void;
};

export function LettersRain(): LettersRainType {
    let subscription: Subscription | null = null;

    const rainZone = document.querySelector('[data-rain-zone]') as HTMLElement;
    const { gameWidth, endThreshold } = gameState$.getState();

    function startLettersRain() {
        subscription = gameState$.subscribe((gameState: GameState) => {
            const { letters } = gameState;
            (rainZone.innerHTML = '<div></div>'),
                letters.forEach((l) => (rainZone.innerHTML += '&nbsp'.repeat(l.xpos) + l.letter + '<br/>')),
                (rainZone.innerHTML += '<br/>'.repeat(endThreshold - letters.length) + '-'.repeat(gameWidth));
        });
    }

    function stopLettersRain() {
        subscription?.unsubscribe();
    }

    const state = {
        type: 'letters-rain',
        startLettersRain,
        stopLettersRain,
    };

    return Object.assign({}, state);
}
