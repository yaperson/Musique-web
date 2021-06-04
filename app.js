import app from '/rp-app.js'

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceWorker.js', { scope: '/' }).then(function(register) {
      console.log('serviceWorker installer ' + register.scope);
    }).catch(function(error) {
      console.log('Registration failed with ' + error);
    });
  };