
export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  PUBLIC = 'PUBLIC'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status?: 'Active' | 'Inactive';
  subject?: string;
}

export interface Class {
  id: string;
  name: string;
  teacherId: string;
  gradeLevel: string;
}

export interface Student {
  id: string;
  name: string;
  classId: string;
  rollNumber: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  value: number; // 1-5
  date: string;
  comment?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Event' | 'Holiday' | 'Announcement';
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  description: string;
}
