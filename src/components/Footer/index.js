const Footer = () => {
    return (
        <footer className="relative bg-[#0a7d4d] text-white text-3xl p-6 overflow-hidden">
            <div className="flex justify-between items-center w-full">
                <p>© Riyam Art</p>
                <p className="font-bold underline hover:no-underline cursor-pointer" onClick={() => window.location = 'mailto:riyam@gmail.com'}>
                    riyam@gmail.com
                </p>
                <p>2025</p>
            </div>
        </footer>
    );
};

export default Footer;
