// Firefox Monitor Dashboard

// - Show list of locales w/ 80%+ translations
// - Show 5 most recent breaches
// - Show DataClasses breach stats
// - Show links to various tools (like Puppeteer screenshots)
// - Links to various sites (dev/stage/prod/gcp)

const formatters = require("./formatters");
const lib = require("./lib");

main("https://monitor.firefox.com");

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
    console.log(`\t\t ${formatters.shortSha(item.commit.sha)} \t ${item.commit.compareUrl}\n`);
  });
}
