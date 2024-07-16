import {Canvas} from "@react-three/fiber";
import {Experience} from "./components/Experience";
import {KeyboardControls} from "@react-three/drei";
import {Score} from "./components/Score.jsx";
import {Leva} from "leva";

const keyboardMap = [
    {name: "forward", keys: ["ArrowUp", "KeyW"]},
    {name: "backward", keys: ["ArrowDown", "KeyS"]},
    {name: "left", keys: ["ArrowLeft", "KeyA"]},
    {name: "right", keys: ["ArrowRight", "KeyD"]},
    {name: "run", keys: ["Shift"]},
    {name: "jump", keys: ["Space"]},
];

function App() {

    const DEBUG = false;
    return (
        <>
            <Leva hidden={!DEBUG}/>
            <Score/>
            <KeyboardControls map={keyboardMap}>
                <Canvas
                    shadows
                    camera={{position: [3, 3, 3], near: 0.2, fov: 40}}
                    style={{
                        touchAction: 'none'
                    }}
                >
                    <color attach="background" args={["#ececec"]}/>
                    <Experience/>
                </Canvas>
            </KeyboardControls>
        </>
    );
}

export default App;
