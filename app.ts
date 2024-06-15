// < Project Heimir by Alex Arbuckle > //
const cron = require('node-cron');

import { Archive } from './src/types/archiveManager';
import archiveManager from './src/services/archiveManager';

//


// env <
const owner: string = process.env.owner!;
const tokenOctokit: string = process.env.tokenOctokit!;
const linkGithubUsers: string = process.env.linkGithubUsers!;
const linkOctokitConfig: string = process.env.linkOctokitConfig!;

// >


(async () => {

   var archiver: archiveManager = new archiveManager(

      owner,
      tokenOctokit,
      linkGithubUsers,
      linkOctokitConfig

   );

   cron.schedule('0 0 * * *', async () => {

      let a: Archive = await archiver.getArchive();
      await archiver.setArchive(a);

   });

})();