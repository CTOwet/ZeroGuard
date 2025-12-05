import { useEffect, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, ISourceOptions } from '@tsparticles/engine';

export default function ParticlesBackground() {
    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        });
    }, []);

    const options: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: 'transparent',
                },
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: 'grab',
                    },
                },
                modes: {
                    grab: {
                        distance: 140,
                        links: {
                            opacity: 0.5,
                            color: '#00ff9d',
                        },
                    },
                },
            },
            particles: {
                color: {
                    value: ['#00ff9d', '#ff006e', '#8b5cf6'],
                },
                links: {
                    color: '#00ff9d',
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                        default: 'bounce',
                    },
                    random: true,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 80,
                },
                opacity: {
                    value: { min: 0.3, max: 0.7 },
                    animation: {
                        enable: true,
                        speed: 1,
                        sync: false,
                    },
                },
                shape: {
                    type: 'circle',
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        }),
        []
    );

    return (
        <Particles
            id="tsparticles"
            options={options}
            className="absolute inset-0 -z-10"
        />
    );
}
