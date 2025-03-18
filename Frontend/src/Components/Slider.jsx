import { useEffect, useState } from "react";
import styles from "../Styles/landing.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { error } from "../Utils/notification";
import safty from "../Images/safetyplus.svg"
import image1 from "../Images/tourist-people-tourist-waiting-line-vacation-tourism-travel-concept_133260-7803.avif";
function Slider() {
  const [hover, sethover] = useState(false);
  const [source, setsource] = useState("");
  const [destination, setdestination] = useState("");
  const [date, setdate] = useState("");
  const [showName, setShowNames] = useState(false);
  const [showNamedes, setShowNamesdes] = useState(false);
  const [output, setOutput] = useState([]);
  const [outputdes, setOutputdes] = useState([]);
  const [dateinfo, setdateinfo] = useState({});
  const [cityClicked, setCityclicked] = useState(false);
  const [CityDesclicked, setCityDesclicked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let mindate = new Date().toISOString().split("T")[0];
    let maxdate = new Date().toISOString().split("T")[0];
    // console.log(mindate, maxdate);
    setdate(mindate);
    setdateinfo({
      ...dateinfo,
      mindate: mindate,
      maxdate: maxdate,
    });
  }, []);

  useEffect(() => {
    if (source === "") {
      setShowNames(false);
      return;
    }
    if (cityClicked === true) {
      setCityclicked(false);
      return;
    }
    let timerID = setTimeout(() => {
      handleGetRequest();
    }, 1000);

    return () => {
      clearTimeout(timerID);
    };
  }, [source]);

  useEffect(() => {
    if (destination === "") {
      setShowNamesdes(false);
      return;
    }
    if (CityDesclicked === true) {
      setCityDesclicked(false);
      return;
    }
    let timerID = setTimeout(() => {
      handleGetRequestdes();
    }, 1000);

    return () => {
      clearTimeout(timerID);
    };
  }, [destination]);

  const handleGetRequest = async () => {
    try {
      console.log("source------",source);
      let res = await axios.post("http://localhost:2000/city", {
        source,
      });
      console.log(res);
      res = res.data;
      setOutput(res);
      setShowNames(true);
      console.log(output);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetRequestdes = async () => {
    try {
      let res = await axios.post("http://localhost:2000/city", {
        destination,
      });
      res = res.data;

      setOutputdes(res);
      setShowNamesdes(true);
    } catch (err) {
      console.log(err);
    }
  };

  function handelhover() {
    sethover(true);
  }

  function handelhoverout() {
    sethover(false);
  }

  function handleclicked() {
    if (date === "" || destination === "" || source === "") {
      error("Please Fill All The Details");
      return;
    }
    if (source === destination) {
      error("Source And Destination Can't Be Same");
      return;
    }
    setsource("");
    getcityinfo(source, destination, date);
  }

  async function getcityinfo(source, destination, date) {
    try {
      console.log("-------source checking api call---------",source,destination,date);
      let res = await axios.post("http://localhost:2000/city/showcity", {
        source,
        destination,
        date,
      });
      console.log("res-----------------",res);
      if (res.data.status === "success") {
        navigate({
          pathname: "/selectbus",
          search: `?from=${source}&to=${destination}&date=${date}`,
        });
      } else {
        setsource("");
        setdestination("");
        error("City Not Found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handlecityclicked(name) {
    setCityclicked(true);
    setsource(name);
    setShowNames(false);
  }
  function handlecityclicked1(name) {
    setCityDesclicked(true);
    setdestination(name);
    setShowNamesdes(false);
  }

  function handledateclicked() {
    setShowNamesdes(false);
    setShowNames(false);
  }
  return (
    <>
      <div className={styles.Carousel}>
      <div
          onMouseOver={handelhover}
          onMouseLeave={handelhoverout}
          style={{
            position: "relative",
            height: "75vh",
            width: "100%",
          }}
        >
          <img
            src={image1}
            alt="Static Image"
            className="object-fit-cover"
            style={{ height: "100%", width: "100%" }}
          />
          {/* {hover && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              <h3>Hovered State</h3>
            </div>
          )} */}
        </div>
        <div className={styles.data}>
          <input
            type="text"
            placeholder="Source"
            value={source}
            onChange={(e) => {
              setsource(e.target.value);
              setShowNamesdes(false);
            }}
            className={styles.inputsource}
          />
          {showName && output.length != 0 && (
            <div className={styles.names}>
              {output?.map((item, i) => (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handlecityclicked(item.name)}
                  key={i}
                >
                  <h6 style={{ paddingTop: "5px", paddingLeft: "5px" }}>
                    {item.name},{item.state}
                  </h6>
                  <hr />
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => {
              setdestination(e.target.value);
              setShowNames(false);
            }}
            className={styles.inputsource1}
          />
          {showNamedes && outputdes.length != 0 && (
            <div className={styles.names1}>
              {outputdes?.map((item, i) => (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handlecityclicked1(item.name)}
                  key={i}
                >
                  <h6 style={{ paddingTop: "5px", paddingLeft: "5px" }}>
                    {item.name},{item.state}
                  </h6>
                  <hr />
                </div>
              ))}
            </div>
          )}
          <input
            type="date"
            value={date}
            min={dateinfo.mindate}
            onChange={(e) => setdate(e.target.value)}
            onClick={() => handledateclicked()}
          />
          <button onClick={handleclicked}>Search</button>
        </div>
        <div className={styles.infodiv}>
          <div>
            {" "}
            <img
              src={safty}
              alt="shield"
            />
          </div>
          <div>
            <h4>Introducing Safety+ Program</h4>
            <p>
              A unique certification program that ensures safety in all buses
            </p>
          </div>
          <div>
            <div>
              {" "}
              <button>know More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Slider;
