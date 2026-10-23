import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
const Navbar = () => {
    return <div className="bg-slate-700 text-white py-2 px-5 flex justify-between">
        <Link
        href='/'
        >
            Amex
        </Link>
        <DropdownMenu>
            
        <DropdownMenuTrigger>
    <Avatar>
        <AvatarImage
        src = 'https://github.com/shadcn.png'
        alt = '@shadcn'
        />
        <AvatarFallback className='text-black'> A </AvatarFallback>
    </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuGroup>
        <DropdownMenuLabel>
        My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>
        <Link href='/profile'>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Link href='/auth/sign-in'>Logout</Link>
        </DropdownMenuItem>        
        </DropdownMenuGroup>
        </DropdownMenuContent>
        </DropdownMenu>
    </div>;
}
 
export default Navbar;