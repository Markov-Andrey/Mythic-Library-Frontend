// CharacterCard.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const storage = process.env.NEXT_PUBLIC_BACKEND_STORAGE;

const CharacterCard = ({item}) => (
    <Link href={`/character/${item.id}`} className={"hover:bg-blue-100 p-2 flex rounded flex gap-2 w-[400px]"}>
        <Image
            width={100}
            height={100}
            style={{maxHeight: '100px', maxWidth: '100px', objectFit: 'cover'}}
            alt={item.id}
            src={`${storage}${item.logo}`}
            className="rounded"
        />
        <div className="flex gap-1 flex-col">
            <div className="flex gap-2">
                <div className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-blue-300">
                    {item.level}
                </div>
                <div className="font-bold font-2xl">{item.name}</div>
            </div>
            <div className="flex gap-2">
                <div className="font-2xl">{item.races.title},</div>
                <div className="font-2xl">{item.genders.title}</div>
            </div>
            <div className="flex gap-2">
                <Image
                    width={25}
                    height={25}
                    style={{maxHeight: '25px', maxWidth: '25px', objectFit: 'cover'}}
                    alt={item.id}
                    src={`${storage}${item.classes.icon}`}
                    className="rounded-full"
                />
                <div className="font-bold font-2xl">{item.classes.name}</div>
            </div>
        </div>
    </Link>
);

export default CharacterCard;
