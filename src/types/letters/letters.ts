export type Letter = {
    letter: string;
    xpos: number;
};

export type Letters<Type> = {
    letters: Type[];
    interval: number;
};
