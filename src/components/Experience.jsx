import {
    Environment,
    OrbitControls,
    OrthographicCamera,
} from "@react-three/drei";
import {useControls} from "leva";
import {useRef, useState} from "react";
import {Character} from "./Character";
import {Map} from "./Map";
import {euler, Physics, quat, RigidBody, vec3} from "@react-three/rapier";
import {CharacterController} from "./CharacterController.jsx";
import {Coin} from "./Coin.jsx";
import {useFrame} from "@react-three/fiber";
import useGame from "../stores/useGame.js";
import {CoinController} from "./CoinController.jsx";

const maps = {
    dark_souls_map: {
        scale: 1,
        position: [0, 0, 0],
    },
    castle_on_hills: {
        scale: 3,
        position: [-6, -7, 0],
    },
    animal_crossing_map: {
        scale: 20,
        position: [-15, -1, 10],
    },
    city_scene_tokyo: {
        scale: 0.72,
        position: [0, -1, -3.5],
    },
    de_dust_2_with_real_light: {
        scale: 0.3,
        position: [-5, -3, 13],
    },
    medieval_fantasy_book: {
        scale: 0.4,
        position: [-4, 0, -6],
    },
};

export const Experience = () => {
    const shadowCameraRef = useRef();
    const {map} = useControls("Map", {
        map: {
            value: "de_dust_2_with_real_light",
            options: Object.keys(maps),
        },
    });


    const [coins, setCoins] = useState([
        {
            id: 1,
            position: [1, 0, 0]
        },
        {
            id: 2,
            position: [0, 1, 0]
        },
        {
            id: 3,
            position: [1, 2, 0]
        },
        {
            id: 4,
            position: [2, 2, 0]
        },
        {
            id: 5,
            position: [1, 1, 1]
        },
        {
            id: 6,
            position: [1, 3, 1]
        },
        {
            id: 7,
            position: [1, 3, 1]
        },
        {
            id: 8,
            position: [4, 3, 2]
        },
        {
            id: 9,
            position: [5, 7, 2]
        },
        {
            id: 10,
            position: [3, 3, 2]
        },

    ]);

    const [isScored, setIsScored] = useState(false)
    const increaseScore = useGame((state) => state.increment)


    const onTouch = (coinId, e) => {

        if (e.collider._parent.userData.type === 'player') {
            increaseScore()
            setCoins((coins) => coins.filter(coin => coin.id !== coinId))
        }

    }


    return (
        <>
            <Environment preset="sunset"/>
            <directionalLight
                intensity={0.65}
                castShadow
                position={[-15, 10, 15]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.00005}
            >
                <OrthographicCamera
                    left={-22}
                    right={15}
                    top={10}
                    bottom={-20}
                    ref={shadowCameraRef}
                    attach={"shadow-camera"}
                />
            </directionalLight>
            {/*     <Physics key={map} debug> */}
            <Physics key={map}>
                <Map
                    scale={maps[map].scale}
                    position={maps[map].position}
                    model={`models/${map}.glb`}
                />
                {
                    (coins).map((coin, index) => (
                        <CoinController
                            key={coin.id}
                            position={coin.position}
                            coinId={coin.id}
                            onTouch={onTouch}
                        />
                    ))
                }

                <CharacterController/>
            </Physics>
        </>
    );
};
