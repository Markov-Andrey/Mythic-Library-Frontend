import React from "react";
import { Tooltip } from "flowbite-react";
import Image from "next/image";

const formatValue = (value, quantity) => {
    const totalValue = value * quantity;
    if (totalValue >= 1) {
        return `${totalValue} зм`;
    } else if (totalValue * 10 >= 1) {
        return `${totalValue * 10} см`;
    } else {
        return `${totalValue * 100} мм`;
    }
};

const storage = process.env.NEXT_PUBLIC_BACKEND_STORAGE;

const EmptyCell = () => (
    <div
        className="relative m-0 border-[1px] border-collapse border-[#999] rounded overflow-hidden"
        style={{
            width: "100px",
            height: "100px",
        }}
    />
);

const Backpack = ({ backpack, weight }) => {
    console.log(backpack);

    const filledBackpack = [...backpack];
    while (filledBackpack.length < 25) {
        filledBackpack.push(null);
    }

    return (
        <div className="border-2">
            <div className="grid grid-cols-5 max-h-[575px] overflow-y-scroll">
                {filledBackpack.map((item, index) => (
                    <div key={index}>
                        {item && (
                            <Tooltip
                                trigger="click"
                                content={
                                    <div className="max-w-[500px]">
                                        <h4>{item.title}</h4>
                                        <hr />
                                        <span className="font-bold">Тип: </span>
                                        <span>{item.types ? item.types : "-"}</span>
                                        <hr />
                                        <span className="font-bold">Описание: </span>
                                        {item.studied ? (
                                            <span>{item.description}</span>
                                        ) : (
                                            <span>{"<не изучено>"}</span>
                                        )}
                                        <hr />
                                        <span className="font-bold">Ценность (Всего): </span>
                                        {item.studied ? (
                                            <span>{formatValue(item.value, item.quantity)}</span>
                                        ) : (
                                            <span>???</span>
                                        )}
                                        <hr />
                                        <span className="font-bold">Вес (Всего): </span>
                                        <span>{item.weight * item.quantity} фунт</span>
                                        <hr />
                                        <span className="font-bold">Количество: </span>
                                        <span>{item.quantity}</span>
                                    </div>
                                }
                            >
                                <Tooltip content={item.title}>
                                    <div className="cursor-pointer relative m-0 border-[1px] border-collapse border-[#999] rounded overflow-hidden">
                                        <Image
                                            width={100}
                                            height={100}
                                            style={{
                                                minHeight: "100px",
                                                minWidth: "100px",
                                                maxHeight: "100px",
                                                maxWidth: "100px",
                                                objectFit: "cover",
                                            }}
                                            alt={item.id}
                                            src={item.image ? `${storage}${item.image}` : "/images/mark.svg"}
                                        />
                                        <div className="absolute bottom-0 right-0 bg-blue-300 w-[25px] h-[25px] rounded-tl-lg overflow-hidden">
                                            <p className="flex items-center justify-center font-bold">{item.quantity}</p>
                                        </div>
                                    </div>
                                </Tooltip>
                            </Tooltip>
                        )}
                        {!item && <EmptyCell />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Backpack;
