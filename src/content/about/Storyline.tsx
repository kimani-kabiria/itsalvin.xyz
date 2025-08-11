"use client";

export function Storyline() {

    const StorylineData = [
        {
            title: "The Beginning",
            description: "Ever since I wrote my very first Hello, World! in C, I knew I was hooked. That single line of code opened a universe where creativity meets logic, and I’ve been obsessed ever since — solving problems, building systems, and crafting digital experiences with my favorite superpower: coding.",
        },
        {
            title: "The Journey",
            description: "Over the past 10 years, that passion has taken me through every corner of product design and development — from solution architecture and front-end engineering to UI design and user experience strategy. Today, I channel that experience into creating end-to-end solutions at Unbxd Creative Lab, helping clients turn ideas into products that scale.",
        },
        {
            title: "Beyond the Screen",
            description: "But I’m not just about pixels and code. Away from the screen, I’m a big Formula 1 fan (a proud Ferrari Tifosi), and I love exploring the world with my partner — chasing new experiences, new places, and maybe the perfect espresso.",
        },
        {
            title: "The Drive",
            description: "At my core, I’m driven by curiosity — whether it’s exploring how to make a system more elegant or finding the best track-side view at Monza.",
        },
    ];

    return (
        <div className="relative w-full py-16 flex flex-col items-center">
            <div className="max-w-4xl w-full px-4">
                <div className="relative">
                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gray-300 dotted-line"></div>
                    <div className="ml-8 md:ml-12 space-y-16">
                        {StorylineData.map((data, index) => (
                            <div key={index} className="relative bg-white p-6 rounded-xl shadow-2xl hover:shadow-xl border-l-4 border-primary">
                                <div className="absolute -left-4 md:-left-6 top-6 w-3 h-3 bg-primary rounded-full pin-dot"></div>
                                <h3 className="text-[2em] sm:text-[3.5rem] font-semibold text-primary mb-2 text-left font-[family-name:var(--font-acorn-bold)]">
                                    {data.title}
                                </h3>
                                <p className="text-gray-700 text-base md:text-lg">
                                    {data.description}
                                </p>
                            </div>
                        ))}                        
                    </div>
                </div>
            </div>
        </div>
    );
}