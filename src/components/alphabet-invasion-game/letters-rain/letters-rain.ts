import { BehaviorSubject, interval, Observable, scan, switchMap } from 'rxjs';
import { LettersRain as LettersRainType } from './letters-rain.types';
import { Letter, Letters } from './letters-rain.types';

export function LettersRain(): LettersRainType {
    type AlphabetLetter = (typeof ALPHABET)[number];

    const ALPHABET: string[] = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'] as const;
    const intervalSubject: Observable<number> = new BehaviorSubject(600);
    const gameWidth: number = 50 as const;

    const letters$ = intervalSubject.pipe(
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

    function startLettersRain() {
        const rainZone = document.querySelector('[data-rain-zone]') as HTMLElement;

        letters$.subscribe(({ letters }) => {
            rainZone.innerHTML = '<div></div>';
            letters.forEach((l) => (rainZone.innerHTML += '&nbsp'.repeat(l.xpos) + l.letter + '<br/>'));
        });
    }

    const state = {
        type: 'letters-rain',
        startLettersRain,
    };

    return Object.assign({}, state);
}
