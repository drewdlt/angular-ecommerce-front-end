export default {
  auth: {
    domain: 'dev-x6fqbx4ihmluk1oq.us.auth0.com',
    clientId: 'bD1jeU7r6VK10TEHOH2HWwhDARIO47eW',
    authorizationParams: {
      redirect_uri: 'http://localhost:4200',
      audience: 'http://localhost:8080',
    },
  },
  httpInterceptor: {
    allowedList: [
      'http://localhost:8080/api/orders/**',
      'http://localhost:8080/api/checkout/purchase',
    ],
  },
};
