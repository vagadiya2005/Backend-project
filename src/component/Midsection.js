import React from 'react';
import './midsection.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfoCard from './Infocard';
import IntroCard from './Introcard';
import inorganic from './inorganic.jpg';
import organic from './organic.jpg';
import agro from './agro.webp';


export default function Midsection() {
  return (
    <div>
      <div className="business-section container-fluid mb-1">
        <div className="text-center my-4">
          <h2 className="business-title">SHREEJI INTERNATIONAL</h2>
          <h3 className="business-subtitle">IMPORT | EXPORT </h3>
        </div>
      </div>


      <IntroCard></IntroCard>    {/* introcard to show whya shreejii and all  */}


      <div className="service-section container-fluid mb-0 text-center">
        <div className="my-4">
          <h2 className="service-title">OUR SERVICE</h2>
          <h4 className="service-subtitle">Our wide range of agrochemical services include:</h4>
        </div>

        <ul className="service-description mx-auto">
          <li>Advice and information on when and where to use our chemical products.</li>
          <li>
            Products for hobby farmers through to agricultural operations - all in
            <span className="nowrap"> simple convenient packaging.</span>
          </li>
          <li>Specialist products supporting a diverse range of crops including:

            <li> agricultural-organic-inorganic</li>

          </li>
        </ul>


      </div>
      <div className="products-section container-fluid mb-0 text-center">
        <div className="row my-4">
          <div className="col-12">
            <h2 className="products-title">PRODUCTS</h2>
            <p className="products-description">
              The company produces a range of chemical products with a total production capacity of up to thousands of tons per month distributed across various factory applications in the globe and domestic market. Including agro chemicals, organic chemical, inorganic chemical and paint thinner, etc.
            </p>
          </div>
        </div>
      </div>

      <div className="service-cards d-flex justify-content-around flex-wrap">
        <InfoCard
          image={agro}
          title="Agrochemicals"
          description="We supply and export all agrochemicals with superior quality and the best packaging materials. Our company deals in all chemicals from seed to harvest."
        />
        <InfoCard
          image={inorganic}
          title="Inorganic"
          description="Our company trades and exports the best range of inorganic chemicals used for all industrial purposes. We provide the best door-to-door services."
        />
        <InfoCard
          image={organic}
          title="Organic"
          description="Shreeji International Company supplies and exports organic chemicals manufactured by a highly experienced scientific team using the best quality materials."
        />
        {/* Add more InfoCard components as needed */}
      </div>



    </div>
  );
}


