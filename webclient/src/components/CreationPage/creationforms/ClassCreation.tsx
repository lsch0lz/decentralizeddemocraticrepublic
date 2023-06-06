import React, {useState} from "react";
import {CustomFormLabel} from "../customInput/CustomFormLabel";

export function ClassCreation() {
    const [className, setClassName] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClassName(e.target.value);
    };

    const saveToChain = () => {
        // TODO: Save to chain
        console.log('Saving to chain! Need to be implemented');
    }

    return (
        <div className="ClassCreation">
            <form onSubmit={saveToChain}>
                <CustomFormLabel
                    label={"Class Name"}
                    type="text"
                    value={className}
                    onChange={handleNameChange}
                />
                <button type="submit">Create Class</button>
            </form>
        </div>
    );

}
