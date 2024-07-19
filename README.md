# Cool Games

Intuitive and fun games that can be played in your browser.

## Prequesites
You will need to have [Node.js](https://nodejs.org/en/) installed. That's it!

## Understanding the architecture
The core of the app is the `GameManagerContext` where it manages the levels and scores. Combined with [React Router DOM](https://reactrouter.com/), the game page loads data (game data, i.e title, game type, previous session, saved games,...) before the page is rendered. This gives a 1-page-1-data-request architecture so we get fresh data from our backend (in this case, `localStorage`) without having to manage complex global states. **Yes, I'm looking at you, Redux!**

## Running the app
1. Ensure all the dependencies are installed
```npm install```
2. Run the app on port 5173
```npm run dev```
3. Go and play the games on http://localhost:5173 !

## Next steps
- Making the games more interactive by adding handtracking.js: [PR in progress](https://github.com/Adenhall/cool_games/pull/1)
