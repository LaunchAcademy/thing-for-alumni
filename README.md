Mock Coding Challenge

This project crawls GitHub's weekly trending page.  

Part I of the project is a script that prints summary information of each repository that appears on the trending page to the terminal.  

Part II uses the crawled data to seed a database, which it then uses to serve the trending repository data from a JSON API endpoint. 

To set up the project, navigate to the server folder and run 

    yarn migrate:latest
    yarn db:seed

To print the summary information as specified in Part I, from your server folder, run 

    node githubTrending.js

To see the JSON endpoint in Part II, from your root folder, run

     yarn dev

Then navigate to localhost:3000/api/v1/github-trending in your browser to see the data provided at the endpoint. 