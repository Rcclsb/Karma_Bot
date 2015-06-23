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
    <h4>karma()</h4>
        <p>
            This processes the input from the if statement when the function .
        </p>