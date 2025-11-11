"use client";
import React from "react";
import { IconMailFilled } from "@tabler/icons-react";
import { useId } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "./button";

export function ContactFormGridWithDetails() {
  return (
    <div className="mx-auto flex w-full max-w-4xl justify-center px-4 py-10 md:px-6 md:py-20">
      <div className="relative flex flex-col items-center overflow-hidden">
        <div className="flex items-start justify-start">
          <FeatureIconContainer className="flex items-center justify-center overflow-hidden">
            <IconMailFilled className="h-6 w-6 text-blue-500" />
          </FeatureIconContainer>
        </div>
        <Button
          as={Link}
          href="https://form.ramiroamorim.com.br/r/formulario"
          variant="primary"
          className="mb-6 px-8 h-14 rounded-full flex items-center justify-center whitespace-nowrap"
        >
          Me aplicar a uma vaga!
        </Button>
        
        <h2 className="mt-9 bg-gradient-to-b from-neutral-800 to-neutral-900 bg-clip-text text-center text-xl font-bold text-transparent md:text-3xl lg:text-5xl dark:from-neutral-200 dark:to-neutral-300">
          Nossa Localização
        </h2>
        <p className="mt-8 max-w-lg text-center text-base text-neutral-600 dark:text-neutral-400">
         Aqui você pode entrar em contato comigo Ramiro Amorim
         diretamente com minha empresa RG Digital & Software LTDA
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 md:flex-row">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            contato@ramiroglobal.com
          </p>

          <div className="h-1 w-1 rounded-full bg-neutral-500 dark:bg-neutral-400" />
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            +55 (11) 4210-6226
          </p>
          <div className="h-1 w-1 rounded-full bg-neutral-500 dark:bg-neutral-400" />

          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            São Paulo, Brasil
          </p>
        </div>
        <div className="relative mt-20 flex w-[600px] flex-shrink-0 items-center justify-center [perspective:800px] [transform-style:preserve-3d]">
          <Pin className="top-[29%] left-[6%]" />

          <Image
            src="https://assets.aceternity.com/pro/world.svg"
            width={500}
            height={500}
            alt="world map"
            className="[transform:rotateX(45deg)_translateZ(0px)] dark:invert dark:filter"
          />
        </div>
      </div>
    </div>
  );
}

const Pin = ({ className }: { className?: string }) => {
  return (
    <motion.div
      style={{ transform: "translateZ(1px)" }}
      className={cn(
        "pointer-events-none absolute z-[70] flex h-40 w-96 items-center justify-center opacity-100 transition duration-500",
        className,
      )}
    >
      <div className="h-full w-full">
        <div className="absolute inset-x-0 top-0 z-20 mx-auto inline-block w-fit rounded-lg bg-neutral-200 px-2 py-1 text-xs font-normal text-neutral-700 dark:bg-neutral-800 dark:text-white">
          Estamos aqui - São Paulo
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-blue-400/0 via-blue-400/90 to-blue-400/0 transition-opacity duration-500"></span>
        </div>

        <div
          style={{
            perspective: "800px",
            transform: "rotateX(70deg) translateZ(0px)",
          }}
          className="absolute top-[40%] left-[40%] mt-4 ml-[0.09375rem] -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] dark:bg-sky-500/[0.2]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
              className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] dark:bg-sky-500/[0.2]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.3 }}
              className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] dark:bg-sky-500/[0.2]"
            ></motion.div>
            
            {/* Mini satélites orbitando */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div 
                className="absolute top-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div 
                className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sky-300"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div 
                className="absolute top-0 left-1/2 h-0.5 w-0.5 -translate-x-1/2 rounded-full bg-blue-200"
                animate={{ opacity: [0.1, 0.6, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            {/* Setas apontando para pontos específicos */}
            {/* Seta para Rio de Janeiro (direita) */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                x: [0, 50, 50, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <svg width="20" height="8" viewBox="0 0 20 8" className="text-blue-400">
                <path d="M0 4L16 4M16 4L12 1M16 4L12 7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </motion.div>

            {/* Seta para Brasília (nordeste) */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                x: [0, 35, 35, 0],
                y: [0, -35, -35, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ rotate: "-45deg" }}
            >
              <svg width="20" height="8" viewBox="0 0 20 8" className="text-sky-400">
                <path d="M0 4L16 4M16 4L12 1M16 4L12 7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </motion.div>

            {/* Seta para Sul (sudeste) */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                x: [0, 25, 25, 0],
                y: [0, 40, 40, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ rotate: "45deg" }}
            >
              <svg width="20" height="8" viewBox="0 0 20 8" className="text-blue-300">
                <path d="M0 4L16 4M16 4L12 1M16 4L12 7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </motion.div>

            {/* Seta para Norte */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                y: [0, -45, -45, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ rotate: "-90deg" }}
            >
              <svg width="20" height="8" viewBox="0 0 20 8" className="text-cyan-400">
                <path d="M0 4L16 4M16 4L12 1M16 4L12 7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </motion.div>
          </>
        </div>

      </div>
    </motion.div>
  );
};

export const FeatureIconContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative h-14 w-14 rounded-md bg-gradient-to-b from-gray-50 to-neutral-200 p-[4px] dark:from-neutral-800 dark:to-neutral-950",
        className,
      )}
    >
      <div
        className={cn(
          "relative z-20 h-full w-full rounded-[5px] bg-gray-50 dark:bg-neutral-800",
          className,
        )}
      >
        {children}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-30 mx-auto h-4 w-full rounded-full bg-neutral-600 opacity-50 blur-lg"></div>
      <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-[60%] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-[60%] bg-gradient-to-r from-transparent via-blue-600 to-transparent dark:h-[8px] dark:blur-sm"></div>
    </div>
  );
};

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: Array<[number, number]>;
  size?: number;
}) => {
  const p: Array<[number, number]> = pattern ?? [
    [10, 3],
    [8, 5],
    [9, 2],
    [7, 4],
    [8, 6],
  ];
  return (
    <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/30 to-zinc-900/30 opacity-10 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 dark:to-zinc-900/30">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full fill-black/100 stroke-black/100 mix-blend-overlay dark:fill-white/100 dark:stroke-white/100"
        />
      </div>
    </div>
  );
};

export function GridPattern({ 
  width = 20, 
  height = 20, 
  x = "0", 
  y = "0", 
  squares, 
  ...props 
}: {
  width?: number;
  height?: number;
  x?: string | number;
  y?: string | number;
  squares?: Array<[number, number]>;
  className?: string;
  [key: string]: any;
}) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && squares.length > 0 && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([squareX, squareY]: [number, number], idx: number) => (
            <rect
              strokeWidth="0"
              key={`${squareX}-${squareY}-${idx}`}
              width={(width || 20) + 1}
              height={(height || 20) + 1}
              x={squareX * (width || 20)}
              y={squareY * (height || 20)}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}