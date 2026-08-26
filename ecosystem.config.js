module.exports = {
  apps: [{
    name: "telmongolia",
    script: "npm",
    args: "start",
    cwd: "/var/www/html/telmongolia",
    env: {
      NODE_EXTRA_CA_CERTS: "/etc/ssl/certs/ca-certificates.crt"
    }
  }]
};