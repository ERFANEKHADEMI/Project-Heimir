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
        this._archive = {};
        this._octokitOwner = octokitOwner;
        this._octokitToken = octokitToken;
        this._githubUsersLink = githubUsersLink;
        this._octokitConfigLink = octokitConfigLink;
        this._octokit = new lxrbckl_1.ocotkit(this._octokitToken, this._octokitOwner);
    }
    getArchive() {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield (0, lxrbckl_1.axiosGet)(this._githubUsersLink);
            users.map((u) => __awaiter(this, void 0, void 0, function* () {
                let route = `GET /users/${u}/repos`;
                (yield this._octokit.request(route)).map((repo) => {
                    this._archive[repo.name] = {};
                });
            }));
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
