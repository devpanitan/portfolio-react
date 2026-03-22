import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface LightPillarProps {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  pillarRotation?: number;
}

export default function LightPillar({
  topColor = '#29ffb8',
  bottomColor = '#6366f1',
  intensity = 1.0,
  rotationSpeed = 0.3,
  pillarWidth = 3.0,
  pillarHeight = 0.4,
  pillarRotation = 0,
}: LightPillarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, precision: 'mediump' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const parseColor = (hex: string) => { const c = new THREE.Color(hex); return new THREE.Vector3(c.r, c.g, c.b); };

    const material = new THREE.ShaderMaterial({
      vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`,
      fragmentShader: `
        precision mediump float;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uTopColor;
        uniform vec3 uBottomColor;
        uniform float uIntensity;
        uniform float uPillarWidth;
        uniform float uPillarHeight;
        uniform float uRotCos;
        uniform float uRotSin;
        uniform float uPRotCos;
        uniform float uPRotSin;
        varying vec2 vUv;

        void main(){
          vec2 uv=(vUv*2.0-1.0)*vec2(uResolution.x/uResolution.y,1.0);
          uv=vec2(uPRotCos*uv.x-uPRotSin*uv.y,uPRotSin*uv.x+uPRotCos*uv.y);
          vec3 ro=vec3(0.0,0.0,-10.0);
          vec3 rd=normalize(vec3(uv,1.0));
          vec3 col=vec3(0.0);
          float t=0.1;
          float waveSin=sin(0.4);
          float waveCos=cos(0.4);
          for(int i=0;i<40;i++){
            vec3 p=ro+rd*t;
            p.xz=vec2(uRotCos*p.x-uRotSin*p.z,uRotSin*p.x+uRotCos*p.z);
            vec3 q=p;
            q.y=p.y*uPillarHeight+uTime;
            float freq=1.0;
            float amp=1.0;
            for(int j=0;j<2;j++){
              q.xz=vec2(waveCos*q.x-waveSin*q.z,waveSin*q.x+waveCos*q.z);
              q+=cos(q.zxy*freq-uTime*float(j)*2.0)*amp;
              freq*=2.0;
              amp*=0.5;
            }
            float d=length(cos(q.xz))-0.2;
            float bound=length(p.xz)-uPillarWidth;
            float k=4.0;
            float hh=max(k-abs(d-bound),0.0);
            d=max(d,bound)+hh*hh*0.0625/k;
            d=abs(d)*0.15+0.01;
            float grad=clamp((15.0-p.y)/30.0,0.0,1.0);
            col+=mix(uBottomColor,uTopColor,grad)/d;
            t+=d*1.2;
            if(t>50.0)break;
          }
          float wn=uPillarWidth/3.0;
          col=tanh(col*0.005/wn);
          col-=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)/30.0;
          gl_FragColor=vec4(col*uIntensity,1.0);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(w, h) },
        uTopColor: { value: parseColor(topColor) },
        uBottomColor: { value: parseColor(bottomColor) },
        uIntensity: { value: intensity },
        uPillarWidth: { value: pillarWidth },
        uPillarHeight: { value: pillarHeight },
        uRotCos: { value: 1.0 },
        uRotSin: { value: 0.0 },
        uPRotCos: { value: Math.cos(pillarRotation * Math.PI / 180) },
        uPRotSin: { value: Math.sin(pillarRotation * Math.PI / 180) },
      },
      transparent: true, depthWrite: false, depthTest: false,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let time = 0;
    let rafId: number;
    const animate = () => {
      time += 0.016 * rotationSpeed;
      material.uniforms.uTime.value = time;
      material.uniforms.uRotCos.value = Math.cos(time * 0.3);
      material.uniforms.uRotSin.value = Math.sin(time * 0.3);
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onResize = () => {
      const nw = container.clientWidth, nh = container.clientHeight;
      renderer.setSize(nw, nh);
      material.uniforms.uResolution.value.set(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      renderer.forceContextLoss();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      material.dispose();
    };
  }, [topColor, bottomColor, intensity, rotationSpeed, pillarWidth, pillarHeight]);

  return <div ref={containerRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} />;
}
