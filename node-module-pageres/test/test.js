const Pageres = require('pageres');
const fs = require('fs');

const date_today = new Date().toLocaleDateString().replace('.', '-');
const urls = ['https://www.google.de', 'https://weather.com'];

async function makeScreenshots(url) {
  const save_path =
    __dirname +
    '/shots/' +
    url.replace(/http:|https:\/\/|www\./gi, '') +
    '/' +
    date_today;

  const res_mobile = {
    type: 'mobile',
    resolutions: [
      '320x480',
      '480x320',
      '640x360',
      '360x640',
      '1024x768',
      '768x1024',
    ],
  };

  const res_desktop = {
    type: 'desktop',
    resolutions: ['1366x768', '1920x1080', '2560x1440'],
  };

  let options = {
    crop: true,
    delay: 3,
    incrementalName: false,
    format: 'png',
    filename: '<%= date %>_<%= url %>_<%= size %>',
    userAgent:
      'Mozilla/5.0 (Linux; U; Android 2.2; de-de; HTC Magic Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
  };

  fs.mkdir(save_path, {recursive: true}, err => {
    if (err) throw err;
  });

  await new Pageres({delay: 2})
    .src(url, res_mobile.resolutions, options)
    .dest(save_path)
    .run();

  console.log('Finished generating screenshots!, ', url, res_mobile);

  options.userAgent = '';

  await new Pageres({delay: 2})
    .src(url, res_desktop.resolutions, options)
    .dest(save_path)
    .run();

  console.log('Finished generating screenshots!, ', url, res_desktop);
}

urls.forEach(url => {
  makeScreenshots(url);
});
