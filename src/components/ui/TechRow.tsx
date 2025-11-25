interface TechRowProps {
  title: string;
  items: string[];
  isLast: boolean;
}

export function TechRow({ title, items, isLast }: TechRowProps) {
  return (
    <div className={`pt-2 flex border-t-2 ${isLast ? "border-b-2" : ""}`}>
      <div className="w-1/2 text-xl lg:text-2xl font-poppins">{title}</div>

      <div className="w-1/2 text-xs lg:text-xl xl:text-2xl font-poppins space-y-1">
        {items.map((item, i) => (
          <h1
            key={i}
            className={`pb-1 ${i !== items.length - 1 ? "border-b-2" : ""}`}
          >
            {item}
          </h1>
        ))}
      </div>
    </div>
  );
}
