import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VideoAsset } from '../types/video';

type VideoLibraryStore = {
  videos: VideoAsset[];
  addVideo: (video: Omit<VideoAsset, 'createdAt' | 'id'>) => Promise<void>;
  removeVideo: (id: string) => Promise<void>;
};

export const useVideoLibraryStore = create<VideoLibraryStore>()(
  persist(
    (set) => ({
      videos: [],
      addVideo: async (video) => {
        const now = new Date().toISOString();
        const newVideo: VideoAsset = {
          ...video,
          id: `${Date.now()}`,
          createdAt: now,
        };

        set((state) => ({ videos: [newVideo, ...state.videos] }));
      },
      removeVideo: async (id) => {
        set((state) => ({ videos: state.videos.filter((video) => video.id !== id) }));
      },
    }),
    {
      name: 'video-library-store',
      storage: {
        getItem: async (name: string) => {
          try {
            return await AsyncStorage.getItem(name);
          } catch (error) {
            console.error('خطا در خواندن کتابخانه ویدیو:', error);
            return null;
          }
        },
        setItem: async (name: string, value: string) => {
          try {
            await AsyncStorage.setItem(name, value);
          } catch (error) {
            console.error('خطا در ذخیره کتابخانه ویدیو:', error);
          }
        },
        removeItem: async (name: string) => {
          try {
            await AsyncStorage.removeItem(name);
          } catch (error) {
            console.error('خطا در حذف کتابخانه ویدیو:', error);
          }
        },
      },
    }
  )
);
