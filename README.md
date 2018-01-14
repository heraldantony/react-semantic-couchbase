# react-semantic-couchbase
A CRUD app using react, semantic ui, node, express, and couchbase

## Suicrux
https://github.com/Metnew/suicrux

## Semantic UI
https://github.com/Semantic-Org/Semantic-UI-React

## Couchbase
https://www.couchbase.com/

## Ottoman ODM
https://github.com/couchbaselabs/node-ottoman


## Installation
git clone https://github.com/heraldantony/react-semantic-couchbase
cd react-semantic-couchbase
npm install
npm run dev

### Config changes
The following values have to be changed in webpack_config/config.js
The bucket has to be created in couchbase, and full text index added, before you can run "npm run dev". The "JSON type field" should be set "_type" in the index definition.

 DBHOST='localhost',
 DBUSER='empuser',
 BUCKET='empapp',
 DBPASSWORD='emp123',
 SEARCH_INDEX='emp-text'

## Server-side rendering
npm run server_build
npm run start

