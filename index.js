import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const app = express();
const port = 3000;

const ACCOUNTS_MOCK = [
  {
    id: 1,
    login: 'admin',
    password: '1234'
  }
];
let accountIdConstaintMock = 1;

const CULTIVATION_MOCK = [];
let cultivationIdConstaintMock = 0;

const sessions = new Map(); // map sign in cookie -> session

// Parse cookies
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/home.html', (req, res, next) => {
  if (sessions.get(req.cookies.sign)) {
    next();
  } else {
    res.redirect(300, '/');
  }
});

// Serve static files
app.use(express.static('static'));

// Account CRUD
app.post('/account/get', (req, res) => {
  const account = ACCOUNTS_MOCK.find(({ id }) => parseInt(req.body.id) === id);
  if (account) {
    console.log('Account found');
    res.send(JSON.stringify(account));
    res.status(200);
  } else {
    res.send(JSON.stringify({ responce: 'not found' }));
    res.status(404);
  }
  res.end();
});

app.post('/account/delete', (req, res) => {
  // Deleting account
  const index = ACCOUNTS_MOCK.findIndex(({ id }) => parseInt(req.body.id) === id);
  if (index !== undefined) {
    ACCOUNTS_MOCK.splice(index, 1);
    console.log('Account deleted');
    res.send(JSON.stringify({ responce: 'done' }));
    res.status(200);
  } else {
    res.send(JSON.stringify({ responce: 'not found' }));
    res.status(404);
  }
  res.end();
});

app.post('/account/update', (req, res) => {
  // Updating account
  const index = ACCOUNTS_MOCK.findIndex(({ id }) => parseInt(req.body.id) === id);
  if (index !== undefined) {
    ACCOUNTS_MOCK[index] = { ...ACCOUNTS_MOCK[index], ...req.body };
    console.log('Account updated');
    res.send(JSON.stringify({ responce: 'done' }));
    res.status(200);
  } else {
    res.send(JSON.stringify({ responce: 'not found' }));
    res.status(404);
  }
  res.end();
});

app.post('/account/create', (req, res) => {
  // Creating account
  accountIdConstaintMock += 1;
  ACCOUNTS_MOCK.push({ ...req.body, id: accountIdConstaintMock });
  console.log('Account created');
  res.send(JSON.stringify({ id: accountIdConstaintMock }));
  res.status(200);
  res.end();
});

app.post('/account/login', (req, res) => {
  const account = ACCOUNTS_MOCK.find(({ login }) => login === req.body.login);
  if (account && req.body.password === account.password) {
    let cookie = Math.random().toString();
    cookie = cookie.substring(2, cookie.length);
    res.cookie('sign', cookie, { maxAge: 900000, httpOnly: false });

    sessions.set(cookie, account);

    console.log('Log in success');
    res.redirect(302, '/home.html');
    res.end();
  } else {
    console.log('Log in failed');
    res.status(403);
    res.end();
  }
});

// cultivation CRUD
app.post('/cultivation/get', (req, res) => {
  const animal = CULTIVATION_MOCK.find(({ id }) => parseInt(req.body.id) === id);
  if (cultivation) {
    console.log('Cultivation found');
    res.send(JSON.stringify(cultivation));
    res.status(200);
  } else {
    res.send(JSON.stringify({ responce: 'not found' }));
    res.status(404);
  }
  res.end();
});

app.post('/cultivation/delete', (req, res) => {
  // Deleting CULTIVATION
  const index = CULTIVATION_MOCK.findIndex(({ id }) => parseInt(req.body.id) === id);
  if (index !== undefined) {
    CULTIVATION_MOCK.splice(index, 1);
    console.log('Cultivation deleted');
    res.send(JSON.stringify({ responce: 'done' }));
    res.status(200);
  } else {
    res.send(JSON.stringify({ responce: 'not found' }));
    res.status(404);
  }
  res.end();
});

app.post('/Cultivation/update', (req, res) => {
  // Updating CULTIVATION
  const index = CULTIVATION_MOCK.findIndex(({ id }) => parseInt(req.body.id) === id);
  if (index !== undefined) {
    CULTIVATION_MOCK[index] = { ...CULTIVATION_MOCK[index], ...req.body };
    console.log(CULTIVATION_MOCK[index]);
    console.log('Cultivation updated');
    res.send(JSON.stringify({ responce: 'done' }));
    res.status(200);
  } else {
    res.send(JSON.stringify({ responce: 'not found' }));
    res.status(404);
  }
  res.end();
});

app.post('/cultivation/create', (req, res) => {
  // Creating CULTIVATION
  cultivationIdConstaintMock += 1;
  CULTIVATION_MOCK.push({ ...req.body, id: cultivationIdConstaintMock });
  console.log('cultivation created');
  res.send(JSON.stringify({ id: cultivationIdConstaintMock }));
  res.status(200);
  res.end();
});


app.listen(port, () => {
  console.log(`Http server listening on http://localhost:${port}`);
});

