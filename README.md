# Karma_Bot
A basic karma bot for Slack.
This is basically a Slack bot to track karma using a REDIS database as a storage system.
<h3>The setup of the program is as follows:</h3>
<p>Let's say slack pings the program with a message.</br> 
1) app.js recieves the message</br>
2) app.js redirects it to karmabot.js</br>
3) karmabot.js processes the message and spits back a return message.
</p>
As for funcitons within the chat:
Lets take an example of "@xephos"
