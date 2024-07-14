// types <


// >


// interfaces <
export interface ConstructorParams {

   githubUsers: string[];

}


export interface SetArchiveParams {

   archive: Archive;

}


export interface Repository {

   'url': string;
   'owner': string;
   'topics': string[];
   'languages': string[];
   'description': string;

}


export interface Archive {

   [key: string]: Repository

}


// >