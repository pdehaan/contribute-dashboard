module.exports = {
  shortDate,
  shortMessage,
  shortSha
};

function shortMessage(message, maxLen = 80) {
  let msg = message.replace(/\s+/g, " ").trim();
  if (msg.length > maxLen) {
    msg = msg.substr(0, maxLen - 3).trim() + "...";
  }
  return msg;
}

function shortSha(sha) {
  return sha.substr(0, 7);
}

function shortDate(date) {
  return new Date(date).toLocaleDateString();
}
