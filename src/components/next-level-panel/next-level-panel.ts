import { gameState$, GameState } from '../alphabet-invasion-game/game-state/game-state';

import { Subscription } from 'rxjs';

type NextLevelPanel = {
    type: string;
    startNextLevelPanel: () => void;
    stopNextLevelPanel: () => void;
};

export function NextLevelPanel(): NextLevelPanel {
    let subscription: Subscription | null = null;

    function startNextLevelPanel() {
        const levelNode = document.querySelector('[level-zone]') as HTMLElement;

        subscription = gameState$.subscribe((gameState: GameState) => {
            const { level } = gameState;
            levelNode.textContent = String(level);
        });
    }

    function stopNextLevelPanel() {
        subscription?.unsubscribe();
    }

    const state = {
        type: 'next-panel-level',
        startNextLevelPanel,
        stopNextLevelPanel,
    };

    return Object.assign({}, state);
}
