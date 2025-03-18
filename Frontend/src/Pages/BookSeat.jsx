import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EachDeckSeat from "../Components/EachDeckSeat";
import styles from "../Styles/bookseat.module.css";
import axios from "axios";
import { BiArrowFromLeft } from "react-icons/bi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { error } from "../Utils/notification";

function Bookseat() {
  let [searchParams, setSearchParams] = useSearchParams();
  let param = useParams();
  const navigate = useNavigate();
  
  const [data, setdata] = useState([]);
  const [bookedSeates, setbookedSeates] = useState([]);
  const [wentwrong, setwentwrong] = useState(false);

  const ticket = useSelector((state) => state.ticket.ticketNo);

  useEffect(() => {
    let date = searchParams.get("date");
    if (!date) {
      setwentwrong(true);
    } else {
      getdata();
    }
  }, [searchParams]);

  async function getdata() {
    try {
      let res = await axios.post("http://localhost:2000/bus/one", { id: param.id });
      setdata(res.data);
      let info = res.data[0].seats;
      let date = searchParams.get("date");
      let booked = info
        .filter((ele) => {
          let x = ele.split("@");
          return x[0] === date;
        })
        .map((ele) => ele.split("@")[1].split(","))
        .flat();
      setbookedSeates(booked);
      setwentwrong(false);
    } catch (error) {
      setwentwrong(true);
    }
  }

  function handleClicked(ele) {
    if (ticket.length > 0) {
      sessionStorage.setItem("busData", JSON.stringify(data));
      navigate({
        pathname: `/details/${param.id}`,
        search: `?date=${searchParams.get("date")}&ticket=${ticket.join(",")}&amount=${ticket.length * ele}`,
      });
    } else {
      error("Please select Seat First");
    }
  }

  // Function to render seats dynamically
  function renderSeats(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i).map((seat) => {
      return bookedSeates.includes(String(seat)) ? (
        <EachDeckSeat key={seat} id={seat} color="red" disable={true} />
      ) : (
        <EachDeckSeat key={seat} id={seat} color="gray" disable={false} />
      );
    });
  }

  return (
    <>
      {wentwrong ? (
        <div className={styles.wrong}>
          <img src={require("../Images/404-error-page-templates.png")} alt="error" />
        </div>
      ) : (
        <div className={styles.main}>
          <div className={styles.seats}>
            <div>
              <h4 style={{ textAlign: "left" }}>Lower Deck</h4>
              <div className={styles.maincontainer}>
                <div className={styles.singlerow}>{renderSeats(1, 5)}</div>
                <div className={styles.maincontainer1}>
                  <div className={styles.doublerow}>{renderSeats(11, 15)}</div>
                  <div className={styles.doublerow}>{renderSeats(16, 20)}</div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: "left", marginTop: "25px", width: "100%" }}>
              <h4>Upper Deck</h4>
              <div className={styles.maincontainer}>
                <div className={styles.singlerow}>{renderSeats(6, 10)}</div>
                <div className={styles.maincontainer1}>
                  <div className={styles.doublerow}>{renderSeats(21, 25)}</div>
                  <div className={styles.doublerow}>{renderSeats(26, 30)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.busdata}>
            {data.map((ele) => {
              return (
                <div key={ele._id}>
                  <h5>{ele.companyname.charAt(0).toUpperCase() + ele.companyname.slice(1)} Travels</h5>
                  <div>
                    <p>{ele.from}</p>
                    <p><BiArrowFromLeft /></p>
                    <p>{ele.to}</p>
                  </div>
                  <hr />
                  <h6>Arrival Time : {ele.arrival}</h6>
                  <h6>Departure Time : {ele.departure}</h6>
                  <hr />
                  <h6>Email : {ele.email}</h6>
                  <h6>Phone : {ele.phone}</h6>
                  <hr />
                  <div className={styles.seatno}>
                    <span className={styles.seatlb}>Seat No.</span>
                    <div className={styles.selectedseats}>
                      {ticket.map((ele, i) => <span key={i}>{ele}, </span>)}
                    </div>
                  </div>
                  <hr />
                  <div className={styles.fair}>Fare Details</div>
                  <div className={styles.summarycontainer}>
                    <span className={styles.fareslb}>Amount</span>
                    <span className={styles.summaryvalue}>
                      <span className={styles.summarycurrency}>INR</span>
                      <span>{ticket.length * ele.price}</span>
                    </span>
                  </div>
                  <button
                    className={styles.btn}
                    onClick={() => handleClicked(ele.price)}
                  >
                    Proceed to book
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Bookseat;
