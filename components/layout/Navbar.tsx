"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Wallet, Shield, Zap, ChevronDown,
  BarChart3, Users, Settings, LogOut, Bell, Brain, Sparkles,
  Bitcoin, Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";
import { useWalletWithAuth } from "@/features/wallet/hooks/use-wallet-with-auth";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  
  const { 
    wallet, 
    isConnected, 
    isLoading, 
    connectWallet, 
    disconnectWallet 
  } = useWalletWithAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const navItems = [
  { name: "Enviar", href: "/send", icon: Zap },
  { name: "Recibir", href: "/receive", icon: Wallet },
  { name: "Tandas", href: "/tandas", icon: Users },
  { name: "Bitcoin", href: "/bitcoin", icon: Bitcoin },
  { name: "Privacidad", href: "/privacy", icon: Shield },
  { name: "Gaming", href: "/gaming", icon: Trophy },
  { name: "Historial", href: "/historial", icon: BarChart3 },
];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-card border-b border-dark-800 shadow-glass-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Neural Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-neural-gradient rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity neural-pulse" />
              <div className="relative w-12 h-12 bg-neural-gradient rounded-xl flex items-center justify-center neural-glow">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            <span className="text-2xl font-bold neural-text">
              StarkPays
            </span>
            <Badge className="hidden sm:inline-flex bg-neural-gradient text-white border-0">
              <Sparkles className="w-3 h-3 mr-1 neural-pulse" />
              Neural AI
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className="relative group text-dark-200 hover:text-neural-400 hover:bg-glass-white"
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neural-gradient"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Button>
              </Link>
            ))}
          </div>

          {/* Wallet Connect + User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {isConnected ? (
              <>
                {/* Neural Notifications */}
                <Button variant="ghost" size="icon" className="relative text-dark-200 hover:text-neural-400 hover:bg-glass-white">
                  <Bell className="w-5 h-5" />
                  <Badge 
                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-neural-gradient text-white border-0"
                  >
                    3
                  </Badge>
                </Button>

                {/* Neural User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="space-x-2 glass-button border-neural-500 text-dark-200 hover:text-neural-400">
                      <div className="w-8 h-8 rounded-full bg-neural-gradient flex items-center justify-center neural-glow">
                        <span className="text-white font-medium text-sm">
                          {wallet?.address ? wallet.address.slice(0, 2) : "U"}
                        </span>
                      </div>
                      <span className="font-mono text-sm">
                        {wallet?.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : "Usuario"}
                      </span>
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass-card-dark border-dark-800">
                    <DropdownMenuLabel className="text-dark-100">Mi Cuenta Neural</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-dark-700" />
                    <DropdownMenuItem asChild className="text-dark-200 hover:text-neural-400 hover:bg-glass-white">
                      <Link href="/dashboard">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Dashboard Neural
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-dark-200 hover:text-neural-400 hover:bg-glass-white">
                      <Link href="/tandas">
                        <Users className="w-4 h-4 mr-2" />
                        Mis Tandas
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-dark-200 hover:text-neural-400 hover:bg-glass-white">
                      <Link href="/family-vault">
                        <Shield className="w-4 h-4 mr-2" />
                        Bóveda Neural
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-dark-200 hover:text-neural-400 hover:bg-glass-white">
                      <Link href="/settings">
                        <Settings className="w-4 h-4 mr-2" />
                        Configuración
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-dark-700" />
                    <DropdownMenuItem
                      onClick={disconnectWallet}
                      className="text-red-400 focus:text-red-400 hover:bg-glass-white"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Desconectar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                onClick={() => setIsWalletModalOpen(true)}
                size="lg"
                className="neural-button"
                disabled={isLoading}
                tabIndex={0}
                aria-label="Conectar wallet con Argent X"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Conectando...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Conectar Neural
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-dark-200 hover:text-neural-400 hover:bg-glass-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-card-dark border-t border-dark-800"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-dark-200 hover:text-neural-400 hover:bg-glass-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Button>
                </Link>
              ))}
              
              {!isConnected && (
                <Button
                  onClick={() => {
                    setIsWalletModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full neural-button"
                  disabled={isLoading}
                  tabIndex={0}
                  aria-label="Conectar wallet con Argent X"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Conectando...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-5 h-5 mr-2" />
                      Conectar Neural
                    </>
                  )}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wallet Connect Modal */}
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={connectWallet}
      />
    </motion.nav>
  );
}
