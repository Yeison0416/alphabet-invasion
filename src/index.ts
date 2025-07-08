import 'reset-css';
import './index.scss';
import { AlphabetInvasionGame } from './components/alphabet-invasion-game/alphabet-invasion-game';

function Game() {
    return {
        run() {
            const appRootElement: HTMLElement = document.getElementById('app-root')! as HTMLElement;
            const alphabetInvasionGame = AlphabetInvasionGame(appRootElement);
        },
    };
}

const game = Game();
game.run();
