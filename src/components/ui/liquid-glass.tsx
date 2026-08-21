"use client";

import React from "react";

// Types
export interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  onClick?: () => void;
}

export interface DockIcon {
  src: string;
  alt: string;
  onClick?: () => void;
}

const glassEase = "cubic-bezier(0.175, 0.885, 0.32, 2.2)";

const layerRadius: React.CSSProperties = {
  borderRadius: "inherit",
};

// Glass Effect Wrapper Component
export const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  contentClassName = "",
  style = {},
  href,
  target,
  onClick,
}) => {
  const glassStyle: React.CSSProperties = {
    boxShadow: "0 6px 6px rgba(0, 0, 0, 0.08), 0 0 20px rgba(0, 0, 0, 0.06)",
    transitionTimingFunction: glassEase,
    ...style,
  };

  const content = (
    <div
      className={`relative flex cursor-pointer overflow-hidden font-semibold text-black transition-all duration-700 ${className}`}
      style={glassStyle}
      onClick={href ? undefined : onClick}
      role={!href && onClick ? "button" : undefined}
    >
      {/* Glass Layers */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          ...layerRadius,
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          ...layerRadius,
          background: "rgba(255, 255, 255, 0.25)",
        }}
      />
      <div
        className="absolute inset-0 z-20 overflow-hidden"
        style={{
          ...layerRadius,
          boxShadow:
            "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)",
        }}
      />

      {/* Content */}
      <div className={`relative z-30 ${contentClassName}`}>{children}</div>
    </div>
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="block"
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return content;
};

// Dock Component
export const GlassDock: React.FC<{ icons: DockIcon[]; href?: string }> = ({
  icons,
  href,
}) => (
  <GlassEffect
    href={href}
    className="rounded-3xl p-3 hover:rounded-4xl hover:p-4"
  >
    <div className="flex items-center justify-center gap-2 overflow-hidden rounded-3xl px-0.5 py-0">
      {icons.map((icon, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={index}
          src={icon.src}
          alt={icon.alt}
          className="h-16 w-16 cursor-pointer transition-all duration-700 hover:scale-110"
          style={{
            transformOrigin: "center center",
            transitionTimingFunction: glassEase,
          }}
          onClick={icon.onClick}
        />
      ))}
    </div>
  </GlassEffect>
);

// Button Component
export const GlassButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  className?: string;
  contentClassName?: string;
  target?: string;
  onClick?: () => void;
}> = ({
  children,
  href,
  className = "",
  contentClassName = "",
  target,
  onClick,
}) => (
  <GlassEffect
    href={href}
    target={target}
    onClick={onClick}
    className={`overflow-hidden rounded-full px-6 py-3 hover:px-7 hover:py-3.5 ${className}`}
    contentClassName={contentClassName}
  >
    <div
      className="transition-all duration-700 hover:scale-95"
      style={{ transitionTimingFunction: glassEase }}
    >
      {children}
    </div>
  </GlassEffect>
);

// SVG Filter Component — mount once near the root of the page
export const GlassFilter: React.FC = () => (
  <svg aria-hidden className="pointer-events-none absolute h-0 w-0" style={{ position: "absolute" }}>
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="200"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

// Demo Component (standalone showcase)
export const Component = () => {
  const dockIcons: DockIcon[] = [
    {
      src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=128&h=128&fit=crop",
      alt: "Notes",
    },
    {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop",
      alt: "Abstract",
    },
    {
      src: "https://images.unsplash.com/photo-1557683316-973673baf926?w=128&h=128&fit=crop",
      alt: "Gradient",
    },
    {
      src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=128&h=128&fit=crop",
      alt: "Color",
    },
    {
      src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=128&h=128&fit=crop",
      alt: "Soft",
    },
    {
      src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=128&h=128&fit=crop",
      alt: "Light",
    },
  ];

  return (
    <div
      className="relative flex h-full min-h-screen w-full items-center justify-center overflow-hidden font-light"
      style={{
        background: `url("https://images.unsplash.com/photo-1432251407527-504a6b4174a2?q=80&w=1480&auto=format&fit=crop") center center / cover`,
        animation: "moveBackground 60s linear infinite",
      }}
    >
      <GlassFilter />

      <div className="flex w-full flex-col items-center justify-center gap-6">
        <GlassDock icons={dockIcons} />

        <GlassButton href="#join" className="rounded-3xl px-10 py-6 hover:rounded-4xl hover:px-11 hover:py-7">
          <div className="text-xl text-white">
            <p>How can i help you today?</p>
          </div>
        </GlassButton>
      </div>
    </div>
  );
};

export default Component;
