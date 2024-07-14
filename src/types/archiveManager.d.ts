// types <


// >


// interfaces <
export interface ConstructorParams {

   githubUsers: string[];

}


export interface ArchiveElement {

   url: string;
   topics: string[];
   languages: string[];
   description: string;

}

// export interface Archive {

//    [key: string] : ArchiveElement;

// }

// export interface Repo extends ArchiveElement {

//    name: string;
//    full_name: string;
//    languages_url: string;

// }



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