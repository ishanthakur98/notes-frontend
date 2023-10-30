import TestContext from "./testContext";


const TestState = (props) => {
    const fName = {
        "name" : "ishan"
    };
    
    
    return (
        <TestContext.Provider value={fName}>
            {props.children}
        </TestContext.Provider>
    )
}

export default TestState;