module.exports = {
  NODE_ENV: '"development"',
  BASE_API: '"http://127.0.0.1:25565"',
  __static: `"${require('path').join(__dirname, '../static').replace(/\\/g, '\\\\')}"`,
  __lib: `"${require('path').join(__dirname, `../lib`).replace(/\\/g, '\\\\')}"`
}
