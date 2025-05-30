import ngrok from 'ngrok';

(async function () {
  try {
    const url = await ngrok.connect({
      addr: 3000, // Your local dev port
      authtoken: 'your-ngrok-auth-token', // Optional
    });

    console.log(`\n🔗 Public URL: ${url}/api/webhook/razorpay\n`);
  } catch (err) {
    console.error('Error starting ngrok:', err);
  }
})();
