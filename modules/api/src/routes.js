const express = require('express');
const axios = require('axios').default;
// ...

const routes = express.Router();
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const client = new SNSClient({ region: "eu-north-1" });
const { requestsTopic } = JSON.parse(process.env.COPILOT_SNS_TOPIC_ARNS);

// ...
// TMS API.
routes.post('/content', async (req, res) => {
    const response = await axios({
        method: 'POST',
        url: 'http://content/resources'
    })

    const id = response.data.id;
    await client.send(new PublishCommand({
        Message: JSON.stringify(id),
        TopicArn: requestsTopic,
    }));
    res.status(201).send('ID: ' + id);

});

routes.get('/healthz', (req, res) => {
    res.send(200);
});
// this is a change
module.exports = routes;