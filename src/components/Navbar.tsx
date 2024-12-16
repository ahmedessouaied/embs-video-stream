import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
    return(
        <header className="shadow">
            <div className="max-w-5xl mx-2 h-14 p-3 font-medium">
                <UserButton>

                </UserButton>
            </div>
        </header>
    );
}