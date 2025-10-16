"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "es-MX", name: "Español", flag: "🇲🇽" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="glass-button border-neural-500 text-dark-200 hover:text-neural-400 hover:bg-glass-white"
          tabIndex={0}
          aria-label="Cambiar idioma"
        >
          <Globe className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">{currentLanguage.flag}</span>
          <span className="sm:hidden">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-48 glass-card-dark border-dark-800"
        sideOffset={5}
      >
        <AnimatePresence>
          {languages.map((language) => (
            <motion.div
              key={language.code}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DropdownMenuItem
                onClick={() => handleLanguageChange(language.code)}
                className={`flex items-center justify-between text-dark-200 hover:text-neural-400 hover:bg-glass-white cursor-pointer ${
                  locale === language.code ? 'bg-neural-500/20' : ''
                }`}
                tabIndex={0}
                aria-label={`Cambiar a ${language.name}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                </div>
                {locale === language.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-4 h-4 text-neural-400" />
                  </motion.div>
                )}
              </DropdownMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
