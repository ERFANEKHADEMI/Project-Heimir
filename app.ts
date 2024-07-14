// < Project Heimir by Alex Arbuckle > //


// import <
const cron = require('node-cron');
import { axiosGet } from 'lxrbckl';

import { Archive } from './src/types/archiveManager';
import archiveManager from './src/managers/archiveManager';
import archiveConfig from './src/config/archiveManagerConfig';

//


(async () => {

   cron.schedule('0 0 * * *', async () => {

      // initialize object <
      const archiveHandler: archiveManager = new archiveManager({

         githubUsers : await axiosGet(archiveConfig.urlGitHubUsers)
   
      });

      // >
   
      // build archive <
      // publish archive <
      const archive: Archive = await archiveHandler.getArchive();
      await archiveHandler.setArchive({archive : archive});

      // >

   });

})();