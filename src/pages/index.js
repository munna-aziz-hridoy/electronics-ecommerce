import React from "react";
import { Section, SectionContent, SignMeUp } from "@/components";

import { homeData } from "../assets/data/home";

function Home({}) {
  return (
    <div className="">
      <Section color="#25627c" image={homeData.section_one.image}>
        <SectionContent
          title="spring looks"
          subTitle="Make the season anything but  ordinary"
          buttonText="Shop new in"
          categories={homeData.section_one.categories}
          categoryText="More of whats new"
        />
      </Section>
      <Section reverse color="#ff793f" image={homeData.section_two.image}>
        <SectionContent
          reverse
          title="camera events"
          subTitle="Make the season anything but  ordinary"
          buttonText="Shop your fav"
          categories={homeData.section_two.categories}
          categoryText="More of whats new"
        />
      </Section>
      <Section color="#0c2461" image={homeData.section_three.image}>
        <SectionContent
          title="touring headphones"
          subTitle="Make the season anything but  ordinary"
          buttonText="Shop new in"
          categories={homeData.section_three.categories}
          categoryText="More of whats new"
        />
      </Section>
      <Section reverse color="#b00303" image={homeData.section_four.image}>
        <SectionContent
          reverse
          title="speaker fair"
          subTitle="Make the season anything but  ordinary"
          buttonText="Shop speaker"
          categories={homeData.section_four.categories}
          categoryText="More of whats new"
        />
      </Section>
      <Section color="#fa983a" image={homeData.section_five.image}>
        <SectionContent
          title="power on hand"
          subTitle="Make the season anything but  ordinary"
          buttonText="Shop new in"
          categories={homeData.section_five.categories}
          categoryText="More of whats new"
        />
      </Section>
      <SignMeUp class_name={"my-16"} />
    </div>
  );
}

export default Home;
