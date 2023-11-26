import React from 'react';

const ParamElement = ({ label, value, modifier, saving_throws }) => {
    const formattedModifier = modifier > 0 ? `+${modifier}` : modifier;
    const totalValue = saving_throws ? saving_throws + modifier : modifier;
    const formattedTotalValue = totalValue > 0 ? `+${totalValue}` : totalValue;

    return (
        <div className="flex flex-col items-center relative">
            <svg
                className="drop-shadow-md h-32 w-32"
                viewBox="0 0 84 84"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z"
                    fill="#fff"
                    stroke="#808080"
                    strokeWidth="1"
                />
            </svg>
            <div className={"font-bold text-2xl absolute top-3"}>{formattedModifier}</div>
            <div className={"absolute top-[40%]"}>{label}</div>
            <div className={"absolute bottom-3"}>{value}</div>
            <div className={"absolute bottom-[25%] text-green-500 font-bold"}>
                {`Сп. ${formattedTotalValue}`}
            </div>
        </div>
    );
};

export default ParamElement;
