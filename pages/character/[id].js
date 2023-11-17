import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getCharacter } from 'api/index';
const storage = process.env.NEXT_PUBLIC_BACKEND_STORAGE;
import { Progress } from 'flowbite-react';
import ParamElement from '/components/character/param';

const CharacterPage = () => {
    const [character, setCharacter] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const data = await getCharacter(id);
                    setCharacter(data);
                }
            } catch (error) {
                console.error('Error fetching character:', error);
            }
        };
        fetchData();
    }, [id]);

    const paramsData = () => {
        if (!character) return [];
        return [
            { label: 'Сила', value: character.params.strength, modifier: character.basic_modifier.strength },
            { label: 'Ловкость', value: character.params.dexterity, modifier: character.basic_modifier.dexterity },
            { label: 'Телосложение', value: character.params.constitution, modifier: character.basic_modifier.constitution },
            { label: 'Интеллект', value: character.params.intelligence, modifier: character.basic_modifier.intelligence },
            { label: 'Мудрость', value: character.params.wisdom, modifier: character.basic_modifier.wisdom },
            { label: 'Харизма', value: character.params.charisma, modifier: character.basic_modifier.charisma },
        ];
    };

    return (
        <div>
            <Head>
                <title>{character ? character.info.name : "Персонаж"}</title>
            </Head>
            {character ? (
                <div className="p-5">
                    <section className="flex gap-5 rounded-full border-2 border-neutral-300 w-max pr-[100px]">
                        <div className="flex-shrink-0 flex items-center">
                            <Image
                                width={275}
                                height={275}
                                style={{maxHeight: "275px", maxWidth: "275px", objectFit: 'cover'}}
                                alt={character.info.id}
                                src={`${storage}${character.info.logo}`}
                                className="rounded-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className={"flex inline-flex"}>
                                <div className={"bold text-2xl"}>
                                    <div style={{ marginLeft: "-40px" }} className="bg-blue-300 m-1 p-2 rounded-full w-[35px] h-[35px] flex items-center justify-center">
                                        {character.character_experience.level}
                                    </div>
                                </div>
                                <h1>{character.info.name}</h1>
                            </span>
                            <button className="w-fit flex items-center rounded-full border-2 border-neutral-300 pr-[20px] bg-blue-300 hover:drop-shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                <Image
                                    width={40}
                                    height={40}
                                    alt={character.info.id}
                                    src={`${storage}${character.class.icon}`}
                                    className="rounded-full"
                                />
                                <span className="ml-2">{character.class.name}</span>
                            </button>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="text-base font-bold text-red-700">HP</div>
                                    <Progress progress={character.health.health_current/character.health.health_max*100} size="lg" color="red" />
                                    <span className={"text-red-700 font-medium"}>{character.health.health_current}/{character.health.health_max}</span>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-base font-bold">EXP</div>
                                    <Progress progress={character.character_experience.exp/character.character_experience.exp_next_level*100} color="dark" />
                                    <span className={"text-dark font-medium"}>{character.character_experience.exp}/{character.character_experience.exp_next_level}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={"flex gap-2"}>
                        {paramsData().map((param, index) => (
                            <ParamElement key={index} {...param} />
                        ))}
                    </section>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default CharacterPage;
