export interface RepositoryInterface {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
    owner: {
      login: string;
    };
    svn_url: string;

  }