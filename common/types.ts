export type Entry = {
  createdAt: number;
  title?: string;
  body?: string;
  images?: {
    cancelled: boolean;
    height?: number;
    type?: string;
    uri?: string;
    width?: number;
  }[];
};
