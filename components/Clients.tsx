export function Clients() {
    const clients = [
        "VOGUE",
        "NIKE",
        "CANON",
        "GQ",
        "CHANEL"
    ];

    return (
        <section className="bg-rich-black py-24 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <span className="text-gold text-xs tracking-[0.3em] font-bold uppercase mb-12">
                    Trusted By
                </span>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-24 items-center opacity-50">
                    {clients.map((client) => (
                        <div
                            key={client}
                            className="group flex justify-center items-center transition-all duration-300 hover:opacity-100 cursor-default"
                        >
                            {/* SVG Placeholder with Text to mimic logos */}
                            <svg viewBox="0 0 200 60" className="h-8 md:h-10 w-auto fill-white/20 group-hover:fill-white transition-colors duration-300">
                                <text
                                    x="50%"
                                    y="50%"
                                    dominantBaseline="middle"
                                    textAnchor="middle"
                                    fontSize="40"
                                    fontWeight="bold"
                                    fontFamily="serif"
                                >
                                    {client}
                                </text>
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
