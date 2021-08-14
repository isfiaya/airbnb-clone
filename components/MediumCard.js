import Image from "next/image";
function MediumCard({ img, title }) {
  return (
    <div className="cursor-pointer hover:scale-105 duration-300 transition-all ease-out">
      <div className="relative h-80 w-80">
        <Image src={img} layout="fill" className="rounded-xl" />
      </div>
      <h2 className="mt-3 text-2xl">{title}</h2>
    </div>
  );
}

export default MediumCard;
