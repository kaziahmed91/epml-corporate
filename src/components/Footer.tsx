import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./ui/logo";
import { NavigationLink } from "./ui/navigation-link";
import { footerLinks } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Logo className="brightness-0 invert" />
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                EPML is a leading property development company committed to creating 
                exceptional residential and commercial spaces that enhance communities 
                and improve lives.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span>+88 017010101010</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span>info@epml.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span>Equity Point, Prabartak Circle, Chattogram 4203</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <NavigationLink 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </NavigationLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Projects</h3>
              <ul className="space-y-2">
                {footerLinks.projects.map((link) => (
                  <li key={link.href}>
                    <NavigationLink 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </NavigationLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <NavigationLink 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </NavigationLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} EPML. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
