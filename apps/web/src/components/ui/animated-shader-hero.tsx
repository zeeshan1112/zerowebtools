import React, { useRef, useEffect } from 'react';

// Set the active design theme for the hero background, titles, and CTA buttons here
// Options: 'platinum' | 'amber' | 'cosmic'
export const ACTIVE_HERO_THEME = 'amber' as 'platinum' | 'amber' | 'cosmic';

// Types for component props
interface HeroProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
    };
  };
  className?: string;
}

// Reusable Shader Background Hook
const useShaderBackground = (activeSource: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const pointersRef = useRef<PointerHandler | null>(null);

  // WebGL Renderer class
  class WebGLRenderer {
    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram | null = null;
    private vs: WebGLShader | null = null;
    private fs: WebGLShader | null = null;
    private buffer: WebGLBuffer | null = null;
    private scale: number;
    private shaderSource: string;
    private mouseMove = [0, 0];
    private mouseCoords = [0, 0];
    private pointerCoords = [0, 0];
    private nbrOfPointers = 0;

    private vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

    private vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

    constructor(canvas: HTMLCanvasElement, scale: number) {
      this.canvas = canvas;
      this.scale = scale;
      this.gl = canvas.getContext('webgl2')!;
      this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
      this.shaderSource = activeSource;
    }

    updateShader(source: string) {
      this.reset();
      this.shaderSource = source;
      this.setup();
      this.init();
    }

    updateMove(deltas: number[]) {
      this.mouseMove = deltas;
    }

    updateMouse(coords: number[]) {
      this.mouseCoords = coords;
    }

    updatePointerCoords(coords: number[]) {
      this.pointerCoords = coords;
    }

    updatePointerCount(nbr: number) {
      this.nbrOfPointers = nbr;
    }

    updateScale(scale: number) {
      this.scale = scale;
      this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
    }

    compile(shader: WebGLShader, source: string) {
      const gl = this.gl;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        console.error('Shader compilation error:', error);
      }
    }

    test(source: string) {
      let result = null;
      const gl = this.gl;
      const shader = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        result = gl.getShaderInfoLog(shader);
      }
      gl.deleteShader(shader);
      return result;
    }

    reset() {
      const gl = this.gl;
      if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
        if (this.vs) {
          gl.detachShader(this.program, this.vs);
          gl.deleteShader(this.vs);
        }
        if (this.fs) {
          gl.detachShader(this.program, this.fs);
          gl.deleteShader(this.fs);
        }
        gl.deleteProgram(this.program);
      }
    }

    setup() {
      const gl = this.gl;
      this.vs = gl.createShader(gl.VERTEX_SHADER)!;
      this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
      this.compile(this.vs, this.vertexSrc);
      this.compile(this.fs, this.shaderSource);
      this.program = gl.createProgram()!;
      gl.attachShader(this.program, this.vs);
      gl.attachShader(this.program, this.fs);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(this.program));
      }
    }

    init() {
      const gl = this.gl;
      const program = this.program!;
      
      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      (program as any).resolution = gl.getUniformLocation(program, 'resolution');
      (program as any).time = gl.getUniformLocation(program, 'time');
      (program as any).move = gl.getUniformLocation(program, 'move');
      (program as any).touch = gl.getUniformLocation(program, 'touch');
      (program as any).pointerCount = gl.getUniformLocation(program, 'pointerCount');
      (program as any).pointers = gl.getUniformLocation(program, 'pointers');
    }

    render(now = 0) {
      const gl = this.gl;
      const program = this.program;
      
      if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      
      gl.uniform2f((program as any).resolution, this.canvas.width, this.canvas.height);
      gl.uniform1f((program as any).time, now * 1e-3);
      gl.uniform2f((program as any).move, this.mouseMove[0], this.mouseMove[1]);
      gl.uniform2f((program as any).touch, this.mouseCoords[0], this.mouseCoords[1]);
      gl.uniform1i((program as any).pointerCount, this.nbrOfPointers);
      gl.uniform2fv((program as any).pointers, this.pointerCoords);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  }

  // Pointer Handler class
  class PointerHandler {
    private scale: number;
    private active = false;
    private pointers = new Map<number, number[]>();
    private lastCoords = [0, 0];
    private moves = [0, 0];

    constructor(element: HTMLCanvasElement, scale: number) {
      this.scale = scale;
      
      const map = (element: HTMLCanvasElement, scale: number, x: number, y: number) => 
        [x * scale, element.height - y * scale];

      element.addEventListener('pointerdown', (e) => {
        this.active = true;
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
      });

      element.addEventListener('pointerup', (e) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointerleave', (e) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointermove', (e) => {
        if (!this.active) return;
        this.lastCoords = [e.clientX, e.clientY];
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
        this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
      });
    }

    getScale() {
      return this.scale;
    }

    updateScale(scale: number) {
      this.scale = scale;
    }

    get count() {
      return this.pointers.size;
    }

    get move() {
      return this.moves;
    }

    get coords() {
      return this.pointers.size > 0 
        ? Array.from(this.pointers.values()).flat() 
        : [0, 0];
    }

    get first() {
      return this.pointers.values().next().value || this.lastCoords;
    }
  }

  const resize = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    if (rendererRef.current) {
      rendererRef.current.updateScale(dpr);
    }
  };

  const loop = (now: number) => {
    if (!rendererRef.current || !pointersRef.current) return;
    
    rendererRef.current.updateMouse(pointersRef.current.first);
    rendererRef.current.updatePointerCount(pointersRef.current.count);
    rendererRef.current.updatePointerCoords(pointersRef.current.coords);
    rendererRef.current.updateMove(pointersRef.current.move);
    rendererRef.current.render(now);
    animationFrameRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    rendererRef.current = new WebGLRenderer(canvas, dpr);
    pointersRef.current = new PointerHandler(canvas, dpr);
    
    rendererRef.current.setup();
    rendererRef.current.init();
    
    resize();
    
    // Compile the initial activeSource value dynamically on mount
    rendererRef.current.updateShader(activeSource);
    
    loop(0);
    
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.reset();
      }
    };
  }, []);

  // Hot-swap shader source when activeSource updates
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.updateShader(activeSource);
    }
  }, [activeSource]);

  return canvasRef;
};

// Reusable Hero Component
const Hero: React.FC<HeroProps> = ({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = ""
}) => {
  const activeTheme = ACTIVE_HERO_THEME;
  
  const activeSource = 
    activeTheme === 'platinum' ? PLATINUM_SHADER_SOURCE : 
    activeTheme === 'amber' ? AMBER_SHADER_SOURCE : 
    COSMIC_SHADER_SOURCE;

  const canvasRef = useShaderBackground(activeSource);

  // Helper to split the trust badge text into glowing segments dynamically
  let privacyText = "";
  let toolsText = "";

  if (trustBadge) {
    const text = trustBadge.text;
    if (text.includes(" • ")) {
      const parts = text.split(" • ");
      privacyText = parts[0];
      toolsText = parts[1];
    } else if (text.includes("•")) {
      const parts = text.split("•");
      privacyText = parts[0].trim();
      toolsText = parts[1].trim();
    } else {
      privacyText = text;
    }
  }

  // Dynamic button styles matching the active theme code settings
  const getButtonStyles = () => {
    switch (activeTheme) {
      case 'amber':
        return {
          primary: "px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-2 justify-center group",
          secondary: "px-6 py-3.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/30 hover:border-orange-300/50 text-orange-100 font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 backdrop-blur-sm cursor-pointer"
        };
      case 'cosmic':
        return {
          primary: "px-6 py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-600 hover:to-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:shadow-fuchsia-500/25 transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-2 justify-center group",
          secondary: "px-6 py-3.5 rounded-xl bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border border-fuchsia-300/30 hover:border-fuchsia-300/50 text-fuchsia-100 font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 backdrop-blur-sm cursor-pointer"
        };
      case 'platinum':
      default:
        return {
          primary: "px-6 py-3.5 rounded-xl bg-gradient-to-r from-zinc-200 to-white hover:from-zinc-300 hover:to-zinc-100 text-black font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:shadow-white/25 transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-2 justify-center group",
          secondary: "px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 backdrop-blur-sm cursor-pointer"
        };
    }
  };

  const buttonStyles = getButtonStyles();

  return (
    <div className={`relative w-full min-h-[40vh] md:min-h-[380px] flex flex-col justify-center pt-12 md:pt-14 pb-12 md:pb-14 border-b border-zinc-800 select-none overflow-hidden bg-black text-white transition-all duration-300 ${className}`}>
      
      {/* High-Contrast Monochromatic WebGL Canvas Backdrop */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover touch-none pointer-events-none opacity-[0.80]"
      />

      {/* CSS Dot Grid Overlay for scale depth */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", 
          backgroundSize: "24px 24px" 
        }} 
      />

      {/* Hero Content Overlay */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          {/* High-Contrast Segmented Trust Badge */}
          {trustBadge && (
            <div className="flex justify-center animate-fade-in-down">
              <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md text-[10px] font-bold tracking-wider select-none shadow-2xl">
                
                {/* Segment 1: Privacy Highlight with Pulse Ring */}
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full font-extrabold uppercase">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  {privacyText}
                </span>

                {/* Segment 2: Tools Count Indicator */}
                {toolsText && (
                  <span className="flex items-center gap-1 px-3 py-1.5 text-zinc-300 font-semibold uppercase">
                    {toolsText}
                  </span>
                )}
                
              </div>
            </div>
          )}

          {/* Main Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              {headline.line1}{' '}
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r transition-all duration-500 ${
                  activeTheme === 'platinum'
                    ? 'from-zinc-400 via-zinc-200 to-white'
                    : activeTheme === 'amber'
                    ? 'from-orange-300 via-yellow-400 to-amber-300'
                    : 'from-fuchsia-400 via-purple-400 to-indigo-300'
                }`}
              >
                {headline.line2}
              </span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className="max-w-2xl mx-auto">
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-medium">
              {subtitle}
            </p>
          </div>
          
          {/* CTA Buttons */}
          {buttons && (
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              {buttons.primary && (
                <button 
                  onClick={buttons.primary.onClick}
                  className={buttonStyles.primary}
                >
                  {buttons.primary.text}
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    className="text-zinc-700 hover:text-black group-hover:translate-y-0.5 transition-all duration-300"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              )}
              {buttons.secondary && (
                <button 
                  onClick={buttons.secondary.onClick}
                  className={buttonStyles.secondary}
                >
                  {buttons.secondary.text}
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Shader Strings
const PLATINUM_SHADER_SOURCE = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}
void main(void) {
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.3,-st.y));
	uv*=1.-.2*(sin(T*.1)*.5+.5);
	for (float i=1.; i<12.; i++) {
		uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.3+.1*uv.x);
		vec2 p=uv;
		float d=length(p);
		vec3 starColor = vec3(1.0, 1.0, 1.08); 
		col += 0.0018 / d * starColor;
		float b=noise(i+p+bg*1.731);
		col += 0.0022 * b / length(max(p, vec2(b * p.x * 0.02, p.y)));
		col = mix(col, vec3(bg * 0.08, bg * 0.08, bg * 0.09), d);
	}
	O=vec4(col,1);
}`;

const AMBER_SHADER_SOURCE = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}
void main(void) {
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.5,-st.y));
	uv*=1.-.3*(sin(T*.2)*.5+.5);
	for (float i=1.; i<12.; i++) {
		uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
		vec2 p=uv;
		float d=length(p);
		col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
		float b=noise(i+p+bg*1.731);
		col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
		col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
	}
	O=vec4(col,1);
}`;

const COSMIC_SHADER_SOURCE = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}
void main(void) {
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.3,-st.y));
	uv*=1.-.2*(sin(T*.1)*.5+.5);
	for (float i=1.; i<12.; i++) {
		uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.3+.1*uv.x);
		vec2 p=uv;
		float d=length(p);
		// Vibrant Cosmic Purple / Fuchsia / Magenta galaxy glow
		vec3 starColor = cos(sin(i) * vec3(1.4, 0.9, 2.6)) * 0.5 + 0.5;
		col += 0.0016 / d * (starColor + vec3(0.24, 0.08, 0.32));
		float b=noise(i+p+bg*1.731);
		col += 0.0022 * b / length(max(p, vec2(b * p.x * 0.02, p.y)));
		col = mix(col, vec3(bg * 0.14, bg * 0.02, bg * 0.18), d); // Deep electric purple nebula space dust
	}
	O=vec4(col,1);
}`;

export default Hero;
