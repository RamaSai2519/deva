import CommitGraphBG from "../../components/Backgrounds/CommitGraph";

const CommitGraphSection = () => {
    return (
        <section className="relative w-full bg-black overflow-hidden">
            <div className="relative w-full min-h-[42vh] sm:min-h-[64vh] flex items-center justify-center">
                <div className="pointer-events-none absolute inset-0 opacity-[0.9]" aria-hidden="true">
                    <CommitGraphBG paused={false} word="EPOCH" />
                </div>

                <h2 className="sr-only">EPOCH</h2>

                <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_bottom,_transparent_0%,_black_100%)]" />
            </div>
        </section>
    );
};

export default CommitGraphSection;
