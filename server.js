// import app from './app.js';

// const PORT = process.env.PORT;

// if (!PORT) {
//     throw new Error('PORT is not defined. Make sure your local npm scripts reference the .env file with --env-file=.env, or define PORT in your hosted environment settings.');
// }

// app.listen(PORT, () => {
//     console.log(`Server listening at 127.0.0.1:${PORT}`);
// });

import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});