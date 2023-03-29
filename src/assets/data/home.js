// section Img
import sectionOneImg from '../img/section_one/section-bg-1.png'
import sectionTwoImg from '../img/section_two/sectionImg.jpg'
import sectionThreeImg from '../img/section_three/sectionImg.jpg'
import sectionFourImg from '../img/section_four/sectionImg.jpg'
import sectionFiveImg from '../img/section_five/sectionImg.jpg'

// head Phone
import headphone1 from '../img/section_one/headphone1.jpg'
import headphone2 from '../img/section_one/headphone2.jpg'
import headphone3 from '../img/section_one/headphone3.png'

// camera
import camera1 from '../img/section_two/img1.jpg'
import camera2 from '../img/section_two/img2.jpg'
import camera3 from '../img/section_two/img3.jpg'

// Charger
import charger1 from '../img/section_three/img1.jpg'
import charger2 from '../img/section_three/img2.jpg'
import charger3 from '../img/section_three/img3.jpg'

// speaker
import speaker1 from '../img/section_four/img1.jpg'
import speaker2 from '../img/section_four/img2.jpg'
import speaker3 from '../img/section_four/img3.jpg'

// Power Bank
import power_bank1 from '../img/section_five/img1.jpg'
import power_bank2 from '../img/section_five/img2.jpg'
import power_bank3 from '../img/section_five/img3.jpg'

export const homeData = {
  section_one: {
    image: sectionOneImg,
    categories: [
      {
        name: 'Earphone',
        image: headphone1,
      },
      {
        name: 'Headphone',
        image: headphone2,
      },
      {
        name: 'Ear buds',
        image: headphone3,
      },
    ],
  },
  section_two: {
    image: sectionTwoImg,
    categories: [
      {
        name: 'Canon',
        image: camera1,
      },
      {
        name: 'Sony',
        image: camera2,
      },
      {
        name: 'Camera',
        image: camera3,
      },
    ],
  },

  section_three: {
    image: sectionThreeImg,
    categories: [
      {
        name: 'Cable',
        image: charger1,
      },
      {
        name: 'Apple Cable',
        image: charger2,
      },
      {
        name: 'Charger',
        image: charger3,
      },
    ],
  },
  section_four: {
    image: sectionFourImg,
    categories: [
      {
        name: 'Speaker',
        image: speaker1,
      },
      {
        name: 'Microphone',
        image: speaker3,
      },
      {
        name: 'Noise ',
        image: speaker2,
      },
    ],
  },

  section_five: {
    image: sectionFiveImg,
    categories: [
      {
        name: 'Samsung',
        image: power_bank1,
      },
      {
        name: 'Google',
        image: power_bank2,
      },
      {
        name: 'Sony',
        image: power_bank3,
      },
    ],
  },
}
