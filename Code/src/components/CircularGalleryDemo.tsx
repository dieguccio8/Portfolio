import {
  CircularGallery,
  type GalleryItem,
} from "./ui/circular-gallery-2";

const galleryItems: GalleryItem[] = [
  { image: "https://images.unsplash.com/photo-1506744626753-14016f50220c?q=80&w=800&auto=format&fit=crop", text: "Nature" },
  { image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop", text: "Landscape" },
  { image: "https://images.unsplash.com/photo-1470071131384-001b85755b36?q=80&w=800&auto=format&fit=crop", text: "Cityscape" },
  { image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop", text: "Urban" },
  { image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop", text: "Architecture" },
  { image: "https://images.unsplash.com/photo-1444723121692-4181f2c82800?q=80&w=800&auto=format&fit=crop", text: "Mountains" },
  { image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=800&auto=format&fit=crop", text: "Sunset" },
  { image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop", text: "Ocean" },
  { image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop", text: "Forest" },
  { image: "https://images.unsplash.com/photo-1475924156734-498381ea51bc?q=80&w=800&auto=format&fit=crop", text: "Desert" },
  { image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800&auto=format&fit=crop", text: "Space" },
  { image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=800&auto=format&fit=crop", text: "Abstract" },
];

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
