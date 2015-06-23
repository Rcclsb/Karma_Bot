# Karma_Bot
A basic karma bot for Slack.
This is basically a Slack bot to track karma using a REDIS database as a storage system.
<h3>The setup of the program is as follows:</h3>
<p>Let's say slack pings the program with a message.
  <ol>
    <li>app.js recieves the message</li>
    <li>app.js redirects it to karmabot.js</li>
    <li>karmabot.js processes the message and spits back a return message.</li>
  </ol>
</p>
As for funcitons within the chat:
<h3>Lets take an example of "@xephos"</h3>
<ul>
  <li>To up vote: @xephos++</li>
  <li>To down vote: @xephos--</li>
  <li>To check karma: karma value @xephos</li>
</ul>
