'use strict';
const
  PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN,
  express = require('express'),
  requestify = require('requestify'),
  body_parser = require('body-parser'),
  har = require('har-validator'),
  admin= require('firebase-admin'),
  app = express().use(body_parser.json()); // creates express http server

  app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

app.get('/', (req, res)=>{
	res.send("Hello Oppa!");
})
