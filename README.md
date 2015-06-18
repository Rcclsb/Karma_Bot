# Karma_Bot
A basic karma bot for Slack.
This is basically a Slack bot to track karma using a REDIS database as a storage system.
The setup of the program is as follows:
Let's say slack pings the program with a message. 
1) app.js recieves the message
2) app.js redirects it to karmabot.js
3) karmabot.js processes the message and spits back a return message.

As for funcitons within the chat:
Lets take an example of "@xephos"
