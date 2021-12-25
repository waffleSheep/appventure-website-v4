import { Tag } from './Tag';
import { Contributor } from './Contributor';

interface Contribution {
  contributors: Contributor;
  year: number;
}

interface Project {
  id: string;
  name: string;
  thumbnail: File;
  description: string;
  created: Contribution;
  maintained: Contribution[];
  type: string;
  tags: Tag[];
  gallery: File[];
  website: string;
  attachment: File;
  featured?: boolean;
}

export { Project, Contribution };
