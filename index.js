'use strict';
const
  PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN,
  express = require('express'),
  requestify = require('requestify'),
  body_parser = require('body-parser'),
  har = require('har-validator'),
  admin= require('firebase-admin'),
  sendmessageurl='https://graph.facebook.com/v6.0/me/messages?access_token='+PAGE_ACCESS_TOKEN,
  app = express().use(body_parser.json()); // creates express http server
 
  app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
/*
app.get('/', (req, res)=>{
	res.send("Hello Oppa!");
})
*/


function textMessage(senderID,text){
	requestify.post(sendmessageurl, {
		"recipient":{
		"id":senderID},
		"message":{
			"text":text
		}
	})
}
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


app.post('/webhook', (req, res) => {  
 
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log("webhook_event",webhook_event);
      var senderID=webhook_event.sender.id;
      console.log('senderID',senderID);
      if(webhook_event.postback){
        var userInput=webhook_event.postback.payload;
        }
    if (webhook_event.message) 
    	{
    		if (webhook_event.message.text) {
      var userInput=webhook_event.message.text;

      if (userInput)
         {
          textMessage(senderID,'Welcome Ko Ko')
          console.log("userinput",userInput);
         };

    }
  if (webhook_event.message.attachments){
    var userMedia=webhook_event.message.attachments.payload.url;


    	
  }}
   
  });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
     } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});
