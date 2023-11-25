import React from "react";
import { Tooltip } from 'flowbite-react';

const Inspiration = ({ hasInspiration }) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <div>Вдохновение</div>
            <Tooltip className="max-w-[500px]" content={
                <div className={"max-w-[500px]"}>
                    <div className="indent-2 p-1">Если у вас есть вдохновение, вы можете использовать его для улучшения броска атаки, спасброска или проверки характеристики. Вы совершаете бросок с преимуществом.</div>
                    <div className="indent-2 p-1">Кроме того, если у вас есть вдохновение, вы можете наградить другого игрока за хороший отыгрыш, реализацию хитроумного решения или просто за что-то захватывающее. Когда другой персонаж делает то, что делает сюжет увлекательным или интересным, вы можете передать ему своё вдохновение.</div>
                </div>
            }>
                <div className="border-2 rounded-full flex items-center justify-center w-[30px] h-[30px] overflow-hidden">
                    {hasInspiration ? (
                        <div className="relative flex items-center justify-center w-full h-full">
                            <div className="absolute left-[2px] top-[2px] w-[85%] h-[85%] rounded-full bg-amber-300 animate-sun-glow"/>
                        </div>
                    ) : null}
                </div>
            </Tooltip>
        </div>
    );
};

export default Inspiration;
