import { Button } from "antd";

export default function Card({
  price,
  name,
  description,
  imgsSrc,
}: {
  price: string;
  name: string;
  description: string;
  imgsSrc: string[];
}) {
  return (
    <>
      <div className="flex overflow-hidden bg-white rounded-lg shadow-lg w-full mt-2">
        <div className="w-1/3 bg-cover bg-landscape">
          <img src={imgsSrc[0]} />
        </div>
        <div className="w-2/3 p-4">
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
          <div className="flex justify-between mt-3 item-center">
            <h1 className="text-xl font-bold text-gray-700">{price}</h1>
            <Button type="primary">Написать</Button>
          </div>
        </div>
      </div>
    </>
  );
}
