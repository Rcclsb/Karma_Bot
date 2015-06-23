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
<h3>Function Refrence</h3>
<h4>module.exports</h4>
<p>
    This function processes the message sent from the Slack outgoing webhooks.
</p>

<h4>deliverPayload()</h4>
<p>
    This function takes the botPrePayload created in module.exports and sends it out as a response to Slack.
</p>

<h4>karma(item)</h4>
<p>
    This processes the input from the if statement when the text is for karma value.
</p>

<h4>karmaVote(item)</h4>
<p>
    This processes the input from the if statement when the text is from a vote.
</p>

<h4>processVoteMessage(msg)</h4>
<p>
    This votes for or against someone based off of the msg inserted.
</p>

<h4>processIsVoteMessage(msg)</h4>
<p>
    This is used to check if something is a vote message within module.exports.
</p>

<h4>processKarmaMessage(msg)</h4>
<p>
    This is used to check if something is a karma value message within module.exports. This is also used to return the karma value of an item.
</p>

<h4>vote(item, ballot)</h4>
<p>
    This just a simple function to pass from processVoteMessage to addValue.
</p>

<h4>addItem(item, value)</h4>
<p>
    This hits the REDIS server and adds or subtracts the value.
</p>