import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {getCharacter} from 'api/index';
import {Progress} from 'flowbite-react';
import ParamElement from '/components/character/param';
import ArmorClass from '/components/character/armor_class';
import { Tooltip } from 'flowbite-react';
import {Modifier} from '/services/modifier';

const storage = process.env.NEXT_PUBLIC_BACKEND_STORAGE;

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

    const formatValue = (value, quantity) => {
        const totalValue = value * quantity;
        if (totalValue >= 1) {
            return `${totalValue} зм`;
        } else if (totalValue * 10 >= 1) {
            return `${totalValue * 10} см`;
        } else {
            return `${totalValue * 100} мм`;
        }
    };

    const paramsData = () => {
        if (!character) return [];
        const param = character.params;
        const mod = character.basic_modifier;
        return [
            { label: 'Сила', value: param.strength, modifier: mod.strength },
            { label: 'Ловкость', value: param.dexterity, modifier: mod.dexterity },
            { label: 'Телосложение', value: param.constitution, modifier: mod.constitution },
            { label: 'Интеллект', value: param.intelligence, modifier: mod.intelligence },
            { label: 'Мудрость', value: param.wisdom, modifier: mod.wisdom },
            { label: 'Харизма', value: param.charisma, modifier: mod.charisma },
        ];
    };
    const skillsData = () => {
        if (!character) return []
        const mod = character.skills_modifier;
        const bonus = character.skills;
        return [
            {label: 'Атлетика', modifier: mod.athletics, bonus: bonus.athletics},
            {label: 'Акробатика', modifier: mod.acrobatics, bonus: bonus.acrobatics},
            {label: 'Ловкость рук', modifier: mod.sleight_of_hand, bonus: bonus.sleight_of_hand},
            {label: 'Незаметность', modifier: mod.stealth, bonus: bonus.stealth},
            {label: 'Магия', modifier: mod.arcana, bonus: bonus.arcana},
            {label: 'История', modifier: mod.history, bonus: bonus.history},
            {label: 'Анализ', modifier: mod.investigation, bonus: bonus.investigation},
            {label: 'Природа', modifier: mod.nature, bonus: bonus.nature},
            {label: 'Религия', modifier: mod.religion, bonus: bonus.religion},
            {label: 'Уход за животными', modifier: mod.animal_handling, bonus: bonus.animal_handling},
            {label: 'Проницательность', modifier: mod.insight, bonus: bonus.insight},
            {label: 'Уход за животными', modifier: mod.animal_handling, bonus: bonus.animal_handling},
            {label: 'Медицина', modifier: mod.medicine, bonus: bonus.medicine},
            {label: 'Восприятие', modifier: mod.perception, bonus: bonus.perception},
            {label: 'Выживание', modifier: mod.survival, bonus: bonus.survival},
            {label: 'Обман', modifier: mod.deception, bonus: bonus.deception},
            {label: 'Запугивание', modifier: mod.intimidation, bonus: bonus.intimidation},
            {label: 'Выступление', modifier: mod.performance, bonus: bonus.performance},
            {label: 'Убеждение', modifier: mod.persuasion, bonus: bonus.persuasion},
        ];
    }

    return (
        <div>
            <Head>
                <title>{character ? `${character.info.name} (${character.character_experience.level} ур.)` : "Персонаж"}</title>
            </Head>
            {character ? (
                <div className="p-5">
                    <section className="flex gap-5 rounded border-2 border-neutral-300 w-max pr-[100px]">
                        <div className="flex-shrink-0 flex items-center">
                            <Image
                                width={275}
                                height={275}
                                style={{maxHeight: "275px", maxWidth: "275px", objectFit: 'cover'}}
                                alt={character.info.id}
                                src={`${storage}${character.info.logo}`}
                                className={"rounded"}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className={"flex inline-flex"}>
                                <div className={"bold text-2xl"}>
                                    <div className="bg-blue-300 m-1 p-2 rounded-full w-[35px] h-[35px] flex items-center justify-center">
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
                            <div className={"flex flex-row gap-2 items-center"}>
                                <ArmorClass className={"w-[50px]"} value={character.armor_class} />
                                <div className="flex flex-col flex-grow">
                                    <div className="text-base font-bold text-red-700">HP</div>
                                    <Progress progress={character.health.health_current/character.health.health_max*100} size="lg" color="red" />
                                    <span className={"text-red-700 font-medium"}>{character.health.health_current}/{character.health.health_max}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="text-base font-bold">EXP</div>
                                    <Progress progress={character.character_experience.exp/character.character_experience.exp_next_level*100} color="dark" />
                                    <span className={"text-dark font-medium"}>{character.character_experience.exp}/{character.character_experience.exp_next_level}</span>
                                </div>
                                <div className={"flex gap-2"}>
                                    <div>Бонус мастерства</div>
                                    <div>{character.character_experience.master_bonus}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={"flex gap-2"}>
                        {paramsData().map((param, index) => (
                            <ParamElement key={index} {...param} />
                        ))}
                    </section>

                    <section className={"flex gap-10"}>
                        <div>
                            <h2>Навыки:</h2>
                            <hr/>
                            <table className="border-collapse">
                                <tbody>
                                {skillsData().map((param, index) => {
                                    const mod = param.modifier;
                                    const bonus = param.bonus * character.character_experience.master_bonus;
                                    const result = mod + bonus;
                                    const tooltip = `
                                Модификатор: ${Modifier(mod)}` + (bonus !== 0 ? `,
                                Бонус мастерства: ${Modifier(bonus)}` : '');
                                    return (
                                        <tr key={index} className="border-b-2 hover:bg-blue-100 transition duration-300 ease-in-out">
                                            <td className="p-1 text-left">
                                                <svg width={'10px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 5" fill={param.bonus ? "black" : "none"}  stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="6" cy="2.5" r="2.5"/>
                                                </svg>
                                            </td>
                                            <td className="p-1 text-left">
                                                <span>{param.label}</span>
                                            </td>
                                            <td className="p-1 text-center cursor-help">
                                                <Tooltip content={tooltip}>
                                                    {Modifier(result)}
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>

                        <div className="border-2">
                            <h2>Рюкзак:</h2>
                            <div>
                                <hr/>
                                {character.backpack.map((item, index) => (
                                    <div key={index}>
                                        <div className={"flex gap-2"}>
                                            {item.image && (
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    alt={item.id}
                                                    src={`${storage}${item.image}`}
                                                    className="rounded"
                                                />
                                            )}
                                            <h3>{item.title}</h3>
                                        </div>
                                        <p className={"flex gap-2"}>
                                            <b>Описание: </b>
                                            {item.description}
                                        </p>
                                        <p className={"flex gap-2"}>
                                            <b>Ценность (всего): </b>
                                            <Tooltip content={`Цена за ед.: ${formatValue(item.value, 1)}`}>
                                                <p className={"cursor-help"}>{formatValue(item.value, item.quantity)}</p>
                                            </Tooltip>
                                        </p>
                                        <p className={"flex gap-2"}>
                                            <b>Вес (всего): </b>
                                            <Tooltip content={`Вес за ед.: ${item.weight} фунт`}>
                                                <p className={"cursor-help"}>{item.weight * item.quantity} фунт</p>
                                            </Tooltip>
                                        </p>
                                        <p>
                                            <b>Количество: </b>
                                            {item.quantity}
                                        </p>
                                        <hr/>
                                    </div>
                                ))}
                            </div>
                            <div className="border-2 p-1 flex items-center">
                                <Tooltip content={"Вес/макс.вес"}>
                                    <p className={"cursor-help"}>
                                        {character.weight.backpack}/{character.weight.carrying} фунтов
                                    </p>
                                </Tooltip>
                            </div>
                        </div>

                    </section>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default CharacterPage;
