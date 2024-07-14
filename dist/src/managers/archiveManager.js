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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports <
const lxrbckl_1 = require("lxrbckl");
const archiveManagerConfig_1 = __importDefault(require("../config/archiveManagerConfig"));
// >
class archiveManager {
    constructor({ githubUsers }) {
        this._githubUsers = githubUsers;
        this._octokit = new lxrbckl_1.octokit({
            owner: archiveManagerConfig_1.default.owner,
            token: archiveManagerConfig_1.default.token
        });
    }
    setArchive(_a) {
        return __awaiter(this, arguments, void 0, function* ({ archive }) {
            yield this._octokit.respositorySet({
                data: archive,
                file: archiveManagerConfig_1.default.file,
                branch: archiveManagerConfig_1.default.branch,
                repository: archiveManagerConfig_1.default.repository
            });
        });
    }
    getArchive() {
        return __awaiter(this, void 0, void 0, function* () {
            var archive = {};
            for (const u of this._githubUsers) {
                const endpointRepos = `GET /users/${u}/repos`;
                for (const r of yield this._octokit.request({ endpoint: endpointRepos })) {
                    const endpointLanguages = `GET /repos/${u}/${r.name}/languages`;
                    const languages = yield this._octokit.request({ endpoint: endpointLanguages });
                    archive[r.name] = {
                        'topics': r.topics,
                        'owner': r.owner.login,
                        'languages': Object.keys(languages),
                        'url': `https://github.com/${u}/${r.name}`,
                        'description': (r.description).split('.')[0]
                    };
                }
            }
            return archive;
        });
    }
}
exports.default = archiveManager;
