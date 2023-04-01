import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Button from "../Components/Button";
import Time from "../Assets/Time.png";
import RegisterModal from "../Components/RegisterModal";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import SalonProfile from "./SalonProfile";

const Landingpage = () => {
  const [ShowModal, setShowModal] = useState(false);
  const handleOnClose = () => setShowModal(false);

  const navigate = useNavigate();
  useEffect(() => {
    let logged = localStorage.getItem("loggedUser");
    if (logged) {
      const user1 = JSON.parse(logged);
      if (user1 != null) {
        navigate("/UserHome");
      } else {
        navigate("/SalonProfile");
      }
    }
  }, [localStorage.getItem("loggedUser")]);
  return (
    <div>
      <Header />
      {/* <Nav/> */}
      <div className="bg-white">
        <section class="banners">
          <div className="py-10 hero bg-slate-100">
            <div className="flex-col hero-content lg:flex-row-reverse">
              <img
                src="https://www.picktime.com/webassets/2021/img/picktime-hero-new.svg"
                width="500"
                height="500"
              />
              <div>
                <h1 className="text-6xl font-bold text-blue-600">
                  Simplified Scheduling
                </h1>
                <br />
                <h1 className="text-5xl font-bold text-gray-800">
                  for everyone
                </h1>
                <p className="py-5 text-2xl text-gray-600">
                  Free online Appointment scheduling software with Payments,
                  Invoicing, Sales, Reporting, Customer & Team management.
                </p>
                <div>
                  <Link to="/Login">
                    <Button>Get Start</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="what is bookin">
          <div className="py-20 bg-white hero">
            <div className="flex-col hero-content lg:flex-row">
              <img
                src="https://www.enerpize.com/wp-content/uploads/2019/04/Bookings-Hero.svg"
                width="500"
              />
              <div className="pl-32">
                <h1 className="pb-6 text-3xl font-bold text-blue-600">
                  What is BookIn ?
                </h1>
                <h1 className="text-4xl font-bold text-gray-700">
                  One Platform for all Salons
                </h1>
                <p className="py-3 text-2xl text-gray-600">
                  Schedule your Appointments and Booking with BookIn. Easily
                  manage your Time and Date with a few clicks.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section class="online booking">
          <div className="py-10 bg-white hero">
            <div className="flex-col hero-content lg:flex-row-reverse">
              <img
                src="https://img.freepik.com/free-vector/woman-setting-her-dates-appointment-booking_23-2148552955.jpg?w=826&t=st=1677936679~exp=1677937279~hmac=ee90289f4b478589cc8210e9707cc5ebc941eddebc72516356906fbbdd47c363"
                width="500"
              />
              <div>
                <h1 className="pb-6 text-3xl font-bold text-blue-600">
                  Online Booking
                </h1>
                <h1 className="text-4xl font-bold text-gray-700">
                  Take Bookings 24x7
                </h1>
                <p className="py-3 pb-10 text-2xl text-gray-600">
                  With our Online Booking feature, your clients can make
                  bookings 24x7. All you have to do is signup, create your
                  online booking page, set your booking Rules and share it with
                  your clients.
                </p>
                <div onClick={() => setShowModal(true)}>
                  <Button>Register for Free</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="payment">
          <div className="relative py-20 bg-white hero">
            <div className="absolute bottom-0 right-0 w-auto opacity-20">
              <img src={Time} alt="" />
            </div>
            <div className="flex-col hero-content lg:flex-row">
              <img
                src="https://www.picktime.com/webassets/2021/img/payment_and_invoicing.svg"
                width="500"
              />
              <div className="pl-32">
                <h1 className="pb-6 text-3xl font-bold text-blue-600">
                  Payment & Invoicing
                </h1>
                <h1 className="text-4xl font-bold text-gray-700">
                  Accept Payments & Deposits
                </h1>
                <p className="py-3 text-2xl text-gray-600">
                  Easily process your payments online in a secure manner. Choose
                  to either take deposits or full payments in advance. Select
                  from Payment processors and Generate Invoices easily. See a
                  decline in no-shows. Watch your revenue grow.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section class="reminders">
          <div className="py-10 bg-white hero">
            <div className="flex-col hero-content lg:flex-row-reverse">
              <img
                src="https://img.freepik.com/free-vector/appointment-booking-with-woman-checking-smartphone_23-2148558795.jpg?w=740&t=st=1677941633~exp=1677942233~hmac=bf0ce95206b91f44752b2acb5633ce64a2101f72788f50e308c9783265b753b0"
                width="500"
              />
              <div>
                <h1 className="pb-6 text-3xl font-bold text-blue-600">
                  Reminders
                </h1>
                <h1 className="text-4xl font-bold text-gray-700">
                  Notify your clients automatically
                </h1>
                <p className="py-3 pb-10 text-2xl text-gray-600">
                  Bookin automatically reminds your clients and team members of
                  upcoming bookings. No more missed appointments and no-Shows
                </p>
              </div>
            </div>
          </div>
        </section>
        <section class="payment">
          <div className="relative py-20 bg-white hero">
            <div className="flex-col hero-content lg:flex-row">
              <img
                src="https://www.picktime.com/webassets/2021/img/picktime-book-anytime-anywhere.svg"
                width="600"
              />
              <div className="pl-32">
                <h1 className="text-4xl font-bold text-gray-700">
                  Book from anywhere. At anytime.
                </h1>
                <p className="py-3 pb-10 text-2xl text-gray-600">
                  All you need is an internet Connection and a Mobile, Laptop or
                  a Tablet.
                </p>
                <div onClick={() => setShowModal(true)}>
                  <Button>Register for Free</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <RegisterModal visible={ShowModal} OnClose={handleOnClose} />
    </div>
  );
};

export default Landingpage;
