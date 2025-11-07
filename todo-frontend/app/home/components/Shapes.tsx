import Image from 'next/image';

export default function Shapes() {
  return (
    <>
      <div className="absolute top-20 left-10 w-20 h-20 opacity-20 animate-float">
        <Image
          src="/globe.svg"
          alt="Decorative shape"
          width={80}
          height={80}
        />
      </div>
      <div className="absolute top-40 right-10 w-16 h-16 opacity-20 animate-float-delayed">
        <Image
          src="/window.svg"
          alt="Decorative shape"
          width={64}
          height={64}
        />
      </div>
    </>
  );
}