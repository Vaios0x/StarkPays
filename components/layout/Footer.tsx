"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Shield, Twitter, Github, MessageCircle, Mail, Brain, 
  Sparkles, Network, Zap, Lock, Globe, ArrowRight,
  Users, TrendingUp, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations();
  
  const footerLinks = {
    producto: [
      { name: t('footer.neural_guardian'), href: "/ai-protection", icon: Brain },
      { name: t('footer.smart_routing'), href: "/smart-routing", icon: Zap },
      { name: t('footer.family_vault'), href: "/family-vault", icon: Lock },
      { name: t('footer.api_neural'), href: "/developers", icon: Network },
    ],
    empresa: [
      { name: t('footer.about'), href: "/about", icon: Users },
      { name: t('footer.blog'), href: "/blog", icon: Brain },
      { name: t('footer.careers'), href: "/careers", icon: TrendingUp },
      { name: t('footer.press'), href: "/press", icon: Globe },
    ],
    legal: [
      { name: t('footer.terms'), href: "/terms", icon: ShieldCheck },
      { name: t('footer.privacy'), href: "/privacy", icon: Lock },
      { name: t('footer.cookies'), href: "/cookies", icon: Shield },
      { name: t('footer.compliance'), href: "/compliance", icon: ShieldCheck },
    ],
    soporte: [
      { name: t('footer.help'), href: "/help", icon: Brain },
      { name: t('footer.status'), href: "https://status.starkpays.com", icon: Network },
      { name: t('footer.contact'), href: "/contact", icon: MessageCircle },
      { name: t('footer.report_fraud'), href: "/report-fraud", icon: Shield },
    ],
  };

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com/starkpays", icon: Twitter },
    { name: "GitHub", href: "https://github.com/starkpays", icon: Github },
    { name: "Discord", href: "https://discord.gg/starkpays", icon: MessageCircle },
    { name: "Email", href: "mailto:hello@starkpays.com", icon: Mail },
  ];


  return (
    <footer className="bg-dark-950 relative overflow-hidden">
      {/* Neural Background */}
      <div className="absolute inset-0 bg-neural-mesh opacity-20" />
      
      {/* Floating Neural Elements */}
      {[...Array(10)].map((_, i) => {
        const positions = [
          { top: 10, left: 15 },
          { top: 30, left: 85 },
          { top: 50, left: 25 },
          { top: 70, left: 75 },
          { top: 20, left: 45 },
          { top: 60, left: 35 },
          { top: 5, left: 65 },
          { top: 40, left: 95 },
          { top: 80, left: 55 },
          { top: 25, left: 5 }
        ];
        
        const pos = positions[i] || positions[0];
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neural-500 rounded-full neural-pulse"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + (i * 0.3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        );
      })}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-neural-gradient rounded-2xl flex items-center justify-center neural-glow">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold neural-text">StarkPays</h4>
                  <p className="text-dark-400 text-sm">Neural Network</p>
                </div>
              </div>
              
              <p className="text-dark-300 leading-relaxed">
                {t('footer.description')}
              </p>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
              className="space-y-6"
            >
              <h5 className="text-lg font-bold text-dark-100 capitalize">
                {category === 'producto' ? t('footer.neural_product') : 
                 category === 'empresa' ? t('footer.company') :
                 category === 'legal' ? t('footer.legal_neural') : t('footer.neural_support')}
              </h5>
              
              <ul className="space-y-4">
                {links.map((link, index) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <Link
                      href={link.href}
                      className="flex items-center space-x-3 text-dark-300 hover:text-neural-400 transition-colors group-hover:bg-glass-white group-hover:px-3 group-hover:py-2 group-hover:rounded-lg"
                    >
                      <link.icon className="w-4 h-4 text-neural-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Neural Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card-dark rounded-3xl p-8 mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold neural-text mb-2">99.7%</div>
              <div className="text-sm text-dark-300">{t('footer.neural_stats.precision')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold neural-text mb-2">24/7</div>
              <div className="text-sm text-dark-300">{t('footer.neural_stats.monitoring')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold neural-text mb-2">0.3s</div>
              <div className="text-sm text-dark-300">{t('footer.neural_stats.analysis')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold neural-text mb-2">10K+</div>
              <div className="text-sm text-dark-300">{t('footer.neural_stats.families')}</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col lg:flex-row items-center justify-between pt-8 border-t border-dark-800"
        >
          <div className="flex items-center space-x-4 mb-6 lg:mb-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-neural-gradient rounded-xl flex items-center justify-center neural-glow">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-dark-100">StarkPays Neural</p>
                <p className="text-xs text-dark-400">Powered by Starknet & AI</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6 lg:mb-0">
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.name}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="glass-button text-dark-300 hover:text-neural-400 hover:bg-glass-white"
                  asChild
                >
                  <Link href={social.href}>
                    <social.icon className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>

            <div className="text-center lg:text-right">
            <p className="text-sm text-dark-400 mb-2">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center justify-center lg:justify-end space-x-4 text-xs text-dark-500 mb-2">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-neural-400" />
                <span>SSL Secured</span>
              </span>
              <span className="flex items-center space-x-1">
                <Brain className="w-3 h-3 text-neural-400" />
                <span>AI Protected</span>
              </span>
            </div>
            <div className="flex items-center justify-center lg:justify-end">
              <p className="text-xs text-dark-500">
                {t('footer.made_by')}{" "}
                <Link 
                  href="https://x.com/vaiossx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neural-400 hover:text-neural-300 transition-colors font-medium"
                >
                  @vaiossx
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
