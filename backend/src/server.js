const app = require("./app");
const { IP } = require("./API");

const PORT = process.env.PORT;

//add 0.0.0.0 to connect to network not localhost
app.listen(PORT, () => {
  console.log(`Server running on http://${IP}:${PORT}`);
});
