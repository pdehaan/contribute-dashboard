module.exports = {
  shortDate,
  shortMessage,
  shortSha
};

function shortMessage(message) {
  let msg = message.replace(/\s+/g, " ").trim();
  if (msg.length > 60) {
    msg = msg.substr(0, 60).trim() + "...";
  }
  return msg;
}

function shortSha(sha) {
  return sha.substr(0, 7);
}

function shortDate(date) {
  return new Date(date).toLocaleDateString();
}
