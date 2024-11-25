import React from "react";

const About = () =>{
    return(
        <>
            <div className="bg-pink border text-center" style={{height:"300px",width:"100%",backgroundColor:"black",borderBottomLeftRadius:"100px",borderBottomRightRadius:"100px"}}>
                
                <h1 className="mt-5 text-primary">About Us...</h1>
                <div className="text-left" style={{height:"1000px",width:"30%",marginLeft:"35%",marginTop:"5%"}}>

                <img src={`${process.env.PUBLIC_URL}/images/happy.jpg` } alt="" style={{width:"100%"}}></img>
                <p className="text-left">"Welcome to our e-commerce site, your one-stop destination for a seamless online shopping experience!
                     We are committed to bringing you a vast selection of high-quality products across categories like fashion,
                    electronics, home essentials, and more. With user-friendly navigation, secure checkout, and dedicated customer 
                    support, we strive to make online shopping as convenient and enjoyable as possible. Explore our latest collections,
                    discover exclusive deals, and shop confidently with us as we prioritize quality, affordability, and exceptional 
                    service in everything we offer. Join our community of satisfied shoppers today!"
                       </p>
                </div>
            </div>
            
        </>
    )
}
export default About;