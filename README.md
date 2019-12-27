## Rate Your Music (Sonemic) email tracker

Track the upcoming releases section of the specified [`rateyourmusic`](https://rateyourmusic.com) account with a weekly email updates.

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
- [ ]  **client**
  - [x] getting the results for a specified username
  - [x] mailing list subscription
  - [ ] ui styling

### Personal side notes

<details><summary>In progress</summary>

###### Server
- research on push vs concat vs spread performance
- add date to release model
- multiple usernames in User model
- move to serverless-compatible puppeteer
- serverless backend model
- 24/7 uptime instead of sleeping heroku instance
- handle incoming emails
- overview http verbs
- controller, routes, services, helpers refactoring
- mail routes response messages
- email for users with no upcoming releases block
- setup .env vars for unsubscribe and verify links
- optimize database operations
- standartize and document API: routes, methods, response codes and messages, etc...
- handle actions of unverified users
- send successful verification email with an example of the data
- merge confirmation email templates into one (DRY)
- api rate limit
- OOP crawled data
- chromium sandbox
- add mutex

###### Client
- manage subscription form icons
- update color themes
- create new form validation scheme
- reduce icon size
- don't forget to remove light theme
- useReducer instead of useState
- focus precise input on error

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
- email validation
- find a way to remove duplicate releases

###### Client
- render release dates
- separate render function for the restructured release dates

###### Other
- move server deployment to <s>zeit</s> aws

</details>