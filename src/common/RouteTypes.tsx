enum RouteTypes {
  root = '/',
  welcome = '/welcome',
  about = '/about',
  settings = '/settings',
  error = '/error/:errorCode',
  labPlan = '/plans/:planId',
  labPlans = '/plans',
  callback = '/callback',
  plans = '/locations',
  plan = '/locations/:planId',
  register = ':authUrl/Account/Register',
  silentRefresh = '/silentRefresh',
}

export default RouteTypes;
