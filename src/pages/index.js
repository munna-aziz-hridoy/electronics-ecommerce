import React from "react";
import { Section, SectionContent } from "@/components";

import { homeData } from "../assets/data/home";

function Home() {
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
    </div>
  );
}

export default Home;
