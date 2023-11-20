import React from 'react';
import Shield from '/components/svg/shield';
import {Tooltip} from 'flowbite-react';

const ArmorClass = ({value}) => {
    const findMaxValue = (obj) => {
        let maxKey = null;
        let maxValue = -Infinity;
        Object.entries(obj).forEach(([key, val]) => {
            if (val > maxValue) {
                maxKey = key;
                maxValue = val;
            }
        });

        return {key: maxKey, value: maxValue};
    };
    const maxKeyValue = findMaxValue(value);
    const tooltip = `Класс брони: ${maxKeyValue.key}`;

    return (
        <div className={"relative cursor-help"}>
            <Tooltip content={tooltip} className={"w-fit"}>
                <Shield/>
                <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                    <h3>{maxKeyValue.value}</h3>
                </div>
            </Tooltip>
        </div>
    );
};

export default ArmorClass;
