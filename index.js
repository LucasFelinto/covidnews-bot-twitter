const Twiiter = require('twitter');
const axios = require('axios');
const CronJob = require('cron').CronJob;
require('dotenv/config');

const client = new Twiiter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACESS_TOKEN_KEY,
  access_token_secret: process.env.ACESS_TOKEN_SECRET
});

const news = async () => {
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=br&q=corona&apiKey=${process.env.NEWSAPI_KEY}`
  );

  const { title, url } = response.data.articles[0];
  await client.post('statuses/update', {
    status: `${title} ${url}`
  });

  const date = new Date().toLocaleString();
  console.log(title, date);
};

const job = new CronJob('*/5 * * * *', function() {
  news().catch((error) => console.log(error));
});

job.start();
