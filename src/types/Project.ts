import { Tag } from './Tag';
import { Contributor } from './Contributor';

interface Creation {
  contributors: Contributor;
  year: number;
}

interface Project {
  id: string;
  name: string;
  thumbnail: File;
  description: string;
  created: Creation;
  maintained: object[];
  type: string;
  tags: Tag[];
  gallery: File[];
  website: string;
  attachment: File;
  allContributors: Contributor[];
  featured?: boolean;
}

export { Project, Creation };
