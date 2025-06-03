import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto", 
    lg: "h-16 w-auto"
  };

  return (
    <Link href="/" className={`${sizes[size]} ${className}`}>
      <Image 
        src={logo} 
        alt="EPML Logo" 
        className="h-full w-auto"
        priority
        quality={100}
      />
    </Link>
  );
}