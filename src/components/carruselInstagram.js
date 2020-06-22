import React, {Component} from 'react';
import InstagramEmbed from 'react-instagram-embed';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const direcciones=['https://www.instagram.com/p/B7v0AgJFmiC/','https://www.instagram.com/p/B7hYilKFNux/','https://www.instagram.com/p/B7Tmc7xFfMY/',
'https://www.instagram.com/p/B7MOeacF7ZI/','https://www.instagram.com/p/B7HCIKiHGB5/','https://www.instagram.com/p/B6ytTnnlv8A/','https://www.instagram.com/p/B6nw6BSFMD1/']

class CarrouselInstagram extends Component {
render (){
     return (
      <div className="Home" >
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={4000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 3,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          }
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
        style={{backgroundColor:'red'}}
      >
      {
        direcciones.map((it)=>{
          return(<InstagramCard url={it}/>)
        })
      }

      </Carousel>

      </div>
    )
  }
}


  class InstagramCard extends Component {
  render (){
    let width=350;
  return (
    <div>
    <InstagramEmbed
      url={this.props.url}
      maxWidth={width}
      hideCaption={true}
      containerTagName='div'
      protocol=''
      injectScript
      onLoading={() => {}}
      onSuccess={() => {}}
      onAfterRender={() => {}}
      onFailure={() => {}}

    />
    </div>
  );}
}
export default CarrouselInstagram;
