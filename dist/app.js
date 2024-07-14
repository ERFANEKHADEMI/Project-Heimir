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
const archiveManager_1 = __importDefault(require("./src/managers/archiveManager"));
//
(() => __awaiter(void 0, void 0, void 0, function* () {
    const archiveHandler = new archiveManager_1.default({
        // githubUsers : await axiosGet(archiveConfig.urlGitHubUsers)
        githubUsers: ['lxRbckl', 'ala2q6']
    });
    yield archiveHandler.setArchive(yield archiveHandler.getArchive());
    // cron.schedule('0 0 * * *', async () => {
    //    let archive: Archive = await archiver.getArchive();
    //    await archiver.setArchive(archive);
    // });
}))();
