import { Tag } from './Tag';
import { Contributor } from './Contributor';

interface BlogPost {
  author: Contributor[],
  content: string,
  date: Date,
  excerpt: string,
  id: string,
  path: string,
  poster: any,
  title: string,
  tags: Tag[]
}
export {BlogPost};
