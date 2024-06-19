// imports <
import { octokit, axiosGet } from 'lxrbckl';
import { Repo, Archive, OctokitConfig } from '../types/archiveManager';

// >


export default class archiveManager {


   private _octokit: octokit;

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

      this._octokit = new octokit(this._octokitToken, this._octokitOwner);

   }


   async setArchive(archive: Archive) {

      let config: OctokitConfig = await axiosGet(this._octokitConfigLink);
      
      await this._octokit.respositorySet(

         archive,
         config['file'],
         config['branch'],
         config['repository']

      );
      
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

}