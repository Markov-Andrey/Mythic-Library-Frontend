import React from "react";
import { Tooltip } from "flowbite-react";
import Image from "next/image";

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

const Spell = ({ spells }) => {
    console.log(spells);

    const spellsByLevel = spells.reduce((acc, spell) => {
        const level = spell.level || 0;
        acc[level] = acc[level] || [];
        acc[level].push(spell);
        return acc;
    }, {});

    return (
        <div className="border-2 max-h-[575px] overflow-y-scroll">
            {Object.keys(spellsByLevel).map((level, index) => (
                <div key={index}>
                    <h3>{level === "0" ? "Заговор" : `Уровень ${level}`}</h3>
                    <div className="grid grid-cols-5">
                        {[...Array(5)].map((_, cellIndex) => (
                            <div key={cellIndex}>
                                {spellsByLevel[level][cellIndex] ? (
                                    <Tooltip
                                        trigger="click"
                                        content={
                                            <div className="max-w-[500px]">
                                                <h4>{spellsByLevel[level][cellIndex].title}</h4>
                                                <hr />
                                                <span className="font-bold">Описание: </span>
                                                <span>{spellsByLevel[level][cellIndex].description}</span>
                                                <hr />
                                                <span className="font-bold">Уровень: </span>
                                                <span>{spellsByLevel[level][cellIndex].level} ур.</span>
                                            </div>
                                        }
                                    >
                                        <Tooltip content={spellsByLevel[level][cellIndex].title}>
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
                                                    alt={spellsByLevel[level][cellIndex].id}
                                                    src={
                                                        spellsByLevel[level][cellIndex].image
                                                            ? `${storage}${spellsByLevel[level][cellIndex].image}`
                                                            : "/images/mark.svg"
                                                    }
                                                />
                                            </div>
                                        </Tooltip>
                                    </Tooltip>
                                ) : (
                                    <EmptyCell />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Spell;
