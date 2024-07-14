// < Project Heimir by Alex Arbuckle > //


// import <
const cron = require('node-cron');
import { axiosGet } from 'lxrbckl';

import archiveManager from './src/managers/archiveManager';
import archiveConfig from './src/config/archiveManagerConfig';

//


(async () => {

   const archiveHandler: archiveManager = new archiveManager({

      // githubUsers : await axiosGet(archiveConfig.urlGitHubUsers)
      githubUsers : ['lxRbckl', 'ala2q6']

   });

   await archiveHandler.setArchive(await archiveHandler.getArchive());

   // cron.schedule('0 0 * * *', async () => {

   //    let archive: Archive = await archiver.getArchive();
   //    await archiver.setArchive(archive);

   // });

})();