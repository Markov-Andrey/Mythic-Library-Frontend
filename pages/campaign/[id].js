import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {getCampaign} from 'api/index';
import CharacterCard from "../../components/main-page/character_card";
import AddNote from "../../components/campaign/addNote";
import { Accordion } from 'flowbite-react';

const storage = process.env.NEXT_PUBLIC_BACKEND_STORAGE;

const CampaignPage = () => {
    const [campaign, setCampaign] = useState(null);
    const router = useRouter();
    const {id} = router.query;

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

    const reload = async () => {
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

    return (
        <div>
            <Head>
                <title>{campaign ? `${campaign.title}` : "Кампания"}</title>
            </Head>
            {campaign ? (
                <div className="p-5">
                    <div>
                        <div className={"flex gap-2"}>
                            <Image
                                width={250}
                                height={250}
                                style={{maxHeight: '250px', maxWidth: '250px', objectFit: 'cover'}}
                                alt={campaign.id}
                                src={`${storage}${campaign.image}`}
                                className="rounded"
                            />
                            <div>
                                <h1>{campaign.title}</h1>
                                <div>{campaign.setting}</div>
                            </div>
                        </div>
                        <h2>Описание</h2>
                        <div>{campaign.description}</div>
                    </div>
                    <div>
                        <h2>Участники</h2>
                        <div className={"flex flex-wrap"}>
                            {campaign.short_info.map((item) => (
                                <CharacterCard item={item}/>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2>Заметки кампании</h2>
                        <div className={"flex flex-wrap"}>
                            <AddNote campaignId={campaign.id} onNoteCreated={reload} />
                        </div>
                        <div className="flex flex-wrap">
                            <Accordion>
                            {campaign.campaign_note.map((item) => (
                                <Accordion.Panel className={"min-w-500px"}>
                                    <Accordion.Title className={"min-w-500px"}>
                                        <h3 className={"italic"}>{item.tags}</h3>
                                        <div>{item.title}</div>
                                        <hr className={"border-2 border-[#777]"}/>
                                        <div className={"text-right text-base"}>
                                            {new Date(item.created_at).toLocaleString('ru-RU', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}
                                        </div>
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div>{item.description}</div>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default CampaignPage;
