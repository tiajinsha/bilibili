import{s as k,t as E,W as B,u as b,U as H,v as y,V as h,M as P,w as z,x as c,y as S,i as _,N as D,z as U,c as I,A as O,G as L,b as N,H as x,I as j,J as G,K as V,X as K,Y as q,Z}from"./index.ce3b3605.js";/**
 * postprocessing v6.27.0 build Fri May 27 2022
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2022 Raoul van Rüschen
 * @license Zlib
 */var Y="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",F={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5},X=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <encodings_fragment>
}`,$="uniform vec4 texelSize;uniform float kernel;uniform vec2 scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale.x*scale.y;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",J=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],Q=class extends z{constructor(e=new S){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new c(null),texelSize:new c(new S),scale:new c(new _(1,1)),kernel:new c(0)},blending:D,depthWrite:!1,depthTest:!1,fragmentShader:X,vertexShader:$}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernelSize=F.MEDIUM}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.inputBuffer=e}get kernelSequence(){return J[this.kernelSize]}set resolutionScale(e){this.uniforms.scale.value.x=e}get scale(){return this.uniforms.scale.value.y}set scale(e){this.uniforms.scale.value.y=e}getScale(){return this.uniforms.scale.value}setScale(e){this.uniforms.scale.value=e}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(e){this.uniforms.kernel.value=e}setKernel(e){this.kernel=e}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t,e*.5,t*.5)}setSize(e,t){const r=1/e,i=1/t;this.uniforms.texelSize.value.set(r,i,r*.5,i*.5)}},ee=`#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <encodings_fragment>
#include <dithering_fragment>
}`,te=class extends z{constructor(){super({name:"CopyMaterial",uniforms:{inputBuffer:new c(null),opacity:new c(1)},blending:D,depthWrite:!1,depthTest:!1,fragmentShader:ee,vertexShader:Y}),this.toneMapped=!1}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}getOpacity(e){return this.uniforms.opacity.value}setOpacity(e){this.uniforms.opacity.value=e}},re=new k,l=null;function ie(){if(l===null){const e=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),t=new Float32Array([0,0,2,0,0,2]);l=new N,l.setAttribute!==void 0?(l.setAttribute("position",new x(e,3)),l.setAttribute("uv",new x(t,2))):(l.addAttribute("position",new x(e,3)),l.addAttribute("uv",new x(t,2)))}return l}var se=class{constructor(e="Pass",t=new U,r=re){this.name=e,this.renderer=null,this.scene=t,this.camera=r,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){const t=this.getFullscreenMaterial();t!==null&&(t.needsUpdate=!0),this.rtt=!e}}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let t=this.screen;t!==null?t.material=e:(t=new I(ie(),e),t.frustumCulled=!1,this.scene===null&&(this.scene=new U),this.scene.add(t),this.screen=t)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,t=O){}render(e,t,r,i,s){throw new Error("Render method not implemented!")}setSize(e,t){}initialize(e,t,r){}dispose(){for(const e of Object.keys(this)){const t=this[e];if(t!==null&&typeof t.dispose=="function"){if(t instanceof U||t===this.renderer)continue;this[e].dispose()}}}};new E;var o=-1,w=class extends L{constructor(e,t=o,r=o,i=1){super(),this.resizable=e,this.base=new _(1,1),this.preferred=new _(t,r),this.target=this.preferred,this.s=i}get width(){const{base:e,preferred:t,scale:r}=this;let i;return t.width!==o?i=t.width:t.height!==o?i=Math.round(t.height*(e.width/Math.max(e.height,1))):i=Math.round(e.width*r),i}set width(e){this.preferredWidth=e}get height(){const{base:e,preferred:t,scale:r}=this;let i;return t.height!==o?i=t.height:t.width!==o?i=Math.round(t.width/Math.max(e.width/Math.max(e.height,1),1)):i=Math.round(e.height*r),i}set height(e){this.preferredHeight=e}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(e){this.s!==e&&(this.s=e,this.preferred.setScalar(o),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}getScale(){return this.scale}setScale(e){this.scale=e}get baseWidth(){return this.base.width}set baseWidth(e){this.base.width!==e&&(this.base.width=e,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}getBaseWidth(){return this.base.width}setBaseWidth(e){this.base.width!==e&&(this.base.width=e,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}get baseHeight(){return this.base.height}set baseHeight(e){this.base.height!==e&&(this.base.height=e,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}getBaseHeight(){return this.baseHeight}setBaseHeight(e){this.baseHeight=e}setBaseSize(e,t){(this.base.width!==e||this.base.height!==t)&&(this.base.set(e,t),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}get preferredWidth(){return this.preferred.width}set preferredWidth(e){this.preferred.width!==e&&(this.preferred.width=e,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(e){this.preferredWidth=e}get preferredHeight(){return this.preferred.height}set preferredHeight(e){this.preferred.height!==e&&(this.preferred.height=e,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(e){this.preferredHeight=e}setPreferredSize(e,t){(this.preferred.width!==e||this.preferred.height!==t)&&(this.preferred.set(e,t),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}copy(e){this.base.set(e.getBaseWidth(),e.getBaseHeight()),this.preferred.set(e.getPreferredWidth(),e.getPreferredHeight()),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height)}static get AUTO_SIZE(){return o}},ae=class extends se{constructor({kernelSize:e=F.MEDIUM,resolutionScale:t=.5,width:r=w.AUTO_SIZE,height:i=w.AUTO_SIZE,resolutionX:s=r,resolutionY:a=i}={}){super("KawaseBlurPass"),this.renderTargetA=new B(1,1,{minFilter:b,magFilter:b,stencilBuffer:!1,depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const n=this.resolution=new w(this,s,a,t);n.addEventListener("change",m=>this.setSize(n.baseWidth,n.baseHeight)),this.blurMaterial=new Q,this.copyMaterial=new te}getResolution(){return this.resolution}get dithering(){return this.copyMaterial.dithering}set dithering(e){this.copyMaterial.dithering=e}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(e){this.blurMaterial.kernelSize=e}get width(){return this.resolution.width}set width(e){this.resolution.preferredWidth=e}get height(){return this.resolution.height}set height(e){this.resolution.preferredHeight=e}get scale(){return this.blurMaterial.scale}set scale(e){this.blurMaterial.scale=e}getScale(){return this.blurMaterial.scale}setScale(e){this.blurMaterial.scale=e}getKernelSize(){return this.kernelSize}setKernelSize(e){this.kernelSize=e}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}render(e,t,r,i,s){const a=this.scene,n=this.camera,m=this.renderTargetA,p=this.renderTargetB,u=this.blurMaterial,g=u.kernelSequence;let d=t;this.fullscreenMaterial=u;for(let f=0,M=g.length;f<M;++f){const v=(f&1)===0?m:p;u.kernel=g[f],u.inputBuffer=d.texture,e.setRenderTarget(v),e.render(a,n),d=v}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=d.texture,e.setRenderTarget(this.renderToScreen?null:r),e.render(a,n)}setSize(e,t){const r=this.resolution;r.setBaseSize(e,t);const i=r.width,s=r.height;this.renderTargetA.setSize(i,s),this.renderTargetB.setSize(i,s),this.blurMaterial.setSize(i,s),this.blurMaterial.resolutionScale=r.scale}initialize(e,t,r){r!==void 0&&(this.renderTargetA.texture.type=r,this.renderTargetB.texture.type=r,r!==H?this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":e.outputEncoding===y&&(this.renderTargetA.texture.encoding=y,this.renderTargetB.texture.encoding=y))}static get AUTO_SIZE(){return w.AUTO_SIZE}};new h;new P;new E;new h;new h;class he extends j{constructor(t,r,i,s,{mixBlur:a=0,mixStrength:n=1,resolution:m=256,blur:p=[0,0],minDepthThreshold:u=.9,maxDepthThreshold:g=1,depthScale:d=0,depthToBlurRatioBias:f=.25,mirror:M=0,distortion:v=1,mixContrast:A=1,distortionMap:T,reflectorOffset:R=0,bufferSamples:W=8,planeNormal:C=new h(0,0,1)}={}){super(),this.gl=t,this.camera=r,this.scene=i,this.parent=s,this.hasBlur=p[0]+p[1]>0,this.reflectorPlane=new G,this.normal=new h,this.reflectorWorldPosition=new h,this.cameraWorldPosition=new h,this.rotationMatrix=new P,this.lookAtPosition=new h(0,-1,0),this.clipPlane=new S,this.view=new h,this.target=new h,this.q=new S,this.textureMatrix=new P,this.virtualCamera=new V,this.reflectorOffset=R,this.planeNormal=C,this.setupBuffers(m,p,W),this.reflectorProps={mirror:M,textureMatrix:this.textureMatrix,mixBlur:a,tDiffuse:this.fbo1.texture,tDepth:this.fbo1.depthTexture,tDiffuseBlur:this.fbo2.texture,hasBlur:this.hasBlur,mixStrength:n,minDepthThreshold:u,maxDepthThreshold:g,depthScale:d,depthToBlurRatioBias:f,distortion:v,distortionMap:T,mixContrast:A,"defines-USE_BLUR":this.hasBlur?"":void 0,"defines-USE_DEPTH":d>0?"":void 0,"defines-USE_DISTORTION":T?"":void 0}}setupBuffers(t,r,i){const s={minFilter:b,magFilter:b,encoding:this.gl.outputEncoding},a=new B(t,t,s);a.depthBuffer=!0,a.depthTexture=new K(t,t),a.depthTexture.format=q,a.depthTexture.type=Z;const n=new B(t,t,s);this.gl.capabilities.isWebGL2&&(a.samples=i),this.fbo1=a,this.fbo2=n,this.kawaseBlurPass=new ae,this.kawaseBlurPass.setSize(r[0],r[1])}beforeRender(){if(!this.parent||(this.reflectorWorldPosition.setFromMatrixPosition(this.parent.matrixWorld),this.cameraWorldPosition.setFromMatrixPosition(this.camera.matrixWorld),this.rotationMatrix.extractRotation(this.parent.matrixWorld),this.normal.copy(this.planeNormal),this.normal.applyMatrix4(this.rotationMatrix),this.reflectorWorldPosition.addScaledVector(this.normal,this.reflectorOffset),this.view.subVectors(this.reflectorWorldPosition,this.cameraWorldPosition),this.view.dot(this.normal)>0))return;this.view.reflect(this.normal).negate(),this.view.add(this.reflectorWorldPosition),this.rotationMatrix.extractRotation(this.camera.matrixWorld),this.lookAtPosition.set(0,0,-1),this.lookAtPosition.applyMatrix4(this.rotationMatrix),this.lookAtPosition.add(this.cameraWorldPosition),this.target.subVectors(this.reflectorWorldPosition,this.lookAtPosition),this.target.reflect(this.normal).negate(),this.target.add(this.reflectorWorldPosition),this.virtualCamera.position.copy(this.view),this.virtualCamera.up.set(0,1,0),this.virtualCamera.up.applyMatrix4(this.rotationMatrix),this.virtualCamera.up.reflect(this.normal),this.virtualCamera.lookAt(this.target),this.virtualCamera.far=this.camera.far,this.virtualCamera.updateMatrixWorld(),this.virtualCamera.projectionMatrix.copy(this.camera.projectionMatrix),this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.virtualCamera.projectionMatrix),this.textureMatrix.multiply(this.virtualCamera.matrixWorldInverse),this.textureMatrix.multiply(this.parent.matrixWorld),this.reflectorPlane.setFromNormalAndCoplanarPoint(this.normal,this.reflectorWorldPosition),this.reflectorPlane.applyMatrix4(this.virtualCamera.matrixWorldInverse),this.clipPlane.set(this.reflectorPlane.normal.x,this.reflectorPlane.normal.y,this.reflectorPlane.normal.z,this.reflectorPlane.constant);const t=this.virtualCamera.projectionMatrix;this.q.x=(Math.sign(this.clipPlane.x)+t.elements[8])/t.elements[0],this.q.y=(Math.sign(this.clipPlane.y)+t.elements[9])/t.elements[5],this.q.z=-1,this.q.w=(1+t.elements[10])/t.elements[14],this.clipPlane.multiplyScalar(2/this.clipPlane.dot(this.q)),t.elements[2]=this.clipPlane.x,t.elements[6]=this.clipPlane.y,t.elements[10]=this.clipPlane.z+1,t.elements[14]=this.clipPlane.w}update(){if(this.parent.material!==this)return;this.parent.visible=!1;const t=this.gl.xr.enabled,r=this.gl.shadowMap.autoUpdate;this.beforeRender(),this.gl.xr.enabled=!1,this.gl.shadowMap.autoUpdate=!1,this.gl.setRenderTarget(this.fbo1),this.gl.state.buffers.depth.setMask(!0),this.gl.autoClear||this.gl.clear(),this.gl.render(this.scene,this.virtualCamera),this.hasBlur&&this.kawaseBlurPass.render(this.gl,this.fbo1,this.fbo2),this.gl.xr.enabled=t,this.gl.shadowMap.autoUpdate=r,this.parent.visible=!0,this.gl.setRenderTarget(null)}onBeforeCompile(t,...r){super.onBeforeCompile(t,...r),this.defines===void 0&&(this.defines={}),this.defines.USE_UV||(this.defines.USE_UV=""),this.reflectorProps["defines-USE_BLUR"]!==void 0&&(this.defines.USE_BLUR=""),this.reflectorProps["defines-USE_DEPTH"]!==void 0&&(this.defines.USE_DEPTH=""),this.reflectorProps["defines-USE_DISTORTION"]!==void 0&&(this.defines.USE_DISTORTION="");let i=this.reflectorProps;for(let s in i)t.uniforms[s]={get value(){return i[s]}};t.vertexShader=`
              uniform mat4 textureMatrix;
              varying vec4 my_vUv;     
            ${t.vertexShader}`,t.vertexShader=t.vertexShader.replace("#include <project_vertex>",`
            #include <project_vertex>
            my_vUv = textureMatrix * vec4( position, 1.0 );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            `),t.fragmentShader=`
              uniform sampler2D tDiffuse;
              uniform sampler2D tDiffuseBlur;
              uniform sampler2D tDepth;
              uniform sampler2D distortionMap;
              uniform float distortion;
              uniform float cameraNear;
              uniform float cameraFar;
              uniform bool hasBlur;
              uniform float mixBlur;
              uniform float mirror;
              uniform float mixStrength;
              uniform float minDepthThreshold;
              uniform float maxDepthThreshold;
              uniform float mixContrast;
              uniform float depthScale;
              uniform float depthToBlurRatioBias;
              varying vec4 my_vUv;        
              ${t.fragmentShader}`,t.fragmentShader=t.fragmentShader.replace("#include <emissivemap_fragment>",`
            #include <emissivemap_fragment>
          
            float distortionFactor = 0.0;
            #ifdef USE_DISTORTION
              distortionFactor = texture2D(distortionMap, vUv).r * distortion;
            #endif
      
            vec4 new_vUv = my_vUv;
            new_vUv.x += distortionFactor;
            new_vUv.y += distortionFactor;
      
            vec4 base = texture2DProj(tDiffuse, new_vUv);
            vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);
            
            vec4 merge = base;
            
            #ifdef USE_NORMALMAP
              vec2 normal_uv = vec2(0.0);
              vec4 normalColor = texture2D(normalMap, vUv);
              vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
              vec3 coord = new_vUv.xyz / new_vUv.w;
              normal_uv = coord.xy + coord.z * my_normal.xz * 0.05 * normalScale;
              vec4 base_normal = texture2D(tDiffuse, normal_uv);
              vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
              merge = base_normal;
              blur = blur_normal;
            #endif
      
            float depthFactor = 0.0001;
            float blurFactor = 0.0;
      
            #ifdef USE_DEPTH
              vec4 depth = texture2DProj(tDepth, new_vUv);
              depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
              depthFactor *= depthScale;
              depthFactor = max(0.0001, min(1.0, depthFactor));
      
              #ifdef USE_BLUR
                blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
                merge = merge * min(1.0, depthFactor + 0.5);
              #else
                merge = merge * depthFactor;
              #endif
        
            #endif
      
            float reflectorRoughnessFactor = roughness;
            #ifdef USE_ROUGHNESSMAP
              vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
              
              reflectorRoughnessFactor *= reflectorTexelRoughness.g;
            #endif
            
            #ifdef USE_BLUR
              blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
              merge = mix(merge, blur, blurFactor);
            #endif
      
            vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
            newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
            newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
            newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;
            
            diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
            `)}}export{he as default};
