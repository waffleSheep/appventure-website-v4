import { Tag } from './Tag';
import { Contributor } from './Contributor';

interface BlogPost {
  id: string;
  path: string;
  title: string;
  date: Date;
  author: Contributor[];
  tags: Tag[];
  excerpt: string;
  content: string;
}

export { BlogPost };
