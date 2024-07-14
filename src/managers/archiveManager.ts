// imports <
import { octokit } from 'lxrbckl';

import archiveConfig from '../config/archiveManagerConfig';
import { 

   Archive,
   SetArchiveParams,
   ConstructorParams

} from '../types/archiveManager';

// >


export default class archiveManager {


   private _octokit: octokit;

   private readonly _githubUsers: string[];


   constructor({

      githubUsers

   }: ConstructorParams) {

      this._githubUsers = githubUsers;

      this._octokit = new octokit({

         owner : archiveConfig.owner,
         token : archiveConfig.token

      });

   }


   async setArchive({archive}: SetArchiveParams) {
      
      await this._octokit.respositorySet({

         data : archive,
         file : archiveConfig.file,
         branch : archiveConfig.branch,
         repository : archiveConfig.repository

      });
      
   }


   async getArchive(): Promise<Archive> {

      var archive: Archive = {};
      for (const u of this._githubUsers) {

         const endpointRepos: string = `GET /users/${u}/repos`;
         for (const r of await this._octokit.request({endpoint : endpointRepos})) {

            const endpointLanguages: string = `GET /repos/${u}/${r.name}/languages`;
            const languages: string[] = await this._octokit.request({endpoint : endpointLanguages});

            archive[r.name] = {

               'topics' : r.topics,
               'owner' : r.owner.login,
               'languages' : Object.keys(languages),
               'url' : `https://github.com/${u}/${r.name}`,
               'description' : (r.description).split('.')[0]

            };

         }
         
      }

      return archive;

   }


}