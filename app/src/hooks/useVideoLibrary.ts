import { useVideoLibraryStore } from '../store/videoLibraryStore';

export function useVideoLibrary() {
  const videos = useVideoLibraryStore((state) => state.videos);
  const addVideo = useVideoLibraryStore((state) => state.addVideo);
  const removeVideo = useVideoLibraryStore((state) => state.removeVideo);

  return { videos, addVideo, removeVideo };
}
