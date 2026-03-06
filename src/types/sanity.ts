export interface Experience {
  _id: string;
  company: string;
  role: string;
  years: string;
  row: number;
  colStart: number;
  colSpan: number;
}

export interface WorkDetail {
  _id: string;
  title: string;
  experience: {
    _id: string;
    company: string;
    role: string;
  };
  description: string;
  technologies: string[];
  achievements: string[];
  order: number;
}

export interface Tech {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  timeline: string;
  startDate: string;
  endDate?: string;
  role: string;
  techStack: Tech[];
  featuredImage: {
    asset: {
      _ref: string;
    };
    alt: string;
  };
  gallery?: {
    asset: {
      _ref: string;
    };
    alt: string;
  }[];
  isFeatured: boolean;
  categories: {
    _id: string;
    title: string;
  }[];
  client?: string;
  status: 'completed' | 'ongoing' | 'inDevelopment' | 'onHold';
  url?: string;
  description: any; // blockContent
}

export interface Author {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image?: {
    asset: {
      _ref: string;
    };
  };
  bio?: any; // blockContent
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author?: Author;
  mainImage?: {
    asset: {
      _ref: string;
    };
  };
  categories?: {
    _id: string;
    title: string;
  }[];
  publishedAt: string;
  body: any; // blockContent
}

export interface Category {
  _id: string;
  title: string;
  description?: string;
}

export interface ProjectCategory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface ProjectDetail {
  _id: string;
  title: string;
  project: {
    _id: string;
    title: string;
  };
  description: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  order: number;
}
