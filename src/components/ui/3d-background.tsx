"use client";

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scale: number;
  color: string;
  shape: 'cube' | 'sphere' | 'pyramid' | 'octahedron';
  speed: number;
}

export function Animated3DBackground({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<FloatingShape[]>([]);
  const animationRef = useRef<number>();
  const { theme } = useTheme();

  // Generate random floating shapes
  useEffect(() => {
    const shapes: FloatingShape[] = [];
    const colors = theme === 'dark' ? [
      'rgba(59, 130, 246, 0.1)', // blue
      'rgba(147, 51, 234, 0.1)', // purple
      'rgba(236, 72, 153, 0.1)', // pink
      'rgba(34, 197, 94, 0.1)',  // green
      'rgba(251, 146, 60, 0.1)', // orange
      'rgba(99, 102, 241, 0.1)', // indigo
    ] : [
      'rgba(59, 130, 246, 0.05)', // blue
      'rgba(147, 51, 234, 0.05)', // purple
      'rgba(236, 72, 153, 0.05)', // pink
      'rgba(34, 197, 94, 0.05)',  // green
      'rgba(251, 146, 60, 0.05)', // orange
      'rgba(99, 102, 241, 0.05)', // indigo
    ];
    const shapeTypes: FloatingShape['shape'][] = ['cube', 'sphere', 'pyramid', 'octahedron'];

    for (let i = 0; i < 20; i++) {
      shapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 200 - 100,
        rotationX: Math.random() * 360,
        rotationY: Math.random() * 360,
        rotationZ: Math.random() * 360,
        scale: 0.5 + Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        speed: 0.5 + Math.random() * 1.5,
      });
    }
    shapesRef.current = shapes;
  }, [theme]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      shapesRef.current = shapesRef.current.map(shape => ({
        ...shape,
        rotationX: shape.rotationX + shape.speed,
        rotationY: shape.rotationY + shape.speed * 0.7,
        rotationZ: shape.rotationZ + shape.speed * 0.3,
        y: (shape.y + shape.speed * 0.1) % 100,
        x: (shape.x + shape.speed * 0.05) % 100,
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const renderShape = (shape: FloatingShape) => {
    const style = {
      position: 'absolute' as const,
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      transform: `
        translateZ(${shape.z}px) 
        rotateX(${shape.rotationX}deg) 
        rotateY(${shape.rotationY}deg) 
        rotateZ(${shape.rotationZ}deg) 
        scale(${shape.scale})
      `,
      transformStyle: 'preserve-3d' as const,
    };

    switch (shape.shape) {
      case 'cube':
        return (
          <div
            key={shape.id}
            style={style}
            className="w-8 h-8 animate-pulse"
          >
            <div
              className="w-full h-full relative"
              style={{
                transformStyle: 'preserve-3d',
                animation: 'rotate3d 20s infinite linear',
              }}
            >
              {/* Cube faces */}
              {[
                { transform: 'translateZ(16px)', background: shape.color },
                { transform: 'rotateY(90deg) translateZ(16px)', background: shape.color },
                { transform: 'rotateY(180deg) translateZ(16px)', background: shape.color },
                { transform: 'rotateY(-90deg) translateZ(16px)', background: shape.color },
                { transform: 'rotateX(90deg) translateZ(16px)', background: shape.color },
                { transform: 'rotateX(-90deg) translateZ(16px)', background: shape.color },
              ].map((face, index) => (
                <div
                  key={index}
                  className="absolute inset-0 rounded-sm"
                  style={{
                    ...face,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'sphere':
        return (
          <div
            key={shape.id}
            style={style}
            className="w-6 h-6 rounded-full animate-pulse"
          >
            <div
              className="w-full h-full rounded-full relative"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${shape.color}, transparent)`,
                boxShadow: `0 0 20px ${shape.color}`,
                animation: 'float 6s ease-in-out infinite',
              }}
            />
          </div>
        );

      case 'pyramid':
        return (
          <div
            key={shape.id}
            style={style}
            className="w-0 h-0 animate-pulse"
          >
            <div
              className="relative"
              style={{
                width: '32px',
                height: '32px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Pyramid faces */}
              {[
                { transform: 'rotateY(0deg) rotateX(60deg)', background: shape.color },
                { transform: 'rotateY(90deg) rotateX(60deg)', background: shape.color },
                { transform: 'rotateY(180deg) rotateX(60deg)', background: shape.color },
                { transform: 'rotateY(270deg) rotateX(60deg)', background: shape.color },
              ].map((face, index) => (
                <div
                  key={index}
                  className="absolute w-full h-full"
                  style={{
                    ...face,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'octahedron':
        return (
          <div
            key={shape.id}
            style={style}
            className="w-8 h-8 animate-pulse"
          >
            <div
              className="relative w-full h-full"
              style={{
                transformStyle: 'preserve-3d',
                animation: 'rotate3d 15s infinite linear',
              }}
            >
              {/* Octahedron faces */}
              {[
                { transform: 'rotateY(0deg) rotateX(60deg)', background: shape.color },
                { transform: 'rotateY(90deg) rotateX(60deg)', background: shape.color },
                { transform: 'rotateY(180deg) rotateX(60deg)', background: shape.color },
                { transform: 'rotateY(270deg) rotateX(60deg)', background: shape.color },
                { transform: 'rotateY(0deg) rotateX(-60deg)', background: shape.color },
                { transform: 'rotateY(90deg) rotateX(-60deg)', background: shape.color },
                { transform: 'rotateY(180deg) rotateX(-60deg)', background: shape.color },
                { transform: 'rotateY(270deg) rotateX(-60deg)', background: shape.color },
              ].map((face, index) => (
                <div
                  key={index}
                  className="absolute w-full h-full"
                  style={{
                    ...face,
                    clipPath: 'polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      style={{
        perspective: '1000px',
        perspectiveOrigin: 'center center',
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: theme === 'dark' ? `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)
            ` : `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)
            `,
            animation: 'gradientShift 20s ease-in-out infinite',
          }}
        />
      </div>

      {/* Floating 3D shapes */}
      <div className="absolute inset-0">
        {shapesRef.current.map(renderShape)}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes rotate3d {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
        
        @keyframes gradientShift {
          0%, 100% { 
            background: radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 50%);
          }
          25% { 
            background: radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
          }
          50% { 
            background: radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
          }
          75% { 
            background: radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
          }
        }
      `}</style>
    </div>
  );
}
