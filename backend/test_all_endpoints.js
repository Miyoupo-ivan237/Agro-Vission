const http = require('http');

async function testEndpoint(path, method = 'GET', body = null) {
  return new Promise((resolve) => {
    const postData = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
        }
      },
      (res) => {
        let raw = '';
        res.on('data', (c) => (raw += c));
        res.on('end', () => {
          resolve({ status: res.statusCode, data: raw ? JSON.parse(raw) : null });
        });
      }
    );
    req.on('error', (e) => resolve({ error: e.message }));
    if (postData) req.write(postData);
    req.end();
  });
}

(async () => {
  console.log('Testing Agro-Vission Backend Endpoints...');
  
  const health = await testEndpoint('/');
  console.log('1. Health Check:', health.status, health.data?.system);

  const status = await testEndpoint('/api/ai/status');
  console.log('2. AI Status:', status.status, 'Models:', status.data?.supportedCrops?.length, 'crops, Ollama model:', status.data?.ollamaStatus?.selectedModel);

  const diag = await testEndpoint('/api/ai/diagnose', 'POST', {
    crop: 'maize',
    symptomsText: 'caterpillars chewing holes in leaf funnel whorl with frass'
  });
  console.log('3. AI Diagnosis:', diag.status, 'Diagnosed:', diag.data?.diagnosis?.name, 'Severity:', diag.data?.diagnosis?.severity);

  const rec = await testEndpoint('/api/ai/recommend', 'POST', {
    location: 'West (Foumbot)',
    season: 'Onset of Rains',
    soilCondition: 'Volcanic Loam',
    landSize: '2.5'
  });
  console.log('4. AI Recommendation:', rec.status, 'Primary:', rec.data?.recommendation?.primaryCrop, 'Secondary:', rec.data?.recommendation?.secondaryCrop);

  const login = await testEndpoint('/api/login', 'POST', {
    email: 'ivanmiyoupo@gmail.com',
    password: 'miyoupo10'
  });
  console.log('5. Admin Login:', login.status, 'User:', login.data?.name, 'Role:', login.data?.role);

  const chat = await testEndpoint('/api/ai/chat', 'POST', {
    message: 'How should I plant cassava cuttings in Bafia?'
  });
  console.log('6. AI Agronomist Chat:', chat.status, 'Reply Preview:', chat.data?.reply?.substring(0, 80) + '...');
  
  process.exit(0);
})();
