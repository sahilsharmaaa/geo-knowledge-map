import { useState } from "react";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageLightbox = ({ src, alt, className }: ImageLightboxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="block w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 text-left"
          aria-label={`Open image: ${alt}`}
        >
          <img
            src={src}
            alt={alt}
            className={className ?? ""}
            loading="lazy"
          />
        </button>
      </DialogTrigger>

      <DialogContent className="h-screen w-screen max-w-none overflow-hidden rounded-none border-0 bg-black/90 p-4 shadow-none sm:p-6 [&>button]:right-4 [&>button]:top-4 [&>button]:rounded-full [&>button]:bg-secondary/85 [&>button]:p-2 [&>button]:opacity-100 [&>button]:text-foreground [&>button]:ring-0 [&>button]:hover:bg-secondary [&>button>svg]:h-6 [&>button>svg]:w-6">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={src}
            alt={alt}
            className="max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] rounded-lg object-contain shadow-2xl sm:max-h-[calc(100vh-3rem)] sm:max-w-[calc(100vw-3rem)]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;
