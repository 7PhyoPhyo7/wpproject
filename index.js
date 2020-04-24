'use strict';
const
  PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN,
  express = require('express'),
  requestify = require('requestify'),
  body_parser = require('body-parser'),
  request = require('request'),
  ejs = require("ejs"),
  fs = require('fs'),
  har = require('har-validator'),
  promise = require('promise'),
 // q = require('q');
  //admin= require('firebase-admin'),
  sendmessageurl='https://graph.facebook.com/v6.0/me/messages?access_token='+PAGE_ACCESS_TOKEN,
  app = express().use(body_parser.json()); // creates express http server
 
 
/*
app.get('/', (req, res)=>{
	res.send("Hello Oppa!");
})
*/



var admin = require("firebase-admin");
var serviceAccount = {
  "type": "service_account",
  "project_id": "book-c045a",
  "private_key_id": "7d738d2479291f050228e9c4f955d7e2f5a2c4ca",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCi++yzQ1Ciq4dR\nb1oQHRJFwTBC/VESzgthfheRm9H+XlOoaY6mo2gWJePNElHUkWK7J+ft9tqFmX3J\nF/7f0EzxF//R/wF3WMIrTBEPIfPxPN5/3NTzNbCHXed3Ez+CqxIVlnClnt2BjkuG\nWVRdtYUoXQSjaH+H97E5kIPC6mg4eGftMk7n2NEEuWc3A1s9lBUxKjbkFFBquX43\nG4EcHi16rcGXUmPz33DLEE4dbGBtywIDeVmoWNV+i8yxI7eXn4TOh3bYh1K/Q/mw\nPwg5N7nYeeHpyAUC/GCalCPVjAf45RA5dOKFamUczZ9e+PBfr/JPe2SpaO82nGec\nT2MbTf3VAgMBAAECggEAAIBIyoZO9akUWe4/NyR3vWoqJVKVELs8crjKBsMVYrRU\nioSEkUOYWtUT/bnsMXye8pddUbB8HIQLzHX77SE9U1JxEWq4zO6jbjGmLcc7ckbv\nIjKCHxtPpyLlRsry24p+HD3hq8iwwqi217tnlIAt4CFlFcGI/tiGnXgxx4Qj/OR0\nnj+yqc/Abktg8SCNgv0sN1S4JY1iARI3tGl8Gc8w9hFRDrkJbF+RU/nb8pGfY1qf\nmiQEUlGMbU/+ZflkJU/jyC58b2nIgjGhyUZpMKX7cGQLa0KXqAYho/RxgbgTVFp5\ncU8nbxsUgXJCiQRAhia3eaenMYl85LTzyU6oeflwIwKBgQDhQsXqo2bCc87AgRtG\n74LU5xBc5YsSURES2kCe1HhI6/jrwPri0igUFgDmm490uXb4lmYw545mmyHk6bzL\ntNBqq5114gQ8aQRpi6cGfXBEhZUVYzCXJThJkuHHO6X9rq+3dIW64XrNtaOWTevT\nBoWo9GZlWKeuLTCo1KP7iAlHywKBgQC5OZXLKd+lDu9uzWrC8Ra1Kw5yGxWO1Wfo\n+YR5ukEujRU7bMXZiy1Cm2m0dlbw0OYyYX1KoTGqJE71KNxJpILBHNs+tXDDyQwi\nXYO5PcieI+g3flGoy50huC+NTtYY/ZgRQzkrHydZwGUiwo1hcP+QqlLOy8Kc5gsy\nssb+l9Lc3wKBgChnXK6Qbn8UXJJE1gqsLTBY3aN7/KzlY4WZJhwXChgyUyyeKaID\nhfLMW48BegK6vW8rMts0vWMEEllH33g+T1/CtnSNfKsFPyhbRzMvzrJLr4jtiKqj\nn2v674pX1Zch/RyPxujVRrydBuGPymvIcLL0W2V0OGdSbbbqpRsZtGhvAoGAC5LU\nkEhCiC7BuTuuoxWrZJCXK3wTwcQF5SHKLEz+C6mXHQpz5l7y6gmJ9lO6pPt4lsdO\nq94cm1P/dwQhl5xm6yghbu6paCJk1rTfKTD6Gx+FQAptkc1/OP8oQX0elZsq6FE5\n/j7JF6uU5jIf4WnNHj32RKOoumMJahaPppLYAyMCgYBbL33rUpMUWoVLJ9ItjiQf\n4sVzoR/l+1YRj9Jg7L7XFz5GPKTFbyfUA0p2qMJmUMRVz6tQh4m/CRP/ex/dsZft\nuRKGAvwPwaTa9PxTpX8ZhlKwIQlMBrqNqqUxr9PF81Oov7Ce9DbaNMWCUFKMSgR3\nQ2+DNOhC56g8csSEoifAUg==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-f39cg@book-c045a.iam.gserviceaccount.com",
  "client_id": "115739872973351504459",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-f39cg%40book-c045a.iam.gserviceaccount.com"
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://book-c045a.firebaseio.com"
});

const db = admin.firestore();

requestify.post('https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+PAGE_ACCESS_TOKEN,
		{"get_started":{"payload":"Hi"},  
  "greeting": [
    {
      "locale":"default",
      "text":"Hello {{user_first_name}}! \nWe provide service!!" 
    }
  ]

}).then(function(success) {
	console.log('persistent_menu.success');
	// body...
})

 app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

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



//webview user_register




function textMessage(senderID,text){
	requestify.post(sendmessageurl, {
		"recipient":{
		"id":senderID},
		"message":{
			"text":text
		}
	})
}

function  QuickReply(senderID)
{
	 requestify.post(sendmessageurl,
												   {	
												   		"recipient":{
												  	  	"id":senderID
												  },
												  
												  "message":{
												    "text": "Please Register:",
												    "quick_replies":[
												      {
												        "content_type":"messaging",
												        "title":"Admin",
												        "payload":"register_admin",
												      },
                              {
                                "content_type":"messaging",
                                "title":"User",
                                "payload":"register_user",
                              }
												    ]
												  }
												  }).then(result=>{ console.log(" quick reply ok")
														  }).catch(err=>{console.log("err",err)})
											


}


app.post('/admin', (req, res) => {
  var userInput = req.body.userInput
  var senderID = req.body.senderID
  if(userInput == 'Hi'){
    textMessage(senderID,'Welcome Admin')
  }
  
   
   requestify.post('https://graph.facebook.com/v6.0/me/custom_user_settings?psid='+senderID+'&access_token='+PAGE_ACCESS_TOKEN,

{
  "persistent_menu":[
      {
        "locale":"default",
        "composer_input_disabled":false,
        "call_to_actions":[
        {
          "type":"postback",
          "title":"Register Book",
          "payload":"register_book"

        },
        {
          "type":"postback",
          "title":"Show Book List",
          "payload":"Hit1"

        },
        {
          "type":"web_url",
          "title":"Visit Page",
          "url":"https://mym-acavxb.firebaseapp.com/index.html",
          "webview_height_ratio":"tall"

        }
      ]
  
    }
  ]
}).then(function(success) {
  console.log('persistent_menu.success');
  // body...
})



})



app.post('/RegisterQuickReply', (req, res) => {
  var userInput = req.body.userInput
  var senderID = req.body.senderID
  if(userInput == 'Hi'){
   QuickReply(senderID);

   requestify.post('https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+PAGE_ACCESS_TOKEN,
{
	"persistent_menu":[
			{
				"locale":"default",
				"composer_input_disabled":false,
				"call_to_actions":[
				{
					"type":"postback",
					"title":"After Regi",
					"payload":"Hit"

				},
				{
					"type":"web_url",
					"title":"Visit Page",
					"url":"https://mym-acavxb.firebaseapp.com/index.html",
					"webview_height_ratio":"tall"

				}
			]
	
		}
	]
}).then(function(success) {
	console.log('persistent_menu.success');
	// body...
})
  }





})

/*
app.post('/admin', (req, res) => {
  var userInput = req.body.userInput
  var senderID = req.body.senderID
  if(userInput){
    textMessage(senderID,'Welcome Admin')
  }
})

*/

app.post('/advisor', (req, res) => {
	var userInput = req.body.userInput
	var senderID = req.body.senderID
	if(userInput){
		textMessage(senderID,'Welcome Advisor')
	}
})

app.post('/user', (req, res) => {
	var userInput = req.body.userInput
	var senderID = req.body.senderID
	if(userInput){
		textMessage(senderID,'Welcome User')
	}
})

app.get('/bookregister/:sender_id',function(req,res){    
    const sender_id = req.params.sender_id;
    res.render('registerbook.ejs',{title:"Register Book", sender_id:sender_id});
});


app.post('/bookregister',function(req,res){
      let phno = req.body.phnum;
      let email = req.body.email;
      let sender = req.body.sender;
      console.log("PhNO",phnum);
      console.log("Email",email);
      console.log("Sender",sender);
      db.collection('Book').add({
            email:email,
            phno:phno            
          }).then(success => {             
             ThankYouEagle(sender);    
          }).catch(error => {
            console.log(error);
      });        
});


function RegisterBook(sender_psid){
  let response;
  response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Please Register Books!",                       
            "buttons": [              
              {
                "type": "web_url",
                "title": "Register",
                "url":"https://bophyo.herokuapp.com/bookregister/"+sender_psid,
                 "webview_height_ratio": "full",
                "messenger_extensions": true,          
              },
              
            ],
          }]
        }
      }
    }
  console.log('buttons',response);
  console.log('button_sender',sender_psid);
  callSendAPI(sender_psid, response);
}

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

         if(userInput == 'register_book')
       {

        RegisterBook(senderID);
        console.log('message','CHIT SONE LYY KO KO');

       }

        }
    if (webhook_event.message) 
    	{
    		if (webhook_event.message.text) 
    		{
      				var userInput=webhook_event.message.text;
      				/*
      				if (userInput)
         				{
          						textMessage(senderID,'Welcome Ko Ko')
          						console.log("userinput",userInput);
         				};
         			*/

            }
            /*
             db.collection('admin').where('adminid','==',`${senderID}`).get().then(adminList => {
      		if(adminList)
      		{
        		
        	  requestify.post('https://bophyo.herokuapp.com/admin', {
              userInput: userInput || null,
              senderID: senderID,
            })
         	}
        })
        */
  			if (webhook_event.message.attachments)
  			{
    				var userMedia=webhook_event.message.attachments.payload.url;

            }
        }

      

        db.collection('admin').where('adminid','==',`${senderID}`).get().then(adminList => {
			if(adminList.empty){
				db.collection('BookAdvisor').where('id','==',`${senderID}`).get().then(advisorList => {
					if(advisorList.empty)
					{
						db.collection('user').where('id','==',`${senderID}`).get().then(userList => {
                            if(userList.empty)
                            {
                     
                           requestify.post('https://bophyo.herokuapp.com/RegisterQuickReply', {
							userInput: userInput || null,
							senderID: senderID,
							image: userMedia
						})

                            }
                            else
                            {
                            requestify.post('https://bophyo.herokuapp.com/user', {
							userInput: userInput|| null,
							senderID: senderID
							})
                            }
						})
						
					}
					else
					{
						requestify.post('https://bophyo.herokuapp.com/advisor', {
							userInput: userInput|| null,
							senderID: senderID,
							video: userMedia
						})
					}
				})
			}else{
                        
						requestify.post('https://bophyo.herokuapp.com/admin', {
							userInput: userInput || null,
							senderID: senderID,
							image: userMedia
						})
						
						
						/*
                            if(userInput) 
                            {
                            	requestify.post(sendmessageurl,
												   {	
												   		"recipient":{
												  	  	"id":senderID
												  },
												  
												  "message":{
												    "text": "Choose type:",
												    "quick_replies":[
												      {
												        "content_type":"text",
												        "title":"Male",
												        "payload":"male"
												        
												      },{
												        "content_type":"text",
												        "title":"Female",
												        "payload":"female"
												      },{
												        "content_type":"text",
												        "title":"Small Client",
												        "payload":"payload"
												      }
												    ]
												  }
												  }).then(result=>{ console.log("ok")
														  }).catch(err=>{console.log("err",err)})
                            }
                            */
							
					  
											
											


				 }
		})
	 
    
  });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
     } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

const callSendAPI = (sender_psid, response) => {  
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  
  return new Promise(resolve => {
    try
  {
    /*
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        resolve('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    });
    */
  request({
      url: 'https://graph.facebook.com/v2.6/me/messages?access_token='+ PAGE_ACCESS_TOKEN,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      form: message
  },
  function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.send(body);
      } else { 
          res.send(body);
      }
  });
  }
    catch (err) {
    console.error("catch error:" + err)
  } 
  });
}

async function callSend(sender_psid, response){
 
  let send = await callSendAPI(sender_psid, response);
  return 1;
 
  
}
