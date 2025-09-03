import { gameState$, GameState } from '../alphabet-invasion-game/game-state/game-state';

import { Subscription } from 'rxjs';

export type PanelScoreType = {
    readonly type: string;
    startPanelScoreUpdate: () => void;
    stopPanelScoreUpdate: () => void;
};

export function PanelScore(): PanelScoreType {
    let subscription: Subscription | null = null;

    function startPanelScoreUpdate() {
        const scoreNode = document.querySelector('[score-zone]') as HTMLElement;

        subscription = gameState$.subscribe((gameState: GameState) => {
            const { score } = gameState;
            scoreNode.textContent = String(score);
        });
    }

    function stopPanelScoreUpdate() {
        subscription?.unsubscribe();
    }

    const state = {
        type: 'panel-score',
        startPanelScoreUpdate,
        stopPanelScoreUpdate,
    };

    return Object.assign({}, state);
}
