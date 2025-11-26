"use client";

export function Experience() {
    const experiences = [
        { company: "Unbxd Creative Lab", role: "Co-Founder", years: "2022 ~", row: 1, colStart: 21, colSpan: 6 },
        { company: "Co-operative Bank of Kenya", role: "Full Stack Software Engineer", years: "May 2020 ~ ", row: 2, colStart: 12, colSpan: 10 },
        { company: "Freelance", role: "Architect & Designer", years: "2016 ~ 2020", row: 3, colStart: 10, colSpan: 16 },
        { company: "Topaz Digital Solutions", role: "Web Developer & Embedded Systems Engineer", years: "2017-2018", row: 4, colStart: 6, colSpan: 6 },
        { company: "Geekmergency Limited", role: "C.T.O", years: "2013 - 2016", row: 5, colStart: 1, colSpan: 5 },
    ];

    return (
        <div className="relative w-full sm:py-16 flex flex-col items-center">
            <div className="w-full px-4">
                <div className="timeline-grid sm:grid grid-cols-26 grid-rows-5 gap-2 space-y-4">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between rounded-2xl bg-primary dark:bg-primary/40 p-3 text-white shadow-2xl hover:shadow-xl"
                            style={{
                                gridRow: `${exp.row} / ${exp.row}`,
                                gridColumn: `${exp.colStart} / span ${exp.colSpan}`,
                            }}
                        >
                            <div className="flex-1">
                                <h3 className="text-[1em] sm:text-[1.25rem] font-semibold font-[family-name:var(--font-acorn-bold)]">{exp.company}</h3>
                                <p className="text-xs md:text-sm">{exp.role}</p>
                            </div>
                            <div className="ml-2 text-xs md:text-sm font-medium">{exp.years}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}