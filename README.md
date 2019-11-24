# E-mail marketing sender

## How to setup
You will need `NodeJS 12.13` or superior and `npm 6.12` or superior.

To config files, please follow the steps:

1. fulfill a .env file using .env.example file as example;
2. Change the e-mail text in `src/templates/template.js` file. you can pass variables to this templates as in the example;
3. Insert a `list.csv` file in `src/resources/list.csv`. This file should have the list of e-mails who you want to send;

## How to Run

First, `npm i`, them run with `node src/index.js`;

## Contributing

This is a simple e-mail sender and for sure has space for enhanciments. Use your creativity and help as you want.

Fork the project or send the PR directly if you want. You can open an issue with ideas of what should be implemented.
