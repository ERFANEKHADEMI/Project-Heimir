"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports <
const lxrbckl_1 = require("lxrbckl");
// >
class archiveManager {
    constructor(octokitOwner, octokitToken, githubUsersLink, octokitConfigLink) {
        this._octokitOwner = octokitOwner;
        this._octokitToken = octokitToken;
        this._githubUsersLink = githubUsersLink;
        this._octokitConfigLink = octokitConfigLink;
        this._octokit = new lxrbckl_1.ocotkit(this._octokitToken, this._octokitOwner);
    }
    getArchive() {
        return __awaiter(this, void 0, void 0, function* () {
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
            var archive = {};
            let users = ['lxRbckl']; // replace
            yield Promise.all(users.map((u) => __awaiter(this, void 0, void 0, function* () {
                let route = `GET /users/${u}/repos`;
                let repos = yield this._octokit.request(route);
                yield Promise.all(repos.map((repo) => __awaiter(this, void 0, void 0, function* () {
                    archive[repo.full_name] = {
                        topics: repo.topics,
                        private: repo.private,
                        description: repo.description,
                        languages: Object.keys(yield (0, lxrbckl_1.axiosGet)(repo.languages_url))
                    };
                })));
            })));
            console.log(archive); // remove
        });
    }
    setArchive() {
        return __awaiter(this, void 0, void 0, function* () {
            let config = yield (0, lxrbckl_1.axiosGet)(this._octokitConfigLink);
            yield this._octokit.respositorySet(this._archive, config['file'], config['branch'], config['repository']);
        });
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    let x = new archiveManager('lxRbckl', '', 'https://raw.githubusercontent.com/lxRbckl/Project-Heimir/Project-Heimir-2/src/data/githubUsers.json', 'https://raw.githubusercontent.com/lxRbckl/Project-Heimir/Project-Heimir-2/src/data/octokitConfig.json');
    x.getArchive();
    // x.setArchive();
}))();
