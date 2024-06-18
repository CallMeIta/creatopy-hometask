React-Express-SSR Project
==========================

Overview
--------
This project is a server-side rendered (SSR) React application using Express as the server. It fetches JSON data from an external API and dynamically renders the content using React.

Setup
-----
Prerequisites
-------------

	•	Node.js (>= 14.x)
	•	npm (>= 6.x) or yarn

Clone the repository:
----------------------

    $ git clone https://github.com/CallMeIta/creatopy-hometask
    $ cd creatopy-hometask

Install the dependencies:
-------------------------
    
        $ npm install or yarn install

Project Structure
-----------------
    react-express-ssr/
    ├── dist/                     # Compiled output
    ├── src/
    │   ├── client/               # React client application
    │   │   ├── components/       # React components
    │   │   └── index.tsx         # Client entry point
    │   ├── server/               # Express server application
    │   │   └── index.tsx         # Server entry point
    │   ├── types/                # TypeScript types
    │       └── JsonDesign.types.ts  # Type definitions
    ├── webpack.config.js         # Webpack configuration
    ├── package.json              # NPM package configuration
    └── README.md                 # Project documentation

Usage
=====

Running the Application
-----------------------

	1.	Build the project:
            $ npm run build or yarn build

    2.	Start the server:
            $ npm start or yarn start

    	3. Open your browser and navigate to http://localhost:3000/<hash> (or click a link in the terminal) where <hash> is the identifier for the JSON data.

Development Workflow
--------------------

    •   To build the client and server separately:
            $ npm run build:client or yarn build:client
            $ npm run build:server or yarn build:server

	•   To start the server in development mode:   
        $ npm run start