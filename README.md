###### Please note that if you try to use [`https://rymtracker.now.sh`](https://rymtracker.now.sh), you might experience slow first-loading period since a free-tier heroku instance takes some time to get itself out of sleep, usually around 15 seconds.

## To run dev version

### `npm install`
### `npm run server`
### `npm run client`

## Todo

- [ ] **server**
  - [x] static user page crawling
  - [x] set specific username to track
  - [x] api route for getting immediate results
  - [ ] putting the results to database
  - [ ] sending the results to email
  - [ ] api route for setting mailing list subscription
- [ ] **client**
  - [x] getting the results for a specified username
  - [ ] mailing list subscription

## Personal side notes

<details><summary>In progress</summary>

###### Server:
- research on push vs concat vs spread performance

###### Client:
- —

###### Other:
- add 'why' part with pictures to this readme

</details>

<details><summary>Completed</summary>

###### Server:
- get release date
- fix crawling selector
- handle posting duplicates to the db
- restructure response json data

###### Client:
- render release dates
- separate render function for the restructured release dates

###### Other:
- —

</details>