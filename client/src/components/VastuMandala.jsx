import React from 'react';

const VastuMandala = () => {
    const directions = [
        { name: 'N', color: '#4A90E2', desc: 'Wealth' }, // Blue
        { name: 'NNE', color: '#50E3C2', desc: 'Health' }, // Teal
        { name: 'NE', color: '#B8E986', desc: 'Mind' }, // Light Green
        { name: 'ENE', color: '#7ED321', desc: 'Fun' }, // Green
        { name: 'E', color: '#F8E71C', desc: 'Social' }, // Yellow
        { name: 'ESE', color: '#F5A623', desc: 'Churning' }, // Orange
        { name: 'SE', color: '#D0021B', desc: 'Cash' }, // Red
        { name: 'SSE', color: '#BD10E0', desc: 'Confidence' }, // Purple
        { name: 'S', color: '#9013FE', desc: 'Relax' }, // Dark Purple
        { name: 'SSW', color: '#4A4A4A', desc: 'Expenditure' }, // Dark Gray
        { name: 'SW', color: '#8B572A', desc: 'Skills' }, // Brown
        { name: 'WSW', color: '#B19CD9', desc: 'Education' }, // Lavender
        { name: 'W', color: '#7ED321', desc: 'Gains' }, // Green
        { name: 'WNW', color: '#F5A623', desc: 'Depression' }, // Orange
        { name: 'NW', color: '#4A90E2', desc: 'Support' }, // Blue
        { name: 'NNW', color: '#50E3C2', desc: 'Attraction' } // Teal
    ];

    const generatePath = (index) => {
        const radius = 95;
        const innerRadius = 75;
        const anglePerSegment = 360 / 16;
        const startAngle = (index * anglePerSegment - 90 - anglePerSegment / 2) * (Math.PI / 180);
        const endAngle = ((index + 1) * anglePerSegment - 90 - anglePerSegment / 2) * (Math.PI / 180);

        const x1 = 100 + radius * Math.cos(startAngle);
        const y1 = 100 + radius * Math.sin(startAngle);
        const x2 = 100 + radius * Math.cos(endAngle);
        const y2 = 100 + radius * Math.sin(endAngle);

        const x3 = 100 + innerRadius * Math.cos(endAngle);
        const y3 = 100 + innerRadius * Math.sin(endAngle);
        const x4 = 100 + innerRadius * Math.cos(startAngle);
        const y4 = 100 + innerRadius * Math.sin(startAngle);

        return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`;
    };

    return (
        <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.1))' }}>
            {/* Background Glow */}
            <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{ stopColor: '#fff', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#fdfbff', stopOpacity: 1 }} />
                </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="100" fill="url(#grad1)" />

            {/* Grid Enclosures (9x9) */}
            <g opacity="0.15">
                {[...Array(10)].map((_, i) => (
                    <React.Fragment key={i}>
                        <line x1={30 + i * 15.5} y1="30" x2={30 + i * 15.5} y2="170" stroke="#333" strokeWidth="0.5" />
                        <line x1="30" y1={30 + i * 15.5} x2="170" y2={30 + i * 15.5} stroke="#333" strokeWidth="0.5" />
                    </React.Fragment>
                ))}
            </g>

            {/* Colorful Outer Segments */}
            {directions.map((dir, i) => (
                <path
                    key={dir.name}
                    d={generatePath(i)}
                    fill={dir.color}
                    opacity="0.85"
                >
                    <title>{dir.name}: {dir.desc}</title>
                </path>
            ))}

            {/* Segment Labels */}
            {directions.map((dir, i) => {
                const anglePerSegment = 360 / 16;
                const angle = (i * anglePerSegment - 90) * (Math.PI / 180);
                const r = 85;
                const x = 100 + r * Math.cos(angle);
                const y = 100 + r * Math.sin(angle);
                return (
                    <text
                        key={`label-${dir.name}`}
                        x={x}
                        y={y}
                        fill="white"
                        fontSize="4"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{ pointerEvents: 'none', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                    >
                        {dir.name}
                    </text>
                );
            })}

            {/* Vastu Purusha High Quality Representation */}
            <g transform="translate(100, 100) scale(0.55)">
                {/* Central Body (Brahmasthana) */}
                <rect x="-40" y="-40" width="80" height="80" fill="#fff" opacity="0.3" stroke="#f0e0c0" strokeWidth="0.5" />

                {/* Purusha Figure - Stylized Art */}
                <path
                    d="M 0,-60 C -15,-60 -25,-45 -25,-30 C -25,-15 -15,0 0,0 C 15,0 25,-15 25,-30 C 25,-45 15,-60 0,-60 Z"
                    fill="#ffecd2" stroke="#8b4513" strokeWidth="1"
                /> {/* Head */}
                <path
                    d="M -30,10 L 30,10 L 50,80 L -50,80 Z"
                    fill="#ffecd2" stroke="#8b4513" strokeWidth="1"
                /> {/* Torso */}
                <path
                    d="M -30,20 Q -60,30 -50,100"
                    fill="none" stroke="#8b4513" strokeWidth="1.5"
                /> {/* Left Arm */}
                <path
                    d="M 30,20 Q 60,30 50,100"
                    fill="none" stroke="#8b4513" strokeWidth="1.5"
                /> {/* Right Arm */}
                <path
                    d="M -20,80 Q -30,120 -10,130"
                    fill="none" stroke="#8b4513" strokeWidth="1.5"
                /> {/* Left Leg */}
                <path
                    d="M 20,80 Q 30,120 10,130"
                    fill="none" stroke="#8b4513" strokeWidth="1.5"
                /> {/* Right Leg */}

                {/* Decorative Elements */}
                <circle cx="0" cy="-30" r="2" fill="#8b4513" /> {/* Tilak */}
            </g>

            {/* Internal Deities/Zones Circle */}
            <circle cx="100" cy="100" r="75" fill="none" stroke="#f0e0c0" strokeWidth="1" strokeDasharray="2,2" />
        </svg>
    );
};

export default VastuMandala;
