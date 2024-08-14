import { type CarouselApi } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
export function useCarousel(step: number) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCountAndCurrent = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + step);
    };

    updateCountAndCurrent();

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + step);
    };

    api.on("select", handleSelect);

    return () => {
      api.on("select", handleSelect);
    };
  }, [api, step]);

  return { api, setApi, current, count, step };
}
