// types <


// >


// interfaces <
export interface ArchiveElement {

   topics: string[];
   private: boolean;
   languages: string[];
   description: string;

}
export interface Archive {

   [key: string] : ArchiveElement;

}

export interface Repo extends ArchiveElement {

   full_name: string;
   languages_url: string;

}

export interface OctokitConfig {

   file: string;
   branch: string;
   repository: string;

}

// >