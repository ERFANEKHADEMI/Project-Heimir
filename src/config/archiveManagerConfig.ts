// import <


// >


const archiveManagerConfig: {

   file: string,
   owner: string,
   token: string,
   branch: string,
   repository: string,
   urlGitHubUsers: string

} = {

   file : process.env.archiveFile!,
   owner : process.env.archiveOwner!,
   token : process.env.octokitToken!,
   branch : process.env.archiveBranch!,
   repository : process.env.archiveRepository!,
   urlGitHubUsers : process.env.urlGitHubUsers!

}


// export <
export default archiveManagerConfig;

// >