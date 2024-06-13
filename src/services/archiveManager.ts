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


   async getArchive() {

      // test 0
      // var archive: Archive = {};
      // let users: string[] = ['lxRbckl']; // remove
      // // let users: string[] = await axiosGet(this._githubUsersLink);
      // users.map(async (u: string) => {

      //    let route: string = `GET /users/${u}/repos`;
      //    (await this._octokit.request(route)).map(async (repo: Repo) => {

      //       archive[repo.name] = {

      //          topics : repo.topics,
      //          private : repo.private,
      //          description : repo.description,
      //          languages : Object.keys(await axiosGet(repo.languages_url))

      //       };

      //    });
         

      // });

      // console.log(archive); // remove

      // test 1
      var archive: Archive = {};
      let users: string[] = ['lxRbckl']; // replace
      await Promise.all(users.map(async (u: string) => {

         let route: string = `GET /users/${u}/repos`;
         let repos: Repo[] = await this._octokit.request(route);
         await Promise.all(repos.map(async (repo: Repo) => {

            archive[repo.full_name] = {

               topics: repo.topics,
               private: repo.private,
               description: repo.description,
               languages: Object.keys(await axiosGet(repo.languages_url))

            };

         }));

      }));

      console.log(archive); // remove

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