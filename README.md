### React Typescript, fetch buslines, merge data and present the top 10 list

I use function theFunc to scope functions and use them in useEffect before they are defined
and use anonymous arrow functions 'const theFunc () => {} for small oneliner helper functions

Saved some energy on the design, but think it's good enough, showcasing what we want to solve here.

Extracted logic from components for easier readability and testing

Data is cached, clean cache in browser if you get any errors or want to try fetch function

To start it:
run
yarn
then
yarn start

localhost:3000 should appear in default browser.

Make sure you have enabled CORS in your browser (install this extension in Chrome: "Allow CORS: Access-Control-Allow-Origin" https://mybrowseraddon.com/access-control-allow-origin.html)

For more info look at image called THE_TASK. To see what has been solved
