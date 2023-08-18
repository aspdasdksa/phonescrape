const fs = require('fs');
const axios = require('axios');

(async () => {
  const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const formatnumber = number => {
    return `https://receive-sms-free.cc/Free-Finland-Phone-Number/${number.replace(/\D/g, '')}/`;
  };

  const webhook = async url => {
    const url = 'webhook-here';
    const data = {
      content: null,
      embeds: [
        {
          description: `DUMBAHHH SKID GOT LOGGED 🤣🤣🤣 ${url}`,
          color: 1019103,
          author: {
            name: 'project phonescrape - made by @forveined'
          }
        }
      ],
      attachments: []
    };
    try {
      await axios.post(url, data);
      console.log('Webhook sent.');
    } catch (error) {
      console.error('Error sending webhook:', error);
    }
  };

  const fetchdata = async number => {
    try {
      const numberurl = formatnumber(number);
      const options = {
        method: 'POST',
        url: 'https://scrapeninja.p.rapidapi.com/scrape',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '356ac2d1f6msh9a079ea7d992569p1af335jsn5d5a52c346aa',
          'X-RapidAPI-Host': 'scrapeninja.p.rapidapi.com'
        },
        data: {
          url: numberurl
        }
      };

      const response = await axios.request(options);
      const responsedata = JSON.stringify(response.data);
      if (responsedata.includes('ROBLOX')) {
        console.log('roblox found in', number);
        await webhook(numberurl);
      } else {
        console.log('roblox not found on', number);
      }
    } catch (error) {
      console.error('error fetching', number, error);
    }
  };

  const parsenumbers = async filePath => {
    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      let numbers = fileData.split('\n').map(line => line.trim());
      numbers = shuffle(numbers);

      for (const number of numbers) {
        await fetchdata(number);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      fs.writeFileSync(filePath, '', 'utf-8');
      console.log('Checked numbers removed from', filePath);
    } catch (error) {
      console.error('error processing numbers', error);
    }
  };

  const input = fs.readFileSync('input.txt', 'utf-8');
  const numbers = input.replace(/\[|\]|'/g, '').split(', ').join('\n');
  fs.writeFileSync('numbers.txt', numbers, 'utf-8');
  console.log('Phone numbers saved to numbers.txt');
  const input = 'numbers.txt';
  await parsenumbers(input);
})();
