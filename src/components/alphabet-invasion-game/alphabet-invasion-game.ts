import template from './alphabet-invasion-game.hbs';

import { GameOver } from '../game-over/game-over';
import { LettersRain } from './letters-rain/letters-rain';
import { NextLevelPanel } from '../next-level-panel/next-level-panel';
import { PanelScore } from '../panel-score/panel-score';

import { gameState$, GameState } from './game-state/game-state';
import { Letter, Letters } from '../../types/letters/letters';

import { fromEvent, startWith, map, filter, BehaviorSubject, switchMap, interval, scan, combineLatest, takeWhile } from 'rxjs';

type AlphabetInvasionGame = {
    readonly type: string;
    startGame: () => void;
};

export function AlphabetInvasionGame(appRootNode: HTMLElement): AlphabetInvasionGame {
    const alphabetInvasionGameTemplate = template({ score: 0, level: 0, gameOver: 'Game Over' });
    appRootNode.innerHTML = alphabetInvasionGameTemplate;

    const levelChangeThreshold = 20 as const;
    const speedAdjust = 50 as const;
    const ALPHABET: string[] = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'] as const;
    type AlphabetLetter = (typeof ALPHABET)[number];

    const lettersRain = LettersRain();
    const panelScore = PanelScore();
    const nextLevelPanel = NextLevelPanel();
    const gameOver = GameOver();
    const { gameWidth, endThreshold } = gameState$.getState();
    const intervalSubject$ = new BehaviorSubject<number>(600);

    const keys$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
        map((e) => e.key.toLowerCase()),
        filter((key) => /^[a-z]$/.test(key)),
        startWith('')
    );
    const letters$ = intervalSubject$.pipe(
        switchMap((speed) =>
            interval(speed).pipe(
                scan<number, Letters<Letter>>(
                    (ltrs) => ({
                        interval: speed,
                        letters: [
                            {
                                letter: randomLetter(),
                                xpos: Math.floor(Math.random() * gameWidth),
                            },
                            ...ltrs.letters,
                        ],
                    }),
                    { letters: [], interval: 0 }
                )
            )
        )
    );

    function randomLetter(): AlphabetLetter {
        return ALPHABET[Math.floor(Math.random() * ALPHABET.length)].toLocaleLowerCase();
    }

    const state = {
        type: 'alphabet-invasion-game',

        startGame: () => {
            lettersRain.startLettersRain();
            panelScore.startPanelScoreUpdate();
            nextLevelPanel.startPanelScoreUpdate();
            gameOver.startGameOverUpdate();

            const game$ = combineLatest([keys$, letters$]).pipe(
                scan<[string, Letters<Letter>], GameState>(
                    (gameState, [key, ltrs]) => {
                        const lastLetter = ltrs.letters[ltrs.letters.length - 1];

                        if (lastLetter?.letter === key) {
                            gameState.score++;
                            ltrs.letters.pop();
                        }

                        if (gameState.score > 0 && gameState.score % levelChangeThreshold === 0) {
                            gameState.score++;
                            gameState.level++;
                            intervalSubject$.next(ltrs.interval - speedAdjust);
                        }

                        const isGameOver = ltrs.letters.length >= endThreshold;

                        return {
                            ...gameState,
                            letters: [...ltrs.letters],
                            isGameOver,
                        };
                    },
                    { level: 0, score: 0, isGameOver: false, letters: [] }
                ),
                takeWhile((gameState) => !gameState.isGameOver, true)
            );

            game$.subscribe((gameState) => gameState$.update(gameState));
        },
    };

    return Object.assign({}, state);
}
