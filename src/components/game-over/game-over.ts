import { gameState$, GameState } from '../alphabet-invasion-game/game-state/game-state';

type GameOverType = {
    type: string;
    startGameOverUpdate: () => void;
};

export function GameOver(): GameOverType {
    function startGameOverUpdate() {
        const gameOverTextNode = document.querySelector('[game-over]') as HTMLElement;

        gameState$.subscribe((gameState: GameState) => {
            const { isGameOver } = gameState;

            if (isGameOver) {
                gameOverTextNode.style.display = 'inline';
            }
        });
    }

    const state = {
        type: 'game-over',
        startGameOverUpdate,
    };

    return Object.assign({}, state);
}
