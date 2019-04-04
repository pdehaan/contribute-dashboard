const axios = require("axios");

const formatters = require("./formatters");

module.exports = {
  getCompareUrl,
  getContributeJson,
  getEnvData,
  getGitSha,
  getVersionJson
};

async function getUrl(path, baseURL) {
  const res = await axios.get(new URL(path, baseURL).href);
  return res.data;
}

function getCompareUrl(repoUrl, sha) {
  return new URL(`${repoUrl}/compare/${sha}...master`).href;
}

async function getContributeJson(baseUrl) {
  return getUrl("/contribute.json", baseUrl);
}

async function getGitSha(repoUrl, sha) {
  const ownerRepo = getOwnerRepo(repoUrl);
  return getUrl(
    `/repos/${ownerRepo}/commits/${sha}`,
    "https://api.github.com/"
  );
}

async function getVersionJson(baseUrl) {
  return getUrl("/__version__", baseUrl);
}

async function getEnvData(site) {
  const data = [];
  const contribute = await getContributeJson(site);

  for (const [env, url] of Object.entries(contribute.urls)) {
    let item = {
      env,
      url
    };
    try {
      const version = await getVersionJson(url);
      const commit = await getGitSha(contribute.repository.url, version.commit);
      const compareUrl = getCompareUrl(
        contribute.repository.url,
        formatters.shortSha(version.commit)
      );

      item.commit = {
        sha: version.commit,
        date: commit.commit.author.date,
        author: (commit.author && commit.author.login) || commit.committer.login,
        message: commit.commit.message,
        compareUrl
      };
    } catch (err) {
      item.err = err;
    }
    data.push(item);
  }
  return data;
}

function getOwnerRepo(repoUrl) {
  return repoUrl.replace(/^.*?github.com\/(.*?)\/(.*?)\/?/, "$1/$2");
}
