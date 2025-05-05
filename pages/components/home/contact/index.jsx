'use client'

export default function ContactSection() {
  return (
  <section className="overflow-auto px-4 md:px-20  flex flex-col gap-8 bg-neutral-50 dark:bg-neutral-990 pb-24" id='contact'>
    <div className="bg-neutral-50 py-8 mt-8 px-[40px] md:px-[20px] flex flex-col items-start dark:bg-neutral-990">
      {/* Logo container */}
      <div className=" bg-neutral-50 flex items-start justify-start mb-0 dark:bg-neutral-990">
        <img
          src="/logo-h.svg"
          alt="Logo"
          className="h-[100px] w-[300px] md:h-[180px] md:w-[1040px] dark:hidden"
        ></img>
        <img
          src="/logo-h-dark.svg"
          alt="Logo Dark"
          className="h-[100px] w-[300px] md:h-[180px] md:w-[1040px] hidden dark:block"
        ></img>
      </div>

      {/* Line and Contact circle container */}
      <div className="relative w-full flex items-center">
        {/* Horizontal line */}
        <div className="absolute left-10 right-10 md:left-24 md:right-24 h-px bg-neutral-990 dark:bg-neutral-100" />
        
        {/* Contact circle */}
        <div className="z-10 ml-auto mr-[calc(100%/6)] flex items-center justify-center w-[100px] h-[100px] md:w-[190px] md:h-[190px] border border-neutral-990 rounded-full bg-neutral-50 dark:bg-neutral-990 dark:border-neutral-50">
          <span className="font-russo text-sm md:text-4xl text-black dark:text-neutral-100">Contact</span>
        </div>
      </div>

      {/* Contact information */}
      <div className="flex flex-wrap gap-4  ml-[40px] mt-3 md:ml-[120px] ">
        <div className="px-3 py-2 md:px-6 md:py-3 rounded-full border border-neutral-990 dark:border-neutral-50 text-xs md:text-sm font-medium text-neutral-990 dark:text-neutral-100  ">
          esiflow@esi.dz
        </div>
        <div className="px-3 py-2 md:px-6 md:py-3 rounded-full border border-neutral-990 text-xs md:text-sm font-medium text-black dark:text-white  dark:border-neutral-50">
          +213 (0) 555 55 55 55
        </div>
      </div>
    </div>
  </section>
  )
}