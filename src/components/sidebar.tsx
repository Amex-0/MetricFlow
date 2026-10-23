
import { BarChart, ChartArea, ChartBar, ChartLine, Download, Folders, LayoutDashboard, Locate, LocateIcon, LucideLayoutDashboard, LucideTableCellsSplit, PinIcon, Save, ShoppingCartIcon } from "lucide-react";
import { Command,CommandInput, CommandSeparator, CommandItem, CommandList ,CommandEmpty, CommandGroup, CommandShortcut } from "./ui/command";
import Link from "next/link";

export default function Sidebar(){
    return   <Command className="bg-slate-50 rounded-none">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="">
      <CommandItem>
        <LucideLayoutDashboard className="mr-2 h-4 w-4"/>
        <Link href='/' > Overview</Link>
      </CommandItem>
      </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Analytics">
      <CommandItem>
        <BarChart className="mr-2 h-4 w-4"/>
        <Link href='/' >Sales Performance</Link>
      </CommandItem>
      <CommandItem>
        <ShoppingCartIcon className="mr-2 h-4 w-4"/>        
        Orders</CommandItem>
      <CommandItem>
        <PinIcon className="mr-2 h-4 w-4"/>
        Region</CommandItem>
      <CommandItem>
        <LayoutDashboard className="mr-2 h-4 w-4"/>
        Quarterly Revenue by Sales</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Workspace">
      <CommandItem>
        <Save className="mr-2 h-4 w-4"/>
        Saved views
        <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      <CommandItem>
        <Download className="mr-2 h-4 w-4"/>
        Exports
        </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
    
}
