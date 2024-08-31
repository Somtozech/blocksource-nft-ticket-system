import {Header, MintingModal, AddToCalendar, Button, Countdown} from "./components";
import {CalendarIcon} from "./components/icons/calendar";
import {ClockIcon} from "./components/icons/clock";
import {LocationIcon} from "./components/icons/location";
import styles from "./index.module.scss";
import blocksourceEventBackaground from "../assets/blocksource.png";
import {useState} from "react";
import {useAccount} from "wagmi";
import {toast} from "react-toastify";

// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const OSCA_FEST_BLOCKSOURCE_EVENT_DETAILS = {
  title: "Osca Fest Abuja 2024",
  startDate: "2024-08-31",
  startTime: "08:00",
  endTime: "16:00",
  description:
    "Join us for the Osca Fest Blocksource event. A day full of engaging activities and networking opportunities.",
  location: "Abuja",
};

function App() {
  const account = useAccount();
  const [isDisplayingModal, setIsDisplayingModal] = useState(false);

  const handleMintTicket = () => {
    if (account.status === "connected") {
      return setIsDisplayingModal(true);
    }

    toast.error("Please Connect your Wallet first");
  };

  return (
    <div className={`${styles.event_container} relative h-screen w-full overflow-hidden`}>
      <div className="h-full w-full overflow-y-auto">
        <Header />
        <div className="w-full max-w-1400px grid grid-cols-2 lg:gap-x-20 py-4 mx-auto text-white">
          <MintingModal isActive={isDisplayingModal} setIsActive={setIsDisplayingModal} />
          <div className={`${styles.left_container}`}>
            <h1>Building an NFT ticketing system for blocksource event.</h1>
            <h6 className="pt-5">
              Transform event access with secure, customizable NFT tickets that elevate the attendee experience.
            </h6>
            <div className="my-10">
              <p className="flex py-2 secondary-text">
                <span className="mr-2">
                  <ClockIcon />
                </span>
                08:00AM WAT
              </p>
              <p className="flex py-2 secondary-text">
                <span className="mr-2">
                  <CalendarIcon />
                </span>
                31ST AUGUST, 2024.
              </p>

              <p className="flex py-2 secondary-text">
                <span className="mr-2">
                  <LocationIcon />
                </span>
                GOMYCODE Abuja, 75 Aminu Crescent Wuse, Abuja
              </p>
            </div>
            <div className="py-12 flex justify-center lg:justify-between">
              <Button type="primary" text="Mint Ticket" icon={true} onClick={handleMintTicket} />

              <AddToCalendar event={OSCA_FEST_BLOCKSOURCE_EVENT_DETAILS} />
            </div>
          </div>

          {/* <!-- Second grid item --> */}
          <div className={`${styles.right__con} flex flex-col flex-1`}>
            <div className="my-10 lg:my-0 order-3 md:order-1">
              <img src={blocksourceEventBackaground} className="flex-wrap " />
            </div>
            <div className={`order-1 `}>
              <Countdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
