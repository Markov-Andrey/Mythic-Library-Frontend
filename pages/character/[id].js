import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {getCharacter} from 'api/index';
import ParamElement from '/components/character/param';
import ArmorClass from '/components/character/armor_class';
import Inspiration from '/components/character/inspiration';
import MasteryBonus from '/components/character/mastery_bonus';
import HealthBar from '/components/character/healthbar';
import ExpBar from '/components/character/exp_bar';
import Backpack from '/components/character/backpack';
import Spell from '/components/character/spells';
import {Tooltip} from 'flowbite-react';
import {Button} from 'flowbite-react';
import {Modifier} from '/services/modifier';
import WeightDisplay from '/components/character/backpack/weight';

const storage = process.env.NEXT_PUBLIC_BACKEND_STORAGE;

const CharacterPage = () => {
    const [character, setCharacter] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    const [activeTab, setActiveTab] = useState('backpack');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const data = await getCharacter(id);
                    console.log(data);
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
        const param = character.params;
        const mod = character.basic_modifier;
        const saving_throws = character.saving_throws;
        const savingMatch = (code) => {
            if (saving_throws.includes(code)) {
                return character.character_experience.master_bonus;
            }
            return null;
        };
        return [
            { label: 'Сила', value: param.strength, modifier: mod.strength, saving_throws: savingMatch('strength')},
            { label: 'Ловкость', value: param.dexterity, modifier: mod.dexterity, saving_throws: savingMatch('dexterity')},
            { label: 'Телосложение', value: param.constitution, modifier: mod.constitution, saving_throws: savingMatch('constitution')},
            { label: 'Интеллект', value: param.intelligence, modifier: mod.intelligence, saving_throws: savingMatch('intelligence')},
            { label: 'Мудрость', value: param.wisdom, modifier: mod.wisdom, saving_throws: savingMatch('wisdom')},
            { label: 'Харизма', value: param.charisma, modifier: mod.charisma, saving_throws: savingMatch('charisma')},
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
                            <div className={"flex inline-flex"}>
                                <div className={"bold text-2xl"}>
                                    <div className="bg-blue-300 m-1 p-2 rounded-full w-[35px] h-[35px] flex items-center justify-center">
                                        {character.character_experience.level}
                                    </div>
                                </div>
                                <h1>{character.info.name}</h1>
                            </div>
                            <div className={"flex flex-row gap-2"}>
                                <ArmorClass className={"w-[50px]"} value={character.armor_class} />
                                <div className="w-fit flex items-center rounded-full border-2 border-neutral-300 pr-[20px] bg-blue-300 hover:drop-shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                    <Image
                                        width={40}
                                        height={40}
                                        alt={character.info.id}
                                        src={`${storage}${character.class.icon}`}
                                        className="rounded-full"
                                    />
                                    <span className="ml-2">{character.class.name}</span>
                                </div>
                            </div>
                            <div className="flex flex-col w-full min-w-max">
                                <span className={"font-bold"}>Здоровье</span>
                                <HealthBar health={character.health} />
                            </div>
                            <div className="flex flex-col">
                                <span className={"font-bold"}>Опыт</span>
                                <ExpBar exp={character.character_experience}/>
                            </div>
                            <div className={"flex gap-2 items-center"}>
                                <MasteryBonus bonus={character.character_experience.master_bonus} />
                                <Inspiration hasInspiration={character.info.inspiration}/>
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
                                                <Tooltip content={
                                                    <div>
                                                        <div>Модификатор: {Modifier(mod)}</div>
                                                        {bonus !== 0 ? <div>Бонус мастерства: {Modifier(bonus)}</div> : null}
                                                    </div>
                                                }>
                                                    {Modifier(result)}
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>

                        <div>

                        </div>

                        <div>
                            <div className={"flex"}>
                                <div className="tab-container">
                                    <Button.Group>
                                        <Button
                                            color={activeTab === 'backpack' ? 'blue' : 'gray'}
                                            onClick={() => handleTabClick('backpack')}
                                        >
                                            Рюкзак
                                        </Button>
                                        <Button
                                            color={activeTab === 'spells' ? 'blue' : 'gray'}
                                            onClick={() => handleTabClick('spells')}
                                        >
                                            Заклинания
                                        </Button>
                                    </Button.Group>
                                </div>
                            </div>


                            <div className="tab-content">
                                {activeTab === 'backpack' && (
                                    <div>
                                        <Backpack backpack={character.backpack} />
                                        <WeightDisplay weight={character.weight} />
                                    </div>
                                )}
                                {activeTab === 'spells' &&
                                    <Spell spells={character.spells} spell_slots={character.spell_slots}
                                />}
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
