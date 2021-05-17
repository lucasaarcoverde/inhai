const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

require('dotenv').config({
  path: `.env.${activeEnv}`,
})

module.exports = [
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'app.inhai.twa',
      sha256_cert_fingerprints: [process.env.FINGERPRINT],
    },
  },
]
