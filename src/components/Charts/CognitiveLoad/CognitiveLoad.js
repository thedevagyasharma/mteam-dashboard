import React from "react";

const CognitiveLoad = () => {
    return (
        <>
         <h3>Cognitive Load </h3>
         <div>
            <input type = 'checkbox' label='User 1'></input>
            <label>User 1</label>

            <input type = 'checkbox' label='User 1'></input>
            <label>User 2</label>

            <input type = 'checkbox' label='User 1'></input>
            <label>User 3</label>

            <input type = 'checkbox' label='User 1'></input>
            <label>User 4</label>
         </div>
         <div style={{ height:"300px", width:"100%", backgroundColor: '#dbdbdb' }}>
                cognitive load chart placeholder
            </div>
        </>
    );
}

export default CognitiveLoad;