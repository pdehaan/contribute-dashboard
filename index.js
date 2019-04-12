#!/usr/bin/env node

const formatters = require("./formatters");
const lib = require("./lib");

main("https://monitor.firefox.com")
  .catch(err => {
    console.error(err.message);
    if (err.config.url) {
      console.error(`  ${err.config.url}`);
    }
    process.exitCode = 1;
  });

async function main(site) {
  const data = await lib.getEnvData(site);

  data.forEach(item => {
    if (item.err) {
      console.error(`[${item.env}] ${item.url} ${item.err.message}\n`);
      return;
    }
    console.log(`[${item.env}] ${item.url}`);
    console.log(
      `[${formatters.shortDate(item.commit.date)}] \t ${item.commit.author}: ${formatters.shortMessage(item.commit.message)}`
    );
    console.log(`\t\t ${item.commit.compareUrl}\n`);
  });
}
