import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-black text-white">
      <div className="flex flex-col gap-8 px-10 py-5 text-center w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/3 bg-slate-600/90 rounded-md">
        <div className="flex items-center justify-center gap-3 font-bold text-2xl">
          <Image
            src="/favicon.png"
            height={50}
            width={50}
            className="rounded-full"
            alt="logo"
          />
          <div>IntelliBlog 1.0</div>
        </div>
        <p className="text-sm">
          The AI-powered SAAS solution to generate SEO-optimized blog posts in
          minutes. Get high-quality content, without sacrificing your time.
        </p>
        <Link href="/post/new" className="btn">
          Get Started
        </Link>
      </div>
    </div>
  );
}
