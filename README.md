## Rate Your Music (Sonemic) email tracker

Track the upcoming releases section of the specified [`rateyourmusic.com`](https://rateyourmusic.com) account with a weekly email updates.

This project is not production-ready. It was created purely for self-educational purposes.

~~⚠️ Please note that if you try to use [`rymtracker.ml`](https://rymtracker.ml), you might experience slow first-loading period since the free-tier Heroku instance "gets asleep" if it receives no web traffic in a 30-minute period and takes some time to get itself out of sleep, usually around 15 seconds.~~

###### The backend was moved to an AWS EC2 instace and now has a persistent uptime.

### Run the dev version locally

1. Launch a [MongoDB](https://www.mongodb.com/download-center/community) instance locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Setup your own SMPT server or use some third-party SMTP relay, such as [Sendgrid](https://sendgrid.com/) or [AWS SES](https://aws.amazon.com/ses/). 
3. Create `.env.development`  inside `server/src/config/.env.development` with the environment variables listed below.
4. Run `npm install` in the root folder.
5. Run `npm run server` and `npm run client`.


###### Environment variables

Name | Description
--- | ---
`MONGODB_URI` | MongoDB URI
`API_KEY_PUBLIC`, `API_KEY_PRIVATE` | Keys used in API authorization middleware
`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` | SMTP provider hostname and credentials
`DOMAIN` | Root domain used in email links generation

Take a look at `.env.example` for reference. Don't forget to setup the client env vars too (API keys and domain).

If you are getting errors with Puppeteer, make sure all the necessary dependencies are installed. You can run `ldd chrome | grep not` not on a Linux machine to check which dependencies are missing. The common ones are provided below.

<details>
<summary>Debian (e.g. Ubuntu) Dependencies</summary>

```
gconf-service
libasound2
libatk1.0-0
libatk-bridge2.0-0
libc6
libcairo2
libcups2
libdbus-1-3
libexpat1
libfontconfig1
libgcc1
libgconf-2-4
libgdk-pixbuf2.0-0
libglib2.0-0
libgtk-3-0
libnspr4
libpango-1.0-0
libpangocairo-1.0-0
libstdc++6
libx11-6
libx11-xcb1
libxcb1
libxcomposite1
libxcursor1
libxdamage1
libxext6
libxfixes3
libxi6
libxrandr2
libxrender1
libxss1
libxtst6
ca-certificates
fonts-liberation
libappindicator1
libnss3
lsb-release
xdg-utils
wget
```
</details>

Check out [this](https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md) doc for additional help.


### API

Coming soon...

### Todo

- [ ]  **Server**
  - [x] crawler service
  - [x] crawl api methods
  - [x] user api methods
  - [x] mailer service
  - [x] mail api methods
  - [x] sending the results to email
  - [x] email template render logic
  - [x] email template ui
  - [x] crawling scheduling
  - [x] email scheduling
  - [ ] track multiple rym users
  - [ ] server-side view rendering
- [ ]  **Client**
  - [x] crawling form
  - [x] user actions form
  - [x] ui styling
  - [x] api response pages
  - [ ] server-side rendering

### Personal side notes

<details><summary>In progress</summary>

###### Server
- add multiple RYM accounts subscription
- serverless: brotli compressed puppeteer, api, file structure
- make chromium sandbox
- research on push vs concat vs spread performance
- use http2
- add logger to cron job
- use another template engine instead of ejs

- handle incoming emails
- use joi or express-validation for validation
- clean massmail and masscrawl api methods

- ⚠️ add email links hash ⚠️
- ⚠️ handle puppeteer action in case of ip ban ⚠️
- ⚠️ rewrite lock with event emitter usage ⚠️

- ⚠️ use aws ses instead of sendgrid ⚠️
- ⚠️ improve email templates design ⚠️

- res msg status: error / ok
- change response message text to start with a capital letter

- move sample data somewhere
- do Promise.all and forEarch instead of procedural/imperative cringe 🤡

- use helmet
- use compression
- add cors config

- rename /users/ route path back to /user/

###### Client
- try optional chaining
- list data lazy loading
- useReducer instead of useState in forms
- crawling form fetch: clean final promise
- add an example of the upcoming releases block
- proper tooltip coloring
- data validation refactoring
- try thinner focus input borders
- button component object instead of ternary
- add validation of confirmation form params 

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
- make api doc
- write more about config and env vars setup
- env vars
- add prod/dev running scripts
- more info about creating api methods in the todo section

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
- optimize database operations
- helper for removing duplicate releases
- merge confirmation email templates into one (DRY)
- setup .env vars
- 24/7 uptime instead of sleeping heroku instance (aws)
- mass mailing and mass crawling timeout
- input data validation: trim and toLowerCase on backend
- api file structure refactoring
- api response messages refactoring
- overview http verbs
- standartize API: routes, codes, messages
- services & helpers refactoring
- separate email validation function to helpers/utils
- clean crawled data processing helper
- send successful verification email
- validate username data length and special symbols
- add mutex
- separate email templating
- separate config from app.js
- add api rate limit
- add api/crawl/{user} incoming data validation
- move .env to config folder
- add api route guarding with domain-specific keys
- disable some api routes
- use query params in api routes
- add error handling middleware
- add try catch route wrapper
- hide email in verification route response

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
- sub form username validation
- crawling form username validation
- change sub form button icon
- add client page for email links handling

###### Other
- move server deployment from <s>zeit</s> aws
- add pm2
- fix pm2 not properly working on reboot
