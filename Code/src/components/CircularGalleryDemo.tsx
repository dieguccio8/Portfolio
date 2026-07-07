import { useMemo } from "react";
import {
  CircularGallery,
  type GalleryItem,
} from "./ui/circular-gallery-2";

import { getGalleryItems } from "./galleryData";

export function CircularGalleryDemo({ lang }: { lang: 'it' | 'en' }) {
  const items = useMemo(() => getGalleryItems(lang), [lang]);

  return (
    <div className="relative h-[600px] w-full bg-transparent">
      <CircularGallery
        items={items}
        bend={3}
        borderRadius={0.05}
        scrollEase={0.02}
        className="text-white"
      />
    </div>
  );
}
