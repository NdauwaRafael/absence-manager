# Code challenge running instructions
Hello! The challenge have two environments, the client and the api. 

### api
The API comprises a simple node.js application that returns the json results for members and absences. 
The absences have can be returned based on the passed filters passed from the client app. 
It is crucial to have the api up and running before running the client.

#### How to run
Assuming you already cloned the repo and are inside the project folder: 
- Go to api folder ``cd api``
- Install dependencies ```yarn install``` 
- Start the api by running ```yarn run dev```

### client
Contains a reacted typed application for consuming the api above.
To run the application, ensure the api is up and running and you are in project root:
- Go to client folder ```cd client```
- Install dependencies ```yarn install```
- Start the client app by running ```yarn start```
- Go to ```localhost:3000``` on your browser.
- Use the filters and pagination options to view different data displayed.
- To run tests, execute command ```yarn test``` inside `client` folder.
