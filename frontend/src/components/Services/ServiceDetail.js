import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import api from "../../config";
import "./Services.css";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [serviceDetails, setServiceDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${api}/services/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setServiceDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching service details:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="services-item-details-container min-vh-100 text-center">
      {loading ? (
        <div className="m-4">
          {/* Shimmer placeholders */}
          <Skeleton height={40} width={`60%`} style={{ margin: "20px auto" }} />
          <Skeleton count={4} height={20} style={{ margin: "10px auto" }} />
          <Skeleton height={50} width={`40%`} style={{ margin: "30px auto" }} />
        </div>
      ) : (
        <>
          <div className="services-details-card-container m-4">
            <h1 className="services-details-card-heading">
              {serviceDetails.title}
            </h1>
            <p className="services-details-card-para p-4">
              {serviceDetails.description}
            </p>
          </div>

          <div className="request-container-services m-5">
            <h1 className="request-heading-services m-3">
              Request a free consultation!
            </h1>
            <div className="request-services-button-container p-3">
              <button
                type="button"
                className="btn btn-contact btn-pill btn-blue btn-lg"
              >
                GET IN TOUCH
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceDetailsPage;
