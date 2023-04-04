import React from "react";

import { sectionOneImages } from "@/assets/data/category";
import { Image, Button } from "..";

function CategorySectionTop() {
  return (
    <div className='flex flex-col md:flex-row h-[max-content] md:h-[620px] my-10'>
      {/* image one */}

      <div className='w-full md:w-1/2 relative'>
        <Image src={sectionOneImages[0]} />
        <div className='absolute  w-full h-full  flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-black/20'>
          <Button>Find All headphones</Button>
        </div>
      </div>
      <div className='flex flex-col w-full md:w-1/2'>
        {/* image two three */}

        <div className='flex w-full h-1/2'>
          <div className='w-1/2 relative'>
            <Image src={sectionOneImages[3]} />
            <div className='absolute w-full h-full flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-black/20'>
              <Button>Shop now</Button>
            </div>
          </div>
          <div className='w-1/2 relative'>
            <Image src={sectionOneImages[2]} />
            <div className='absolute w-full h-full flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-black/20'>
              <Button>What you need</Button>
            </div>
          </div>
        </div>

        {/* image four */}

        <div className='w-full h-1/2 relative'>
          <Image src={sectionOneImages[1]} />
          <div className='absolute w-full h-full flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-black/20'>
            <Button>Find Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategorySectionTop;
