import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getCampaign } from 'api/index';
import CharacterMiniCard from "/components/main-page/character_minicard";

const Encounter = () => {
    const [campaign, setCampaign] = useState(null);
    const [roundNumber, setRoundNumber] = useState(1);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const data = await getCampaign(id);
                    setCampaign(data);
                    console.log(data);
                }
            } catch (error) {
                console.error('Error fetching campaign:', error);
            }
        };
        fetchData();
    }, [id]);

    const [initiatives, setInitiatives] = useState([]);

    const handleInitiativeChange = (index, value) => {
        const updatedInitiatives = [...initiatives];
        updatedInitiatives[index] = { ...updatedInitiatives[index], initiative: value };
        setInitiatives(updatedInitiatives);
    };

    const charactersWithInitiatives = campaign?.short_info.map((item, index) => ({
        ...item,
        initiative: initiatives[index]?.initiative || 0,
    })) || [];

    const sortedCharacters = charactersWithInitiatives.slice().sort((a, b) => b.initiative - a.initiative);
    const filteredCharacters = sortedCharacters.filter(character => character.initiative !== 0);

    const endTurn = (id) => {
        console.log(initiatives);
        const characterIndex = charactersWithInitiatives.findIndex((character) => character.id === id);
        if (characterIndex !== -1) {
            const updatedInitiatives = [...initiatives];
            updatedInitiatives[characterIndex] = { ...updatedInitiatives[characterIndex], initiative: 0 };
            setInitiatives(updatedInitiatives);
        }
    };

    const endRound = () => {
        console.log('Round ended!');
        setRoundNumber(roundNumber + 1);
    };

    return (
        <div>
            <Head>
                <title>{campaign ? `${campaign.title}` : "Кампания"}</title>
            </Head>
            {campaign ? (
                <div className="p-5">
                    <div>
                        <h1>{campaign.title}</h1>
                    </div>
                    <div>
                        <h2>Участники</h2>
                        <div className={"grid grid-cols-2 gap-2 mb-[350px]"}>
                            {charactersWithInitiatives.map((character, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <CharacterMiniCard item={character} />
                                    <div className={"flex flex-col"}>
                                        <input
                                            type="number"
                                            placeholder="Инициатива"
                                            min="0"
                                            max="30"
                                            value={character.initiative}
                                            onChange={(e) => handleInitiativeChange(index, e.target.value)}
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="30"
                                            value={character.initiative}
                                            step="1"
                                            onChange={(e) => handleInitiativeChange(index, e.target.value)}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="h-[330px] fixed bottom-0 left-0 right-0 bg-white p-4">
                        <div className={"flex gap-2"}>
                            <h2>Раунд {roundNumber}</h2>
                            <button onClick={endRound} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Следующий раунд
                            </button>
                        </div>
                        <div className="flex flex-wrap">
                            {filteredCharacters.map((character, index) => (
                                <div className="relative p-2">
                                    <div>{character.initiative}</div>
                                    <div onClick={() => endTurn(character.id)} className="absolute top-0 left-0 w-full h-full z-10 rounded-lg">
                                        <div className="font-bold text-white rounded-lg cursor-pointer w-full h-full transition ease-in-out duration-300 hover:bg-red-500/50 hover:opacity-100 flex items-center justify-center opacity-0">
                                            Завершить ход
                                        </div>
                                    </div>
                                    <CharacterMiniCard item={character} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Encounter;
