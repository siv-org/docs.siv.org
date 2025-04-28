module.exports = {
  async redirects() {
    return [
      {
        source: '/verifiability/proving-confirmation',
        destination: '/verifiability/proving-verification',
        permanent: true
      },
      {
        source: '/verifiability/privacy-protectors',
        destination: '/privacy/privacy-protectors',
        permanent: true
      },
      {
        source: '/research-in-progress/automated-reward',
        destination:
          '/research-in-progress/financially-guaranteeing-vote-integrity',
        permanent: true
      }
    ]
  }
}
