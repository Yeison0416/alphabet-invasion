import { gameState$, GameState } from '../alphabet-invasion-game/game-state/game-state';

export type PanelScoreType = {
    readonly type: string;
    startPanelScoreUpdate: () => void;
};

export function PanelScore(): PanelScoreType {
    function startPanelScoreUpdate() {
        const scoreNode = document.querySelector('[score-zone]') as HTMLElement;

        gameState$.subscribe((gameState: GameState) => {
            const { score } = gameState;
            scoreNode.textContent = String(score);
        });
    }

    const state = {
        type: 'panel-score',
        startPanelScoreUpdate,
    };

    return Object.assign({}, state);
}
