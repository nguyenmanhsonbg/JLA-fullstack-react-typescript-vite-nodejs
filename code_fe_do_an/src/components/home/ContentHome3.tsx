import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCarousel } from "@/hook/useCarousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { AsyncImage } from "loadable-image";
import * as React from "react";

const dataContent = [
  {
    image: "./HoChiMinh.png",
    name: "Chủ tịch Hồ Chí Minh",
    information: "Vị lãnh tụ vĩ đại của Việt Nam",
    description:
      "“Muốn học tập có kết quả tốt thì phải có thái độ đúng và phương pháp đúng.”",
  },
  {
    image: "./WaltDisney.png",
    name: "Walt Disney",
    information: "Doanh nhân người Mỹ",
    description: "“Một cách để bắt đầu là ngưng nói và bắt tay vào làm.”",
  },
  {
    image: "./LouisaMayAlcott.png",
    name: "Louisa May Alcott",
    information: "Tiểu thuyết gia, nhà văn người Mỹ",
    description: "“Luôn luôn có ánh sáng đằng sau những đám mây.”",
  },
];
export default function ContentHome3() {
  const { api, count, current, setApi } = useCarousel(1);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
if(window.innerWidth > 1024)
  return (
    <div className="flex flex-col items-center gap-y-10">
      <div className="flex justify-center items-center text-center w-[350px] h-[50px] text-3xl font-serif bg-[#9dc46a] text-white rounded-full shadow-md">
        Quote tạo động lực học
      </div>
      <Carousel setApi={setApi} plugins={[plugin.current]}>
        <CarouselContent className="w-[500px]">
          {dataContent.map((item, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex flex-col bg-[#9dc46a] gap-10 py-6 h-[180px] text-white rounded-xl shadow-md">
                  <div className="h-10">{item.description}</div>
                  <div className="flex gap-5 ">
                    <AsyncImage
                      src={item.image}
                      className="rounded-full size-14"
                    />
                    <div>
                      <div className="font-extrabold">{item.name}</div>
                      <div className="font-thin">{item.information}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center gap-2 py-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "size-[10px] rounded-full",
              current == index + 1 ? "bg-[#9dc46a]" : "bg-white"
            )}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
if(window.innerWidth < 1024)
    return (
      <div className="flex flex-col items-center gap-y-10">
        <div className="flex justify-center items-center text-center w-[300px] h-[50px] text-3xl font-serif bg-[#ffe0b2] text-[#16a34a] rounded-full shadow-md">
          <p className="text-2xl">Quote tạo động lực học</p>
        </div>
        <Carousel setApi={setApi} plugins={[plugin.current]}>
          <CarouselContent className="w-[400px]">
            {dataContent.map((item, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex flex-col bg-[#9dc46a] gap-10 py-6 h-[180px] text-white rounded-xl shadow-md">
                    <div className="h-10">{item.description}</div>
                    <div className="flex gap-5 ">
                      <AsyncImage
                        src={item.image}
                        className="rounded-full size-14"
                      />
                      <div>
                        <div className="font-extrabold">{item.name}</div>
                        <div className="font-thin">{item.information}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-center gap-2 py-2">
          {Array.from({ length: count }).map((_, index) => (
            <div
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "size-[10px] rounded-full",
                current == index + 1 ? "bg-[#9dc46a]" : "bg-white"
              )}
              key={index}
            ></div>
          ))}
        </div>
      </div>
    );
}
