
import { NewsItem, GalleryItem, UserRole } from './types';

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Annual Sports Day 2024',
    content: 'Get ready for the most awaited event of the year! Join us for a day filled with competition and spirit.',
    date: '2024-10-15',
    category: 'Event',
    imageUrl: 'https://picsum.photos/seed/sports/800/400'
  },
  {
    id: '2',
    title: 'New STEM Laboratory Opening',
    content: 'We are excited to announce the inauguration of our state-of-the-art STEM lab this Friday.',
    date: '2024-09-20',
    category: 'Announcement',
    imageUrl: 'https://picsum.photos/seed/lab/800/400'
  },
  {
    id: '3',
    title: 'Parent-Teacher Meeting',
    content: 'Discuss your child\'s progress with our educators on the coming Saturday.',
    date: '2024-09-25',
    category: 'Holiday',
    imageUrl: 'https://picsum.photos/seed/ptm/800/400'
  }
];

export const MOCK_GALLERY: GalleryItem[] = [
  { id: '1', url: 'https://picsum.photos/seed/school1/600/400', title: 'Science Fair', description: 'Students presenting their innovative projects.' },
  { id: '2', url: 'https://picsum.photos/seed/school2/600/400', title: 'Library Corner', description: 'Our quiet zone for avid readers.' },
  { id: '3', url: 'https://picsum.photos/seed/school3/600/400', title: 'Art Workshop', description: 'Creative hands at work in the studio.' },
  { id: '4', url: 'https://picsum.photos/seed/school4/600/400', title: 'Basketball Match', description: 'Inter-school championship finals.' },
  { id: '5', url: 'https://picsum.photos/seed/school5/600/400', title: 'Graduation Ceremony', description: 'Celebrating our senior batch successes.' },
  { id: '6', url: 'https://picsum.photos/seed/school6/600/400', title: 'Music Room', description: 'Harmonies echoing through the halls.' }
];

export const SCHOOL_COLORS = {
  primary: '#1e3a8a', // blue-900
  secondary: '#3b82f6', // blue-500
  accent: '#f59e0b', // amber-500
};
