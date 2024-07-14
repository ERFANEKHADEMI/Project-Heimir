"use strict";
// import <
Object.defineProperty(exports, "__esModule", { value: true });
// >
const archiveManagerConfig = {
    file: process.env.archiveFile,
    owner: process.env.archiveOwner,
    token: process.env.octokitToken,
    branch: process.env.archiveBranch,
    repository: process.env.archiveRepository,
    urlGitHubUsers: process.env.urlGitHubUsers
};
// export <
exports.default = archiveManagerConfig;
// >
