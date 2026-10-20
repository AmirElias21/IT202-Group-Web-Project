# IT202 Group Web Project - Personal Movie Tracker

A team class project for keeping a movie list in a browser. The app uses HTML, CSS, and JavaScript for the pages and a Node.js/Express server for the API.

The current demo includes signup and login forms, a movie list, adding a movie with a title, watch status, rating, date, and optional poster URL, and deleting a movie. This repository contains the team's project; the descriptions here do not assign individual features to one team member.

## Run locally

Install Node.js and npm. Express 5 requires Node.js 18 or newer. From the repository folder:

```sh
cd "IT202 Website Project"
npm ci --ignore-scripts
node server.js
```

Open <http://localhost:3000>. The server redirects to the login page. Use the signup page to create a made-up demo account, then try adding and deleting movies. Stop the server with Ctrl+C.

Run `node server.js` directly: `package.json` has no start script, and its test script is only a placeholder. The server uses port 3000. GitHub Pages can serve static files but cannot run this Node.js API, so use the local server for the full demo.

## Demo status and limitations

This is a classroom demo for local use. **Use made-up usernames and passwords only. Do not enter real credentials or personal information, and do not expose this version as a public service.**

- Users and movies are stored in arrays in server memory. Restarting the server clears them; there is no database or file persistence.
- Passwords are stored as plaintext in memory and compared directly during login.
- Login does not create a session or authentication token. The browser keeps a username in `localStorage`, and the movie API trusts the username supplied by the client.
- Movie deletion uses an ID without checking who owns the movie. The API does not provide authenticated access control.
- Poster images use external URLs and may fail to load. The default poster also depends on an external site.
- The add-movie form does not prevent the browser's default form submission, which can interrupt its asynchronous save request. That flow still needs work.

The app demonstrates browser forms, API requests, and basic movie-list operations. It needs authentication, password hashing, access controls, and persistent storage before it could be used with real accounts.

## Project layout

- `IT202 Website Project/server.js`: Express server, API routes, and in-memory data.
- `IT202 Website Project/public/html/`: login, signup, movie list, add-movie, and confirmation pages.
- `IT202 Website Project/public/js/`: form handling and movie API requests.
- `IT202 Website Project/public/css/`: page styles.
