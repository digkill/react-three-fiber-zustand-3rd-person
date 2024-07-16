import {euler, quat, RigidBody, vec3} from "@react-three/rapier";
import {Coin} from "./Coin.jsx";
import {useFrame} from "@react-three/fiber";
import {useRef, useState} from "react";
import useGame from "../stores/useGame.js";
import {Meat} from "./Meat.jsx";

export const CoinController = ({coinId, coins, onTouch, position, ...props}) => {
    const coin = useRef()


    useFrame(({_, delta}) => {

        if (coin.current) {
            const position = vec3(coin.current.translation())
            const quaternion = quat(coin.current.rotation())
            const eulerRot = euler().setFromQuaternion(
                quat(coin.current.rotation())
            )

            // While Rapier's return types need conversion, setting values can be done directly with Three.js types
            coin.current.setTranslation(position, true)
            coin.current.setRotation(quaternion, true)
            coin.current.setAngvel({x: 0, y: 2, z: 0}, true)
            //       console.log('rb.current.rotation.x', coin.current )
        }
    })

    return (<RigidBody
        ref={coin}
        colliders="ball"
        type='dynamic'
        restitution={1} friction={0.2} gravityScale={3.5}
        position={position}
        onIntersectionExit={(e) => {
            onTouch(coinId, e)
        }}
        userData={{
            type: "coin",

            balance: 10,
        }}
    >
        <Meat scale={0.08}/>
    </RigidBody>)
}