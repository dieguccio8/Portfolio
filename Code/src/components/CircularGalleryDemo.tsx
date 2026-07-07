import {
  CircularGallery,
  type GalleryItem,
} from "./ui/circular-gallery-2";

import { galleryItems } from "./galleryData";

export function CircularGalleryDemo() {
  return (
    <div className="relative h-[600px] w-full bg-transparent">
      <CircularGallery
        items={galleryItems}
        bend={3}
        borderRadius={0.05}
        scrollEase={0.02}
        className="text-white"
      />
    </div>
  );
}
