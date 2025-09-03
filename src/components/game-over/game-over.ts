import { gameState$, GameState } from '../alphabet-invasion-game/game-state/game-state';

import { Subscription } from 'rxjs';

type GameOverType = {
    type: string;
    startGameOverUpdate: () => void;
    stopGameOverUpdate: () => void;
};

export function GameOver(): GameOverType {
    let subscription: Subscription | null = null;

    function startGameOverUpdate() {
        const gameOverTextNode = document.querySelector('[game-over]') as HTMLElement;

        subscription = gameState$.subscribe((gameState: GameState) => {
            const { isGameOver } = gameState;

            if (isGameOver) {
                gameOverTextNode.style.display = 'inline';
            }
        });
    }

    function stopGameOverUpdate() {
        subscription?.unsubscribe();
    }

    const state = {
        type: 'game-over',
        startGameOverUpdate,
        stopGameOverUpdate,
    };

    return Object.assign({}, state);
}
