import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getCampaign } from 'api/index';
import CharacterMiniCard from "/components/main-page/character_minicard";
import { Button, Label, Modal, TextInput } from 'flowbite-react';

const Encounter = () => {
    const router = useRouter();
    const { id } = router.query;
    const [campaign, setCampaign] = useState(null);
    const [roundNumber, setRoundNumber] = useState(1);

    const [charactersWithInitiatives, setCharactersWithInitiatives] = useState(null);
    const [sortedCharacters, setSortedCharacters] = useState(null);
    const [filteredCharacters, setFilteredCharacters] = useState([]);

    const [generateName, setGenerateName] = useState('A');
    const [openModal, setOpenModal] = useState(false);
    const [newEnemyName, setNewEnemyName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const data = await getCampaign(id);
                    setCampaign(data);
                    console.log(data);

                    setCharactersWithInitiatives(
                        data?.short_info.map((item, index) => ({
                            ...item,
                            initiative: (data.initiatives && data.initiatives[index]?.initiative) || 0,
                        })) || []
                    );
                }
            } catch (error) {
                console.error('Error fetching campaign:', error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (charactersWithInitiatives) {
            const sorted = charactersWithInitiatives.slice().sort((a, b) => b.initiative - a.initiative);
            setSortedCharacters(sorted);
        }
    }, [charactersWithInitiatives]);

    useEffect(() => {
        if (sortedCharacters) {
            const filtered = sortedCharacters.filter(character => character.initiative !== 0);
            setFilteredCharacters(filtered);
        }
    }, [sortedCharacters]);

    const handleInitiativeChange = (index, value) => {
        const updatedCharacters = [...charactersWithInitiatives];
        updatedCharacters[index] = { ...updatedCharacters[index], initiative: parseInt(value, 10) };
        setCharactersWithInitiatives(updatedCharacters);
    };

    const endTurn = (id) => {
        console.log('Turn ended!');
        const characterIndex = charactersWithInitiatives.findIndex((character) => character.id === id);
        if (characterIndex !== -1) {
            const updatedCharacters = [...charactersWithInitiatives];
            updatedCharacters[characterIndex] = { ...updatedCharacters[characterIndex], initiative: 0 };
            setCharactersWithInitiatives(updatedCharacters);
        }
    };

    const endRound = () => {
        console.log('Round ended!');
        setCharactersWithInitiatives((prevCharacters) =>
            prevCharacters.map((character) => ({ ...character, initiative: 0 }))
        );
        setRoundNumber(roundNumber + 1);
    };

    const generateNextName = () => {
        const nextLetter = String.fromCharCode(generateName.charCodeAt(0) + 1);
        setGenerateName(nextLetter);
        return `New Enemy ${generateName}`;
    };

    const handleNewEnemyNameChange = (e) => {
        setNewEnemyName(e.target.value);
    };

    const addEnemy = () => {
        console.log('Enemy added!');
        const newName = newEnemyName || generateNextName();

        const randomId = Math.floor(Math.random() * 1000000).toString();
        const uniqueId = `${randomId}_${Date.now()}`;

        const newEnemy = {
            id: uniqueId,
            logo: null,
            name: newName,
            initiative: 0,
        };

        setCharactersWithInitiatives((prevState) => [...prevState, newEnemy]);
        setOpenModal(false);
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
                        <div className={"flex gap-2"}>
                            <h2>Участники</h2>
                            <button onClick={() => setOpenModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Добавить
                            </button>

                            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                                <Modal.Header>Введите имя для нового врага</Modal.Header>
                                <Modal.Body>
                                    <input type={"text"} value={newEnemyName} onChange={handleNewEnemyNameChange} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={addEnemy}>Добавить врага</Button>
                                    <Button onClick={() => setOpenModal(false)}>Закрыть</Button>
                                </Modal.Footer>
                            </Modal>

                        </div>
                        <div className={"grid grid-cols-2 gap-2 mb-[350px]"}>
                            {charactersWithInitiatives.map((character, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <CharacterMiniCard item={character} width={100} />
                                    <div className={"flex flex-col"}>
                                        {character.initiative}
                                        <input
                                            type="range"
                                            min="0"
                                            max="30"
                                            value={character.initiative}
                                            step="1"
                                            onChange={(e) => handleInitiativeChange(index, e.target.value)}
                                            className="bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                        <div className="flex overflow-y-auto">
                            {filteredCharacters.map((character, index) => (
                                <div className="relative p-2">
                                    <div>{character.initiative}</div>
                                    <div onClick={() => endTurn(character.id)} className="absolute top-0 left-0 w-full h-full z-10 rounded-lg">
                                        <div className="font-bold text-white rounded-lg cursor-pointer w-full h-full transition ease-in-out duration-300 hover:bg-red-500/50 hover:opacity-100 flex items-center justify-center opacity-0" style={{ userSelect: 'none' }}>
                                            Завершить ход
                                        </div>
                                    </div>
                                    <CharacterMiniCard width={150} item={character} />
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
