import { Tag } from './Tag';

interface Event_ {
  id: string;
  name: string;
  banner: File;
  description: string;
  type: string;
  tags: Tag[];
  gallery: File[];
}

export { Event_ };
