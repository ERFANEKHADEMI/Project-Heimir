// imports <
import { ocotkit, axiosGet } from 'lxrbckl';
import { Repo, Archive, OctokitConfig } from '../types/archiveManager';

// >


class archiveManager {


   private _octokit: ocotkit;

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

      this._octokitOwner = octokitOwner;
      this._octokitToken = octokitToken;
      this._githubUsersLink = githubUsersLink;
      this._octokitConfigLink = octokitConfigLink;

      this._octokit = new ocotkit(this._octokitToken, this._octokitOwner);

   }


   async getArchive(): Promise<Archive> {

      var archive: Archive = {};
      let users: string[] = await axiosGet(this._githubUsersLink);
      for (const u of users) {

         let routeRepos: string = `GET /users/${u}/repos`;
         let repos: Repo[] = await this._octokit.request(routeRepos);
         for (const repo of repos) {

            let routeLanguages: string = `GET /repos/${u}/${repo.name}/languages`;
            let languages: string[] = await this._octokit.request(routeLanguages);
            archive[repo.full_name] = {

               topics : repo.topics,
               description : repo.description,
               languages : Object.keys(languages),
               url : `https://github.com/${u}/${repo.name}`

            };

         }

      }

      return archive;

   }


   async setArchive(archive: any) {

      let config: OctokitConfig = await axiosGet(this._octokitConfigLink);
      
      await this._octokit.respositorySet(

         archive,
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

   // let a: Archive = await x.getArchive();
   // await x.setArchive(['demo']);

})();