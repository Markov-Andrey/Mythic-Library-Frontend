import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from "next/router";

const storage = process.env.NEXT_PUBLIC_BACKEND_STORAGE;

const RecursiveArrayRenderer = ({ data }) => {
    return (
        <div>
            {Object.entries(data).map(([key, value]) => (
                <div key={key}>
                    {typeof value === 'object' && value !== null ? (
                        <>
                            {key !== '0' && <h2>{key}</h2>}
                            <RecursiveArrayRenderer data={value} />
                        </>
                    ) : (
                        <>
                            {['icon', 'image', 'logo'].includes(key) ? (
                                <>
                                    <strong>{key}:</strong>
                                    <div className="rounded-full overflow-hidden">
                                        <Image
                                            width={200}
                                            height={200}
                                            alt={key}
                                            src={`${storage}${value}`}
                                            className="rounded-full"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <strong>{key}:</strong> {value}
                                </>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

const CharacterDetails = ({ character }) => {
    console.log(character);
    return (
        <div>
            <Head>
                <title>Персонаж</title>
            </Head>
            <h1>Character Details</h1>
            {character && <RecursiveArrayRenderer data={character} />}
        </div>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.query;
    const response = await axios.get(`http://mythic-library.com/api/character/${id}`);
    const character = response.data;

    return {
        props: { character },
    };
}

export default CharacterDetails;
