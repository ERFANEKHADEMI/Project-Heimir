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
            var archive = {};
            let users = yield (0, lxrbckl_1.axiosGet)(this._githubUsersLink);
            for (const u of users) {
                let routeRepos = `GET /users/${u}/repos`;
                let repos = yield this._octokit.request(routeRepos);
                for (const repo of repos) {
                    let routeLanguages = `GET /repos/${u}/${repo.name}/languages`;
                    let languages = yield this._octokit.request(routeLanguages);
                    archive[repo.full_name] = {
                        topics: repo.topics,
                        description: repo.description,
                        languages: Object.keys(languages),
                        url: `https://github.com/${u}/${repo.name}`
                    };
                }
            }
            return archive;
        });
    }
    setArchive(archive) {
        return __awaiter(this, void 0, void 0, function* () {
            let config = yield (0, lxrbckl_1.axiosGet)(this._octokitConfigLink);
            yield this._octokit.respositorySet(archive, config['file'], config['branch'], config['repository']);
        });
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    let x = new archiveManager('lxRbckl', '', 'https://raw.githubusercontent.com/lxRbckl/Project-Heimir/Project-Heimir-2/src/data/githubUsers.json', 'https://raw.githubusercontent.com/lxRbckl/Project-Heimir/Project-Heimir-2/src/data/octokitConfig.json');
    // let a: Archive = await x.getArchive();
    // await x.setArchive(['demo']);
}))();
