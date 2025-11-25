const Header = () => {
    const navlinks = [
        { name: 'works', sublinks: [{ name: 'personal work', href: '/personal-work' }, { name: 'client work', href: '/client-work' }] },
        { name: 'about', href: '/about' },
        { name: 'contact', href: '/contact' },
    ]
    return (
        <div className="z-10 w-full p-2 fixed">
            <nav className="flex justify-center text-3xl gap-6 space-x-20 p-4">
                {navlinks.map((link, index) => (
                    link.sublinks ? (
                        <div key={index} className="relative group">
                            <span className="cursor-pointer">{link.name}</span>
                            <div className="absolute top-full -left-10 mt-2 w-max bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                {link.sublinks.map((sublink, subIndex) => (
                                    <a key={subIndex} href={sublink.href} className="block px-4 py-2 text-2xl hover:bg-gray-100">{sublink.name}</a>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <a key={index} href={link.href} className="cursor-pointer">{link.name}</a>
                    )
                ))}
            </nav>
        </div>
    );
};
export default Header;