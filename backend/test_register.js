(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email: 'testuser@example.com', phone: '1234567890', password: 'secret' }),
    });

    let data;
    try { data = await res.json(); } catch (e) { data = null; }
    console.log('HTTP', res.status);
    console.log('BODY', data);
  } catch (err) {
    console.error('ERROR', err && err.message ? err.message : err);
  }
})();
