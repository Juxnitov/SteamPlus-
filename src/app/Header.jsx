import Link from "next/link";
import Img from "../components/ui/img";

const Header = () => {
    return (
        <header className="bg bg-purple-500 text-white p-4">
            <div className="flex justify-between items-center">
                
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Img
                            src={"../../../logo.png"}
                            alt={"Logo"}
                            className="size-16 rounded-[100px] shadow-lg max-w-[200px]  object-cover"
                        />
                    </Link>
                    <Link href="/">Steam +</Link>
                </div>
               
                <nav className="flex gap-6 items-center font-bold ">
                    <Link href="/">Store</Link> 
                    <Link href="/">About us</Link>
                    <Link href="/">Support</Link>
                    <Link href="/">Profile</Link>
                    <button className="border-2 rounded-3xl px-4 py-1">Sign out</button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
