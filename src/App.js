import React, { Suspense } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, useBox, usePlane } from "@react-three/cannon";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`;
const BoxGeometry = styled.div`
  width: 50%;
  height: 500px;
  background-color: black;
`;

const Box = () => {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 10, 0] }));
  return (
    <mesh
      ref={ref}
      position={[0, 2, 0]}
      onClick={() => api.velocity.set(0, 2, 0)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="plum" />
    </mesh>
  );
};

const Plane = () => {
  const [ref] = usePlane(() => ({ mass: 0, rotation: [-Math.PI / 2, 0, 0] }));
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshStandardMaterial attach="material" color="deepSkyBlue" />
    </mesh>
  );
};

function App() {
  return (
    <Container>
      <BoxGeometry>
        <Canvas>
          <Suspense fallback={null}>
            <OrbitControls />
            <Stars />
            <Physics>
              <Box />
              <Plane />
            </Physics>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} intensity={0.5} angle={0.3} />
          </Suspense>
        </Canvas>
      </BoxGeometry>
    </Container>
  );
}

export default App;
