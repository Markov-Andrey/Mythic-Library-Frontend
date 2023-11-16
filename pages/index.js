import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Head from 'next/head';
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

const Home = () => {
    const [character, setCharacter] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://mythic-library.com/api/character/1');
                setCharacter(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching character:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Head>
                <title>Персонаж: { character.info.name }</title>
            </Head>
            <h1>{ character.info.name }</h1>
            {character && <RecursiveArrayRenderer data={character} />}
        </div>
    );
};

export default Home;
