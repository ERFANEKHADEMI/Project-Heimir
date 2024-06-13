// types <


// >


// interfaces <
export interface Repo {

   name?: string;
   topics: string[];
   private: boolean;
   description: string;
   languages_url: strin;

}
export interface Archive {

   [key: string] : Repo;

}

export interface OctokitConfig {

   file: string;
   branch: string;
   repository: string;

}

// >