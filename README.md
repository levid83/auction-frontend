## The Auction House - demo project

This is a front-end application for the [Auction House With Serverless Microservices](https://github.com/levid83/auction-serverless-microservices) demo project.

## Setup

Clone this repository.

```
git clone https://github.com/levid83/auction-frontend
cd auction-frontend
```

Install the NPM dependencies for this project.

```
npm install
```

## Variables

Create a `.env` file in the root folder of this project (see [.env.example](.env.example)). You need to specify 4 variables:

- `REACT_APP_REFRESH_RATE`: The rate at which auctions will be fetched (in milliseconds)

- `REACT_APP_AUCTIONS_ENDPOINT`: Your Auction Service API endpoint (under `AWS ->CloudFormation->Stacks-> ${AUCTION_SERVICE_STACK_NAME}->Outputs->ServiceEndpoint`)

- `REACT_APP_AUTH0_DOMAIN`: Your Auth0 application domain.  (under `Auth0.com->applications->${YOUR_APP_NAME}->settings`)

- `REACT_APP_AUTH0_CLIENT_ID`: Your Auth0 application client ID. (under `Auth0.com->applications->${YOUR_APP_NAME}->settings`)

## Running the application

You can run the application by typing in:

```
npm start
```

The application should now be running at [http://localhost:3000](http://localhost:3000).
