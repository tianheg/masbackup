import fs from 'fs';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const apiUrl =
  'https://mastodon.social/api/v1/accounts/110146061409386868/statuses';

axios
  .get(apiUrl, {
    headers: {
      Accept: 'application/json',
    },
  })
  .then((res) => {
    let postData = res.data;
    let savedData = { accountId: '110146061409386868' };
    postData.forEach((post) => {
      savedData[post.id] = {
        id: post.id,
        url: post.url,
        content: post.content,
      };
    });
    fs.writeFile('data.json', JSON.stringify(savedData), (err) => {
      if (err) {
        console.log(err);
      }
    });
  })
  .catch((error) => console.error(error));
