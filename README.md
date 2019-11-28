## Rate Your Music (Sonemic) email tracker

Track the upcoming releases section of the specified [`rateyourmusic`](https://rateyourmusic.com) account with a weekly email updates.

###### Please note that if you try to use [`https://rymtracker.now.sh`](https://rymtracker.now.sh), you might experience slow first-loading period since a free-tier heroku instance takes some time to get itself out of sleep, usually around 15 seconds.

### Run the dev version locally

``` shell
npm install
npm run server
npm run client
```

You'll have to setup MongoDB and `MONGODB_URI` inside `server/.env` by yourself.


### Todo

- [ ]  **server**
  - [x] static user page crawling
  - [x] set specific username to track
  - [x] api route for getting immediate results
  - [x] api route for setting mailing list subscription
  - [x] unsubscribe function
  - [x] get all subscriptions of a specified user
  - [ ] putting the results to database
  - [ ] sending the results to email
- [ ]  **client**
  - [x] getting the results for a specified username
  - [x] mailing list subscription
  - [ ] ui styling

### Personal side notes

<details><summary>In progress</summary>

###### Server
- research on push vs concat vs spread performance
- improve file structure
- normalize api routes

###### Client
- manage subscription form icons
- update color themes
- create new form validation scheme
- reduce icon size

###### Other
- add 'why' part with pictures to this readme
- try mlab heroku addon
- setup mailing scheduling
- try to merge client and server
- consider moving server deployment to zeit.co
- depcheck
- move the db to eu-west-1
- describe the app architecture in the readme

</details>

<details><summary>Completed</summary>

###### Server
- get release date
- fix crawling selector
- handle posting duplicates to the db
- restructure response json data
- setup mongodb instance through heroku addon

###### Client
- render release dates
- separate render function for the restructured release dates

###### Other
- —

</details>