module.exports = {
  async redirects() {
    return [
      {
        source: '/verifiability/proving-confirmation',
        destination: '/verifiability/proving-verification',
        permanent: true
      }
    ]
  }
}
