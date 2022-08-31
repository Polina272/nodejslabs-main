// Account CRUD
const ACCOUNTS_MOCK = [
  {
    id: 1,
    login: 'admin',
    password: '1234'
  }
];
let accountIdConstaintMock = 1;

const BEAST_MOCK = [];
let beastIdConstaintMock = 0;

const sessions = new Map(); // map sign in cookie -> session

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
    res.cookie('sign', cookie, { maxAge: 900000, httpOnly: true });

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
