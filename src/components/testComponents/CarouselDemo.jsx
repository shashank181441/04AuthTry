import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselDemo({ images }) {
  // Destructure images from props
  return (
    <Carousel className="w-full max-w-[60%] justify-center items-center place-content-center mx-auto">
      {console.log(images)}
      <CarouselContent className="w-auto">
        {images?.map(
          (
            image,
            index // Add index parameter to map function
          ) => (
            <CarouselItem key={index}>
              <img
                src={image.url || image.localPath?.slice(6)}
                loading="lazy"
                alt={`Post Image ${index}`}
                className="w-auto h-5/6 rounded-md"
              />
            </CarouselItem>
          )
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
