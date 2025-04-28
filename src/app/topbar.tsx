import Link from "next/link";
import { BiGlobe } from "react-icons/bi";
const Topbar = () => {
    return (
        <div className="hidden md:block bg-brand-1">
            <div className="container text-slate-50 flex justify-between items-center tracking-tight">
                <ul className="flex gap-4 text-xs py-2">
                    <Link href="https://www.facebook.com/profile.php?id=100058955362068" target="_blank" rel="noreferrer">MTC Service</Link>
                    <Link href="https://www.facebook.com/profile.php?id=100058955362068" target="_blank" rel="noreferrer">MTC Acadamy</Link>
                    <Link href="https://servers.mn/" target="_blank" rel="noreferrer">Data center</Link>
                    <Link href="https://tvroom.mn/" target="_blank" rel="noreferrer">TVROOM</Link>
                    <Link href="https://www.facebook.com/1109.mn" target="_blank" rel="noreferrer">Үндэсний лавлах 1109</Link>
                    <Link href="/shareholders" className="text-yellow-300">МЦХ ХК-ИЙН ХУВЬЦАА ЭЗЭМШИГЧДИЙН АНХААРАЛД</Link>
                </ul>
                <ul className="text-lg">
                    <li>
                        <BiGlobe />
                    </li>
                </ul>
            </div>
            
        </div>
    );
}

export default Topbar;