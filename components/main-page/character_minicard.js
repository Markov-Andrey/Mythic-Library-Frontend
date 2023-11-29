// CharacterMiniCard.js
import React from 'react';
import Image from 'next/image';

const storage = process.env.NEXT_PUBLIC_BACKEND_STORAGE;
const width = 150;

const CharacterMiniCard = ({ item }) => {
    return (
        <div className="w-[150px]">
            <Image
                width={width}
                height={width}
                style={{ maxHeight: '150px', maxWidth: '150px', objectFit: 'cover' }}
                alt={item.id ? item.id : 'ico'}
                src={item.logo ? `${storage}${item.logo}` : '/images/mark.svg'}
                className="rounded"
            />
            <div className="flex gap-1 flex-col">
                <div className="flex gap-2">
                    <div className="font-bold font-2xl">{item.name}</div>
                </div>
            </div>
        </div>
    );
};

export default CharacterMiniCard;
