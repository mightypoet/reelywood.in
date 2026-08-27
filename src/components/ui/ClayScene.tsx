import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float, Center, ContactShadows, SpotLight } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, position, rotation, scale, floatSpeed = 1, floatIntensity = 1, floatRotationIntensity = 1 }: any) {
  const gltf = useGLTF(url) as any;
  const scene = gltf.scene;
  // Clone scene so we can mutate materials if needed, or just use as is
  return (
    <Float 
      speed={floatSpeed} 
      rotationIntensity={floatRotationIntensity} 
      floatIntensity={floatIntensity}
    >
      <primitive 
        object={scene.clone()} 
        position={position} 
        rotation={rotation} 
        scale={scale} 
      />
    </Float>
  );
}

export default function ClayScene() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none md:pointer-events-auto flex justify-end">
      {/* We only want it to occupy the right half on desktop */}
      <div className="w-full md:w-1/2 h-full opacity-50 md:opacity-100">
        <Canvas camera={{ position: [0, 0, 15], fov: 35 }}>
          <ambientLight intensity={1.5} />
          <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={1} />
          
          <Environment preset="city" />

          {/* Mascot */}
          <Model 
            url="https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/01_mascot.glb" 
            position={[2, -3, 0]} 
            rotation={[0, -0.3, 0]} 
            scale={2.8} 
            floatSpeed={1.5}
            floatIntensity={0.5}
            floatRotationIntensity={0.1}
          />
          
          {/* Laptop */}
          <Model 
            url="https://4qvdbq6tu5ltlo61.public.blob.vercel-storage.com/reelywood_laptop.glb" 
            position={[-0.5, -2, 1]} 
            rotation={[0, 0.5, 0]} 
            scale={2.2} 
            floatSpeed={1.5}
            floatIntensity={0.8}
            floatRotationIntensity={0.2}
          />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
          />
        </Canvas>
      </div>
    </div>
  );
}
