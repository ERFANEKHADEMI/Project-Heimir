// imports <
import { ocotkit, axiosGet } from 'lxrbckl';
import { Repo, Archive, OctokitConfig } from '../types/archiveManager';

// >


class archiveManager {


   private _octokit: ocotkit;

   private _archive: Archive;
   private _octokitOwner: string;
   private _octokitToken: string;
   private _githubUsersLink: string;
   private _octokitConfigLink: string


   constructor(

      octokitOwner: string,
      octokitToken: string,
      githubUsersLink: string,
      octokitConfigLink: string

   ) {

      this._archive = {};
      this._octokitOwner = octokitOwner;
      this._octokitToken = octokitToken;
      this._githubUsersLink = githubUsersLink;
      this._octokitConfigLink = octokitConfigLink;

      this._octokit = new ocotkit(this._octokitToken, this._octokitOwner);

   }


   async getArchive() {

      let users: string[] = await axiosGet(this._githubUsersLink);
      users.map(async (u: string) => {

         let route: string = `GET /users/${u}/repos`;
         (await this._octokit.request(route)).map((repo: Repo) => {

            this._archive[repo.name] = {



            }

         });
         

      });

   }


   async setArchive() {

      let config: OctokitConfig = await axiosGet(this._octokitConfigLink);
      
      await this._octokit.respositorySet(

         this._archive,
         config['file'],
         config['branch'],
         config['repository']

      );
      
   }

}




(async () => {

   let x = new archiveManager(

      'lxRbckl',
      '',
      'https://raw.githubusercontent.com/lxRbckl/Project-Heimir/Project-Heimir-2/src/data/githubUsers.json',
      'https://raw.githubusercontent.com/lxRbckl/Project-Heimir/Project-Heimir-2/src/data/octokitConfig.json'

   );

   x.getArchive();
   // x.setArchive();

})();