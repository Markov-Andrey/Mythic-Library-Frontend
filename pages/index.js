// Home.js
import React, { useEffect, useState } from 'react';
import {getAllCampaigns, getAllCharacters} from '../api';
import CharacterCard from 'components/main-page/character_card';
import CampaignsCard from 'components/main-page/campaigns';

const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllCharacters();
                const campaigns = await getAllCampaigns();
                setCharacters(data);
                setCampaigns(campaigns);
                console.log(data);
                console.log(campaigns);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-20">
            <h1>Mythic Library</h1>
            <div>
                <h1>Персонажи</h1>
                <div className={"flex flex-wrap"}>
                    {characters.map((item) => (
                        <CharacterCard item={item} />
                    ))}
                </div>
            </div>
            <div>
                <h1>Кампании</h1>
                <div className={"flex flex-wrap"}>
                    {campaigns.map((item) => (
                        <CampaignsCard item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
