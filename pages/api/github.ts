
import { NextApiRequest, NextApiResponse } from "next";

const { Octokit } = require("@octokit/rest");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const octokit = new Octokit({
        auth: process.env.GITHUB_AUTH_TOKEN
    });

  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const javascript = await octokit.request("/repositories?q=language:javascript&order=desc");
    const typescript = await octokit.request("/repositories?q=language:typescript&order=desc");
    const go = await octokit.request("/repositories?q=language:go&order=desc");
    const css = await octokit.request("/repositories?q=language:css&order=desc");
    const node = await octokit.request("/repositories?q=language:node&order=desc");

    return res.status(200).json({ javascript: javascript, typescript: typescript, go: go, css: css, node: node, });
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}




// const { Octokit } = require("@octokit/rest");

// export default async (req, res) => {

//     const octokit = new Octokit({
//         auth: process.env.GITHUB_AUTH_TOKEN
//     });
    
//     const javascript = await octokit.request("/repositories?q=language:javascript&order=desc");
//     const typescript = await octokit.request("/repositories?q=language:typescript&order=desc");
//     const go = await octokit.request("/repositories?q=language:go&order=desc");
//     const css = await octokit.request("/repositories?q=language:css&order=desc");
//     const node = await octokit.request("/repositories?q=language:node&order=desc");

//     return res.status(200).json({ javascript: javascript, typescript: typescript, go: go, css: css, node: node, });
// }