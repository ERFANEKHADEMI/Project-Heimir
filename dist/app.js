"use strict";
// < Project Heimir by Alex Arbuckle > //
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
// import <
const cron = require('node-cron');
const lxrbckl_1 = require("lxrbckl");
const archiveManager_1 = __importDefault(require("./src/managers/archiveManager"));
const archiveManagerConfig_1 = __importDefault(require("./src/config/archiveManagerConfig"));
//
(() => __awaiter(void 0, void 0, void 0, function* () {
    const archiveHandler = new archiveManager_1.default({
        githubUsers: yield (0, lxrbckl_1.axiosGet)(archiveManagerConfig_1.default.urlGitHubUsers)
    });
    const archive = yield archiveHandler.getArchive();
    yield archiveHandler.setArchive({ archive: archive });
    // cron.schedule('0 0 * * *', async () => {
    // });
}))();
