# 🎮 Alphabet Invasion Game
An interactive typing game built with vanilla JavaScript, Handlebars templates, and RxJS.
Your goal is to prevent falling letters from reaching the bottom of the game board by typing them before it’s too late.

# ✨ Features
⚡ **Reactive architecture with RxJS**
The game logic is driven by observables (keys$, letters$, game$) and stream composition.

🎨 **Component-based UI with Handlebars**
Each part of the UI (letters rain, score panel, level panel, game over) is encapsulated in its own component.

🎯 **Game mechanics**

Random letters drop continuously.

Type the correct letter to remove it and score points.

Every 20 points, the game speeds up and the level increases.

The game ends when too many letters reach the bottom.

🧹 **Clean teardown**
Subscriptions are properly managed with RxJS to avoid memory leaks.

# 🕹️ Gameplay

1. Press any letter key on your keyboard to shoot the corresponding falling letter.

2. Each successful hit removes the letter and increases your score.

3. Every 20 points:

   Your level goes up.

   The fall speed increases (harder challenge).

4. The game ends if the screen fills with letters beyond the threshold.

5. A Game Over message is displayed.

# 🚀 Getting Started
1. Clone the repo
git clone https://github.com/your-username/alphabet-invasion-game.git
`cd alphabet-invasion-game`

2. Install dependencies
   `npm install`

3. Run the project
   `npm start`

