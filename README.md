
# InstaFood Client site

[![Netlify Status](https://api.netlify.com/api/v1/badges/1a1ac813-1389-4e6d-8abb-fb6d24573334/deploy-status)](https://app.netlify.com/sites/stoic-wilson-58c3b4/deploys)
 
 ![Img](https://i.imgur.com/wkIMtpq.png)


The objective was to create an online platform for a restaurant to accept online orders and save them to [API backend](https://github.com/kermit-klein/slowfood-api-team-2-april-2020)


Features
* User registration/login
* Adding items to order
* Preview order 
* Save the order to backend
* Show confirmation message

Visit the [live website](https://stoic-wilson-58c3b4.netlify.app/) or clone the repo to see the app in action.


## Authors:

[Ali Erbay](https://github.com/kermit-klein)  
[Marcus Sjöqvist](https://github.com/viamarcus)  



## Clone:

To run this app locally, you need to clone both this and the [API](https://github.com/kermit-klein/slowfood-api-team-2-april-2020) and follow the instructions there. When the API is running, run `$ yarn start` and visit http://localhost:3001.

## Testing:

The application was developed test driven using [Cypress](https://cypress.io). To run the tests locally, run `$ yarn cy:open` which executes commands for both starting the local server and Cypress.Having the API running is not necessary for this, since the tests use mock data.

## Styling:

Styling was done with the help of [Semantic UI for React](https://react.semantic-ui.com/)

## Additional dependencies used:

In addition to the packages already mentioned, we used:
* [axios](https://github.com/axios/axios#readme) for making HTTP calls
* [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom#readme) for routing
