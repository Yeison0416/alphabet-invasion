import { BehaviorSubject, Subscription } from 'rxjs';
import { Letter } from '../../../types/letters/letters';

type GameStateStore<T> = {
    readonly subscribe: (callback: (value: T) => void) => Subscription;
    readonly getState: () => T;
    readonly update: (newState: Partial<T>) => void;
};

export type GameState = {
    level: number;
    score: number;
    isGameOver: boolean;
    letters: Letter[];
};

const initState: GameState = {
    level: 0,
    score: 0,
    isGameOver: false,
    letters: [],
};

function createGameState<T>(initialState: T): GameStateStore<T> {
    const subject = new BehaviorSubject<T>(initialState);

    return {
        subscribe: (callback) => subject.subscribe(callback),
        getState: () => ({ ...subject.value }),
        update: (newState) => subject.next({ ...subject.value, ...newState }),
    };
}

export const gameState$ = createGameState({ ...initState, ...{ gameWidth: 50 as const, endThreshold: 16 as const } });
