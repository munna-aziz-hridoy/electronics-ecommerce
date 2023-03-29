import React from 'react'
import { Section, SectionContent } from '@/components'

import { homeData } from '../assets/data/home'

function Home() {
  return (
    <div className=''>
      <Section color='#25627c' image={homeData.section_one.image}>
        <SectionContent
          title='spring looks'
          subTitle='Make the season anything but  ordinary'
          buttonText='Shop new in'
          categories={homeData.section_one.categories}
          categoryText='More of whats new'
        />
      </Section>
      <Section reverse color='#ff793f' image={homeData.section_two.image}>
        <SectionContent
          reverse
          title='spring looks'
          subTitle='Make the season anything but  ordinary'
          buttonText='Shop new in'
          categories={homeData.section_two.categories}
          categoryText='More of whats new'
        />
      </Section>
      <Section color='#0c2461' image={homeData.section_three.image}>
        <SectionContent
          title='spring looks'
          subTitle='Make the season anything but  ordinary'
          buttonText='Shop new in'
          categories={homeData.section_three.categories}
          categoryText='More of whats new'
        />
      </Section>
      <Section reverse color='#b00303' image={homeData.section_four.image}>
        <SectionContent
          reverse
          title='spring looks'
          subTitle='Make the season anything but  ordinary'
          buttonText='Shop new in'
          categories={homeData.section_four.categories}
          categoryText='More of whats new'
        />
      </Section>
      <Section color='#fa983a' image={homeData.section_five.image}>
        <SectionContent
          title='spring looks'
          subTitle='Make the season anything but  ordinary'
          buttonText='Shop new in'
          categories={homeData.section_five.categories}
          categoryText='More of whats new'
        />
      </Section>
    </div>
  )
}

export default Home
