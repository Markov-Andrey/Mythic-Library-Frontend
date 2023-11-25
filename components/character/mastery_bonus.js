import React from "react";

const MasteryBonus = ({ bonus }) => {
    return (
        <div className="flex gap-2">
            <div>Бонус мастерства</div>
            {bonus > 0 ? <div>+{bonus}</div> : <div>{bonus}</div>};
        </div>
    );
};

export default MasteryBonus;
