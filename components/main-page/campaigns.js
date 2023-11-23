// CampaignsCard.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(dateString).toLocaleString(undefined, options);
};

const storage = process.env.NEXT_PUBLIC_BACKEND_STORAGE;

const CampaignsCard = ({item}) => (
    <Link href={`/campaign/${item.id}`} className={"hover:bg-blue-100 p-2 flex rounded flex gap-2 w-[400px]"}>
        <div className="flex gap-2">
            <Image
                width={100}
                height={100}
                style={{maxHeight: '100px', maxWidth: '100px', objectFit: 'cover'}}
                alt={item.id}
                src={`${storage}${item.image}`}
                className="rounded"
            />
            <div className="flex gap-1 flex-col">
                <div className="flex gap-2">
                    <div className="font-bold font-2xl">{item.title}</div>
                </div>
                <div className="flex gap-2">
                    <div className="font-2xl">{item.setting}</div>
                </div>
                <div className="flex gap-2">
                    <div className="font-xl">Создана: {formatDate(item.created_at)}</div>
                </div>
            </div>
        </div>
    </Link>
);

export default CampaignsCard;
