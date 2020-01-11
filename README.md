## Rate Your Music (Sonemic) email tracker

Track the upcoming releases section of the specified [`rateyourmusic`](https://rateyourmusic.com) account with a weekly email updates.

This project is not production-ready. It was created purely with a self-educational purpose.

###### ⚠️ Please note that if you try to use [`rymtracker.ml`](https://rymtracker.ml), you might experience slow first-loading period since the free-tier Heroku instance "gets asleep" if it receives no web traffic in a 30-minute period and takes some time to get itself out of sleep, usually around 15 seconds.

### Run the dev version locally

``` shell
npm install
npm run server
npm run client
```

You'll have to setup MongoDB and `MONGODB_URI` inside `server/.env` by yourself. Also, you'll have to setup your own SMPT server or use third-party SMTP relay.


### Todo

- [ ]  **server**
  - [x] static user page crawling
  - [x] set specific username to track
  - [x] api route for getting immediate results
  - [x] api route for setting mailing list subscription
  - [x] unsubscribe function
  - [x] get all subscriptions of a specified user
  - [x] putting the results to database
  - [x] mailer
  - [x] sending the results to email
  - [x] email template render logic
  - [x] email template ui
  - [ ] email scheduling
  - [ ] subscribe to muliple rym users tracking per single email
- [x]  **client**
  - [x] getting the results for a specified username
  - [x] mailing list subscription
  - [x] ui styling

### Personal side notes

<details><summary>In progress</summary>

###### Server
- research on push vs concat vs spread performance (reducer helper)
- subscription to multiple RYM accounts
- serverless-compatible puppeteer
- serverless api
- handle incoming emails
- overview http verbs
- routes response messages
- optimize database operations
- standartize and document API: routes, methods, response codes and messages, etc...
- send successful verification email with an example of the data
- api rate limit
- OOP crawled data
- chromium sandbox
- add mutex
- try catch middleware
- separate email validation function to helpers/utils
- separate config from app.js
- validate input data length
- validate special symbols in username
- try joi for validation
- use aws ses instead of sendgrid
- try http2
- add logger
- services, helpers refactoring refactoring

###### Client
- try optional chaining
- list data lazy loading
- useReducer instead of useState in forms
- crawling form fetch: clean final promise
- add an example of the upcoming releases block

###### Other
- add 'why' part with pictures to this readme
- setup email scheduling
- try to merge client and server
- depcheck
- move the db to eu-west-1
- describe the app architecture in the readme
- write that the frontend is extremely simple
- cleanup the readme at the end
- configure eslint + prettier + stylelint
- tell why use GET instead of PATCH and DELETE
- add WTFPL
- draw an architecture scheme
- rename crawling to scraping

</details>

<details><summary>Completed</summary>

###### Server
- get release date
- fix crawling selector
- handle posting duplicates to the db
- restructure response json data
- setup mongodb instance through heroku addon
- try mlab heroku addon
- normalize api routes
- improve file structure
- unsubscribe link
- email verification
- handle unverified users actions
- helper for removing duplicate releases
- merge confirmation email templates into one (DRY)
- setup .env vars
- 24/7 uptime instead of sleeping heroku instance (aws)
- mass mailing and mass crawling timeout
- input data validation: trim and toLowerCase on backend
- api (controllers, routers) file structure refactoring

###### Client
- render release dates
- separate render function for the restructured release dates
- reduce favicon size
- separate subscribe form inputs
- create new form validation scheme
- handle fetching null data
- remove warning form state
- manage subscription form icons
- check input refs
- focus precise input on error / focus input with error state
- update color themes
- polish theme
- don't forget to remove light theme
- add back list animation
- clean and split list component
- improve components file structure
- sub form email validation

###### Other
- move server deployment to <s>zeit</s> aws

</details>