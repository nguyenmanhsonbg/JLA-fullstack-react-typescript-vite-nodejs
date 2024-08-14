import { ContentHomeProps } from "@/type";
import { AsyncImage } from "loadable-image";



export default function ContentHome2({
  image,
  title,
  description,
}: ContentHomeProps) {
  if(window.innerWidth > 1130)
  return (
      <div className="flex flex-col items-center gap-5 w-96 bg-[#9dc46a] shadow-md rounded-lg p-16 relative">
        <div className="w-[250px] h-[60px] bg-yellow-200 absolute top-[-30px]"></div>
        <AsyncImage src={image} className="w-[350px] h-[180px] rounded-md" />
        <div className="text-3xl text-center text-white w-80">{title}</div>
        <div className="text-center text-white w-80">{description}</div>
      </div>
  );
  if(window.innerWidth <= 1130 && window.innerWidth > 990)
      return (
      <div className="flex flex-col items-center gap-5 w-80 bg-[#9dc46a] shadow-md rounded-lg p-16 relative">
        <div className="w-[200px] h-[60px] bg-yellow-200 absolute top-[-30px]"></div>
        <AsyncImage src={image} className="w-[300px] h-[150px] rounded-md" />
        <div className="text-2xl text-center text-white w-72">{title}</div>
        <div className="text-center text-white w-72">{description}</div>
      </div>
  );
  if(window.innerWidth <= 990 && window.innerWidth > 678)
      return (
        <div className="flex flex-col items-center gap-5 w-64 bg-[#9dc46a] shadow-md rounded-lg p-16 relative">
          <div className="w-[150px] h-[60px] bg-yellow-200 absolute top-[-30px]"></div>
          <AsyncImage src={image} className="w-[200px] h-[100px] rounded-md" />
          <div className="w-56 text-xl text-center text-white">{title}</div>
          <div className="w-56 text-center text-white">{description}</div>
        </div>
      );
  if(window.innerWidth <= 678)
          return (
            <div className="flex flex-col items-center gap-5 w-44 bg-[#9dc46a] shadow-md rounded-lg p-16 relative">
              <div className="w-[100px] h-[50px] bg-yellow-200 absolute top-[-30px]"></div>
              <AsyncImage
                src={image}
                className="w-[160px] h-[80px] rounded-md"
              />
              <div className="w-40 text-xs text-center text-white">{title}</div>
              <div className="w-40 text-xs text-center text-white">{description}</div>
            </div>
          );
}
