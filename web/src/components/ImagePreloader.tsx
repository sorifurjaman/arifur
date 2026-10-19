'use client';

import { useEffect } from 'react';
import { initialArtworks } from '@/data/artworks';

// Global memory cache to prevent garbage collection of preloaded images
const memoryCache = new Set<HTMLImageElement>();

export default function ImagePreloader() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Preload artworks smoothly without blocking the main UI thread
    let isCancelled = false;

    const preloadSmoothly = () => {
      // First preload the first 5 priority images
      for (let i = 0; i < Math.min(5, initialArtworks.length); i++) {
        const img = new Image();
        img.src = initialArtworks[i].imageUrl;
        memoryCache.add(img);
      }

      // Preload owner portrait
      const ownerImg = new Image();
      ownerImg.src = '/images/owner.jpg';
      memoryCache.add(ownerImg);

      // Preload remaining artworks in small non-blocking idle batches
      let nextIdx = 5;
      const loadNextBatch = () => {
        if (isCancelled || nextIdx >= initialArtworks.length) return;
        const batchEnd = Math.min(nextIdx + 4, initialArtworks.length);
        for (let i = nextIdx; i < batchEnd; i++) {
          const img = new Image();
          img.src = initialArtworks[i].imageUrl;
          memoryCache.add(img);
        }
        nextIdx = batchEnd;
        if (nextIdx < initialArtworks.length) {
          if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(loadNextBatch, { timeout: 1000 });
          } else {
            setTimeout(loadNextBatch, 300);
          }
        }
      };

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadNextBatch, { timeout: 1000 });
      } else {
        setTimeout(loadNextBatch, 300);
      }
    };

    preloadSmoothly();

    return () => {
      isCancelled = true;
    };
  }, []);

  return null;
}
