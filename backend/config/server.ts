export default ({ env }: { env: any }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  url: env('PUBLIC_URL', ''),
  proxy: env.bool('IS_PROXIED', false),
  cron: {
    enabled: env.bool('CRON_ENABLED', false),
  },
  transfer: {
    remote: {
      enabled: true,
    },
  },
});
