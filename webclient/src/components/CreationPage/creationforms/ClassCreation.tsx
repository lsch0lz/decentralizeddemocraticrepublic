import React, {useState} from "react";

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
                <label>
                    Class Name
                    <input type="text" value={className} onChange={handleNameChange}/>
                </label>
                <button type="submit">Create Class</button>
            </form>
        </div>
    );

}
