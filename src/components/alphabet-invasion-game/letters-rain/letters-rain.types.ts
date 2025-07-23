export type Letter = {
    letter: string;
    xpos: number;
};

export type Letters<Type> = {
    letters: Type[];
    interval: number;
};

export type LettersRain = {
    readonly type: string;
    startLettersRain: () => void;
};
