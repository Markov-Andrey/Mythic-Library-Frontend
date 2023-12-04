import React from 'react';
import { Tooltip } from "flowbite-react";
import WeightSvg from "components/svg/weight-svg";

const WeightDisplay = ({ weight }) => {
    return (
        <div className="border-2 p-1 flex items-center">
            <Tooltip content={"Вес/макс.вес"}>
                <div className={"flex gap-2 cursor-help"}>
                    <WeightSvg />
                    <p>
                        {weight.backpack}/{weight.carrying} фунтов
                    </p>
                </div>
            </Tooltip>
        </div>
    );
};

export default WeightDisplay;
