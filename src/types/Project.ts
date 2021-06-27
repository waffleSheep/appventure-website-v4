import { Tag } from './Tag';
import { Contributor } from './Contributor';

interface Project {
  id: string,
  name: string,
  thumbnail: File,
  description: string,
  created: object[],
  maintained: object[],
  type: string,
  tags: Tag[],
  gallery: File[],
  website: string,
  attachment: File,
}

export { Project };
