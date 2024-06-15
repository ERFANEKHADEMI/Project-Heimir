// types <


// >


// interfaces <
export interface ArchiveElement {

   url: string;
   topics: string[];
   languages: string[];
   description: string;

}
export interface Archive {

   [key: string] : ArchiveElement;

}

export interface Repo extends ArchiveElement {

   name: string;
   full_name: string;
   languages_url: string;

}

export interface OctokitConfig {

   file: string;
   branch: string;
   repository: string;

}

// >