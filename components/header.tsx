"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, ListIcon, LogOut, User, BarChartIcon as ChartBarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-around">
        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Livro Caixa</span>
          </Link>
        </div>

        {/* Navegação */}
        <nav className="flex items-center space-x-8 text-sm font-medium">
          <Link
            href="/dashboard"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
            )}
          >
            <span className="flex items-center gap-1">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </span>
          </Link>

          {/* Dropdown para Transações */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname.includes("/transacoes") ? "text-foreground" : "text-foreground/60"
                )}
              >
                <span className="flex items-center gap-1">
                  <Receipt className="h-4 w-4" />
                  Transações
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/transacoes">
                  <ListIcon className="mr-2 h-4 w-4" />
                  Resumo
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/transacoes/bancos">
                  <ListIcon className="mr-2 h-4 w-4" />
                  Bancos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/transacoes/entradas">Entradas</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/transacoes/despesas">Saídas</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/dre"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/dre" ? "text-foreground" : "text-foreground/60"
            )}
          >
            <span className="flex items-center gap-1">
              <ChartBarIcon className="h-4 w-4" />
              DRE
            </span>
          </Link>
        </nav>

        {/* Avatar com Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage src="/vercel.svg" alt="@user" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
