export default function AuroraBG() {
    return (
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-slate-950 via-black to-slate-950 z-0">
            {/* Soft aurora light sweeps */}
            <div className="aurora-layer aurora-layer--blue" />
            <div className="aurora-layer aurora-layer--violet" />

            {/* Subtle twinkling star field */}
            <div className="aurora-stars mask-gradient" />

            {/* Neon grid floor */}
            <div className="aurora-grid mask-gradient-top" />

            {/* Floating light orbs around the logo */}
            <div className="aurora-orb aurora-orb--left" />
            <div className="aurora-orb aurora-orb--right" />
        </div>
    );
}
