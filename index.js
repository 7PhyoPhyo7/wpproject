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
/*
app.get('/', (req, res)=>{
	res.send("Hello Oppa!");
})
*/
// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {

   // req.status(200).send('Request received');

  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = process.env.VERIFICATION_TOKEN;
  

  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Check if a token and mode were sent
  if (mode && token) {

    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});