import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function Home() {
    const storage = process.env.NEXT_PUBLIC_BACKEND_STORAGE;
    const [character, setCharacter] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://mythic-library.com/api/character/1');
                setCharacter(response.data);
            } catch (error) {
                console.error('Error fetching character:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Character Details</h1>
            <div className="text-3xl font-bold underline">Hello</div>
            {character && (
                <ul>
                    {Object.entries(character).map(([key, value]) => (
                        <li key={key}>
                            {key === 'logo' ? (
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
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
