import Image from "next/image";
import Link from "next/link";
import AuthTestimonials from "./AuthTestimonials";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl bg-white rounded-[20px] border border-gray-200 flex flex-col lg:flex-row overflow-hidden min-h-[600px] h-[calc(100vh-4rem)] max-h-[900px]">
        {/* Left Side: Form Content */}
        <div className="w-full lg:w-1/2 flex flex-col p-8 overflow-y-auto">
          <div className="mb-6">
            <Link href="/">
              <Image
                src="/Raft_Logo.png"
                alt="Raft Logo"
                width={100}
                height={33}
                className="object-contain"
              />
            </Link>
          </div>

          <div className="grow flex flex-col justify-center max-w-md w-full mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-500 mb-6 text-base">{subtitle}</p>

            {children}

            <p className="mt-8 text-center text-sm text-gray-600 font-medium">
              {footerText}{" "}
              <Link
                href={footerLinkHref}
                className="text-blue-600 font-bold hover:underline"
              >
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Carousel */}
        <div className="hidden lg:block w-1/2 p-4">
          <AuthTestimonials />
        </div>
      </div>
    </div>
  );
}
