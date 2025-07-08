type LettersRain = {
    readonly type: string;
};

export function LettersRain(): LettersRain {
    const state = {
        type: 'letters-rain',
    };

    return Object.assign({}, state);
}
