import { gameState$, GameState } from '../alphabet-invasion-game/game-state/game-state';

type NextLevelPanel = {
    type: string;
    startPanelScoreUpdate: () => void;
};

export function NextLevelPanel() {
    function startPanelScoreUpdate() {
        const levelNode = document.querySelector('[level-zone]') as HTMLElement;

        gameState$.subscribe((gameState: GameState) => {
            const { level } = gameState;
            levelNode.textContent = String(level);
        });
    }

    const state = {
        type: 'next-panel-level',
        startPanelScoreUpdate,
    };

    return Object.assign({}, state);
}
