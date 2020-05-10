import React, { Component } from 'react'
import { Segment, Image } from 'semantic-ui-react'
import image1 from '../images/instafood.image.jpg'
import image2 from '../images/cork_wine.jpg'

class About extends Component {
  render() {
    return (
      <div id="about-page" style={{ paddingTop:"15%"}}>
        <Segment>
        <Image src={image1} size='medium' floated='left' />
          <p>
            InstaFood is the warm cozy atmosphere spot your taste buds are looking for!<br/>
            All our ingredients are from local farmers witch we love supporting in return for our great meet and veggies.<br/>
            <br/>
            Come in and be a part of the experience!<br/>
            If you prefer to take your food with you dont worry... we alwayes have a nice surprise in your order!
          </p>
          <Image src={image2} size='medium' floated='right' />
          <p>
            P.s We have a great wine collection!
          </p>
        </Segment>

        <Segment style={{ width:"500px", marginLeft: "400px", marginTop: "50px"}}>

          <p>Address: Bigheadgigolo 46, 1157 NZ</p><br/>
          <p>Tel: +97 760 002 00</p>
        
        </Segment>
      </div>
    )
  }
}
export default About;
